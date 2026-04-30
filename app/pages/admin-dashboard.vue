<template>
    <InstructorNavbar /> <!-- We can reuse or create an AdminNavbar later -->

    <section class="p-0" style="background-color: var(--alrei-green);">
        <div class="container-fluid px-0">
            <div class="ht-80"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="mb-4">{{ $t('platform_administration') }}</h2>
                    
                    <div v-if="loading" class="text-center py-5">
                        <div class="spinner-border text-primary" role="status"></div>
                    </div>

                    <div v-else class="row gy-3 mb-5">
                        <div class="col-xl-3 col-lg-3 col-md-6" v-for="(stat, key) in adminStats" :key="key">
                            <div class="card rounded-3 border px-3 py-4 shadow-sm">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="square--60 circle bg-light-primary fs-3">
                                        <i :class="stat.icon"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <h2 class="fw-bold m-0">{{ stat.value }}</h2>
                                        <span class="text-muted small">{{ stat.label }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border rounded-3">
                        <div class="card-header bg-white border-bottom py-3">
                            <ul class="nav nav-tabs card-header-tabs border-0" id="adminTabs" role="tablist">
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'instructors' ? 'active' : '']" 
                                        @click="activeTab = 'instructors'"
                                    >
                                        {{ $t('instructors') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'students' ? 'active' : '']" 
                                        @click="activeTab = 'students'"
                                    >
                                        {{ $t('students') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'courses' ? 'active' : '']" 
                                        @click="activeTab = 'courses'"
                                    >
                                        {{ $t('courses') }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <!-- Instructors Tab -->
                            <div v-if="activeTab === 'instructors'" class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>{{ $t('name') }}</th>
                                            <th>{{ $t('title') }}</th>
                                            <th>{{ $t('status') }}</th>
                                            <th>{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="inst in instructors" :key="inst.id">
                                            <td>{{ inst.user.name }}</td>
                                            <td>{{ inst.title }}</td>
                                            <td>
                                                <span :class="['badge', inst.status === 'approved' ? 'bg-success' : 'bg-warning']">
                                                    {{ inst.status }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button 
                                                        @click="viewDetails(inst)" 
                                                        class="btn btn-sm btn-outline-primary"
                                                        title="View Details"
                                                    >
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                    <button 
                                                        v-if="inst.status === 'pending'"
                                                        @click="approve(inst.id)" 
                                                        class="btn btn-sm btn-success"
                                                        title="Approve"
                                                    >
                                                        <i class="bi bi-check-lg"></i>
                                                    </button>
                                                    <button 
                                                        @click="toggleUserStatus(inst.user.id)" 
                                                        :class="['btn btn-sm', inst.user.is_active ? 'btn-warning' : 'btn-info']"
                                                        :title="inst.user.is_active ? 'Deactivate' : 'Activate'"
                                                    >
                                                        <i :class="['bi', inst.user.is_active ? 'bi-person-x' : 'bi-person-check']"></i>
                                                    </button>
                                                    <button 
                                                        @click="deleteUser(inst.user.id)" 
                                                        class="btn btn-sm btn-danger"
                                                        title="Delete"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Students Tab -->
                            <div v-if="activeTab === 'students'" class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>{{ $t('name') }}</th>
                                            <th>{{ $t('email') }}</th>
                                            <th>{{ $t('joined_at') }}</th>
                                            <th>{{ $t('status') }}</th>
                                            <th>{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="student in students" :key="student.id">
                                            <td>{{ student.name }}</td>
                                            <td>{{ student.email }}</td>
                                            <td>{{ new Date(student.created_at).toLocaleDateString() }}</td>
                                            <td>
                                                <span :class="['badge', student.is_active ? 'bg-success' : 'bg-danger']">
                                                    {{ student.is_active ? 'Active' : 'Inactive' }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button 
                                                        @click="toggleUserStatus(student.id)" 
                                                        :class="['btn btn-sm', student.is_active ? 'btn-warning' : 'btn-info']"
                                                        :title="student.is_active ? 'Deactivate' : 'Activate'"
                                                    >
                                                        <i :class="['bi', student.is_active ? 'bi-person-x' : 'bi-person-check']"></i>
                                                    </button>
                                                    <button 
                                                        @click="deleteUser(student.id)" 
                                                        class="btn btn-sm btn-danger"
                                                        title="Delete"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Courses Tab -->
                            <div v-if="activeTab === 'courses'" class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>{{ $t('title') }}</th>
                                            <th>{{ $t('instructor') }}</th>
                                            <th>{{ $t('price') }}</th>
                                            <th>{{ $t('status') }}</th>
                                            <th>{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="course in courses" :key="course.id">
                                            <td>{{ course.title }}</td>
                                            <td>{{ course.instructor?.user?.name }}</td>
                                            <td>{{ course.price }} FCFA</td>
                                            <td>
                                                <span :class="['badge', course.status === 'published' ? 'bg-success' : 'bg-secondary']">
                                                    {{ course.status }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button 
                                                        @click="toggleCourseStatus(course.id)" 
                                                        :class="['btn btn-sm', course.status === 'published' ? 'btn-warning' : 'btn-info']"
                                                        :title="course.status === 'published' ? 'Unpublish' : 'Publish'"
                                                    >
                                                        <i :class="['bi', course.status === 'published' ? 'bi-eye-slash' : 'bi-eye']"></i>
                                                    </button>
                                                    <button 
                                                        @click="deleteCourse(course.id)" 
                                                        class="btn btn-sm btn-danger"
                                                        title="Delete"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
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
    </section>

    <!-- Modal Détails Instructeur -->
    <div class="modal fade" id="instructorModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg rounded-4">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">Détails de la candidature</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div v-if="selectedInstructor" class="d-flex flex-column gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="square--60 circle bg-light-primary text-primary fs-3 fw-bold">
                                {{ selectedInstructor.user.name.charAt(0) }}
                            </div>
                            <div>
                                <h5 class="m-0 fw-bold">{{ selectedInstructor.user.name }}</h5>
                                <p class="m-0 text-muted">{{ selectedInstructor.user.email }}</p>
                            </div>
                        </div>
                        <hr class="my-2">
                        <div>
                            <label class="text-muted small fw-bold text-uppercase">Spécialisation</label>
                            <h6 class="fw-semibold">{{ selectedInstructor.title }}</h6>
                        </div>
                        <div>
                            <label class="text-muted small fw-bold text-uppercase">Biographie</label>
                            <p class="mb-0 text-dark" style="white-space: pre-line;">{{ selectedInstructor.bio }}</p>
                        </div>
                        <div class="mt-3" v-if="selectedInstructor.status === 'pending'">
                            <button @click="approve(selectedInstructor.id)" class="btn btn-success w-100 rounded-pill py-2 fw-bold" data-bs-dismiss="modal">
                                <i class="bi bi-check-circle me-2"></i>Approuver cette candidature
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <FooterDark />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';

// Protège la route — seul un admin peut accéder
definePageMeta({
    middleware: ['admin'],
});

const api = useApi()
const stats = ref<any>(null)
const instructors = ref<any[]>([])
const students = ref<any[]>([])
const courses = ref<any[]>([])
const loading = ref(true)
const activeTab = ref('instructors')
const selectedInstructor = ref<any>(null)

const viewDetails = (inst: any) => {
    selectedInstructor.value = inst
    const modal = new (window as any).bootstrap.Modal(document.getElementById('instructorModal'))
    modal.show()
}

const fetchAll = async () => {
    loading.value = true
    try {
        const [statsRes, instRes, studRes, courseRes] = await Promise.all([
            api('/admin/stats'),
            api('/admin/instructors'),
            api('/admin/students'),
            api('/admin/courses')
        ])
        stats.value = statsRes
        instructors.value = instRes.data
        students.value = studRes.data
        courses.value = courseRes.data
    } catch (err) {
        console.error('Admin Fetch Error:', err)
    } finally {
        loading.value = false
    }
}

const adminStats = computed(() => [
    { label: 'Revenue', value: `${stats.value?.total_revenue || 0} FCFA`, icon: 'bi bi-cash-stack' },
    { label: 'Students', value: stats.value?.total_students || 0, icon: 'bi bi-people' },
    { label: 'Instructors', value: stats.value?.total_instructors || 0, icon: 'bi bi-person-badge' },
    { label: 'Courses', value: stats.value?.total_courses || 0, icon: 'bi bi-book' },
])

const approve = async (id: number) => {
    try {
        await api(`/admin/instructors/${id}/approve`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Approval failed:', err)
    }
}

const toggleUserStatus = async (id: number) => {
    try {
        await api(`/admin/users/${id}/toggle-status`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Toggle status failed:', err)
    }
}

const deleteUser = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
    try {
        await api(`/admin/users/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete failed:', err)
    }
}

const toggleCourseStatus = async (id: number) => {
    try {
        await api(`/admin/courses/${id}/toggle-status`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Toggle status failed:', err)
    }
}

const deleteCourse = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return
    try {
        await api(`/admin/courses/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete failed:', err)
    }
}

onMounted(fetchAll)
</script>
