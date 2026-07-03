<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            <div class="arrow_slide four_slide arrow_middle">
                
                <div ref="slider" class="tiny-slider">
                    <div class="singles_items" v-for="(item, index) in courses" :key="index">
                        <div class="education_block_grid border">
            
                            <div class="education-thumb position-relative">
                                <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                    <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                </div>
                                <NuxtLink :to="`/course-detail/${item.slug}`"><img :src="item.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid w-100 object-fit-cover" style="height: 180px;" alt=""></NuxtLink>
                            </div>
                            
                            <div class="education-body p-3">
                                <div class="education-title">
                                    <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.slug}`">{{item.title}}</NuxtLink></h4>
                                </div>
                                
                                <div class="cources-info">
                                    <ul>
                                        <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                        <li><i class="bi bi-coin"></i>{{ $t('free') }}</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="education-footer p-3">
                                <div class="education_block_author">
                                    <div class="d-flex align-items-center justify-content-start gap-2">
                                        <span class="square--30"><img :src="item.instructor?.user?.avatar || '/img/user-placeholder.jpg'" class="img-fluid circle" alt="Author"></span>
                                        <span class="text-dark fw-medium">{{item.instructor?.user?.name}}</span>
                                    </div>
                                </div>
                                <div class="enrolled-link"><NuxtLink :to="`/course-detail/${item.slug}`" class="main-link fw-medium">{{ $t('view_course') }}<i class="bi bi-arrow-right ms-2"></i></NuxtLink></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>

const { $tns } = useNuxtApp()
const api = useApi()
const courses = ref([])
const slider = ref(null)

const initSlider = () => {
    if (courses.value.length === 0) return
    
    $tns({
        container: slider.value,
        nav: false,
        mouseDrag: true,
        loop: true,
        autoplay: true,
        rewind: true,
        autoplayButtonOutput: false,
        speed: 400,
        autoplayTimeout: 3000,
        controlsText:['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            992: { items: 3 },
            1200: { items: 4 },
        },
    })
}

onMounted(async () => {
    try {
        // En attendant un filtre "price" sur l'API, on récupère tout et on filtre côté client
        // Ou mieux, on ajoute le paramètre si l'API le supporte (je l'ai ajouté dans le service)
        const response = await api('/courses', { params: { price: 0, per_page: 8 } })
        courses.value = response.data
        await nextTick()
        initSlider()
    } catch (error) {
        console.error('Failed to fetch free courses:', error)
    }
})
</script>