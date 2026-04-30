<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            
            <div class="arrow_slide four_slide arrow_middle">
                
                <div ref="slider" class="tiny-slider">
                    <div class="singles_items" v-for="(item, index) in instructorsData" :key="index">
                        <div class="tutor-card card border rounded-3 px-3 py-4 pt-5">
                    
                            <div class="position-absolute end-0 top-0 mt-3 me-3"><span class="badge bg-light-pro text-pro fw-semibold text-uppercase">Pro</span></div>								
                            <div class="tutor-thumb d-flex align-items-center justify-content-center mb-2">
                                <div class="square--90"><img :src="item.image" class="img-fluid circle" alt="Tutor"></div>
                            </div>
                            
                            <div class="d-flex flex-column gap-1 mb-5">
                                <div class="d-flex align-items-center justify-content-center">
                                    <h6 class="fw-semibold lh-0 m-0">{{item.name}}</h6>
                                </div>
                                <div class="d-block text-center"><span class="text-muted">{{item.roal}}</span></div>
                                <div class="d-flex align-items-center justify-content-center gap-1">
                                    <span class="rating-star"><i class="bi bi-star-fill text-warning"></i></span>
                                    <span class="fw-semibold text-dark">{{item.rate}}</span>
                                    <span class="text-muted text-mid">({{item.review}}k Reviews)</span>
                                </div>
                            </div>
                            
                            <div class="tutor-thumb d-flex align-items-center justify-content-center">
                                <NuxtLink :to="`/instructor-detail/${item.id}`" class="btn btn-md btn-gray rounded-pill w-100">View Profile</NuxtLink>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { instructorsData } from '@/data/data.js'

const { $tns } = useNuxtApp()

const slider = ref(null)

onMounted(() => {
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
})
</script>