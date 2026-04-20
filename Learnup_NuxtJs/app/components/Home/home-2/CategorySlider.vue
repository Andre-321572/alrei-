<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            <div class="arrow_slide categories-slide arrow_middle">
                
                <div ref="slider" class="tiny-slider">
                    <div class="singles_items" v-for="(item, index) in categoryOne" :key="index">
                        <div class="card-hover style-2 p-4 rounded-3 card card-body d-flex flex-column gap-3 m-0">
                            <div class="icon-wraps">
                                <span class="icon-slap fs-1"><i :class="item.icon"></i></span>
                            </div>
                            <div>
                                <h4 class="text-dark fw-normal mb-0 lh-base">{{item.title}}</h4>
                                <span class="text-muted-2">
                                    <span class="fw-semibold me-1">{{item.count}}</span>Courses
                                </span>
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

import { categoryOne } from '@/data/data.js'

const { $tns } = useNuxtApp()

const slider = ref(null)

onMounted(() => {
  $tns({
    container: slider.value,
    nav: true,
    mouseDrag: true,
    loop: true,
    autoplay: true,
    rewind: true,
    autoplayButtonOutput: false,
    speed: 400,
    autoplayTimeout: 3000,
    controls: false,
    navPosition: "bottom",
    controlsText: [
        '<i class="bi bi-chevron-left"></i>', 
        '<i class="bi bi-chevron-right"></i>'
    ],
    responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
        1200: { items: 5 },
    }
  })
})
</script>