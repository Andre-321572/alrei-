<template>

    <Preloader />
    <StudentNavbar />

    <section class="p-0 position-relative overflow-hidden bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
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
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row gy-3 mb-4">
                
                        <div 
                            class="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            v-for="(item, index) in aboutData" 
                            :key="index"
                        >
                            <div class="card rounded-3 border px-3 py-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div :class="`square--60 circle fs-3 bg-light-${item.theme}`">
                                        <i :class="item.icon"></i>
                                    </div>
                                    <div class="d-flex flex-column gap-1">
                                        <h2 class="fw-semibold m-0">{{item.value}}</h2><span class="text-muted">{{item.title}}</span>
                                    </div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                    
                    <div class="row mb-5">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">{{ $t('my_live_classes') }}</h4></div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div v-if="liveClasses.length > 0" class="row">
                                <div v-for="meeting in liveClasses" :key="meeting.id" class="col-md-6">
                                    <ExternalLiveClassCard :meeting="meeting" />
                                </div>
                            </div>
                            <div v-else class="card border rounded-3 p-4 text-center bg-light">
                                <i class="bi bi-camera-video text-muted fs-1 mb-2"></i>
                                <p class="text-muted mb-0">{{ $t('no_live_classes_scheduled') }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mb-5">
                        <div class="col-lg-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">{{ $t('pending_assignments') }}</h4></div>
                            </div>
                            
                            <div v-if="Array.isArray(assignments) && assignments.length > 0" class="row g-3">
                                <div v-for="assign in pendingAssignments" :key="assign.id" class="col-md-6">
                                    <div class="card border rounded-3 p-3 shadow-sm h-100">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="square--50 circle bg-light-danger text-danger fs-4">
                                                <i class="bi bi-file-earmark-text"></i>
                                            </div>
                                            <div class="flex-grow-1">
                                                <h6 class="mb-1 fw-bold">{{ assign.title }}</h6>
                                                <p class="small text-muted mb-0">{{ assign.course?.title }}</p>
                                                <span class="small text-danger" v-if="assign.due_date"><i class="bi bi-clock me-1"></i>{{ $t('due') }}: {{ new Date(assign.due_date).toLocaleDateString() }}</span>
                                            </div>
                                            <NuxtLink :to="{ path: '/student-course-resume', query: { id: assign.course_id } }" class="btn btn-sm btn-outline-danger rounded-pill px-3">{{ $t('submit') }}</NuxtLink>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="pendingAssignments.length === 0" class="col-12">
                                    <div class="card border rounded-3 p-4 text-center bg-light">
                                        <i class="bi bi-check-circle text-success fs-1 mb-2"></i>
                                        <p class="text-muted mb-0">{{ $t('all_assignments_done') }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="card border rounded-3 p-4 text-center bg-light">
                                <i class="bi bi-file-earmark-text text-muted fs-1 mb-2"></i>
                                <p class="text-muted mb-0">{{ $t('no_assignments_found') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-5">
                        <div class="col-lg-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">{{ $t('my_quiz_results') || 'Mes Résultats de Quiz' }}</h4></div>
                            </div>
                            
                            <div v-if="quizAttempts.length > 0" class="card border rounded-3 overflow-hidden shadow-sm">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="ps-3">Quiz</th>
                                                <th>Score</th>
                                                <th>Résultat</th>
                                                <th class="text-end pe-3">Correction</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="attempt in quizAttempts" :key="attempt.id">
                                                <td class="ps-3">
                                                    <h6 class="mb-0 fw-bold text-dark">{{ attempt.quiz?.title }}</h6>
                                                    <small class="text-muted">{{ attempt.quiz?.course?.title }}</small>
                                                </td>
                                                <td>
                                                    <div class="fw-bold text-dark">{{ attempt.percentage }}%</div>
                                                    <div class="small text-muted">{{ attempt.score }}/{{ attempt.total_points }} pts</div>
                                                </td>
                                                <td>
                                                    <span :class="['badge rounded-pill px-3', attempt.passed ? 'bg-light-success text-success' : 'bg-light-danger text-danger']">
                                                        {{ attempt.passed ? 'Réussi' : 'Échoué' }}
                                                    </span>
                                                </td>
                                                <td class="text-end pe-3">
                                                    <NuxtLink :to="`/quizzes/${attempt.quiz?.id}/result/${attempt.id}`" class="btn btn-sm btn-outline-primary rounded-pill px-3">Voir</NuxtLink>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div v-else class="card border rounded-3 p-4 text-center bg-light">
                                <i class="bi bi-graph-up text-muted fs-1 mb-2"></i>
                                <p class="text-muted mb-0">Vous n'avez pas encore passé de quiz.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                    
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">{{ $t('browse_all_courses') }}</h4></div>
                                <div class="view-all"><a href="#" class="btns text-muted mb-0">{{ $t('view_all') }}</a></div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="row g-3">
                                    
                                <div 
                                    class="col-xl-4 col-lg-4 col-md-6"
                                    v-for="(item, index) in enrolledCourses" 
                                    :key="index"
                                >
                                    <div class="education_block_grid border shadow-sm rounded-4 overflow-hidden h-100">
                                    
                                         <div class="education-thumb position-relative">
                                             <NuxtLink :to="`/course-detail/${item.course?.slug}`"><img :src="item.course?.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid" alt=""></NuxtLink>
                                             <div class="course-hours position-absolute top-0 start-0 ms-3 mt-3">
                                                 <span class="badge bg-dark rounded-pill"><i class="bi bi-tag me-1"></i>{{item.course?.category?.name}}</span>
                                             </div>
                                         </div>
                                         
                                         <div class="education-body p-3">
                                             <div class="education-title">
                                                 <h4 class="fs-6 fw-bold"><NuxtLink :to="`/course-detail/${item.course?.slug}`">{{item.course?.title}}</NuxtLink></h4>
                                             </div>
                                             
                                             <div class="progress-info mt-3">
                                                 <div class="d-flex align-items-center justify-content-between mb-1">
                                                     <h6 class="text-mid small fw-normal">{{ item.course?.lessons_count || 0 }} {{ $t('lessons') }}</h6>
                                                     <h6 class="fw-bold small">{{ item.course?.progress || 0 }}%</h6>
                                                 </div>
                                                 <div class="progress" style="height: 6px;">
                                                     <div 
                                                         class="progress-bar" 
                                                         :class="item.course?.progress >= 100 ? 'bg-success' : 'bg-primary'" 
                                                         :style="{ width: (item.course?.progress || 0) + '%' }"
                                                     ></div>
                                                 </div>
                                             </div>
                                         </div>
                                         
                                         <div class="education-footer border-0 p-3 pt-0">
                                             <div class="d-flex flex-column gap-2">
                                                 <NuxtLink :to="{ path: '/student-course-resume', query: { id: item.course?.id } }" class="btn btn-md btn-outline-primary border-2 rounded-pill w-100 fw-bold">{{ $t('continue') }}<i class="bi bi-arrow-right ms-2"></i></NuxtLink>
                                                 
                                                 <button 
                                                     v-if="item.course?.progress >= 100" 
                                                     @click="claimCertificate(item.course)" 
                                                     :disabled="claiming"
                                                     class="btn btn-md btn-main rounded-pill w-100 fw-bold shadow-sm"
                                                 >
                                                     <i v-if="claiming" class="spinner-border spinner-border-sm me-2"></i>
                                                     <i v-else class="bi bi-award me-2"></i>
                                                     {{ $t('claim_certificate') || 'Délivrer mon Certificat' }}
                                                 </button>
                                             </div>
                                         </div>
                                     </div>	
                                 </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

    <FooterDark/>
    <ScrollToTop />

</template>

<script setup lang="ts">
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { computed, ref, onMounted } from 'vue'

import { aboutData, coursesData } from '@/data/student.js'

const { fetchLiveClasses } = useExternal()
const api = useApi()
const { fetchMyQuizAttempts } = useQuizStore()
const liveClasses = ref([])
const enrolledCourses = ref([])
const assignments = ref([])
const quizAttempts = ref([])
const claiming = ref(false)

const stats = ref({
    active_courses: 0,
    completed_courses: 0,
    certificates: 0
})

const pendingAssignments = computed(() => {
    return assignments.value.filter(a => !a.submissions || a.submissions.length === 0)
})

const claimCertificate = async (course) => {
    claiming.value = true
    try {
        await api(`/courses/${course.id}/claim-certificate`, {
            method: 'POST'
        })
        alert('Votre demande de certificat a été envoyée avec succès. Elle doit maintenant être validée par l\'administration avant d\'être disponible dans votre dashboard.')
        navigateTo('/student-certificates')
    } catch (error) {
        console.error('Error claiming certificate:', error)
        alert(error.response?._data?.message || 'Une erreur est survenue lors de la génération du certificat. Assurez-vous d\'avoir validé le devoir final.')
    } finally {
        claiming.value = false
    }
}

const loadData = async () => {
    try {
        const [liveRes, coursesRes, assignRes, quizRes] = await Promise.all([
            fetchLiveClasses(),
            api('/my-courses'),
            api('/my-assignments'),
            fetchMyQuizAttempts()
        ])
        console.log('Dashboard Data Loaded:', { liveRes, coursesRes, assignRes, quizRes })
        liveClasses.value = liveRes
        enrolledCourses.value = coursesRes.data || coursesRes
        assignments.value = assignRes.data || assignRes
        quizAttempts.value = quizRes.data || quizRes
        
        // Calculate basic stats
        stats.value.active_courses = enrolledCourses.value.length
        stats.value.completed_courses = enrolledCourses.value.filter(c => (c.course?.progress || 0) === 100).length
    } catch (err) {
        console.error('Failed to load student data:', err)
    }
}

onMounted(loadData)

const aboutData = computed(() => {
    const { t } = useI18n()
    return [
        { title: t('active_courses'), value: stats.value.active_courses, icon: 'bi bi-journal-text', theme: 'purple' },
        { title: t('completed'), value: stats.value.completed_courses, icon: 'bi bi-check-circle', theme: 'green' },
        { title: t('certificates'), value: stats.value.certificates, icon: 'bi bi-award', theme: 'orange' }
    ]
})

// Protège la route — seul un utilisateur connecté peut accéder
definePageMeta({
    middleware: ['auth'],
});
</script>