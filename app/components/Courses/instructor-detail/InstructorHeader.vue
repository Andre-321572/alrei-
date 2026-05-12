<script setup>
import { computed } from 'vue'
import { educationData } from '@/data/data'
import CourseRating from '../courses-detail/CourseRating.vue';

// default image path
import avatar3 from "@/assets/img/avatar-3.jpg";

const props = defineProps({ instructor: Object })

const imageAvatar = computed(() => {
  return props.instructor?.image || avatar3
})

const getLecturesCount = (course) => {
    return course.sections?.reduce((acc, s) => acc + (s.lessons?.length || 0), 0) || 12
}
</script>

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
                                                    {{ instructor?.name || "Instructor" }}
                                                </h5><span class="verified text-green ms-2"><i class="bi bi-patch-check-fill"></i></span>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-center">
                                                <span class="text-muted">
                                                    {{ instructor?.roal || "Expert Instructor" }}
                                                </span>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-center gap-1">
                                                <span class="rating-star"><i class="bi bi-star-fill text-warning"></i></span>
                                                <span class="fw-semibold text-dark">4.9</span>
                                                <span class="text-muted text-mid">(124 Reviews)</span>
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
                                            <h6 class="text-dark lh-1 fw-semibold m-0">{{ instructor?.students_count || '150' }}</h6>
                                            <span class="text-muted-2 m-0">{{ $t('students') }}</span>
                                        </div>
                                        <div class="d-flex flex-column gap-2">
                                            <h6 class="text-dark lh-1 fw-semibold m-0">{{ instructor?.courses?.length || 0 }}+</h6>
                                            <span class="text-muted-2 m-0">{{ $t('courses') }}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="skill-wraps mb-4">
                                    <h5>{{ $t('skills') }}</h5>
                                    <div class="gap-2 d-flex flex-wrap">

                                        <a 
                                            v-for="(item, index) in instructor?.skill" 
                                            :key="index" 
                                            href="#" 
                                            class="badge badge-sm badge-outline rounded-pill"
                                        >
                                            {{item}}
                                        </a>
                                        
                                    </div>
                                </div>
                                
                                <div class="skill-wraps mb-4">
                                    <h5 class="mb-2">{{ $t('education') }}</h5>

                                    <div 
                                        class="d-flex align-items-center mb-3"
                                        v-for="(item, index) in educationData.slice(0, 2)"
                                        :key="index"
                                    >
                                        <span class="square--40 bg-light rounded-3 text-muted"><i class="fas fa-graduation-cap"></i></span>
                                        <div class="ms-3">
                                            <h6 class="mb-0 text-dark">{{item.title}}</h6>
                                            <p class="mb-0 small">{{item.desc}}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="d-flex align-items-center flex-column gap-2">
                                        <a href="#" class="btn btn-md btn-outline-main rounded-2 w-100">{{ $t('send_message') }}</a>
                                        <a href="#" class="btn btn-md btn-main rounded-2 w-100">{{ $t('book_free_trial') }}</a>
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
                                    <h4>{{ $t('about') }}</h4>
                                    <div v-if="instructor?.bio" v-html="instructor.bio"></div>
                                    <p v-else>No biography available for this instructor.</p>
                                </div>
                            </div>
                            
                            <!-- Skills Info -->
                            <div class="card mb-4">
                                <div class="card-body p-4">
                                    <h4>{{ $t('skills') }}</h4>
                                    <div class="gap-2 d-flex flex-wrap">

                                        <span 
                                            class="badge badge-gray rounded-pill"
                                            v-for="(item, index) in instructor?.skill"
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
                                    <h4>{{ $t('courses') }}</h4>
                                    <div class="row justify-content-center gx-3 gy-4 mb-4">
                                        
                                        <div 
                                            class="col-xl-4 col-lg-6 col-md-6" 
                                            v-for="(item, index) in instructor?.courses" 
                                            :key="index"
                                        >
                                            <div class="education_block_grid border">
                                            
                                                <div class="education-thumb position-relative">
                                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                                    </div>
                                                    <NuxtLink :to="item.slug ? `/course-detail/${item.slug}` : `/course-detail/${item.id}`"><img :src="item.thumbnail" class="img-fluid" alt=""></NuxtLink>
                                                </div>
                                                
                                                <div class="education-body p-3">
                                                    <div class="education-title">
                                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="item.slug ? `/course-detail/${item.slug}` : `/course-detail/${item.id}`">{{item.title}}</NuxtLink></h4>
                                                    </div>
                                                    
                                                    <div class="cources-info">
                                                        <ul>
                                                            <li><i class="bi bi-camera-reels"></i>{{ getLecturesCount(item) }} {{ $t('lectures') }}</li>
                                                            <li class="text-capitalize"><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                                            <li><i class="bi bi-coin"></i>{{item.price}} FCFA</li>
                                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">4.9</span><span class="total-reviews">(124)</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                <div class="education-footer p-3">
                                                    <div class="education_block_author">
                                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                                            <span class="square--30"><img :src="imageAvatar" class="img-fluid circle" alt="Author"></span>
                                                            <span class="text-dark fw-medium">{{ instructor.name }}</span>
                                                        </a>
                                                    </div>
                                                    <div class="enrolled-link"><NuxtLink :to="item.slug ? `/course-detail/${item.slug}` : `/course-detail/${item.id}`" class="main-link fw-medium">{{ $t('enrolled_now') }}<i class="bi bi-arrow-right ms-2"></i></NuxtLink></div>
                                                </div>
                                            </div>	
                                        </div>
                                        
                                    </div>
                                    
                                    <div v-if="instructor?.courses?.length > 6" class="row align-items-center justify-content-center">
                                        <div class="col-12">
                                            <div class="text-center">
                                                <button type="button" class="btn btn-md btn-light-main rounded-pill">{{ $t('load_more_courses') }}</button>
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