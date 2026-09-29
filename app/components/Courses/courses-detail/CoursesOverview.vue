<template>
    <div class="edu_wraper border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
        <!-- Grille d'informations clés (Inspiré de ITCILO) -->
        <div class="row g-3 mb-4 p-3 rounded-3 bg-light border align-items-center">
            <div class="col-md-3 col-6 border-end border-sm-0">
                <span class="text-muted small d-block mb-1"><i class="bi bi-display me-1 text-primary"></i>Format</span>
                <strong class="text-dark fs-7 d-block text-truncate">{{ course?.format || 'En ligne (Auto-formation)' }}</strong>
            </div>
            <div class="col-md-3 col-6 border-end border-sm-0">
                <span class="text-muted small d-block mb-1"><i class="bi bi-translate me-1 text-primary"></i>Langue</span>
                <strong class="text-dark fs-7 d-block text-truncate">{{ course?.language || 'Français' }}</strong>
            </div>
            <div class="col-md-3 col-6 border-end border-sm-0">
                <span class="text-muted small d-block mb-1"><i class="bi bi-award-fill me-1 text-warning"></i>Certificat</span>
                <strong class="text-dark fs-7 d-block text-truncate">Attestation ALREI</strong>
            </div>
            <div class="col-md-3 col-6">
                <span class="text-muted small d-block mb-1"><i class="bi bi-shield-check me-1 text-success"></i>Accès</span>
                <strong class="text-success fs-7 d-block text-truncate">{{ isFree ? 'Gratuit' : (course?.price ? course.price + ' $' : 'Sur candidature') }}</strong>
            </div>
        </div>

        <!-- Aperçu & Présentation du cours -->
        <h4 class="edu_title fw-bold mb-3"><i class="bi bi-file-text me-2 text-primary"></i>{{ $t('course_overview') || 'Présentation de la formation' }}</h4>
        <div class="fs-6 text-muted lh-lg mb-4" v-html="course?.description || 'Cette formation dispensée par l\'Institut ALREI permet d\'acquérir des compétences théoriques et pratiques approfondies.'"></div>
        
        <!-- Objectifs de la formation (Style ITCILO) -->
        <div class="objectives-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold"><i class="bi bi-bullseye text-danger me-2"></i>Objectifs de la formation</h5>
            <ul class="features-list row g-3 m-0 p-0" style="list-style: none;">
                <li class="col-md-12 d-flex align-items-start gap-2" v-for="(item, index) in objectives" :key="index">
                    <i class="bi bi-check-circle-fill text-success fs-5 flex-shrink-0 mt-1"></i>
                    <span class="text-dark fw-medium lh-base">{{ item }}</span>
                </li>
            </ul>
        </div>

        <!-- À qui s'adresse ce cours ? (Public Cible Style ITCILO) -->
        <div class="who-enrolled-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold"><i class="bi bi-people-fill text-primary me-2"></i>À qui s'adresse cette formation ?</h5>
            <ul class="features-list row g-3 m-0 p-0" style="list-style: none;">
                <li class="col-md-6 d-flex align-items-start gap-2" v-for="(item, index) in targetAudience" :key="index">
                    <i class="bi bi-person-check-fill text-primary flex-shrink-0 mt-1"></i>
                    <span class="text-dark fw-medium lh-base">{{ item }}</span>
                </li>
            </ul>
        </div>

        <!-- Méthodologie (Style ITCILO) -->
        <div class="methodology-block mt-4 pt-4 border-top">
            <h5 class="edu_title mb-3 fw-bold"><i class="bi bi-journal-bookmark-fill text-warning me-2"></i>Méthodologie & Approche pédagogique</h5>
            <p class="text-muted lh-lg mb-0">
                {{ course?.methodology || 'Les cours de l\'Institut ALREI combinent apports théoriques, études de cas africaines, ressources téléchargeables, quiz d\'évaluation et échanges interactifs.' }}
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
            objectives: []
        })
    }
})

const course = computed(() => props.course)

const isFree = computed(() => {
    if (!props.course) return true
    const p = props.course.price
    return !p || p == 0 || p === '0' || p === 'Free' || p === 'Gratuit' || props.course.is_free === true
})

const defaultObjectives = [
    "Comprendre les enjeux clés et le cadre juridique du travail et des droits syndicaux.",
    "Acquérir des outils pratiques d'analyse, de négociation et de représentation.",
    "Développer des stratégies d'action adaptées aux réalités des travailleurs en Afrique."
]

const defaultTarget = [
    "Syndicalistes et responsables d'organisations de travailleurs",
    "Éducateurs et formateurs syndicaux",
    "Acteurs de l'économie formelle et informelle",
    "Chercheurs et professionnels du droit du travail"
]

const objectives = computed(() => {
    if (props.course?.objectives && props.course.objectives.length > 0) return props.course.objectives
    return defaultObjectives
})

const targetAudience = computed(() => {
    if (props.course?.who_should_enroll && props.course.who_should_enroll.length > 0) return props.course.who_should_enroll
    return defaultTarget
})
</script>