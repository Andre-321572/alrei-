<template>
    <div class="edu_wraper border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
        <!-- Grille d'informations clés (Inspiré de ITCILO) -->
        <div class="row g-3 mb-4 p-3 rounded-3 bg-light border align-items-center">
            <div class="col-md-3 col-6 border-end border-sm-0">
                <span class="text-muted small d-block mb-1"><i class="bi bi-display me-1 text-primary"></i>{{ $t('format') }}</span>
                <strong class="text-dark fs-7 d-block text-truncate">{{ courseFormat }}</strong>
            </div>
            <div class="col-md-3 col-6 border-end border-sm-0">
                <span class="text-muted small d-block mb-1"><i class="bi bi-translate me-1 text-primary"></i>{{ $t('language') }}</span>
                <strong class="text-dark fs-7 d-block text-truncate">{{ courseLanguage }}</strong>
            </div>
            <div class="col-md-3 col-6 border-end border-sm-0">
                <span class="text-muted small d-block mb-1"><i class="bi bi-award-fill me-1 text-warning"></i>{{ $t('certificate') }}</span>
                <strong class="text-dark fs-7 d-block text-truncate">{{ $t('alrei_certificate') }}</strong>
            </div>
            <div class="col-md-3 col-6">
                <span class="text-muted small d-block mb-1"><i class="bi bi-shield-check me-1 text-success"></i>{{ $t('access') }}</span>
                <strong class="text-success fs-7 d-block text-truncate">{{ accessLabel }}</strong>
            </div>
        </div>

        <!-- Aperçu & Présentation du cours -->
        <h4 class="edu_title fw-bold mb-3"><i class="bi bi-file-text me-2 text-primary"></i>{{ $t('course_overview') }}</h4>
        <div class="fs-6 text-muted lh-lg mb-4" v-html="course?.description || $t('default_course_desc')"></div>
        
        <!-- Objectifs de la formation (Style ITCILO) -->
        <div class="objectives-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold"><i class="bi bi-bullseye text-danger me-2"></i>{{ $t('course_objectives') }}</h5>
            <ul class="features-list row g-3 m-0 p-0" style="list-style: none;">
                <li class="col-md-12 d-flex align-items-start gap-2" v-for="(item, index) in objectives" :key="index">
                    <i class="bi bi-check-circle-fill text-success fs-5 flex-shrink-0 mt-1"></i>
                    <span class="text-dark fw-medium lh-base">{{ item }}</span>
                </li>
            </ul>
        </div>

        <!-- À qui s'adresse ce cours ? (Public Cible Style ITCILO) -->
        <div class="who-enrolled-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold"><i class="bi bi-people-fill text-primary me-2"></i>{{ $t('who_should_enroll') }}</h5>
            <ul class="features-list row g-3 m-0 p-0" style="list-style: none;">
                <li class="col-md-6 d-flex align-items-start gap-2" v-for="(item, index) in targetAudience" :key="index">
                    <i class="bi bi-person-check-fill text-primary flex-shrink-0 mt-1"></i>
                    <span class="text-dark fw-medium lh-base">{{ item }}</span>
                </li>
            </ul>
        </div>

        <!-- Méthodologie (Style ITCILO) -->
        <div class="methodology-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold"><i class="bi bi-journal-bookmark-fill text-warning me-2"></i>{{ $t('methodology_and_approach') }}</h5>
            <p class="text-muted lh-lg mb-0">
                {{ course?.methodology || $t('default_methodology') }}
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    course: {
        type: Object,
        default: () => ({
            description: "",
            who_should_enroll: [],
            target_audience: [],
            objectives: [],
            methodology: ""
        })
    }
})

const { t, te } = useI18n()

const course = computed(() => props.course)

const isFree = computed(() => {
    if (!props.course) return true
    const p = props.course.price
    return !p || p == 0 || p === '0' || p === 'Free' || p === 'Gratuit' || props.course.is_free === true
})

const courseFormat = computed(() => {
    if (!props.course?.format) return t('online_self_paced')
    const key = String(props.course.format).toLowerCase()
    return te(key) ? t(key) : props.course.format
})

const courseLanguage = computed(() => {
    if (!props.course?.language) return t('french')
    const key = String(props.course.language).toLowerCase()
    return te(key) ? t(key) : props.course.language
})

const accessLabel = computed(() => {
    if (isFree.value) return t('free')
    if (props.course?.price) return `${props.course.price} €`
    return t('by_application')
})

const defaultObjectives = computed(() => [
    t('default_obj_1'),
    t('default_obj_2'),
    t('default_obj_3')
])

const defaultTarget = computed(() => [
    t('default_target_1'),
    t('default_target_2'),
    t('default_target_3'),
    t('default_target_4')
])

const parseList = (data) => {
    if (!data) return []
    if (Array.isArray(data)) {
        return data.filter(item => typeof item === 'string' ? item.trim() !== '' : Boolean(item))
    }
    if (typeof data === 'string') {
        const trimmed = data.trim()
        if (!trimmed) return []
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed)
                if (Array.isArray(parsed)) {
                    return parsed.filter(item => typeof item === 'string' ? item.trim() !== '' : Boolean(item))
                }
            } catch (e) {
                // Ignore JSON parse error
            }
        }
        return trimmed.split('\n').map(s => s.trim()).filter(Boolean)
    }
    return []
}

const objectives = computed(() => {
    const list = parseList(props.course?.objectives)
    if (list.length > 0) return list
    return defaultObjectives.value
})

const targetAudience = computed(() => {
    const list = parseList(props.course?.who_should_enroll || props.course?.target_audience)
    if (list.length > 0) return list
    return defaultTarget.value
})
</script>