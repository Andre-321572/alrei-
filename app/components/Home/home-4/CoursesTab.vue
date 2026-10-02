<template>
    <div class="row justify-content-center">
            
        <div class="col-xl-12 col-lg-12 col-12">	
            <ul class="nav customize-tab tabs_creative smalls scroll-tab bg-light align-items-center justify-content-center px-4 py-2 rounded-3 mb-4" id="courseTab" role="tablist">
                <li class="nav-item ms-0" role="presentation">
                    <a class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true">
                        Toutes les formations
                    </a>
                </li>
            </ul>	
        </div>
        
        <!-- Tab Content -->
        <div class="col-xl-12 col-lg-12 col-12">
            
            <div class="tab-content" id="courseTabContent">
                
                <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
                    <div v-if="coursesList.length > 0" class="row justify-content-center g-3">
                        
                        <div class="col-xl-3 col-lg-4 col-md-6" v-for="(item, index) in coursesList" :key="index">
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt="" @error="(e) => { e.target.src = '/img/courses-1.jpg' }"></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{ item.title }}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures || 0}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level || 'Tous niveaux'}}</li>
                                            <li><i class="bi bi-coin"></i>{{item.is_free ? 'Gratuit' : (item.price ? `$${item.price}` : 'Sur candidature')}}</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg || '/assets/img/avatar-1.jpg'" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName || 'ALREI'}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><NuxtLink :to="`/course-detail/${item.id}`" class="main-link fw-medium">S'inscrire<i class="bi bi-arrow-right ms-2"></i></NuxtLink></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>

                    <div v-else class="text-center py-4 text-muted">
                        <p class="mb-0">Aucun cours disponible pour le moment.</p>
                    </div>
                </div>
                
            </div>
            
        </div>
        
    </div>
</template>

<script setup>
const api = useApi()
const coursesList = ref([])

const fallbackImages = [
    '/img/co-1.jpg',
    '/img/co-2.jpg',
    '/img/co-3.jpg',
    '/img/co-4.jpg',
    '/img/co-5.jpg',
    '/img/co-6.jpg',
    '/img/co-7.jpg',
    '/img/co-8.jpg'
]
const getFallback = (idOrIndex) => {
    const idx = Math.abs(Number(idOrIndex) || 0) % fallbackImages.length
    return fallbackImages[idx]
}

const config = useRuntimeConfig()
const getImageUrl = (path, fallback) => {
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
    try {
        const response = await api('/courses')
        const rawList = Array.isArray(response) ? response : (response?.data || [])
        const { getThemeImage } = useCourseTheme()
        coursesList.value = rawList.map((c, idx) => {
            return {
                id: c.id,
                slug: c.slug || c.id,
                image: getThemeImage(c, idx),
                title: c.title,
                lectures: c.sections?.reduce((acc, s) => acc + (s.lessons?.length || 0), 0) || 0,
                level: c.level || 'Tous niveaux',
                price: c.price,
                is_free: c.is_free,
                autherName: c.instructor?.user?.name || 'ALREI',
                autherImg: c.instructor?.user?.avatar || '/assets/img/avatar-1.jpg'
            }
        })
    } catch (error) {
        coursesList.value = []
    }
})
</script>