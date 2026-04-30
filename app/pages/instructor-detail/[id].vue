<template>

    <Preloader />

    <NavDark />

    <section class="bg-gredient p-0">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <InstructorHeader :instructor="InstructorsData" />

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import InstructorHeader from '@/components/Courses/instructor-detail/InstructorHeader.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { instructorsData } from '@/data/data.js'

// Import useRoute and computed
import { useRoute } from '#app'
import { computed } from 'vue'

// ROUTE PARAMS
const route = useRoute()
const id = computed(() => Number(route.params.id))

// GET Instructor DATA BASED ON ID
const InstructorsData = computed(() => {
  if (!id.value) {
    return instructorsData[2] // default instructor if no id
  }
  return instructorsData.find(item => item.id === id.value)
})

</script>