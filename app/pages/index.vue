<template>

    <div class="half_banner bg-light-hero">
        <div class="container">
            <div class="row align-items-center g-4">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 order-2 order-lg-1">
                    <div class="hero-caption">
                        <h1 class="big-header-capt mb-3">{{ $t('hero_title') }}</h1>
                        <p class="mb-4">{{ $t('hero_subtitle') }}</p>
                        
                        <div class="hero-search mb-2">
                            <form @submit.prevent="handleSearch" class="search-form border border-2 shadow-sm">
                                <div class="form-group flex-fill">
                                    <input v-model="search" type="text" class="form-control" :placeholder="$t('search_placeholder')">
                                    <i class="ico bi bi-search"></i>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn btn-main" @click="handleSearch"><i class="bi bi-send-fill"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 order-1 order-lg-2 text-center">
                    <div class="hero-image-container position-relative d-inline-block animate-float">
                        <img :src="studentHero" class="img-fluid hero-student-img" alt="Student Hero">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Trips />

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('discover_categories') }}</h2>
                        <p>{{ $t('discover_categories_sub') }}</p>
                    </div>
                </div>
            </div>
            <CategorySlider />
        </div>
    </section>

    <section class="pt-0">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('explore_courses') }}</h2>
                        <p>{{ $t('explore_courses_sub') }}</p>
                    </div>
                </div>
            </div>
            <CoursesSliderTwo />
        </div>
    </section>

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('free_courses') }}</h2>
                        <p>{{ $t('explore_courses_sub') }}</p>
                    </div>
                </div>
            </div>
            <FreeCoursesSlider />
        </div>
    </section>

    <section>
        <div class="container">
            <LearningBenifit />
        </div>
    </section>

    <CtaThree />

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('student_reviews') }}</h2>
                        <p>{{ $t('student_reviews_sub') }}</p>
                    </div>
                </div>
            </div>
            <Review />
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                    <div class="sec-heading center">
                        <h2>{{ $t('insights_updates') }}</h2>
                        <p>{{ $t('insights_updates_sub') }}</p>
                    </div>
                </div>
            </div>
            <BlogOne />
        </div>
    </section>

</template>

<script setup>
import Trips from '@/components/Home/home-2/Trips.vue';
import CategorySlider from '@/components/Home/home-2/CategorySlider.vue';
import CoursesSliderTwo from '@/components/Home/home-2/CoursesSliderTwo.vue';
import FreeCoursesSlider from '@/components/Home/home-2/FreeCoursesSlider.vue';
import LearningBenifit from '@/components/Home/home-2/LearningBenifit.vue';
import CtaThree from '@/components/Home/home-7/CtaThree.vue';
import Review from '@/components/Home/index/Review.vue';
import BlogOne from '@/components/Home/index/BlogOne.vue';

import studentHero from '@/assets/img/student-hero.jpg'

const search = ref('')

const handleSearch = () => {
    if (search.value.trim() === '') return
    alert(`Searching for: ${search.value}`)
    search.value = ''
}
</script>

<style scoped>
.bg-light-hero {
  background: linear-gradient(135deg, #fdf6ec 0%, #e2f4eb 100%);
  position: relative;
  overflow: hidden;
  padding: 80px 0;
}

.bg-light-hero::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 1px solid rgba(105, 201, 208, 0.2);
  top: -150px;
  right: -100px;
  pointer-events: none;
}

.bg-light-hero::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 1px solid rgba(244, 162, 97, 0.15);
  bottom: -100px;
  left: -100px;
  pointer-events: none;
}

.hero-student-img {
  max-height: 520px;
  width: 100%;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border: 4px solid #ffffff;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.hero-student-img:hover {
  transform: translateY(-5px);
}

.hero-caption h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #0f2942;
  line-height: 1.25;
}

.hero-caption p {
  font-size: 1.1rem;
  color: #5a6b82;
  line-height: 1.8;
}

/* Colored soft glow backdrop behind the student */
.hero-image-container::before {
  content: '';
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: #fcdab6;
  top: 5%;
  left: -5%;
  z-index: -1;
  opacity: 0.85;
  filter: blur(25px);
}

/* Brand green/teal decorative ring */
.hero-image-container::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 5px solid #69c9d0;
  top: -20px;
  right: -20px;
  z-index: 2;
  pointer-events: none;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@media (max-width: 991px) {
  .hero-caption h1 {
    font-size: 2.2rem;
  }
  .hero-student-img {
    max-height: 400px;
    margin-top: 2rem;
  }
}
</style>