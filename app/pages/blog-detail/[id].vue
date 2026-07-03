<template>
    <div class="blog-page">

        <BlogHeader :blog="BlogData" />

    </div>
</template>

<script setup>
import BlogHeader from '@/components/Pages/blog-detail/BlogHeader.vue';

import { blogData } from '@/data/data.js'

import { useRoute } from '#app'

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