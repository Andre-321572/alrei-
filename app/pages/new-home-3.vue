<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <div class="hero_banner py-5">
        <div class="container">
            <div class="row align-items-center g-4">
            
                <div class="col-xl-6 col-lg-6 col-md-12">
                
                    <div class="hero-caption mb-2">
                        <div class="d-block mb-3">
                            <div class="d-inline-flex align-items-center justify-content-start bg-light-red rounded-pill border py-1 px-2 pe-3 gap-2">
                                <div class="new label bg-red rounded-pill">Buum</div>
                                <div class="capstion">
                                    <span class="text-red">20% off till 15 Dec 2027</span>
                                </div>
                            </div>
                        </div>
                        <h1 class="big-header-capt fw-bold text-dark mb-0">Getting Best Quality Education is Now More Easier</h1>
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
                            <a href="#" class="btn btn-warning px-4">Join For Free</a>
                            <a href="#" class="btn btn-outline-dark ">Browse Our Courses</a>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-xl-6 col-lg-6 col-md-12">
                    <div class="hero-image position-relative ps-xl-5">
                        <div class="position-absolute bottom-25 start-0 ms-n8 end-0 d-flex flex-column align-items-start">
                            <div class="bg-white rounded-pill py-2 px-3 shadow-sm mb-2 d-inline-block animate-leftright">
                                <span class="text-green me-1"><i class="bi bi-book-half"></i></span>
                                <span class="text-dark fw-medium">200+ Programes</span>
                            </div>
                            <div class="bg-white rounded-pill py-2 px-3 shadow-sm mb-2 d-inline-block animate-leftright">
                                <span class="text-info me-1"><i class="bi bi-people"></i></span>
                                <span class="text-dark fw-medium">80+ Expert Instructors</span>
                            </div>
                            <div class="bg-white rounded-pill py-2 px-3 shadow-sm mb-2 d-inline-block animate-leftright">
                                <span class="text-red me-1"><i class="bi bi-shield-fill-check"></i></span>
                                <span class="text-dark fw-medium">Certified Learning</span>
                            </div>
                        </div>
                        
                        <img :src="heroImg" class="img-fluid">
                        
                        <div class="bg-white rounded-4 p-3 pe-4 position-absolute end-0 bottom-0 shadow-sm animate-bounce">
                            <div class="text-dark fw-bold fs-4 m-0">75k+</div>
                            <div class="text-gray-500">Students Enrolled with us</div>
                            <div class="avatar-group mt-3">

                                <span
                                    class="avatar-single"
                                    v-for="(item, index) in images"
                                    :key="index"
                                >
                                    <img alt="avatar" :src="item" class="img-fluid border thumb-sm circle">
                                </span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <Trips />

    <section>
        <div class="container">
            <AboutFive />
        </div>
    </section>

    <section class="pt-0">
        <div class="container">
            <FaqThree />
        </div>
    </section>

    <section class="bg-light-main">
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
            <CategoryTwo />
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
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>Get Membership</h2>
                        <p>Connect with Experienced Professionals Who Are Passionate About Teaching</p>
                    </div>
                </div>
            </div>
            <PricingOne />
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
import Trips from '@/components/Home/home-2/Trips.vue';
import AboutFive from '@/components/Home/home-8/AboutFive.vue';
import FaqThree from '@/components/Home/home-10/FaqThree.vue';
import InstructorsTwo from '@/components/Home/home-10/InstructorsTwo.vue';
import CategoryTwo from '@/components/Home/home-4/CategoryTwo.vue';
import Review from '@/components/Home/index/Review.vue';
import PricingOne from '@/components/Home/home-4/PricingOne.vue';
import CtaThree from '@/components/Home/home-7/CtaThree.vue';
import BlogOne from '@/components/Home/index/BlogOne.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';


import heroImg from "@/assets/img/hero-img-5.png"

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