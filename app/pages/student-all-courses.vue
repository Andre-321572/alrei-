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
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">All Courses</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-4">
                    
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">Complete Courses</h4></div>
                                <div class="view-all"><a href="#" class="btns text-muted mb-0">View All</a></div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="dash-course-slide" id="dash-course-slide">
                                    
                                <div ref="slider" class="tiny-slider">
                                    <div
                                        class="singles_items mb-1"
                                        v-for="(item, index) in coursesData" 
                                        :key="index"
                                    >
                                        <div class="education_block_grid border">
                                        
                                            <div class="education-thumb position-relative">
                                                <NuxtLink to="/course-detail"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                                <div class="course-hours position-absolute top-0 start-0 ms-3 mt-3">
                                                    <span class="badge bg-dark rounded-pill"><i class="bi bi-clock-history me-1"></i>{{item.time}}</span>
                                                </div>
                                            </div>
                                            
                                            <div class="education-body p-3">
                                                <div class="education-title">
                                                    <h4 class="fs-6 fw-medium"><NuxtLink to="/course-detail">{{item.name}}</NuxtLink></h4>
                                                </div>
                                                
                                                <div class="progress-info mt-3">
                                                    <div class="d-flex align-items-center justify-content-between">
                                                        <h6 class="text-mid fw-normal">{{item.lesson}}</h6>
                                                        <h6 class="fw-semibold">{{item.progress}}</h6>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div 
                                                            class="progress w-100" 
                                                            role="progressbar" 
                                                            :aria-valuenow="item.progress === '100%' ? 100 : parseInt(item.progress)" 
                                                            aria-valuemin="0" 
                                                            aria-valuemax="100"
                                                            style="height: 8px;"
                                                        >
                                                            <div 
                                                                class="progress-bar progress-bar-striped" 
                                                                :class="item.progress === '100%' ? 'bg-success' : 'bg-warning'" 
                                                                :style="{ width: item.progress }"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="education-footer border-0 p-3 pt-2">
                                                <NuxtLink to="/student-course-resume" class="btn btn-md btn-outline-gray border-2 rounded-pill w-100">Course Resume<i class="bi bi-arrow-right ms-2"></i></NuxtLink>
                                            </div>
                                        </div>	
                                    </div>
                                </div>
                                
                            </div>
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
                            <div v-else-if="enrollments.length > 0" class="row g-3">
                                <div 
                                    class="col-xl-4 col-lg-4 col-md-6"
                                    v-for="enrollment in enrollments" 
                                    :key="enrollment.id"
                                >
                                    <div class="education_block_grid border">
                                        <div class="education-thumb position-relative">
                                            <NuxtLink :to="`/course-detail/${enrollment.course.slug}`">
                                                <img :src="enrollment.course.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid" alt="">
                                            </NuxtLink>
                                        </div>
                                        
                                        <div class="education-body p-3">
                                            <div class="education-title">
                                                <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${enrollment.course.slug}`">{{enrollment.course.title}}</NuxtLink></h4>
                                            </div>
                                            <div class="course-instructor small text-muted">
                                                By {{ enrollment.course.instructor?.user?.name }}
                                            </div>
                                        </div>
                                        
                                        <div class="education-footer border-0 p-3 pt-2">
                                            <NuxtLink :to="`/student-course-resume/${enrollment.course.slug}`" class="btn btn-md btn-main rounded-pill w-100">
                                                {{ $t('continue_learning') }}<i class="bi bi-arrow-right ms-2"></i>
                                            </NuxtLink>
                                        </div>
                                    </div>	
                                </div>
                            </div>
                            <div v-else class="text-center py-5 bg-white rounded-3 shadow-sm">
                                <p class="text-muted">{{ $t('no_courses_enrolled') }}</p>
                                <NuxtLink to="/grid-with-sidebar" class="btn btn-outline-main mt-2">{{ $t('browse_catalog') }}</NuxtLink>
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
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

// Protège la route
definePageMeta({
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