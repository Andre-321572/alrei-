<template>

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
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-5">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">{{ $t('scheduled_live_classes') }}</h4></div>
                                <button @click="showCreateModal = true" class="btn btn-main btn-sm px-4 rounded-pill">
                                    <i class="bi bi-plus-circle me-1"></i> {{ $t('schedule_live') }}
                                </button>
                            </div>
                        </div>

                        <!-- Create Live Class Modal -->
                        <ExternalCreateLiveClassModal 
                            v-if="showCreateModal" 
                            :courses="instructorCourses"
                            @close="showCreateModal = false"
                            @success="onMeetingCreated"
                        />

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

                    <div class="row gy-3 mb-4">
                
                        <div 
                            class="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            v-for="(item, index) in instructorAbout" 
                            :key="index"
                        >
                            <div class="card rounded-3 border px-3 py-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div :class="`square--60 circle bg-light-${item.theme} fs-3`">
                                        <i :class="item.icon"></i>
                                    </div>
                                    <div class="d-flex flex-column gap-1">
                                        <h2 class="fw-semibold m-0">{{item.value}}</h2><span class="text-muted">{{item.title}}</span>
                                    </div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">{{ $t('recent_enrollments') }}</h4>
                                        <a href="#" class="btns text-muted mb-0">{{ $t('view_all') }}</a>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="table-responsive border-0 rounded-3">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">{{ $t('course_name') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('student') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('period') }}</th>
                                                    <th scope="col" class="border-0 rounded-end">{{ $t('action') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr
                                                    v-for="(item, index) in stats?.recent_enrollments" 
                                                    :key="index"
                                                >
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="w-15">
                                                                <img :src="item.course.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid rounded" alt="">
                                                            </div>
                                                            <h6 class="mb-0 fw-semibold ms-2 table-responsive-title">	
                                                                <a href="#">{{item.course.title}}</a>
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td><span class="text-muted-2">{{item.user.name}}</span></td>
                                                    <td>
                                                        <span class="badge bg-light-green text-green">{{ new Date(item.created_at).toLocaleDateString() }}</span>
                                                    </td>
                                                    <td>
                                                        <NuxtLink :to="`/course-detail/${item.course.slug}`" class="btn btn-sm btn-gray me-1 mb-0"><i class="bi bi-eye"></i></NuxtLink>
                                                    </td>
                                                </tr>
        
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Pagination -->
                                    <div class="d-sm-flex justify-content-sm-between align-items-sm-center mt-3">
                                        <p class="mb-0 text-center text-sm-start text-muted">{{ $t('showing_entries', { start: 1, end: 8, total: 20 }) }}</p>
                                        <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
                                            <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                                                <li class="page-item mb-0"><a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item mb-0 active"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">4</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">5</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

</template>

<script setup lang="ts">
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';

// Protège la route — seul un instructeur approuvé peut accéder
definePageMeta({
    layout: 'instructor',
    middleware: ['instructor'],
});

const api = useApi()
const stats = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const { fetchLiveClasses } = useExternal()
const liveClasses = ref([])
const instructorCourses = ref([])
const showCreateModal = ref(false)

const loadData = async () => {
    try {
        const [statsRes, liveRes, coursesRes] = await Promise.all([
            api('/instructor/dashboard'),
            fetchLiveClasses(),
            api('/instructor/courses')
        ])
        stats.value = statsRes
        liveClasses.value = liveRes
        instructorCourses.value = coursesRes.data
    } catch (err: any) {
        error.value = err?.data?.message || 'Impossible de charger les données.'
        console.error('Failed to fetch instructor data:', err)
    } finally {
        loading.value = false
    }
}

onMounted(loadData)

const onMeetingCreated = () => {
    loadData() // Recharge tout pour voir la nouvelle réunion dans la liste
}

const instructorAbout = computed(() => {
    const { t } = useI18n()
    return [
        { title: t('total_courses'),   value: stats.value?.total_courses  || 0,    icon: 'bi bi-journal-text', theme: 'purple' },
        { title: t('total_students'),  value: stats.value?.total_students || 0,    icon: 'bi bi-people',       theme: 'orange' },
        { title: t('quizzes_active'),  value: stats.value?.total_quizzes  || 0,    icon: 'bi bi-question-circle', theme: 'blue' },
        { title: t('pending_tasks'),   value: stats.value?.pending_submissions || 0, icon: 'bi bi-file-earmark-check', theme: 'danger' },
    ]
})
</script>
