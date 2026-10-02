<template>
    <div v-if="blogs.length > 0" class="row justify-content-center g-4">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in blogs.slice(0, 3)" :key="index">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <NuxtLink :to="localePath('/blog-detail/' + item.slug)">
                    <img :src="item.image" class="card-img-top object-fit-cover" style="height: 190px;" :alt="item.title" @error="(e) => { e.target.src = getBlogThemeImage(item, index) }">
                </NuxtLink>
                <div class="card-body d-flex flex-column p-4">
                    <div class="mb-2">
                        <span class="badge bg-light-main text-main px-3 py-1 rounded-pill small fw-semibold">{{ item.category }}</span>
                    </div>
                    <h5 class="card-title fs-6 fw-bold mb-3">
                        <NuxtLink :to="localePath('/blog-detail/' + item.slug)" class="text-dark text-decoration-none">{{ item.cardTitle || item.title }}</NuxtLink>
                    </h5>
                    <p class="card-text text-muted small flex-grow-1 lh-base mb-3">{{ item.desc }}</p>
                    <div class="d-flex align-items-center justify-content-between pt-3 border-top text-muted small mb-3">
                        <span><i class="bi bi-person me-1"></i>{{ item.author }}</span>
                        <span><i class="bi bi-calendar me-1"></i>{{ item.date }}</span>
                    </div>
                    <NuxtLink :to="localePath('/blog/' + item.slug)" class="btn w-100 rounded-pill py-2 px-4 fw-bold shadow-sm d-flex align-items-center justify-content-center read-more-btn">
                        {{ $t('read_more') }} <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-4 text-muted">
        <p class="mb-0">Aucun article publié pour le moment.</p>
    </div>
</template>

<script setup>
const api = useApi()
const localePath = useLocalePath()
const { getBlogThemeImage } = useCourseTheme()
const blogs = ref([])

onMounted(async () => {
    try {
        const res = await api('/blogs').catch(() => api('/admin/blogs')).catch(() => [])
        const rawList = Array.isArray(res) ? res : (res?.data || [])
        blogs.value = rawList.slice(0, 3).map((b, idx) => {
            return {
                id: b.id,
                slug: b.slug || b.id,
                title: b.title,
                cardTitle: b.title,
                desc: b.summary || b.description || (b.content ? b.content.substring(0, 120) + '...' : ''),
                category: b.category || 'Actualités',
                author: b.author || b.user?.name || 'ALREI',
                date: b.published_at || b.created_at ? new Date(b.published_at || b.created_at).toLocaleDateString('fr-FR') : '18/09/2026',
                image: getBlogThemeImage(b, idx)
            }
        })
    } catch (err) {
        blogs.value = []
    }
})
</script>

<style scoped>
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
</style>