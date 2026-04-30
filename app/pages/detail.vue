<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <div class="ed_detail_head">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 col-md-5">
                    
                    <div class="courses-video">
                        <div class="thumb">
                            <img class="pro_img img-fluid w100" :src="courses5" alt="7.jpg">
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
                
                <div class="col-lg-8 col-md-7">
                    <div class="ed_detail_wrap">
                        <div class="course-type d-flex align-items-center gap-2 mb-1">
                            <span class="badge bg-light-green text-green rounded-pill">{{ $t('beginner', 'Beginner') }}</span>
                            <span class="badge bg-light-red text-red rounded-pill"><i class="bi bi-tags me-1"></i>Pro</span>
                        </div>
                        <div class="ed_header_caption">
                            <h2 class="ed_title">Ruby on Rails Program</h2>
                            <ul>
                                <li><i class="bi bi-calendar-check"></i>10 - 20 {{ $t('weeks', 'weeks') }}</li>
                                <li><i class="bi bi-camera-video"></i>102 {{ $t('lectures') }}</li>
                                <li><i class="bi bi-people"></i>502 {{ $t('students_enrolled', 'Student Enrolled') }}</li>
                            </ul>
                        </div>
                        <div class="ed_header_short">
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore. veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                        
                        <div class="ed_rate_info">
                            <div class="d-flex align-items-center justify-content-start gap-2">
                                <div class="star_info text-md d-flex align-items-center gap-1">
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                    <i class="fas fa-star text-warning"></i>
                                </div>
                                <div class="review_counter d-flex align-items-center gap-1">
                                    <strong class="high fw-bold text-dark">4.9</strong><span class="text-mid text-muted">(2.24k {{ $t('reviews') }})</span>
                                </div>
                            
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-xl-8 col-lg-8 col-md-12 pe-xl-4">
                    
                    <CoursesOverview />
                    
                    <Circullum />
                    
                    <DetailRating />
                    
                    <CourseDetail />
                    
                    <CourseRating />
                    
                    <ReviewForm />
                    
                </div>
                
                <!-- Sidebar -->
                <div class="col-xl-4 col-lg-4 col-md-12 pe-xl-5">
                
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

import courses5 from "@/assets/img/courses-5.jpg";

</script>