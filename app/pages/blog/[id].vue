<template>
  <div class="blog-detail-page">
    <BlogHeader :blog="BlogData" />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import BlogHeader from '@/components/Pages/blog-detail/BlogHeader.vue'
import { blogData } from '@/data/data.js'
import { useRoute } from '#app'

const route = useRoute()
const param = computed(() => route.params.id)

const BlogData = computed(() => {
  if (!param.value) return blogData[0]
  
  // Match by slug (e.g. "tulda-2026", "economie-informelle-2026", "transition-juste-2026")
  const matchedBySlug = blogData.find(item => item.slug === param.value)
  if (matchedBySlug) return matchedBySlug

  // Match by numeric ID (e.g. 1, 2, 3)
  const numId = Number(param.value)
  if (!isNaN(numId)) {
    const matchedById = blogData.find(item => item.id === numId)
    if (matchedById) return matchedById
  }

  return blogData[0]
})
</script>
