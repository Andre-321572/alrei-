<template>
    <Preloader />
    <StudentNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                    <StudentAdminSidebar />
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">{{ $t('home') }}</a></li>
                                    <li class="breadcrumb-item"><a href="#">{{ $t('student_dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('my_assignments') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card border">
                                <div class="card-header border-bottom">
                                    <h4 class="mb-0">{{ $t('my_assignments') }}</h4>
                                </div>
                                <div class="card-body">
                                    <div v-if="loading" class="text-center py-5">
                                        <div class="spinner-border text-primary" role="status"></div>
                                        <p class="mt-2 text-muted small">Chargement des devoirs...</p>
                                    </div>

                                    <div v-else-if="assignments.length > 0" class="table-responsive">
                                        <table class="table table-hover align-middle">
                                            <thead class="bg-light">
                                                <tr>
                                                    <th>{{ $t('assignment') }}</th>
                                                    <th>{{ $t('course') }}</th>
                                                    <th>{{ $t('due_date') }}</th>
                                                    <th>{{ $t('status') }}</th>
                                                    <th>{{ $t('grade') }}</th>
                                                    <th>{{ $t('action') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="assign in assignments" :key="assign.id">
                                                    <td>
                                                        <h6 class="mb-0 fw-bold">{{ assign.title }}</h6>
                                                    </td>
                                                    <td>{{ assign.course?.title }}</td>
                                                    <td>{{ assign.due_date ? new Date(assign.due_date).toLocaleDateString() : 'N/A' }}</td>
                                                    <td>
                                                        <span v-if="hasSubmitted(assign)" class="badge bg-light-success text-success rounded-pill">{{ $t('submitted') }}</span>
                                                        <span v-else class="badge bg-light-danger text-danger rounded-pill">{{ $t('pending') }}</span>
                                                    </td>
                                                    <td>
                                                        <div v-if="getSubmission(assign)?.grade !== null">
                                                            <span class="fw-bold">{{ getSubmission(assign).grade }}</span> / {{ assign.max_points }}
                                                        </div>
                                                        <span v-else class="text-muted">--</span>
                                                    </td>
                                                    <td>
                                                        <NuxtLink :to="{ path: '/student-course-resume', query: { id: assign.course_id } }" class="btn btn-sm btn-outline-primary rounded-pill">
                                                            {{ hasSubmitted(assign) ? $t('view') : $t('submit') }}
                                                        </NuxtLink>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div v-else class="text-center py-5">
                                        <i class="bi bi-file-earmark-text display-4 text-muted"></i>
                                        <p class="mt-3 text-muted">Aucun devoir trouvé.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FooterDark />
    <ScrollToTop />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import Preloader from '@/components/Preloader.vue'
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue'
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue'
import FooterDark from '@/components/Footer/FooterDark.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'


const api = useApi()
const assignments = ref([])
const loading = ref(true)

const fetchAssignments = async () => {
    loading.value = true
    try {
        const response = await api('/my-assignments')
        console.log('Assignments API Response:', response)
        assignments.value = response.data || response
        if (response.debug) {
            console.log('Debug Info:', response.debug)
        }
    } catch (error) {
        console.error('Failed to fetch assignments:', error)
    } finally {
        loading.value = false
    }
}

const getSubmission = (assignment) => {
    return assignment.submissions && assignment.submissions.length > 0 ? assignment.submissions[0] : null
}

const hasSubmitted = (assignment) => {
    return !!getSubmission(assignment)
}



onMounted(fetchAssignments)

definePageMeta({
    middleware: ['auth'],
});
</script>
