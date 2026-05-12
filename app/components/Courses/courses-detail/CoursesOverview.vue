<template>
    <div class="edu_wraper border">
        <h4 class="edu_title">{{ $t('course_overview') }}</h4>
        <div v-html="course?.description || 'No description available.'"></div>
        
        <div v-if="course?.who_should_enroll" class="who-enrolled-block mt-4">
            <h5 class="edu_title mb-2">Who Should Enroll?</h5>

            <ul class="features-list">
                <li v-for="(item, index) in course.who_should_enroll" :key="index">
                    <i class="bi bi-check-circle"></i>
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

const { course } = defineProps({ course: Object })

</script>