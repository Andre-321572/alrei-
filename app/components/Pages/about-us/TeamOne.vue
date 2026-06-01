<template>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
        
            <div class="four_slide articles arrow_middle">
                
                <div ref="slider" class="tiny-slider">
                    <div class="singles_items" v-for="(item, index) in instructorsData" :key="index">
                        <div class="team-card card rounded-4 px-4 py-5">
                            <div class="team-thumb text-center mb-3">
                                <div class="thumb-lg mx-auto circle"><img :src="item.image" class="img-fluid circle" alt="Team Image"></div>
                            </div>
                            <div class="team-caption text-center mb-4">
                                <h5 class="m-0">{{item.name}}</h5>
                                <p class="text-muted-2 m-0">Team Manager</p>
                            </div>
                            
                            <div class="social-info">
                                <ul class="d-flex align-items-center justify-content-center gap-2 flex-wrap p-0">
                                    <li><a href="#" class="square--40 circle btn-gray"><i class="bi bi-facebook"></i></a></li>
                                    <li><a href="#" class="square--40 circle btn-gray"><i class="bi bi-twitter"></i></a></li>
                                    <li><a href="#" class="square--40 circle btn-gray"><i class="bi bi-linkedin"></i></a></li>
                                    <li><a href="#" class="square--40 circle btn-gray"><i class="bi bi-youtube"></i></a></li>
                                </ul>
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