<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            
            <div class="arrow_slide four_slide arrow_middle">
                
                <div ref="slider" class="tiny-slider">
                    <div class="singles_items" v-for="(item, index) in instructorsData" :key="index">
                        <div class="card rounded-4 border">
                            <div class="p-2 d-flex flex-column gap-3">
                            
                                <!--img-->
                                <a href="#!">
                                    <img :src="item.image" alt="mentor 2" class="img-fluid w-100 rounded-4">
                                </a>
                                
                                <!--content-->
                                <div class="d-flex flex-column gap-4">
                                    <div class="d-flex flex-column gap-2">
                                        <div class="tutor-head-info">
                                            <div class="d-flex align-items-center gap-2">
                                                <h5 class="mb-0"><NuxtLink :to="`/instructor-detail/${item.id}`" class="text-reset">{{item.name}}</NuxtLink></h5>
                                                <span class="verified-tutor">
                                                    <i class="bi bi-patch-check-fill text-green"></i>
                                                </span>
                                            </div>
                                            <span class="text-muted-2">{{item.roal}}</span>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="caps-employers text-mid text-muted"><span>@{{item.company}}</span></div>
                                            <div class="cap-expe text-mid text-muted"><span>2yrs Exp.</span></div>
                                            <div class="d-flex gap-1 align-items-center lh-1">
                                                <i class="bi bi-star-fill text-warning"></i>
                                                <span class="fw-bold text-dark">{{item.rate}}</span>
                                                <span class="text-mid text-muted">({{item.review}} Reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row justify-content-between align-items-center">
                                        <div>
                                            <span class="text-md">Starting from</span>
                                            <div class="d-flex flex-row gap-1 align-items-center">
                                                <h4 class="mb-1">$89.0</h4>
                                                <span class="fs-6">/ Mo</span>
                                            </div>
                                        </div>
                                        <div class="caps-button">
                                            <a href="#!" class="btn btn-sm btn-outline-dark px-3" data-bs-toggle="modal" data-bs-target="#signupModal">Book a Free Trial</a>
                                        </div>
                                    </div>
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
    gutter:0
  })
})
</script>