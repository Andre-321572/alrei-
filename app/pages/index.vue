<template>

    <Preloader />
    <NavDark />

    <div class="image-cover half_banner" :style="bannerStyle">
        <div class="container">
            <div class="row">
                <div class="col-xl-6 col-lg-7 col-md-12 col-sm-12">
                    <div class="card rounded-4 p-lg-5 p-4">
                        <div class="hero-caption mb-4">
                            <h1 class="big-header-capt mb-0">{{ $t('hero_title') }}</h1>
                            <p>{{ $t('hero_subtitle') }}</p>
                        </div>
                        
                        <div class="hero-search">
                            <form @submit.prevent="handleSearch" class="search-form border border-2">
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

    <FooterTop />
    <FooterDark />
    <ScrollToTop />

</template>

<script setup>
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import Trips from '@/components/Home/home-2/Trips.vue';
import CategorySlider from '@/components/Home/home-2/CategorySlider.vue';
import CoursesSliderTwo from '@/components/Home/home-2/CoursesSliderTwo.vue';
import FreeCoursesSlider from '@/components/Home/home-2/FreeCoursesSlider.vue';
import LearningBenifit from '@/components/Home/home-2/LearningBenifit.vue';
import CtaThree from '@/components/Home/home-7/CtaThree.vue';
import Review from '@/components/Home/index/Review.vue';
import BlogOne from '@/components/Home/index/BlogOne.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import banner2 from '@/assets/img/banner-2.jpg'

import { ref, computed } from 'vue'

const search = ref('')

const bannerStyle = computed(() => ({
    backgroundImage: `url(${banner2})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

const handleSearch = () => {
    if (search.value.trim() === '') return
    console.log('Searching for:', search.value)
    alert(`Searching for: ${search.value}`)
    search.value = ''
}
</script>