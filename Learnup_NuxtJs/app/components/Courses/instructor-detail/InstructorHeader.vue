<template>
    <section class="bg-light pt-4">
        <div class="container">
                                
            <div class="row gx-xl-4">
            
                <div class="col-lg-3">
                
                    <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
                        <div class="d-flex w-100">
                            <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                <i class="bi bi-ui-checks-grid me-2"></i>View Instructor
                            </a>
                        </div>
                    </div>
                    <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header d-lg-none border-bottom">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
                            
                            <div class="dashboard-navbar card p-3 pt-4 border">
                        
                                <div class="author-info-wwrap">
                                    <div class="avatar-box d-flex justify-content-center mb-2"><div class="square--120 circle shadow-sm border border-3">
                                        <img :src="imageAvatar" class="img-fluid circle" alt="Avatar">
                                    </div></div>
                                    <div class="author-caps text-center mb-3">
                                        <div class="d-flex flex-column gap-1">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <h5 class="fw-semibold m-0">
                                                    {{ instructor ? instructor.name : "Adam L. Markram" }}
                                                </h5><span class="verified text-green ms-2"><i class="bi bi-patch-check-fill"></i></span>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-center">
                                                <span class="text-muted">
                                                    {{ instructor ? instructor.roal : "Front-End Developer" }}
                                                </span>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-center gap-1">
                                                <span class="rating-star"><i class="bi bi-star-fill text-warning"></i></span>
                                                <span class="fw-semibold text-dark">4.9</span>
                                                <span class="text-muted text-mid">(2.15k Reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="viewer_header d-flex align-items-centerc justify-content-center mb-4">
                                        <ul class="badge_info">
                                            <li class="started"><i class="ti-rocket"></i></li>
                                            <li class="medium"><i class="ti-cup"></i></li>
                                            <li class="platinum"><i class="ti-thumb-up"></i></li>
                                            <li class="elite unlock"><i class="ti-medall"></i></li>
                                            <li class="power unlock"><i class="ti-crown"></i></li>
                                        </ul>
                                    </div>
                                    
                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="d-flex flex-column gap-1">
                                            <h6 class="text-dark lh-1 fw-semibold m-0">42,570</h6>
                                            <span class="text-muted-2 m-0">Students</span>
                                        </div>
                                        <div class="d-flex flex-column gap-2">
                                            <h6 class="text-dark lh-1 fw-semibold m-0">46+</h6>
                                            <span class="text-muted-2 m-0">Courses</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="skill-wraps mb-4">
                                    <h5>Skills</h5>
                                    <div class="gap-2 d-flex flex-wrap">

                                        <a 
                                            v-for="(item, index) in skill" 
                                            :key="index" 
                                            href="#" 
                                            class="badge badge-sm badge-outline rounded-pill"
                                        >
                                            {{item}}
                                        </a>
                                        
                                    </div>
                                </div>
                                
                                <div class="skill-wraps mb-4">
                                    <h5 class="mb-2">Education</h5>

                                    <div 
                                        class="d-flex align-items-center mb-3"
                                        v-for="(item, index) in educationData"
                                        :key="index"
                                    >
                                        <span class="square--40 bg-light rounded-3 text-muted"><i class="fas fa-graduation-cap"></i></span>
                                        <div class="ms-3">
                                            <h6 class="mb-0 text-dark">{{item.title}}</h6>
                                            <p class="mb-0 small">{{item.desc}}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="d-flex align-items-center flex-column gap-2">
                                        <a href="#" class="btn btn-md btn-outline-main rounded-2 w-100">Send Message</a>
                                        <a href="#" class="btn btn-md btn-main rounded-2 w-100">Book a Free Trial</a>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>							
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    <!-- Row -->
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            
                            <!-- About Info -->
                            <div class="card mb-4">
                                <div class="card-body p-4">
                                    <h4>About</h4>
                                    <p>A globally recognized designer with over 7 years of hands-on experience in UX, product design, and brand strategy. I’ve guided aspiring creatives into high-impact roles across the US, Europe, Japan, and India—empowering them to launch fulfilling careers and build a personal brand that stands out. My mission? To spark the next generation of design leaders—supercharging their creativity, securing top-tier opportunities, and amplifying their voice in the design world through unforgettable, purpose-driven projects.</p>
                                    
                                    <p>My design expertise has helped companies across the US, Europe, and Japan unlock over $150M in revenue. I specialize in Web3, artificial intelligence, and edtech—where innovation meets design with real business impact.</p>
                                </div>
                            </div>
                            
                            <!-- Skills Info -->
                            <div class="card mb-4">
                                <div class="card-body p-4">
                                    <h4>Skills</h4>
                                    <div class="gap-2 d-flex flex-wrap">

                                        <span 
                                            class="badge badge-gray rounded-pill"
                                            v-for="(item, index) in instructorsSkill"
                                            :key="index"
                                        >
                                            {{item}}
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <!-- All Courses -->
                            <div class="card mb-4">
                                <div class="card-body p-4">
                                    <h4>Courses</h4>
                                    <div class="row justify-content-center gx-3 gy-4 mb-4">
                                        
                                        <div 
                                            class="col-xl-4 col-lg-6 col-md-6" 
                                            v-for="(item, index) in coursesData.slice(0, 6)" 
                                            :key="index"
                                        >
                                            <div class="education_block_grid border">
                                            
                                                <div class="education-thumb position-relative">
                                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                                    </div>
                                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                                </div>
                                                
                                                <div class="education-body p-3">
                                                    <div class="education-title">
                                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{item.title}}</NuxtLink></h4>
                                                    </div>
                                                    
                                                    <div class="cources-info">
                                                        <ul>
                                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                <div class="education-footer p-3">
                                                    <div class="education_block_author">
                                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                                        </a>
                                                    </div>
                                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                                                </div>
                                            </div>	
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="row align-items-center justify-content-center">
                                        <div class="col-12">
                                            <div class="text-center">
                                                <button type="button" class="btn btn-md btn-light-main rounded-pill">Load More Courses</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Reviews Info -->
                            <div class="card mb-4">
                                
                                <CourseRating />

                            </div>
                            
                        </div>
                    </div>
                    <!-- /Row -->							
                </div>
            
            </div>
            
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'

const skill = ['WordPress','HTML5','Figma','Full Stack','3 More..']

import { coursesData, educationData, instructorsSkill } from '@/data/data'
import CourseRating from '../courses-detail/CourseRating.vue';

// default image path
import avatar3 from "@/assets/img/avatar-3.jpg";

const { instructor } = defineProps({ instructor: Object })

const imageAvatar = computed(() => {
  return instructor?.image || avatar3
})
</script>