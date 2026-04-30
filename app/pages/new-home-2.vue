<template>

    <Preloader />
    <NavDark />

    <div class="hero_banner bg-light home-11 position-relative">
        <div class="container">
            <div class="row align-items-center justify-content-between g-4">
                <div class="col-xl-6 col-lg-6 col-md-12">
                
                    <div class="hero-caption mb-2">
                        <div class="mb-3 d-flex gap-3 align-items-center">
                            <div class="avatar-group">

                                <span
                                    class="avatar-single"
                                    v-for="(item, index) in images"
                                    :key="index"
                                >
                                    <img alt="avatar" :src="item" class="img-fluid border thumb-sm circle">
                                </span>
                                
                            </div>
                            <div class="reviews-caption">
                                <div class="d-flex align-items-center gap-2 fs-5 lh-0">
                                <div class="text-dark fw-semibold">4.9</div>
                                <div class="reviews-star">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                    </svg>
                                </div>
                                </div>
                                <div>Engaged Students</div>
                            </div>
                            </div>
                        <h1 class="big-header-capt fw-bold text-dark mb-0">The #1 Place to Learn, Grow, and Succeed</h1>
                        <p>Real-world projects and certifications to take your learning further with LearnUp Learning Platform.</p>
                    </div>
                    
                    <div class="top-features my-4">
                        <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
                            <li class="d-flex flex-row gap-2">
                                <span><i class="bi bi-patch-check-fill text-green"></i></span>
                                <span>World's Top Instructors</span>
                            </li>
                            <li class="d-flex flex-row gap-2">
                                <span><i class="bi bi-patch-check-fill text-green"></i></span>
                                <span>Skill-Based Training</span>
                            </li>
                            <li class="d-flex flex-row gap-2">
                                <span><i class="bi bi-patch-check-fill text-green"></i></span>
                                <span>Future-Proof Your Career</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="d-block mt-2">
                        <div class="d-flex align-items-center justify-content-start gap-3">
                            <a href="#" class="btn btn-main px-4">Join For Free</a>
                            <a href="#" class="btn btn-outline-dark ">Browse Our Courses</a>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-xl-5 col-lg-6 col-md-12">
                    <div class="hero-image d-block d-lg-none">
                        <img :src="men" class="img-fluid" width="" alt="Image">
                    </div>
                </div>
                
            </div>
            
        </div>
        <div class="position-absolute end-0 bottom-0 me-5 d-lg-block d-none"><img :src="studentLady" class="img-fluid" width="470" alt="Image"></div>
    </div>

    <div class="brands_up">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="brands-sliders large op-1 shadow_upper">
                        <PartnerOne />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="border-bottom">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Meet Our Instructors</h2>
                        <p>Connect with Experienced Professionals Who Are Passionate About Teaching</p>
                    </div>
                </div>
            </div>
            <InstructorsTwo />
        </div>
    </section>

    <section>
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

    <section class="bg-light-main">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Explore Our Courses</h2>
                        <p>Learn from Industry Experts and Advance Your Career with Practical Skills</p>
                    </div>
                </div>
            </div>
            <ProCourses />
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Hear from Our Students</h2>
                        <p>Discover What Learners Around the World Are Saying About Our Courses</p>
                    </div>
                </div>
            </div>
            <ReviewTwo />
        </div>
    </section>

    <CtaThree />

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Insights & Updates</h2>
                        <p>Stay Informed with the Latest News, Tips, and Trends in Online Learning</p>
                    </div>
                </div>
            </div>
            <BlogOne />
        </div>
    </section>

    <FooterTop />
    <FooterDark />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import PartnerOne from '@/components/Home/home-4/PartnerOne.vue';
import InstructorsTwo from '@/components/Home/home-10/InstructorsTwo.vue';
import CategoryOne from '@/components/Home/index/CategoryOne.vue';
import ProCourses from '@/components/Home/new-home-2/ProCourses.vue';
import ReviewTwo from '@/components/Home/new-home-2/ReviewTwo.vue';
import CtaThree from '@/components/Home/home-7/CtaThree.vue';
import BlogOne from '@/components/Home/index/BlogOne.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';


import men from "@/assets/img/men.png";
import studentLady from "@/assets/img/student-lady.png";

/* Avatar Images */
import avatar1 from "@/assets/img/avatar-1.jpg";
import avatar2 from "@/assets/img/avatar-2.jpg";
import avatar3 from "@/assets/img/avatar-3.jpg";
import avatar4 from "@/assets/img/avatar-4.jpg";
import avatar5 from "@/assets/img/avatar-5.jpg";

const images = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5
]

</script>