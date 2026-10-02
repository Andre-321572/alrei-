<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            
            <div v-if="coursesList.length > 0" class="arrow_slide four_slide arrow_middle">

                <div ref="slider" class="tiny-slider">
                
                    <div class="singles_items" v-for="(item, index) in coursesList.slice(0, 12)" :key="index">
                        <div class="education_block_grid border">
            
                            <div class="education-thumb position-relative">
                                <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                    <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                </div>
                                <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt="" @error="(e) => { e.target.src = getFallback(item.id || index) }"></NuxtLink>
                            </div>
                            
                            <div class="education-body p-3">
                                <div class="education-title">
                                    <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{item.title}}</NuxtLink></h4>
                                </div>
                                
                                <div class="cources-info">
                                    <ul>
                                        <li><i class="bi bi-camera-reels"></i>{{item.lectures || 0}} Lectures</li>
                                        <li><i class="bi bi-bar-chart"></i>{{item.level || 'Tous niveaux'}}</li>
                                        <li><i class="bi bi-coin"></i>{{item.is_free ? 'Gratuit' : (item.price ? `$${item.price}` : 'Sur candidature')}}</li>
                                        <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">5.0</span></li>
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
                
            </div>
            
            <div v-else class="text-center py-4 text-muted">
                <p class="mb-0">Aucun cours disponible pour le moment.</p>
            </div>

        </div>
    </div>
</template>

<script setup>
const api = useApi()
const { $tns } = useNuxtApp() 

const slider = ref(null)
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

        if (coursesList.value.length > 0 && slider.value) {
            nextTick(() => {
                $tns({
                    container: slider.value,
                    items: 4,
                    slideBy: 1,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayButtonOutput: false,
                    loop: true,
                    rewind: true,
                    mouseDrag: true,
                    nav: false,
                    controlsText: [
                        '<i class="bi bi-chevron-left"></i>',
                        '<i class="bi bi-chevron-right"></i>',
                    ],
                    responsive: {
                        0: { items: 1 },
                        576: { items: 2 },
                        992: { items: 3 },
                        1200: { items: 4 },
                    },
                })
            })
        }
    } catch (error) {
        coursesList.value = []
    }
})
</script>