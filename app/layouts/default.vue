<template>
    <Preloader />
    <NavDark />
    <slot />
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
</script>
