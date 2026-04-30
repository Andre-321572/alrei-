<template>
    <Preloader />
    <div class="blog-page">
        <NavDark />

        <BlogHeader :blog="BlogData" />

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

import { blogData } from '@/data/data.js'

// Import useRoute and computed
import { useRoute } from '#app'
import { computed } from 'vue'

// ROUTE PARAMS
const route = useRoute()
const id = computed(() => Number(route.params.id))

// GET Blog DATA BASED ON ID
const BlogData = computed(() => {
  if (!id.value) {
    return blogData[2] // default blog if no id
  }
  return blogData.find(item => item.id === id.value)
})

</script>