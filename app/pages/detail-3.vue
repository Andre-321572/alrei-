<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <div class="ed_detail_head lg bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                    
                    <div class="courses-video lg">
                        <div class="thumb">
                            <img class="pro_img img-fluid w100" :src="bgNew" alt="7.jpg">
                            <div class="overlay_icon">
                                <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bb-video-box">
                                    <a href="#" class="play-popup-video">
                                        <i class="bi bi-play-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-lg-6 col-md-6">
                    <div class="ed_detail_wrap">
                        <ul class="list_ed_detail2">
                            <li class="tag-2"><i class="ti-calendar"></i><strong>Duration:</strong>10 - 25 Weeks</li>
                            <li class="tag-1"><i class="ti-user"></i><strong>Enrolled:</strong>712 Students</li>
                            <li class="tag-3"><i class="ti-book"></i><strong>Lectures:</strong>602 Lectures</li>
                            <li class="tag-4"><i class="ti-video-camera"></i><strong>Videos:</strong>402 Videos</li>
                            <li class="tag-5"><i class="ti-tag"></i><strong>Level:</strong>Advance</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section>
        <div class="container">
            <div class="row">
            
                <div class="col-xl-8 col-lg-8 col-md-12 pe-xl-5">
                    
                    <CoursesOverview />
                    
                    <Circullum />
                    
                    <DetailRating />
                    
                    <CourseDetail />
                    
                    <CourseRating />
                    
                    <ReviewForm />
                    
                </div>
                
                <!-- Sidebar -->
                <div class="col-xl-4 col-lg-4 col-md-12">
                
                    <DetailSidebar />
                    
                </div>
            
            </div>
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
import CoursesOverview from '@/components/Courses/courses-detail/CoursesOverview.vue';
import Circullum from '@/components/Courses/courses-detail/Circullum.vue';
import DetailRating from '@/components/Courses/courses-detail/DetailRating.vue';
import CourseDetail from '@/components/Courses/courses-detail/CourseDetail.vue';
import CourseRating from '@/components/Courses/courses-detail/CourseRating.vue';
import ReviewForm from '@/components/Courses/courses-detail/ReviewForm.vue';
import DetailSidebar from '@/components/Courses/courses-detail/DetailSidebar.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import bgNew from '@/assets/img/bg-new.jpg'

</script>