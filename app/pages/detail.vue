<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <div v-if="course">
        <div class="ed_detail_head">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 col-md-5">
                        
                        <div class="courses-video">
                            <div class="thumb">
                                <img class="pro_img img-fluid w100" :src="course?.thumbnail || course?.image || courses5" alt="course-img">
                                <div v-if="course?.video_preview" class="overlay_icon">
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
                                <span class="badge bg-light-green text-green rounded-pill">{{ course?.level ? $t(course.level.toLowerCase()) : $t('beginner') }}</span>
                                <span class="badge bg-light-red text-red rounded-pill"><i class="bi bi-tags me-1"></i>Pro</span>
                            </div>
                            <div class="ed_header_caption">
                                <h2 class="ed_title">{{ course?.title || 'Ruby on Rails Program' }}</h2>
                                <ul>
                                    <li><i class="bi bi-calendar-check"></i>{{ course?.duration || '10 - 20' }} {{ $t('weeks', 'weeks') }}</li>
                                    <li><i class="bi bi-camera-video"></i>{{ course?.lectures_count || 102 }} {{ $t('lectures') }}</li>
                                    <li><i class="bi bi-people"></i>{{ course?.enrollments_count || 502 }} {{ $t('students_enrolled', 'Student Enrolled') }}</li>
                                </ul>
                            </div>
                            <div class="ed_header_short">
                                <p>{{ course?.short_description || course?.description || 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }}</p>
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
                                        <strong class="high fw-bold text-dark">{{ course?.rating || '4.9' }}</strong><span class="text-mid text-muted">({{ course?.reviews?.length || '2.24k' }} {{ $t('reviews') }})</span>
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
                        
                        <CoursesOverview :course="course" />
                        
                        <Circullum :sections="course?.sections" />
                        
                        <DetailRating :course="course" />
                        
                        <CourseDetail :course="course" />
                        
                        <CourseRating :course="course" />
                        
                        <ReviewForm :course="course" />
                        
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="col-xl-4 col-lg-4 col-md-12 pe-xl-5">
                    
                        <DetailSidebar :course="course" />
                        
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div v-else-if="!loading" class="text-center py-5 my-5">
        <h3 class="fw-bold">{{ $t('course_not_found', 'Course Not Found') }}</h3>
        <NuxtLink to="/full-width-course" class="btn btn-main mt-3">{{ $t('back_to_courses', 'Back to Courses') }}</NuxtLink>
    </div>

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

import { ref, onMounted } from 'vue'
import { useRoute } from '#app'

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

const route = useRoute()
const api = useApi()

const course = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    let courseId = route.query.id || route.query.slug
    if (!courseId) {
      const response = await api('/courses')
      if (response && response.data && response.data.length > 0) {
        courseId = response.data[0].slug || response.data[0].id
      }
    }
    if (courseId) {
      const response = await api(`/courses/${courseId}`)
      course.value = response.data
    }
  } catch (error) {
    console.error('Failed to load course details dynamically:', error)
  } finally {
    loading.value = false
  }
})

</script>