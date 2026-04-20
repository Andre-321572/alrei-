<template>

    <Preloader />
    <NavDark />

    <div class="bg-cover hero_banner home-3" :style="numBg" data-overlay="4">
        <div class="container">
            <div class="row align-items-center justify-content-between g-4">
                <div class="col-xl-6 col-lg-6 col-md-12">
                
                    <div class="hero-caption mb-2">
                        <div class="d-block mb-3">
                            <div class="d-inline-flex align-items-center justify-content-start bg-transparents rounded-pill py-1 px-2 pe-3 gap-2">
                                <div class="new label bg-green rounded-pill">20% off</div>
                                <div class="capstion">
                                    <span class="text-light">{{ $t('join_learnup') }}!</span>
                                </div>
                            </div>
                        </div>
                        <h1 class="big-header-capt text-light mb-0">{{ $t('become_instructor_title') }}</h1>
                        <p class="text-light">{{ $t('become_instructor_desc') }}</p>
                    </div>
                    
                    <div class="d-block mt-4">
                        <div class="d-flex align-items-center justify-content-start gap-3">
                            <div class="join-buttons"><a href="#" class="btn btn-dark rounded-pill">{{ $t('enrolled_today') }}</a></div>
                            <div class="join-buttons d-flex align-items-center justify-content-start gap-2">
                                <a id="play-video" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="video-play-button" href="#"><span></span></a>
                                <a href="#" id="play-video" class="fw-semibold text-light">{{ $t('how_it_works') }}</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    </div>

    <div class="partner-slider py-5 pb-0">
        <div class="container">
            <PartnerOne />
        </div>
    </div>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('best_version_yourself') }}</h2>
                        <p>{{ $t('fuel_growth') }}</p>
                    </div>
                </div>
            </div>
            
            <div class="row justify-content-center gx-xl-5 g-4">
                
                <div 
                    class="col-lg-4 col-md-4 col-sm-12"
                    v-for="(item, index) in aboutTwo"
                    :key="index"
                >
                    <div class="prc-wraps">
                        <div class="prc-icons text-center mb-3">
                            <img :src="item.image" class="img-fluid w-30" alt="Open an Account">
                        </div>
                        <div class="prc-caption text-center">
                            <h4>{{item.title}}</h4>
                            <p class="text-muted-2">{{item.desc}}</p>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    </section>

    <CounterOne />

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('student_reviews') }}</h2>
                        <p>{{ $t('student_reviews_sub') }}</p>
                    </div>
                </div>
            </div>
            <Review />
        </div>
    </section>

    <section class="pb-0">
        <div class="container">
            <AboutFour />
        </div>
    </section>

    <section>
        <div class="container">
            <AboutFive />
        </div>
    </section>

    <CtaThree />

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('insights_updates') }}</h2>
                        <p>{{ $t('insights_updates_sub') }}</p>
                    </div>
                </div>
            </div>
            <BlogOne />
        </div>
    </section>

    <FooterTop />
    <FooterDark />
    <ScrollToTop />


    <!-- Modal -->
    <div 
        class="modal fade" 
        id="staticBackdrop" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true"
        ref="modalRef"
    >
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button 
                        type="button" 
                        class="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body p-0">
                    <!-- YouTube iframe -->
                    <iframe 
                        src="https://www.youtube.com/embed/S_CGed6E610" 
                        width="100%" 
                        height="450px" 
                        style="margin-bottom: 0; display: block;"
                        frameborder="0"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import PartnerOne from '@/components/Home/home-4/PartnerOne.vue';
import CounterOne from '@/components/CounterOne.vue';
import Review from '@/components/Home/index/Review.vue';
import AboutFour from '@/components/Home/home-8/AboutFour.vue';
import AboutFive from '@/components/Home/home-8/AboutFive.vue';
import CtaThree from '@/components/Home/home-7/CtaThree.vue';
import BlogOne from '@/components/Home/index/BlogOne.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { computed } from 'vue'

import { aboutTwo } from '@/data/data.js'

/* Banner Background */
import numbg from '@/assets/img/19664.jpg'

const numBg = computed(() => ({
    background: `url(${numbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>