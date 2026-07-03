<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            
            <div class="arrow_slide four_slide arrow_middle">

                <div ref="slider" class="tiny-slider">
                
                    <div class="singles_items" v-for="(item, index) in coursesData.slice(0, 12)" :key="index">
                        <div class="education_block_grid border">
            
                            <div class="education-thumb position-relative">
                                <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                    <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                </div>
                                <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                            </div>
                            
                            <div class="education-body p-3">
                                <div class="education-title">
                                    <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{item.title}}</NuxtLink></h4>
                                </div>
                                
                                <div class="cources-info">
                                    <ul>
                                        <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                        <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                        <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                        <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="education-footer p-3">
                                <div class="education_block_author">
                                    <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                        <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                        <span class="text-dark fw-medium">{{item.autherName}}</span>
                                    </a>
                                </div>
                                <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { coursesData } from '@/data/data.js'

const { $tns } = useNuxtApp() 

const slider = ref(null)

onMounted(() => {
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
</script>