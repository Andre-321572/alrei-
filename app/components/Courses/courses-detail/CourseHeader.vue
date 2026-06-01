<template>
    <!-- Dark overlay wrapper ensures text visibility regardless of image brightness -->
    <div class="ed_detail_head_wrapper position-relative" style="overflow: hidden;">

        <!-- Background Image Layer -->
        <div class="position-absolute top-0 start-0 w-100 h-100" :style="backgroundStyle"></div>

        <!-- Gradient Overlay: dark bottom-to-top for readability -->
        <div
            class="position-absolute top-0 start-0 w-100 h-100"
            style="background: linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(10,10,40,0.70) 60%, rgba(20,20,60,0.50) 100%); z-index: 1;"
        ></div>

        <div class="container position-relative py-5" style="z-index: 2; padding-top: 100px !important; padding-bottom: 100px !important;">
            <div class="row">
                <div class="col-xl-8 col-lg-8 col-md-10">
                    <div class="ed_detail_wrap light">

                        <!-- Course Badges -->
                        <div class="course-type d-flex align-items-center gap-2 mb-3">
                            <span class="badge bg-success bg-opacity-90 rounded-pill px-3 py-2 fw-semibold text-white">
                                {{ course?.level ? $t(course.level.toLowerCase()) : $t('beginner') }}
                            </span>
                            <span class="badge bg-danger bg-opacity-90 rounded-pill px-3 py-2 fw-semibold text-white">
                                <i class="bi bi-tags me-1"></i>Pro
                            </span>
                        </div>

                        <!-- Title -->
                        <div class="ed_header_caption mb-4">
                            <h1 class="ed_title text-white fw-bolder mb-3" style="font-size: 2.5rem; line-height: 1.25; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">
                                {{ course?.title || $t('loading') }}
                            </h1>

                            <!-- Stats Row — always visible with explicit white color + text-shadow -->
                            <ul class="d-flex flex-wrap gap-4 list-unstyled mb-0" style="color: rgba(255,255,255,0.85);">
                                <li class="d-flex align-items-center gap-2">
                                    <i class="bi bi-calendar-check fs-5 text-warning"></i>
                                    <span style="text-shadow: 0 1px 4px rgba(0,0,0,0.6);">{{ course?.duration || '10-20 weeks' }}</span>
                                </li>
                                <li class="d-flex align-items-center gap-2">
                                    <i class="bi bi-camera-video fs-5 text-warning"></i>
                                    <span style="text-shadow: 0 1px 4px rgba(0,0,0,0.6);">{{ course?.lectures_count || 0 }} {{ $t('lectures') }}</span>
                                </li>
                                <li class="d-flex align-items-center gap-2">
                                    <i class="bi bi-people fs-5 text-warning"></i>
                                    <span style="text-shadow: 0 1px 4px rgba(0,0,0,0.6);">{{ course?.enrollments_count || 0 }} {{ $t('students_enrolled') }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Short Description -->
                        <div class="ed_header_short mb-4">
                            <p
                                class="fs-6 lh-lg"
                                style="max-width: 720px; color: rgba(255,255,255,0.80); text-shadow: 0 1px 4px rgba(0,0,0,0.5);"
                            >
                                {{ course?.short_description || (course?.description ? course.description.substring(0, 220) + '…' : '') }}
                            </p>
                        </div>

                        <!-- Rating Badge -->
                        <div class="ed_rate_info d-inline-flex align-items-center gap-3 rounded-pill px-4 py-2 border"
                             style="background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25) !important; backdrop-filter: blur(8px);">
                            <div class="star_info d-flex align-items-center gap-1">
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                            </div>
                            <strong class="text-white fw-bold fs-5">{{ course?.average_rating || '4.9' }}</strong>
                            <span style="color: rgba(255,255,255,0.70);">({{ course?.reviews_count || '2.2k' }} {{ $t('reviews') }})</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const { course } = defineProps({ course: Object })

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${course?.thumbnail || course?.image || '/img/student-banner.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '420px'
}))
</script>