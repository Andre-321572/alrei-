<template>
    <section class="bg-light py-5">
        <div class="container py-2">
            <div class="row justify-content-center mb-4">
                <div class="col-lg-8 col-md-10 text-center">
                    <span class="badge bg-light-main text-main px-3 py-2 rounded-pill fw-semibold mb-2">{{ $t('target_audiences') || 'Publics visés' }}</span>
                    <h2 class="fw-bold mb-2">{{ $t('student_reviews') || 'Une plateforme pour le mouvement syndical africain' }}</h2>
                    <p class="text-muted">{{ $t('student_reviews_sub') || 'Le Centre ALREI de formation des travailleurs accompagne l\'ensemble des acteurs qui organisent, représentent, forment et défendent les travailleurs à travers le continent.' }}</p>
                </div>
            </div>
            
            <div class="row g-3">
                <div class="col-lg-4 col-md-6" v-for="(audience, index) in audiences" :key="index">
                    <div class="audience-rect-card d-flex align-items-center p-3 rounded-3 bg-white border shadow-sm h-100 transition-all hover-lift">
                        <div class="square--45 circle bg-light-main text-main flex-shrink-0 me-3 d-flex align-items-center justify-content-center fs-5">
                            <i :class="audience.icon"></i>
                        </div>
                        <div>
                            <h6 class="fs-6 fw-bold mb-1 text-dark">{{ $t(audience.titleKey) || audience.title }}</h6>
                            <p class="small text-muted mb-0 lh-sm audience-desc">{{ $t(audience.descKey) || audience.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const audiences = [
    { icon: "bi bi-person-badge-fill", titleKey: "audience_1_title", descKey: "audience_1_desc", title: "Dirigeants syndicaux & Élus", desc: "Renforcez la gouvernance, le leadership stratégique et le plaidoyer de vos organisations." },
    { icon: "bi bi-megaphone-fill", titleKey: "audience_2_title", descKey: "audience_2_desc", title: "Organisateurs & Délégués", desc: "Mobilisez sur le lieu de travail, menez des campagnes et défendez les droits des membres." },
    { icon: "bi bi-gender-ambiguous", titleKey: "audience_3_title", descKey: "audience_3_desc", title: "Jeunes & Femmes syndicalistes", desc: "Favorisez l'égalité des genres, l'inclusion et l'émergence des nouveaux leaders du travail." },
    { icon: "bi bi-journal-bookmark-fill", titleKey: "audience_4_title", descKey: "audience_4_desc", title: "Éducateurs & Chercheurs", desc: "Accédez à des méthodologies participatives et des données pour la recherche sur le travail." },
    { icon: "bi bi-briefcase-fill", titleKey: "audience_5_title", descKey: "audience_5_desc", title: "Économie formelle & Informelle", desc: "Accompagnez tous les travailleurs (salariés, informel, plateformes numériques, emplois atypiques)." },
    { icon: "bi bi-building-check", titleKey: "audience_6_title", descKey: "audience_6_desc", title: "Organisations partenaires", desc: "Institutions agréées, syndicats affiliés et partenaires engagés pour le travail décent." }
]
</script>

<style scoped>
.audience-rect-card {
    min-height: 85px;
    border: 1px solid #eaedf1 !important;
    transition: all 0.25s ease-in-out;
}
.audience-rect-card:hover {
    transform: translateY(-3px);
    border-color: #007a4d !important;
    box-shadow: 0 8px 18px rgba(0, 122, 77, 0.1) !important;
}
.audience-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.8rem;
}
.square--45 {
    width: 45px;
    height: 45px;
}
</style>
