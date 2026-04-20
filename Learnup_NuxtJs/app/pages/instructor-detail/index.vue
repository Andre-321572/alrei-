<template>

    <Preloader />

    <NavDark />

    <section class="bg-gredient p-0">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <InstructorHeader />

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import InstructorHeader from '@/components/Courses/instructor-detail/InstructorHeader.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

</script>