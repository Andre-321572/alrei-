<template>
    <div v-if="coursesList.length > 0" class="row g-4 justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in coursesList.slice(0, 3)" :key="index">
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
const { getThemeImage } = useCourseTheme()
const coursesList = ref([])

onMounted(async () => {
    try {
        const response = await api('/courses')
        const rawList = Array.isArray(response) ? response : (response?.data || [])
        // Display ONLY 3 courses in this section as requested by the user
        coursesList.value = rawList.slice(0, 3).map((c, idx) => ({
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