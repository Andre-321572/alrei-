<template>

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
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">All Courses</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">{{ $t('my_enrolled_courses') }}</h4></div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div v-if="loading" class="text-center py-5">
                                <div class="spinner-border text-main" role="status"></div>
                            </div>
                            <div v-else-if="enrollments.length > 0" class="row g-4">
                                <div 
                                    class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                                    v-for="enrollment in enrollments" 
                                    :key="enrollment.id"
                                >
                                    <div class="education_block_grid border course-card-premium rounded-4 overflow-hidden">
                                        <div class="education-thumb position-relative">
                                            <NuxtLink :to="`/course-detail/${enrollment.course.slug}`">
                                                <img :src="enrollment.course.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid course-thumb-img" alt="">
                                            </NuxtLink>
                                        </div>
                                        
                                        <div class="education-body p-3">
                                            <div class="education-title">
                                                <h4 class="fs-6 fw-semibold lh-sm"><NuxtLink :to="`/course-detail/${enrollment.course.slug}`">{{enrollment.course.title}}</NuxtLink></h4>
                                            </div>
                                            <div class="course-instructor small text-muted mt-2">
                                                By <span class="fw-medium text-dark">{{ enrollment.course.instructor?.user?.name }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="education-footer border-top p-3 mt-auto">
                                            <NuxtLink :to="{ path: '/student-course-resume', query: { id: enrollment.course.id } }" class="btn btn-md btn-main rounded-pill w-100">
                                                {{ $t('continue_learning') }}<i class="bi bi-arrow-right ms-2"></i>
                                            </NuxtLink>
                                        </div>
                                    </div>	
                                </div>
                            </div>
                            <div v-else class="text-center py-5 bg-white rounded-3 shadow-sm">
                                <p class="text-muted">{{ $t('no_courses_enrolled') }}</p>
                                <NuxtLink to="/student-all-courses" class="btn btn-outline-main mt-2">{{ $t('browse_catalog') }}</NuxtLink>
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

</template>

<script setup>
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';

// Protège la route
definePageMeta({
    layout: 'student',
    middleware: ['auth'],
});

const api = useApi()
const enrollments = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await api('/my-courses')
        enrollments.value = response.data
    } catch (error) {
        console.error('Failed to fetch enrollments:', error)
    } finally {
        loading.value = false
    }
})

</script>

<style scoped>
.course-card-premium {
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  border-color: #e8ecf0 !important;
}
.course-card-premium:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.14);
}
.course-thumb-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}
</style>