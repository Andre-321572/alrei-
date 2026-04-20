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
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Wishlist</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                    
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">Wishlist Courses</h4></div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="row g-3">
                                    
                                <div 
                                    class="col-xl-4 col-lg-4 col-md-6"
                                    v-for="(item, index) in coursesData.slice(0, 6)"
                                    :key="index"
                                >
                                    <div class="education_block_grid border">
                                    
                                        <div class="education-thumb position-relative">
                                            <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                            <div class="course-hours position-absolute top-0 start-0 ms-2 mt-2">
                                                <span class="badge bg-dark rounded-pill"><i class="bi bi-clock-history me-1"></i>{{item.time}}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="education-body p-3">
                                            <div class="education-title">
                                                <div class="course-type d-flex align-items-center gap-2 mb-1">
                                                    <span class="badge bg-light-green text-green rounded-pill">Beginner</span>
                                                    <span class="badge bg-light-red text-red rounded-pill">Pro</span>
                                                </div>
                                                <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`" class="text-dark">{{item.title}}</NuxtLink></h4>
                                            </div>
                                            
                                            <div class="courses-ratings mb-4">
                                                <div class="d-flex align-items-center gap-1">
                                                    <div class="stars d-flex align-items-center gap-1">
                                                        <i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i>
                                                    </div>
                                                    <span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span>
                                                </div>
                                            </div>
                                            
                                            <div class="education_block_author">
                                                <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                                    <span class="square--40"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                                    <div class="d-flex align-items-start flex-column">
                                                        <span class="text-dark fw-light opacity-75">Lectures By:</span><span class="text-dark fw-semibold">{{item.autherName}}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="education-footer p-3">
                                            <div class="corses-price">
                                                <h5 class="m-0 fw-semibold text-red"><span class="text-dark">$</span>149</h5>
                                            </div>
                                            <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
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

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { coursesData } from '@/data/data.js'

import { computed } from 'vue'

/* Banner Background */
import studentbg from '@/assets/img/student-bg.jpg'

const studentBg = computed(() => ({
    background: `url(${studentbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>