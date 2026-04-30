<template>
    <div class="row justify-content-center">
        <div class="col-xxl-7 col-xl-8 col-lg-10 col-lg-12">
            
            <div class="arrow_slide arrow_middle" id="testimonials_style">
                
                <div ref="slider" class="tiny-slider">
                    <div class="single-item" v-for="(item, index) in reviewData" :key="index">
                        <div class="single-reviews-wraps">
                            <div class="reviewer-thumb text-center mb-3">
                                <div class="mx-auto square--90 circle position-relative mb-3">
                                    <img :src="item.image" class="img-fluid circle" alt="Avatar">
                                    <span></span>
                                </div>
                                <div class="text-center">
                                    <h6 class="mb-0">{{item.name}}</h6>
                                    <p class="text-muted-2 m-0">Student</p>
                                </div>
                            </div>
                            <div class="review-content text-center">
                                <div class="rating-star d-flex align-items-center justify-content-center text-mid gap-1 mb-2">
                                    <span v-for="(rate, i) in item.rating" :key="i" class="text-warning">
                                        <i :class="rate"></i>
                                    </span>
                                </div>
                                <div class="caption">
                                    <h5 class="text-dark">{{item.title}}</h5>
                                    <p class="fs-6 text-muted-2">{{item.desc}}</p>
                                </div>
                            </div>
                        </div>	
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { reviewData } from '@/data/data.js'

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
    item:1,
    gutter:0
  })
})
</script>