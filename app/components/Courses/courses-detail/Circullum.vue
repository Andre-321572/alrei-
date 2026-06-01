<template>
    <div class="edu_wraper border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
        <h4 class="edu_title fw-bold mb-4">{{ $t('course_curriculum') }}</h4>
        <div id="accordionExample" class="accordion circullum accordion-flush">

            <div v-for="(section, sIndex) in sections" :key="section.id" class="card border-0 mb-3 rounded-3 overflow-hidden" style="background-color: #f8f9fa;">
                <div :id="'heading' + sIndex" class="card-header bg-transparent border-0 p-3">
                    <h6 class="mb-0 accordion_title">
                        <a href="#" data-bs-toggle="collapse" :data-bs-target="'#collapse' + sIndex"
                            :aria-expanded="sIndex === 0 ? 'true' : 'false'" :aria-controls="'collapse' + sIndex"
                            :class="['d-block position-relative text-dark collapsible-link py-2', sIndex !== 0 ? 'collapsed' : '']">
                            {{ section.title }}
                        </a>
                    </h6>
                </div>
                <div :id="'collapse' + sIndex" :aria-labelledby="'heading' + sIndex" data-parent="#accordionExample"
                    :class="['collapse', sIndex === 0 ? 'show' : '']">
                    <div class="card-body">
                        <ul class="lectures_lists">
                            <li v-for="(lesson, lIndex) in section.lessons" :key="lesson.id">
                                <div class="lectures_lists_title">
                                    <i :class="lesson.type === 'video' ? 'bi bi-camera-video' : 'bi bi-file-earmark-text'"></i>
                                    {{ lesson.title }}
                                    <span v-if="lesson.is_free_preview" class="badge bg-success ms-2">{{ $t('preview') }}</span>
                                </div>
                                <div v-if="lesson.duration" class="d-inline-block text-muted small">{{ Math.floor(lesson.duration / 60) }} min</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
defineProps({
    sections: {
        type: Array,
        default: () => [
            {
                id: 1,
                title: "Introduction to the Course",
                lessons: [
                    { id: 1, title: "Course Overview and Setup", type: "video", duration: 300, is_free_preview: true },
                    { id: 2, title: "Basic Concepts and Definitions", type: "text", duration: 180 },
                    { id: 3, title: "First Hands-On Project", type: "video", duration: 420 }
                ]
            },
            {
                id: 2,
                title: "Advanced Topics and Best Practices",
                lessons: [
                    { id: 4, title: "Architecture and Design Patterns", type: "video", duration: 600, is_free_preview: true },
                    { id: 5, title: "Performance Optimization", type: "video", duration: 540 },
                    { id: 6, title: "Security and Deployment", type: "text", duration: 240 }
                ]
            }
        ]
    }
})
</script>