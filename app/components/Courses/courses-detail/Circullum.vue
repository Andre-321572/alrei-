<template>
    <div class="edu_wraper border">
        <h4 class="edu_title">{{ $t('course_curriculum') }}</h4>
        <div id="accordionExample" class="accordion circullum">

            <div v-for="(section, sIndex) in sections" :key="section.id" class="card border shadow-0 mb-3">
                <div :id="'heading' + sIndex" class="card-header">
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
        default: () => []
    }
})
</script>