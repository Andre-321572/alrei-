<template>
  <div class="blog-detail-page">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
    </div>
    <BlogHeader v-else-if="blog" :blog="blog" />
    <div v-else class="text-center py-5">
      <h3>Article non trouvé</h3>
      <NuxtLink to="/blog" class="btn btn-outline-success rounded-pill mt-3">Retour au blog</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import BlogHeader from '@/components/Pages/blog-detail/BlogHeader.vue'

const route = useRoute()
const api = useApi()
const blog = ref(null)
const loading = ref(true)

const config = useRuntimeConfig()
const getImageUrl = (path, fallback = '/img/blog-1.jpg') => {
  if (!path) return fallback
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  if (path.startsWith('/img/') || path.startsWith('/assets/')) return path
  
  const apiBase = config.public.apiBase || 'http://localhost:8000/api'
  const backendUrl = apiBase.replace(/\/api\/?$/, '')
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  if (cleanPath.startsWith('storage/')) {
    return `${backendUrl}/${cleanPath}`
  }
  return `${backendUrl}/storage/${cleanPath}`
}

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await api(`/blogs/${id}`).catch(() => api(`/admin/blogs/${id}`))
    const data = res?.data || res
    if (data && (data.id || data.title)) {
      blog.value = {
        id: data.id,
        slug: data.slug || data.id,
        title: data.title,
        desc: data.summary || data.description || data.content || '',
        category: data.category || 'Actualités',
        author: data.author || data.user?.name || 'ALREI',
        date: data.published_at || data.created_at ? new Date(data.published_at || data.created_at).toLocaleDateString('fr-FR') : '2026',
        image: getImageUrl(data.image, '/img/blog-1.jpg'),
        fullParagraphs: data.content ? data.content.split('\n\n') : [data.summary || data.description || '']
      }
    } else {
      blog.value = null
    }
  } catch (err) {
    console.error('Failed to fetch blog:', err)
    blog.value = null
  } finally {
    loading.value = false
  }
})
</script>
