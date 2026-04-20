<template>
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
                            <h2 class="ed_title">
                                {{ course ? course.title : "Ruby on Rails Program" }}
                            </h2>
                            <ul>
                                <li><i class="bi bi-calendar-check"></i>10 - 20 weeks</li>
                                <li><i class="bi bi-camera-video"></i>102 Lectures</li>
                                <li><i class="bi bi-people"></i>502 Student Enrolled</li>
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
                                    <strong class="high fw-bold text-light">4.9</strong><span class="text-mid text-light">(2.24k Reviews)</span>
                                </div>
                            
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// default image path
import defaultBg from '@/assets/img/detail-bg.jpg'

const { course } = defineProps({ course: Object })

const backgroundStyle = computed(() => ({
  background: `#f4f4f4 url(${course?.image || defaultBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}))
</script>