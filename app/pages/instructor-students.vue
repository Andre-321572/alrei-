<template>

    <Preloader />
    <InstructorNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <Sidebar />
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">{{ $t('home') }}</a></li>
                                    <li class="breadcrumb-item"><a href="#">{{ $t('instructor_dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('students') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-5">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card border rounded-3">
                                <div class="card-header bg-white border-bottom py-3">
                                    <h4 class="mb-0">{{ $t('students_list') }}</h4>
                                </div>
                                <div class="card-body p-0">
                                    <div class="table-responsive">
                                        <table class="table table-hover align-middle mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>{{ $t('student') }}</th>
                                                    <th>{{ $t('course_title') }}</th>
                                                    <th>{{ $t('progress') }}</th>
                                                    <th>{{ $t('joined_at') }}</th>
                                                    <th>{{ $t('action') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="loading">
                                                    <td colspan="5" class="text-center py-5">
                                                        <div class="spinner-border text-primary" role="status"></div>
                                                    </td>
                                                </tr>
                                                <tr v-else-if="students.length === 0">
                                                    <td colspan="5" class="text-center py-5">
                                                        <p class="text-muted mb-0">{{ $t('no_students_enrolled') }}</p>
                                                    </td>
                                                </tr>
                                                <tr v-for="student in students" :key="student.id + student.course_title">
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2">
                                                            <div class="square--40 circle overflow-hidden border">
                                                                <img :src="student.avatar || avatar3" class="img-fluid" alt="Avatar">
                                                            </div>
                                                            <div>
                                                                <div class="fw-bold">{{ student.name }}</div>
                                                                <div class="text-muted small">{{ student.email }}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{{ student.course_title }}</td>
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2" style="min-width: 120px;">
                                                            <div class="progress w-100" style="height: 6px;">
                                                                <div class="progress-bar bg-success" role="progressbar" :style="{ width: student.progress + '%' }" :aria-valuenow="student.progress" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span class="small fw-bold">{{ student.progress }}%</span>
                                                        </div>
                                                    </td>
                                                    <td>{{ new Date(student.joined_at).toLocaleDateString() }}</td>
                                                    <td>
                                                        <button @click="openMessageModal(student)" class="btn btn-outline-primary btn-sm rounded-pill">
                                                            <i class="bi bi-chat-dots me-1"></i> {{ $t('message') }}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Message Modal -->
    <div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('send_message_to') }} {{ selectedStudent?.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">{{ $t('your_message') }}</label>
                        <textarea v-model="messageContent" class="form-control" rows="4" :placeholder="$t('write_your_message_here')"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                    <button @click="sendMessage" class="btn btn-primary" :disabled="sending || !messageContent.trim()">
                        <span v-if="sending" class="spinner-border spinner-border-sm me-1" role="status"></span>
                        {{ $t('send') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <FooterDark />

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import avatar3 from "@/assets/img/avatar-3.jpg";

const api = useApi()
const students = ref<any[]>([])
const loading = ref(true)

const selectedStudent = ref<any>(null)
const messageContent = ref('')
const sending = ref(false)
let messageModalInstance: any = null

const fetchStudents = async () => {
    loading.value = true
    try {
        const response = await api('/instructor/students')
        students.value = response.data
    } catch (err) {
        console.error('Fetch students error:', err)
    } finally {
        loading.value = false
    }
}

const openMessageModal = (student: any) => {
    selectedStudent.value = student
    messageContent.value = ''
    if (!messageModalInstance && process.client && (window as any).bootstrap) {
        messageModalInstance = new (window as any).bootstrap.Modal(document.getElementById('messageModal'))
    }
    messageModalInstance?.show()
}

const sendMessage = async () => {
    if (!selectedStudent.value || !messageContent.value.trim()) return
    
    sending.value = true
    try {
        await api('/messages', {
            method: 'POST',
            body: {
                recipient_id: selectedStudent.value.id,
                content: messageContent.value
            }
        })
        messageModalInstance?.hide()
        alert('Message envoyé avec succès')
    } catch (err) {
        console.error('Send message error:', err)
        alert('Erreur lors de l\'envoi du message')
    } finally {
        sending.value = false
    }
}

onMounted(() => {
    fetchStudents()
})
</script>