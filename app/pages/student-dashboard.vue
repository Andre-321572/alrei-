<template>

    <Preloader />
    <StudentNavbar />

    <section class="bg-cover p-0" :style="studentBg" data-overlay="4">
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
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">Mes cours en direct</h4></div>
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
                                <p class="text-muted mb-0">Aucune classe en direct prévue pour le moment.</p>
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
                                            <NuxtLink to="/student-course-resume" class="btn btn-md btn-outline-gray border-2 rounded-pill w-100">{{ $t('course_resume') }}<i class="bi bi-arrow-right ms-2"></i></NuxtLink>
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
const liveClasses = ref([])

onMounted(async () => {
    liveClasses.value = await fetchLiveClasses()
})

// Protège la route — seul un utilisateur connecté peut accéder
definePageMeta({
    middleware: ['auth'],
});

/* Banner Background */
import studentbg from '@/assets/img/student-bg.jpg'

const studentBg = computed(() => ({
    background: `url(${studentbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))
</script>