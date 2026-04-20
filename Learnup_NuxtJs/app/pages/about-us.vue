<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <section>
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="xol-xxl-7 col-xl-8 col-lg-10 col-md-12">
                    
                    <div class="text-center d-block mb-4">
                        <h1 class="display-2 fw-semibold page-title">{{ $t('hi_were') }} <span class="text-main">LearnUp</span></h1>
                        <p class="fs-5">{{ $t('about_intro') }}</p>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-center gap-3">
                        <a href="#" class="btn btn-main rounded-pill px-4">{{ $t('get_enrolled') }}</a>
                        <a href="#" class="btn btn-gray rounded-pill px-4">{{ $t('join_learnup') }}</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <section class="bg-cover" :style="aboutBgStyle">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="xol-xxl-12 col-xl-12 col-lg-12 col-md-12">
                    
                    <div class="ht-300"></div>
                    
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            
            <div class="row align-items-center">
            
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="benifit-oflearning">
                        <div class="d-block mb-4">
                            <h2>{{ $t('benefit_online_learning') }}</h2>
                            <p>{{ $t('benefit_intro') }}</p>
                        </div>
                        
                        <div class="benifit-wraps mb-4">
                            <div class="d-flex flex-column gap-4">
                                
                                <div class="d-flex align-items-center justify-content-start gap-3">
                                    <div class="icons"><span class="square--50 circle bg-light-green fs-5"><i class="bi bi-patch-check-fill text-green"></i></span></div>
                                    <div class="caps">
                                        <h5>{{ $t('wide_range_courses') }}</h5>
                                        <p class="text-muted-2 m-0">{{ $t('wide_range_courses_desc') }}</p>
                                    </div>
                                </div>
                                
                                <div class="d-flex align-items-center justify-content-start gap-3">
                                    <div class="icons"><span class="square--50 circle bg-light-green fs-5"><i class="bi bi-patch-check-fill text-green"></i></span></div>
                                    <div class="caps">
                                        <h5>{{ $t('cost_effective') }}</h5>
                                        <p class="text-muted-2 m-0">{{ $t('cost_effective_desc') }}</p>
                                    </div>
                                </div>
                                
                                <div class="d-flex align-items-center justify-content-start gap-3">
                                    <div class="icons"><span class="square--50 circle bg-light-green fs-5"><i class="bi bi-patch-check-fill text-green"></i></span></div>
                                    <div class="caps">
                                        <h5>{{ $t('global_networking') }}</h5>
                                        <p class="text-muted-2 m-0">{{ $t('global_networking_desc') }}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <a href="#" class="btn btn-main rounded-pill px-5">{{ $t('create_account') }}</a>
                    </div>
                    
                </div>
                
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="facts-img">
                        <img :src="hero3" class="img-fluid" alt="" />
                    </div>
                </div>
            </div>
            
        </div>
    </section>

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('meet_expert_team') }}</h2>
                        <p>{{ $t('expert_team_sub') }}</p>
                    </div>
                </div>
            </div>
            
            <TeamOne />
            
        </div>
    </section>

    <section :style="testimonialBgStyle">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('student_reviews') }}</h2>
                        <p>{{ $t('student_reviews_sub') }}</p>
                    </div>
                </div>
            </div>
            
            <ReviewTwo />
            
        </div>
    </section>

    <FooterTop />
    <Footer />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import TeamOne from '@/components/Pages/about-us/TeamOne.vue';
import ReviewTwo from '@/components/Home/new-home-2/ReviewTwo.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { computed } from 'vue'

import hero3 from "@/assets/img/hero-img-3.png";

/* Banner Background */
import aboutBg from '@/assets/img/about-bg.jpg'
import testimonial from '@/assets/img/testimonial.png'

const aboutBgStyle = computed(() => ({
    background: `url(${aboutBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

const testimonialBgStyle = computed(() => ({
    background: `url(${testimonial})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>