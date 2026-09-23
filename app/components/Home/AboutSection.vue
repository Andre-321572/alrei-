<template>
    <section class="py-5 bg-white">
        <div class="container py-3">
            <div class="row align-items-center g-5">
                <div class="col-lg-6 col-md-12">
                    <div class="pe-lg-4">
                        <span class="badge bg-light-main text-main px-3 py-2 rounded-pill fw-bold mb-3">{{ $t('about_badge_home') || "À propos d'ALREI" }}</span>
                        <h2 class="fw-bold display-6 mb-4">{{ $t('about_home_title') || "La recherche et l'éducation au service des droits des travailleurs" }}</h2>
                        <p class="text-dark fs-6 lh-base mb-3 fw-medium" style="color: #2c3e50 !important; font-size: 1.05rem !important;">
                            {{ $t('about_home_text1') || "L'Institut africain de recherche et d'éducation ouvrière (ALREI) est un institut semi-autonome de la CSI-Afrique (ITUC-Africa). Il renforce le mouvement syndical africain par la recherche sur le travail, l'éducation ouvrière, le plaidoyer fondé sur des données probantes et la collaboration." }}
                        </p>
                        <p class="text-secondary fs-6 lh-base mb-4" style="font-size: 1rem !important;">
                            {{ $t('about_home_text2') || "Le Centre ALREI de formation des travailleurs prolonge ce mandat en ligne en rendant les formations pratiques et les connaissances sur le travail accessibles au-delà des pays, des secteurs et des langues." }}
                        </p>
                        <div class="d-flex flex-wrap gap-3">
                            <NuxtLink :to="localePath('/about-us')" class="btn btn-main rounded-pill px-4 fw-semibold">
                                {{ $t('about_learn_more') || 'En savoir plus sur ALREI' }} <i class="bi bi-arrow-right ms-2"></i>
                            </NuxtLink>
                            <NuxtLink :to="localePath('/contact')" class="btn btn-outline-secondary rounded-pill px-4 fw-semibold">
                                {{ $t('contact_institute') || "Contacter l'institut" }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6 col-md-12">
                    <div class="card border-0 bg-light rounded-4 p-4 p-lg-5 shadow-sm">
                        <h4 class="fw-bold fs-5 mb-4 text-main"><i class="bi bi-shield-check me-2"></i>{{ $t('why_train_title') || 'Pourquoi se former avec ALREI ?' }}</h4>
                        
                        <div class="d-flex mb-3" v-for="(item, idx) in reasons" :key="idx">
                            <div class="square--40 circle bg-main text-white flex-shrink-0 me-3 fs-6">
                                <i :class="item.icon"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-1 fs-6">{{ $t(item.titleKey) || item.title }}</h6>
                                <p class="small text-muted mb-0 lh-sm">{{ $t(item.descKey) || item.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const localePath = useLocalePath()

const reasons = [
    { icon: "bi bi-journal-text", titleKey: "reason_1_title", descKey: "reason_1_desc", title: "Des contenus pertinents", desc: "Les programmes abordent les enjeux actuels du travail, de l'économie et du développement en Afrique." },
    { icon: "bi bi-tools", titleKey: "reason_2_title", descKey: "reason_2_desc", title: "Des méthodes pratiques", desc: "Des études de cas, exercices et projets relient les apprentissages au travail syndical concret." },
    { icon: "bi bi-people", titleKey: "reason_3_title", descKey: "reason_3_desc", title: "Des échanges entre pairs", desc: "Apprenez avec des syndicalistes de différents pays, secteurs et traditions d'organisation." },
    { icon: "bi bi-translate", titleKey: "reason_4_title", descKey: "reason_4_desc", title: "Une participation multilingue", desc: "Formations proposées en français, anglais, portugais et kiswahili selon les cohortes." }
]
</script>
