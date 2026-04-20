<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="pageTitle-wrap text-center">
                        <h1 class="text-light">{{ $t('pricing_packages') }}</h1>
                        <p class="text-light">{{ $t('contact_intro') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="pt-5">
        <div class="container">
            
            <PricingOne />
            
        </div>
    </section>

    <section class="bg-light">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-lg-7 col-md-8 col-sm-12">
                    <div class="text-center">
                        <h6 class="fw-semibold">{{ $t('trusted_partners') }}</h6>
                    </div>
                </div>
            </div>
            
            <div class="row row-cols-3 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 g-4 justify-content-center">
            
                <div class="col" v-for="(item, index) in brandImg" :key="index">
                    <div class="single-brand text-center px-3 px-lg-4">
                        <img :src="item" class="img-fluid" alt="Brand Name">
                    </div>
                </div>
                
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-8 col-sm-12">
                    <div class="sec-heading center">
                        <p>{{ $t('faqs') }}</p>
                        <h2>{{ $t('frequently_asked_questions') }}</h2>
                    </div>
                </div>
            </div>
            
            <FaqTwo />
            
        </div>
    </section>

    <FooterTop />
    <Footer />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import PricingOne from '@/components/Home/home-4/PricingOne.vue';
import FaqTwo from '@/components/Home/home-9/FaqTwo.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { brandImg } from '@/data/data.js'

</script>