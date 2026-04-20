<template>

    <Preloader />
    <NavDark />

    <div class="image-cover ed_detail_head lg theme-ov" :style="backgroundStyle" data-overlay="7">
        <div class="container">
            <div class="row">
                
                <div class="col-xl-7 col-lg-7 col-md-10">
                    <div class="ed_detail_wrap light">
                        <div class="course-type d-flex align-items-center gap-2 mb-1">
                            <span class="badge bg-green rounded-pill">Beginner</span>
                            <span class="badge bg-red rounded-pill"><i class="bi bi-tags me-1"></i>Pro</span>
                        </div>
                        <div class="ed_header_caption">
                            <h2 class="ed_title">Advance Web Designing Courses</h2>
                            <ul>
                                <li><i class="bi bi-calendar-check"></i>10 - 20 weeks</li>
                                <li><i class="bi bi-calendar-check"></i>102 Lectures</li>
                                <li><i class="bi bi-people"></i>502 Student Enrolled</li>
                            </ul>
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
                                    <strong class="high fw-bold text-light">4.9</strong><span class="text-mid text-light">(2.24k Reviews)</span>
                                </div>
                            
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="bg-light pt-0">
        <div class="container">
            <div class="row">
            
                <div class="col-xl-8 col-lg-8 col-md-12 pe-xl-5 pt-5">
                
                    <div class="inline_edu_wrap">
                        <div class="inline_edu_first">
                            <h4>Become a Web Designer & Make More Money</h4>
                            <ul class="edu_inline_info">
                                <li><i class="ti-calendar"></i>10 weeks</li>
                                <li><i class="bi bi-camera-video"></i>102 Lectures</li>
                                <li><i class="ti-user"></i>42k Student Enrolled</li>
                            </ul>
                        </div>	
                        <div class="inline_edu_last">
                            <h4 class="edu_price">$49.00</h4><a href="#" class="btn btn-main enroll-btn">Buy Now<i class="ti-angle-right"></i></a>
                        </div>
                    </div>
                    
                    <div class="courses-video xl">
                        <div class="thumb">
                            <img class="pro_img img-fluid w100" :src="videoBg" alt="7.jpg">
                            <div class="overlay_icon">
                                <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bb-video-box">
                                    <a href="#" class="play-popup-video">
                                        <i class="bi bi-play-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="instructor_over_info">
                            <ul>
                                <li>
                                    <div class="ins_info">
                                        <div class="ins_info_thumb">
                                            <img :src="avatar6" class="img-fluid" alt="" />
                                        </div>
                                        <div class="ins_info_caption">
                                            <span>Teacher</span>
                                            <h4>Jessica West</h4>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <span>Category</span>
                                    Software
                                </li>
                                <li>
                                    <span>Reviews</span>
                                    <div class="eds_rate">
                                        4.2
                                        <div class="eds_rating">
                                            <i class="fas fa-star filled"></i>
                                            <i class="fas fa-star filled"></i>
                                            <i class="fas fa-star filled"></i>
                                            <i class="fas fa-star filled"></i>
                                            <i class="fas fa-star"></i>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    
                    <!-- All Info Show in Tab -->
                    <div class="tab_box_info mt-4">
                        <ul class="nav nav-pills mb-3 light" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="overview-tab" data-bs-toggle="pill" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Overview</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="curriculum-tab" data-bs-toggle="pill" href="#curriculum" role="tab" aria-controls="curriculum" aria-selected="false">Curriculum</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="instructor-tab" data-bs-toggle="pill" href="#instructor" role="tab" aria-controls="instructor" aria-selected="false">Instructor</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="reviews-tab" data-bs-toggle="pill" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a>
                            </li>
                        </ul>
                    
                        <div class="tab-content" id="pills-tabContent">
                            
                            <!-- Overview Detail -->
                            <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                <CoursesOverview />
                            </div>
                            
                            <!-- Curriculum Detail -->
                            <div class="tab-pane fade" id="curriculum" role="tabpanel" aria-labelledby="curriculum-tab">
                                <Circullum />
                            </div>
                            
                            <!-- Instructor Detail -->
                            <div class="tab-pane fade" id="instructor" role="tabpanel" aria-labelledby="instructor-tab">
                                <CourseDetail />
                            </div>
                            
                            <!-- Reviews Detail -->
                            <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                
                                <DetailRating />
                    
                                <CourseRating />
                                
                                <ReviewForm />
                    
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-xl-4 col-lg-4 col-md-12">
                
                    <DetailSidebarFour />
                    
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
import CourseDetail from '@/components/Courses/courses-detail/CourseDetail.vue';
import DetailRating from '@/components/Courses/courses-detail/DetailRating.vue';
import CourseRating from '@/components/Courses/courses-detail/CourseRating.vue';
import ReviewForm from '@/components/Courses/courses-detail/ReviewForm.vue';
import DetailSidebarFour from '@/components/Courses/courses-detail/DetailSidebarFour.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { computed } from 'vue'

import videoBg from '@/assets/img/video-bg.jpg'
import avatar6 from "@/assets/img/avatar-6.jpg";

import defaultBg from '@/assets/img/detail-bg.jpg'

const backgroundStyle = computed(() => ({
    background: `#f4f4f4 url(${defaultBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
}))

</script>