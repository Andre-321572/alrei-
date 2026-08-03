<template>
    
    <Preloader />
    <NavDark />

    <div class="image-cover hero_banner shadow rlt bg-light-2" :style="bgNewStyle" data-overlay="7">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-8 col-lg-10 col-md-10 col-sm-12">
                    <div class="new_captio transparent">
                        <h1 class="big-header-capt text-light mb-2 f_2">A Good Education Is a Foundation for Better Future</h1>
                        <p class="text-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
                        <div class="mt-4 mb-2">
                            <a class="btn btn-main rounded-pill px-md-5 px-4" href="">Get Started</a>
                            <a href="#" class="btn btn-video" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span class=""><i class="fa fa-play"></i></span>Watch Our Video</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="live_video_craps">
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-10 col-md-10 col-sm-12">
                    <div class="_live_video_bx">
                        <div class="_live_vd_thumb">
                            <img :src="video" class="img-fluid" alt="" />
                            <div class="_live_vd_caption">
                                <div class="_lvc_staus"><span class="crlc"></span><strong>Live</strong>04:32:22</div>
                                <div class="_lvc_navigation">
                                    <ul>
                                        <li><a href="javascript:void(0);"><i class="fa fa-microphone"></i></a></li>
                                        <li><a href="javascript:void(0);"><i class="fa fa-video"></i></a></li>
                                        <li><a href="javascript:void(0);" class="active"><i class="fa fa-phone"></i></a></li>
                                        <li><a href="javascript:void(0);"><i class="fa fa-volume-up"></i></a></li>
                                        <li><a href="javascript:void(0);"><i class="fa fa-user-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PartnerOne />
                </div>
            </div>
        </div>
    </div>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Work & Process</h2>
                        <p>Working Process for Join And Benifits</p>
                    </div>
                </div>
            </div>
            <WorkProcessTwo />
        </div>
    </section>

    <section class="border-top">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Explore Our Courses</h2>
                        <p>Learn from Industry Experts and Advance Your Career with Practical Skills</p>
                    </div>
                </div>
            </div>
            <CoursesTab />
        </div>
    </section>

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Discover Categories</h2>
                        <p>Browse a Wide Range of Subjects to Start Learning What You Love</p>
                    </div>
                </div>
            </div>
            <CategoryOne />
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

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Hear from Our Students</h2>
                        <p>Discover What Learners Around the World Are Saying About Our Courses</p>
                    </div>
                </div>
            </div>
            <Review />
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-8 col-sm-12">
                    <div class="sec-heading center">
                        <p>FAQ's</p>
                        <h2>Frequently asked questions</h2>
                    </div>
                </div>
            </div>
            <FaqTwo />
        </div>
    </section>

    <FooterTop />
    <Footer />
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
import WorkProcessTwo from '@/components/Home/new-home-1/WorkProcessTwo.vue';
import CoursesTab from '@/components/Home/home-4/CoursesTab.vue';
import CategoryOne from '@/components/Home/index/CategoryOne.vue';
import AboutFour from '@/components/Home/home-8/AboutFour.vue';
import AboutFive from '@/components/Home/home-8/AboutFive.vue';
import Review from '@/components/Home/index/Review.vue';
import FaqTwo from '@/components/Home/home-9/FaqTwo.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';


import video from '@/assets/img/video.jpg'

import bgNew from '@/assets/img/bg-new.jpg'

import { computed } from 'vue'

const bgNewStyle = computed(() => ({
    backgroundImage: `url(${bgNew})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>