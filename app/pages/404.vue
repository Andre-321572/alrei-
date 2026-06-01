<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <section class="error-wrap">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-10">
                    <div class="text-center">
                        <img :src="ErrorI" class="img-fluid" alt="">
                        <p>Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper</p>
                        <NuxtLink class="btn btn-main px-4" to="/">Back To Home</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FooterTop />
    <Footer />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import ErrorI from "@/assets/img/404.png";

</script>