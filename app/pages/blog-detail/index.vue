<template>
    <Preloader />
    <div class="blog-page">
        <NavDark />

        <BlogHeader />

        <FooterTop />
        <Footer />
        <ScrollToTop />
    </div>
</template>

<script setup>
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import BlogHeader from '@/components/Pages/blog-detail/BlogHeader.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

</script>