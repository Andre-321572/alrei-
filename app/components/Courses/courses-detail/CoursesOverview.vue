<template>
    <div class="edu_wraper border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
        <h4 class="edu_title fw-bold mb-4">{{ $t('course_overview') }}</h4>
        <div class="fs-6 text-muted lh-lg" v-html="course?.description || 'No description available.'"></div>
        
        <div v-if="course?.who_should_enroll" class="who-enrolled-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold">Who Should Enroll?</h5>

            <ul class="features-list row g-3 m-0 p-0" style="list-style: none;">
                <li class="col-md-6 d-flex align-items-start gap-2" v-for="(item, index) in course.who_should_enroll" :key="index">
                    <i class="bi bi-check-circle-fill text-success mt-1"></i>
                    <span class="text-dark fw-medium">{{ item }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>


const props = defineProps({
    course: {
        type: Object,
        default: () => ({
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore. Veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            who_should_enroll: [
                "Beginners who want to learn development from scratch.",
                "Developers looking to expand their tech stack.",
                "Entrepreneurs wanting to prototype ideas quickly."
            ]
        })
    }
})

const course = computed(() => props.course)

</script>