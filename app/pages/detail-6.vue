<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <section class="pt-5">
        <div class="container">
            
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb simple">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Course</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Laravel introduction for beginners</li>
                        </ol>
                    </nav>
                </div>
            </div>
            
            <div class="row">
            
                <div class="col-xl-8 col-lg-8 col-md-12 pe-xl-5">
                
                    <div class="inline_edu_wraps mb-4">
                        <div class="course-type d-flex align-items-center gap-2 mb-1">
                            <span class="badge bg-light-green text-green rounded-pill">Beginner</span>
                            <span class="badge bg-light-red text-red rounded-pill"><i class="bi bi-tags me-1"></i>Pro</span>
                        </div>
                        <h2>Programming with Advance Laravel: HandsOn Introduction for beginners</h2>
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
                                    <strong class="high fw-bold text-dark">4.9</strong><span class="text-mid ">(2.24k Reviews)</span>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    
                    <div class="inline_edu_wrap">
                        <div class="inline_edu_first">
                            <div class="instructor_dark_info">
                                <ul>
                                    <li>
                                        <span>Last Update</span>
                                        10 Jan 2027
                                    </li>
                                    <li>
                                        <span>Level</span>
                                        Basic
                                    </li>
                                    <li>
                                        <span>Students</span>
                                        742,614
                                    </li>
                                    <li>
                                        <span>Language</span>
                                        Hindi
                                    </li>
                                </ul>
                            </div>
                        </div>	
                        <div class="inline_edu_last">
                            <a href="#" class="btn btn-outline-gray border-2 rounded-pill px-4"><i class="bi bi-suit-heart me-2"></i>Wishlist</a>
                        </div>
                    </div>
                    
                    <div class="courses-video xl mb-4">
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
                        
                    </div>
                    
                    <CoursesOverview />
                    
                    <Circullum />
                    
                    <DetailRating />
                    
                    <CourseDetail />
                    
                    <CourseRating />
                    
                    <ReviewForm />
                    
                </div>
                
                <div class="col-xl-4 col-lg-4 col-md-12">
                
                    <DetailSidebarFive />
                    
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
import DetailSidebarFive from '@/components/Courses/courses-detail/DetailSidebarFive.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import videoBg from '@/assets/img/video-bg.jpg'

</script>