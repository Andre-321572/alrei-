<template>
    <div>
        <!-- Banner Principal -->
        <div class="half_banner bg-light-hero py-5">
            <div class="container py-4">
                <div class="row align-items-center g-4">
                    <div class="col-xl-7 col-lg-7 col-md-12 order-2 order-lg-1">
                        <div class="hero-caption">
                            <span class="badge bg-light-main text-main px-3 py-2 rounded-pill fw-bold mb-3 d-inline-block">
                                {{ $t('alrei_center') || 'Centre ALREI de formation des travailleurs' }}
                            </span>
                            <h1 class="display-5 fw-extrabold text-dark mb-3 lh-sm">
                                {{ $t('hero_title') || "L'éducation ouvrière pour des syndicats plus forts" }}
                            </h1>
                            <p class="lead text-muted mb-4 lh-base">
                                {{ $t('hero_subtitle') || "Développez les connaissances et les compétences pratiques nécessaires pour organiser les travailleurs, représenter les membres, négocier efficacement et influencer les politiques du travail et les politiques économiques." }}
                            </p>
                            
                            <div class="d-flex flex-wrap gap-3 mb-4">
                                <NuxtLink :to="localePath('/courses')" class="btn btn-main btn-lg rounded-pill px-4 fw-bold shadow-sm">
                                    {{ $t('discover_courses') || 'Découvrir les formations' }} <i class="bi bi-arrow-right ms-2"></i>
                                </NuxtLink>
                                <NuxtLink :to="localePath('/register?tab=register')" class="btn btn-outline-secondary btn-lg rounded-pill px-4 fw-bold">
                                    {{ $t('sign_up') || 'Créer un compte' }}
                                </NuxtLink>
                            </div>

                            <div class="hero-search">
                                <form @submit.prevent="handleSearch" class="search-form border border-2 shadow-sm rounded-pill overflow-hidden bg-white p-1 d-flex align-items-center">
                                    <div class="form-group flex-fill mb-0 ms-3 d-flex align-items-center">
                                        <i class="bi bi-search text-muted me-2"></i>
                                        <input v-model="search" type="text" class="form-control border-0 shadow-none ps-0" :placeholder="$t('search_placeholder') || 'Rechercher des programmes, des sujets liés au travail et des ressources'">
                                    </div>
                                    <button type="submit" class="btn btn-main rounded-pill px-4 py-2 flex-shrink-0 fw-bold">{{ $t('search') || 'Rechercher' }}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-5 col-lg-5 col-md-12 order-1 order-lg-2 text-center">
                        <div class="hero-image-container position-relative d-inline-block animate-float">
                            <img :src="studentHero" class="img-fluid hero-student-img rounded-4 shadow-lg" alt="Syndicalistes et travailleurs africains en formation">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 3 Atouts -->
        <Trips />

        <!-- 9 Domaines de formation -->
        <section class="py-5 bg-white">
            <div class="container py-3">
                <div class="row justify-content-center mb-4">
                    <div class="col-lg-8 text-center">
                        <span class="badge bg-light-main text-main px-3 py-2 rounded-pill fw-bold mb-2">{{ $t('specializations') }}</span>
                        <h2 class="fw-bold display-6 mb-2">{{ $t('discover_categories') }}</h2>
                        <p class="text-muted">{{ $t('discover_categories_sub') }}</p>
                    </div>
                </div>
                
                <div class="row g-3">
                    <div class="col-lg-4 col-md-6" v-for="(domain, idx) in featureCategoryData" :key="idx">
                        <div class="domain-rect-card d-flex align-items-center p-3 rounded-3 bg-light-subtle border shadow-sm h-100">
                            <div class="domain-icon-box flex-shrink-0 square--45 rounded-3 bg-light-main text-main d-flex align-items-center justify-content-center me-3">
                                <i :class="domain.icon || 'bi bi-award-fill'" class="fs-5"></i>
                            </div>
                            <div class="domain-content overflow-hidden">
                                <h6 class="fw-bold text-dark mb-1 fs-6 text-truncate" :title="domain.title">{{ domain.title }}</h6>
                                <p class="small text-muted mb-0 lh-sm domain-desc">{{ domain.desc }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Programmes 2026 -->
        <section class="py-5 bg-light">
            <div class="container py-3">
                <div class="row justify-content-center mb-5">
                    <div class="col-lg-8 text-center">
                        <span class="badge bg-light-main text-main px-3 py-2 rounded-pill fw-bold mb-2">{{ $t('training_offer') }}</span>
                        <h2 class="fw-bold display-6 mb-3">{{ $t('explore_courses') }}</h2>
                        <p class="text-muted">{{ $t('explore_courses_sub') }}</p>
                    </div>
                </div>
                
                <CoursesSliderTwo />
                
                <div class="text-center mt-5">
                    <NuxtLink :to="localePath('/courses')" class="btn btn-outline-main btn-lg rounded-pill px-5 fw-bold">
                        {{ $t('view_all_courses') }} <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Ressources en libre accès -->
        <section class="py-5 bg-white border-top border-bottom">
            <div class="container py-3">
                <div class="row align-items-center g-4">
                    <div class="col-lg-8">
                        <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-bold mb-2">{{ $t('open_access') }}</span>
                        <h3 class="fw-bold mb-2">{{ $t('free_courses') }}</h3>
                        <p class="text-muted mb-0 lh-base">
                            {{ $t('free_courses_sub') }}
                        </p>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <NuxtLink :to="localePath('/courses')" class="btn btn-main btn-lg rounded-pill px-4 fw-bold">
                            {{ $t('browse_resources') }} <i class="bi bi-journal-text ms-2"></i>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Publics visés -->
        <TargetAudienceSection />

        <!-- À propos d'ALREI -->
        <AboutSection />

        <!-- Appels aux Personnes-Ressources -->
        <ResourcePersonSection />

        <!-- Actualités et Formations 2026 (Blog) -->
        <section class="py-5 bg-white">
            <div class="container py-3">
                <div class="row justify-content-center mb-5">
                    <div class="col-lg-8 text-center">
                        <span class="badge bg-light-main text-main px-3 py-2 rounded-pill fw-bold mb-2">{{ $t('publications_news') }}</span>
                        <h2 class="fw-bold display-6 mb-3">{{ $t('insights_updates') }}</h2>
                        <p class="text-muted">{{ $t('insights_updates_sub') }}</p>
                    </div>
                </div>
                
                <BlogOne />
                
                <div class="text-center mt-5">
                    <NuxtLink :to="localePath('/blog')" class="btn btn-outline-secondary rounded-pill px-4 fw-bold">
                        {{ $t('read_all_blog') }} <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Formulaire Newsletter -->
        <NewsletterSection />
    </div>
</template>

<script setup>
import Trips from '@/components/Home/home-2/Trips.vue'
import CoursesSliderTwo from '@/components/Home/home-2/CoursesSliderTwo.vue'
import TargetAudienceSection from '@/components/Home/TargetAudienceSection.vue'
import AboutSection from '@/components/Home/AboutSection.vue'
import ResourcePersonSection from '@/components/Home/ResourcePersonSection.vue'
import BlogOne from '@/components/Home/index/BlogOne.vue'
import NewsletterSection from '@/components/Home/NewsletterSection.vue'

import studentHero from '@/assets/img/student-hero.jpg'
import { featureCategoryData } from '@/data/data.js'

const localePath = useLocalePath()
const router = useRouter()
const search = ref('')

const handleSearch = () => {
    if (!search.value.trim()) return
    router.push(localePath('/courses?q=' + encodeURIComponent(search.value)))
}
</script>

<style scoped>
.bg-light-hero {
  background: linear-gradient(135deg, #fdf6ec 0%, #e2f4eb 100%);
}
.hover-card {
  transition: all 0.3s ease;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}
.domain-rect-card {
  min-height: 80px;
  border: 1px solid #eaedf1 !important;
  transition: all 0.25s ease-in-out;
}
.domain-rect-card:hover {
  transform: translateY(-3px);
  background-color: #ffffff !important;
  border-color: #007a4d !important;
  box-shadow: 0 8px 18px rgba(0, 122, 77, 0.12) !important;
}
.domain-desc {
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