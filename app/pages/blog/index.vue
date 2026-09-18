<template>
  <div>
    <!-- Hero Banner avec Image Fond -->
    <section class="py-5 text-white position-relative overflow-hidden bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container py-4 position-relative z-1">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="badge bg-white text-dark rounded-pill px-3 py-2 fw-bold mb-3 shadow-sm" style="font-size: 0.85rem;">
              {{ $t('blog_badge') }}
            </span>
            <h1 class="display-5 fw-bold mb-3 text-white lh-sm">
              {{ $t('blog_hero_title') }}
            </h1>
            <p class="lead text-white-50 mb-0 fs-6 lh-base opacity-75">
              {{ $t('blog_hero_subtitle') }}
            </p>
          </div>
          <div class="col-lg-5 text-lg-end">
            <div class="bg-white rounded-pill px-4 py-2 shadow-lg text-dark border d-inline-flex align-items-center w-100 max-w-400">
              <i class="bi bi-search text-muted me-3 fs-5"></i>
              <input
                v-model="search"
                type="text"
                class="form-control border-0 shadow-none ps-0 fs-6 bg-transparent"
                :placeholder="$t('search_blog_placeholder')"
                @input="filterPosts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Grille des Cartes d'Articles -->
    <section class="py-5 bg-light-subtle">
      <div class="container py-3">
        <div v-if="filteredPosts.length > 0" class="row g-4">
          <div v-for="post in filteredPosts" :key="post.id" class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden blog-card bg-white">
              <NuxtLink :to="localePath('/blog/' + post.slug)">
                <img :src="post.image" class="card-img-top object-fit-cover" style="height: 210px;" :alt="post.cardTitle || post.title" />
              </NuxtLink>
              <div class="card-body p-4 d-flex flex-column">
                <div class="mb-3">
                  <span class="badge rounded-pill px-3 py-2 fs-8 fw-semibold" style="background-color: #fff8eb; color: #d97706; border: 1px solid #fef3c7;">
                    {{ post.category }}
                  </span>
                </div>
                
                <h5 class="card-title fw-bold text-dark mb-3 fs-6 lh-base">
                  <NuxtLink :to="localePath('/blog/' + post.slug)" class="text-dark text-decoration-none hover-title">
                    {{ post.cardTitle || post.title }}
                  </NuxtLink>
                </h5>

                <p class="card-text text-muted fs-7 mb-4 flex-grow-1 lh-base">
                  {{ post.desc }}
                </p>

                <div class="d-flex align-items-center justify-content-between pt-3 border-top fs-8 text-muted mb-4">
                  <span><i class="bi bi-person me-1"></i>{{ post.author }}</span>
                  <span><i class="bi bi-calendar me-1"></i>{{ post.date }}</span>
                </div>

                <NuxtLink :to="localePath('/blog/' + post.slug)" class="btn w-100 rounded-pill py-2 px-4 fw-bold shadow-sm d-flex align-items-center justify-content-center read-more-btn">
                  {{ $t('read_more') }} <i class="bi bi-arrow-right ms-2"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <div class="py-4">
            <i class="bi bi-newspaper display-1 text-muted opacity-50 mb-3 d-block"></i>
            <h4 class="fw-bold text-dark">{{ $t('no_news_match') }}</h4>
            <p class="text-muted fs-6">{{ $t('no_news_sub') }}</p>
            <button class="btn btn-outline-success rounded-pill px-4 py-2 mt-2 fw-bold" @click="resetSearch">
              {{ $t('all_news') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

import { blogData } from '@/data/data.js'

const localePath = useLocalePath()
const search = ref('')
const filteredPosts = ref([...blogData])

function filterPosts() {
  const q = search.value.toLowerCase().trim()
  if (!q) {
    filteredPosts.value = [...blogData]
    return
  }
  filteredPosts.value = blogData.filter(p => {
    const titleText = (p.cardTitle || p.title || '').toLowerCase()
    const descText = (p.desc || '').toLowerCase()
    return titleText.includes(q) || descText.includes(q)
  })
}

function resetSearch() {
  search.value = ''
  filteredPosts.value = [...blogData]
}
</script>

<style scoped>
.blog-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.blog-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1) !important;
}
.hover-title:hover {
  color: #007a4d !important;
}
.read-more-btn {
  background-color: #ffffff;
  border: 1.5px solid #f59e0b;
  color: #d97706;
  transition: all 0.25s ease-in-out;
}
.read-more-btn:hover {
  background-color: #f59e0b;
  border-color: #f59e0b;
  color: #ffffff;
}
.max-w-400 {
  max-width: 400px;
}
.fs-7 { font-size: 0.875rem; }
.fs-8 { font-size: 0.8rem; }
</style>
