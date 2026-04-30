<template>
    <div class="row justify-content-center">
        <div class="col-xl-12 col-lg-12 col-12">
            <div class="single_brand" id="brand-slide">
                    
                <div ref="slider" class="tiny-slider">
                    <div class="single_brands" v-for="(item, index) in partnerImg" :key="index">
                        <img :src="item" class="img-fluid" alt="" />
                    </div>
                </div>
                
            </div>
        
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { partnerImg } from '@/data/data.js'

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
    controls:false,
    controlsText:['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
        1200: { items: 5 },
    },
    gutter:0
  })
})
</script>