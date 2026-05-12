<template>
    <div class="single_instructor border">
        <div class="single_instructor_thumb">
            <a href="#"><img :src="course?.instructor?.user?.avatar || avatar3" class="img-fluid" alt=""></a>
        </div>
        <div class="single_instructor_caption">
            <h4><a href="#">{{ course?.instructor?.user?.name || 'Instructor Name' }}</a></h4>
            <ul class="instructor_info">
                <li><i class="bi bi-camera-reels"></i>{{ course?.instructor?.courses_count || 0 }} {{ $t('courses') }}</li>
                <li><i class="bi bi-mortarboard"></i>{{ course?.instructor?.title || 'Instructor' }}</li>
            </ul>
            <p>{{ course?.instructor?.bio || '' }}</p>
            <ul v-if="course?.instructor?.social" class="social_info">
                <li v-for="(link, platform) in course.instructor.social" :key="platform">
                    <a :href="link"><i :class="`bi bi-${platform}`"></i></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import avatar3 from "@/assets/img/avatar-3.jpg";
const { course } = defineProps({ course: Object })
</script>