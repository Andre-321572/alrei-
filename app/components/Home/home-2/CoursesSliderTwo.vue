<template>
    <div v-if="coursesList.length > 0" class="row g-4">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in coursesList" :key="index">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="position-relative">
                    <img :src="item.image" class="card-img-top object-fit-cover" style="height: 200px;" :alt="item.title" @error="(e) => { e.target.src = getThemeImage(item, index) }">
                    <div class="position-absolute top-0 start-0 m-3">
                        <span class="badge bg-main text-white px-3 py-2 rounded-pill shadow-sm">{{ item.badge }}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column p-4">
                    <div class="mb-2">
                        <span class="badge bg-light-main text-main me-2"><i class="bi bi-person-workspace me-1"></i>{{ item.accessType }}</span>
                    </div>
                    <h5 class="card-title fs-6 fw-bold mb-3">
                        <NuxtLink :to="localePath('/course-detail/' + item.slug)" class="text-dark text-decoration-none">{{ item.title }}</NuxtLink>
                    </h5>
                    <p class="card-text text-muted small mb-3 flex-grow-1 lh-base">{{ item.desc }}</p>
                    <div class="p-3 bg-light rounded-3 mb-3 small">
                        <div class="text-muted"><i class="bi bi-laptop me-2 text-main"></i><strong>Format :</strong> {{ item.format }}</div>
                        <div class="text-muted mt-1"><i class="bi bi-calendar-event me-2 text-main"></i><strong>Calendrier :</strong> {{ item.schedule }}</div>
                    </div>
                    <NuxtLink :to="localePath('/course-detail/' + item.slug)" class="btn btn-main rounded-pill w-100 fw-semibold">
                        Découvrir <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-4 text-muted">
        <p class="mb-0">Aucun cours disponible pour le moment.</p>
    </div>
</template>

<script setup>
const api = useApi()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const coursesList = ref([])

const getThemeImage = (c, fallbackIndex = 0) => {
    const imgPath = c?.thumbnail || c?.image
    if (imgPath && !imgPath.includes('placeholder') && !imgPath.includes('courses-1.jpg')) {
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) return imgPath
        if (imgPath.startsWith('/img/') || imgPath.startsWith('/assets/')) return imgPath
        const apiBase = config.public.apiBase || 'http://localhost:8000/api'
        const backendUrl = apiBase.replace(/\/api\/?$/, '')
        const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath
        return cleanPath.startsWith('storage/') ? `${backendUrl}/${cleanPath}` : `${backendUrl}/storage/${cleanPath}`
    }

    const text = `${c?.title || ''} ${c?.subtitle || ''} ${c?.description || ''}`.toLowerCase()

    if (text.includes('climat') || text.includes('transition') || text.includes('écolog') || text.includes('environnement')) {
        return '/img/theme-climate.jpg'
    }
    if (text.includes('numérique') || text.includes('digital') || text.includes('tulda') || text.includes('tech') || text.includes('commerce')) {
        return '/img/theme-digital.jpg'
    }
    if (text.includes('leadership') || text.includes('gouvernance') || text.includes('cadre') || text.includes('dirigeant')) {
        return '/img/theme-leadership.jpg'
    }
    if (text.includes('syndic') || text.includes('informel') || text.includes('campagne') || text.includes('membre')) {
        return '/img/co-1.jpg'
    }
    if (text.includes('santé') || text.includes('sécurité') || text.includes('protection') || text.includes('sociale')) {
        return '/img/co-2.jpg'
    }
    if (text.includes('négociation') || text.includes('accord') || text.includes('économie') || text.includes('fiscale')) {
        return '/img/co-4.jpg'
    }
    if (text.includes('femme') || text.includes('genre') || text.includes('jeune') || text.includes('égalit')) {
        return '/img/co-6.jpg'
    }

    const fallbackPool = [
        '/img/theme-digital.jpg',
        '/img/theme-leadership.jpg',
        '/img/theme-climate.jpg',
        '/img/co-1.jpg',
        '/img/co-2.jpg',
        '/img/co-4.jpg',
        '/img/co-6.jpg',
        '/img/co-7.jpg'
    ]
    const idx = Math.abs(Number(c?.id || fallbackIndex) || 0) % fallbackPool.length
    return fallbackPool[idx]
}

onMounted(async () => {
    try {
        const response = await api('/courses')
        const rawList = Array.isArray(response) ? response : (response?.data || [])
        coursesList.value = rawList.map((c, idx) => ({
            id: c.id,
            slug: c.slug || c.id,
            image: getThemeImage(c, idx),
            title: c.title,
            desc: c.subtitle || c.description || '',
            badge: c.level || 'Formation',
            format: c.format || 'Formation en ligne',
            schedule: c.schedule || 'Permanent',
            accessType: c.access_type || (c.is_free ? 'Libre' : 'Sur candidature')
        }))
    } catch (error) {
        coursesList.value = []
    }
})
</script>