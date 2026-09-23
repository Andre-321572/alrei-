<template>
    <div>
        <div class="bg-cover py-5 border-bottom text-white" style="background: linear-gradient(to right, rgba(15, 35, 20, 0.65) 0%, rgba(15, 35, 20, 0.25) 100%), url('/img/student-banner.png'); background-position: center; background-size: cover;">
            <div class="container py-3">
                <div class="row align-items-center">
                    <div class="col-lg-10 mx-auto text-center">
                        <span class="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold mb-3 d-inline-block">{{ blogPost.category }}</span>
                        <h1 class="display-6 fw-bold text-white mb-3">{{ blogPost.title }}</h1>
                        <div class="d-flex align-items-center justify-content-center gap-4 text-white opacity-75 small">
                            <span><i class="bi bi-person me-1"></i>{{ blogPost.author }}</span>
                            <span><i class="bi bi-calendar me-1"></i>{{ blogPost.date }}</span>
                            <span><i class="bi bi-tag me-1"></i>{{ blogPost.readTime }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-5 bg-white">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                            <img :src="blogPost.image" class="card-img-top object-fit-cover" style="max-height: 400px;" :alt="blogPost.title">
                            <div class="card-body p-4 p-md-5">
                                <div class="lead fw-normal text-dark mb-4 p-3 bg-light rounded-3 border-start border-main border-4">
                                    {{ blogPost.desc }}
                                </div>

                                <div class="article-content lh-lg text-dark" style="font-size: 1.05rem;">
                                    <p v-for="(paragraph, idx) in blogPost.fullParagraphs" :key="idx" class="mb-4">
                                        {{ paragraph }}
                                    </p>
                                </div>

                                <div class="p-4 bg-light rounded-4 mt-5 border">
                                    <h5 class="fw-bold mb-3 text-main"><i class="bi bi-info-circle me-2"></i>Informations complémentaires</h5>
                                    <p class="small text-muted mb-3">Les détails relatifs aux candidatures, aux désignations et au calendrier définitif seront publiés sur le Centre ALREI de formation des travailleurs.</p>
                                    <div class="d-flex flex-wrap gap-2">
                                        <NuxtLink :to="localePath('/courses')" class="btn btn-main rounded-pill px-4 btn-sm fw-bold">Voir les formations</NuxtLink>
                                        <NuxtLink :to="localePath('/courses')" class="btn btn-outline-main rounded-pill px-4 btn-sm fw-bold">{{ $t('apply_for_course') || 'Postuler à cette formation' }}</NuxtLink>
                                        <a href="https://wa.me/22890943434" target="_blank" rel="noopener" class="btn btn-outline-success rounded-pill px-4 btn-sm fw-bold">
                                            <i class="bi bi-whatsapp me-1"></i>Assistance WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { blogData } from '@/data/data.js'
const props = defineProps({ blog: Object })
const localePath = useLocalePath()

const articlesContent = {
    1: [
        "La CSI-Afrique, par l'intermédiaire de l'Institut africain de recherche et d'éducation ouvrière, organisera la sixième édition de l'Académie de développement du leadership syndical en 2026 sur le thème « Commerce numérique, justice fiscale et travail décent en Afrique ».",
        "La transformation numérique de l'Afrique modifie le commerce, les services publics et l'organisation du travail. Le commerce électronique, les plateformes numériques, l'intelligence artificielle et les services financiers numériques créent de nouvelles possibilités, mais soulèvent aussi des questions urgentes sur la sécurité de l'emploi, les salaires, la protection sociale, la gestion algorithmique, la négociation collective et la sécurité et la santé au travail. Parallèlement, les insuffisances de l'imposition des multinationales technologiques et la persistance des flux financiers illicites réduisent les recettes publiques disponibles pour l'éducation, la santé, la protection sociale, les infrastructures et l'emploi décent.",
        "TULDA 2026 aidera une nouvelle génération de dirigeants syndicaux à comprendre ces enjeux interdépendants et à élaborer des stratégies concrètes pour participer à l'élaboration des politiques. Le programme abordera le travail et l'économie numérique en Afrique, le commerce numérique et l'avenir du travail dans le cadre de la Zone de libre-échange continentale africaine, les valeurs syndicales et la solidarité, la justice fiscale et la mobilisation des ressources intérieures, ainsi que l'organisation et le leadership des jeunes dans l'économie numérique.",
        "L'Académie adoptera une approche hybride. Une phase de formation en ligne est prévue les 29 et 30 octobre 2026, suivie d'une phase résidentielle intensive à Lomé, au Togo, en novembre 2026. Les participants apprendront au moyen d'exposés d'experts, de partages d'expériences nationales, d'études de cas, de travaux de groupe, de simulations et de planification du plaidoyer. L'anglais et le français seront les langues de travail, avec interprétation simultanée.",
        "La phase en ligne visera environ 50 participants, dont des responsables syndicaux, des dirigeants, des militants, des travailleurs et des membres de syndicats, avec une attention particulière à la participation des jeunes travailleurs et des femmes. La sélection pour la phase résidentielle sera compétitive et dépendra des ressources disponibles. Les participants qui auront validé les composantes requises en ligne et en présentiel recevront une attestation de fin de formation de la CSI-Afrique."
    ],
    2: [
        "L'Institut africain de recherche et d'éducation ouvrière prépare une nouvelle formation en ligne et une ressource pédagogique pratique intitulée « Manuel de formation pour la mise en place de campagnes de syndicalisation dans l'économie informelle ». Cette ressource sera mise à disposition sur le Centre ALREI de formation des travailleurs en 2026 pour l'éducation ouvrière à son rythme et en format hybride.",
        "Dans toute l'Afrique, l'économie informelle demeure la principale source d'emploi pour des millions de travailleurs. Beaucoup perçoivent des revenus faibles et instables, travaillent dans des conditions précaires, bénéficient de protections limitées au travail, ont peu accès à la protection sociale et sont insuffisamment représentés dans les décisions qui touchent leurs moyens de subsistance. Renforcer l'organisation dans l'économie informelle est donc essentiel au renouveau syndical, à la croissance des effectifs et à la capacité des travailleurs à obtenir des droits, une reconnaissance, une protection et des changements de politiques.",
        "La formation fournira aux organisateurs, aux éducateurs syndicaux, aux dirigeants et aux représentants des travailleurs des méthodes pratiques pour mettre en place des campagnes de syndicalisation. Elle abordera les fondamentaux de la syndicalisation, la cartographie des lieux de travail et des secteurs, les entretiens individuels, l'identification des problèmes, le recrutement, l'identification et le développement de leaders, les objectifs de campagne, l'analyse des rapports de force, les alliances, le dialogue social et la préparation d'un plan de campagne de syndicalisation.",
        "Les participants auront également accès à des conseils pour les facilitateurs, des exercices, des modèles, des listes de contrôle, des outils de planification et des études de cas africaines. Le contenu intégrera les expériences des femmes, des jeunes travailleurs, des travailleurs migrants, des travailleurs de plateforme et d'autres groupes encore sous-représentés dans les structures syndicales.",
        "La version en ligne est conçue pour un apprentissage structuré à son rythme et une formation hybride. Une session pilote en ligne permettra à des organisateurs sélectionnés d'utiliser les modules, de tester les outils pratiques et de donner leur avis avant une mise en œuvre plus large. Cette ressource s'inscrit dans les efforts visant à faire avancer la Feuille de route de Kigali sur la syndicalisation et la négociation collective, dont l'ambition est de syndiquer quatre millions de nouveaux membres en Afrique d'ici à la fin de 2027."
    ],
    3: [
        "La CSI-Afrique, sous la direction technique et la coordination institutionnelle de l'Institut africain de recherche et d'éducation ouvrière, déploiera en 2026 un programme structuré de formation sur la transition juste à travers le Centre ALREI de formation des travailleurs.",
        "Le changement climatique affecte déjà les emplois, les revenus, la sécurité et la santé au travail, les lieux de travail et les communautés dans toute l'Afrique. Les travailleurs sont confrontés à l'augmentation de la chaleur, aux sécheresses, aux inondations, à la dégradation de l'environnement, à la perturbation de leurs moyens de subsistance et aux déplacements. Ils sont également touchés par les politiques adoptées face à la crise climatique, notamment les changements dans l'énergie, les transports, l'agriculture, les mines et l'industrie. Les syndicats doivent pouvoir influencer ces décisions afin que l'action climatique protège les droits, crée du travail décent et répartisse équitablement les coûts et les avantages de la transition.",
        "Le programme utilisera un ensemble complet de ressources d'éducation syndicale conçu pour les organisations de travailleurs africains. Il réunit des contenus pédagogiques de base, un guide de préparation des facilitateurs et des modules de formation fondés sur des activités. Les participants étudieront les sciences du climat et les effets inégaux du changement climatique ; les mesures d'atténuation et d'adaptation ; les droits du travail et la sécurité et la santé au travail ; les effets sectoriels ; le dialogue social ; la négociation collective ; et le sens d'une transition juste du point de vue des travailleurs.",
        "Quatre modules complémentaires guideront les participants de l'analyse à l'action : « Nommer le problème : les effets du changement climatique sur les travailleurs » ; « Qu'est-ce qu'une transition juste ? » ; « Pouvoir et possibilités : la transition juste en Afrique » ; et « Renforcer le pouvoir des travailleurs grâce à une transition juste ». Grâce à la cartographie des travailleurs, à l'élaboration d'une vision collective, à des études de cas africaines, à l'analyse des rapports de force, aux jeux de rôle et à la planification de campagnes, les participants identifieront les revendications, les décideurs et les alliés pertinents pour leurs secteurs et leurs pays.",
        "Le programme sera structuré sur le Centre ALREI de formation des travailleurs et pourra combiner des formations en ligne, hybrides et en présentiel. Il sera proposé à deux cohortes, avec des exercices participatifs, des lectures, des vidéos, des travaux à réaliser, des quiz, des discussions animées et des échanges entre pairs. L'anglais, le français et le kiswahili seront les principales langues du programme, avec une attention particulière à l'appui en kiswahili pour la participation de l'Afrique de l'Est."
    ]
}

const blogPost = computed(() => {
    const base = props.blog || blogData[0]
    return {
        ...base,
        fullParagraphs: articlesContent[base.id] || [base.desc]
    }
})
</script>