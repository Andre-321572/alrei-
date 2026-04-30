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
                                <NuxtLink :to="`/course-detail/${item.slug}`"><img :src="item.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid" alt=""></NuxtLink>
                                <div class="course-hours position-absolute top-0 start-0 ms-3 mt-3">
                                    <span class="badge bg-dark rounded-pill"><i class="bi bi-clock-history me-1"></i>{{ item.level }}</span>
                                </div>
                            </div>
                            
                            <div class="education-body p-3">
                                <div class="education-title">
                                    <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.slug}`">{{item.title}}</NuxtLink></h4>
                                </div>
                                
                                <div class="cources-info">
                                    <ul>
                                        <li><i class="bi bi-person"></i> {{ item.instructor?.user?.name }}</li>
                                        <li><i class="bi bi-bar-chart"></i>{{ item.level }}</li>
                                        <li><i class="bi bi-coin"></i>{{ item.price }} FCFA</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="education-footer border-0 p-3 pt-2">
                                <NuxtLink :to="`/course-detail/${item.slug}`" class="btn btn-md btn-outline-gray border-2 rounded-pill w-100">{{ $t('view_course') }}<i class="bi bi-arrow-right ms-2"></i></NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

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
        const response = await api('/courses', { params: { per_page: 12 } })
        courses.value = response.data
        await nextTick()
        initSlider()
    } catch (error) {
        console.error('Failed to fetch courses:', error)
    }
})
</script>