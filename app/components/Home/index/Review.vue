<template>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-lg-12">	
            
            <div class="arrow_slide reviews-slide arrow_middle">
                
                <div ref="slider" class="tiny-slider">
                    <div class="singles_items" v-for="(item, index) in reviewData" :key="index">
                        <div class="card-hover p-4 rounded-3 card card-body m-0">
                            <div class="rating-star">
                                <div class="d-flex align-items-center gap-1 mb-2">
                                    <span v-for="(rate, idx) in item.rating" :key="idx" class="text-warning">
                                        <i :class="rate"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="review-caption d-block mb-4">
                                <h5 class="text-dark fw-semibold mb-0 lh-base">{{item.title}}</h5>
                                <p class="text-muted-2">
                                    {{item.desc}}
                                </p>
                            </div>
                            <div class="d-flex bg-light align-items-center justify-content-between rounded-3 p-3">
                                <div class="revierwer-avatar d-flex align-items-center gap-2">
                                    <div class="avatar-box"><img :src="item.image" class="img-fluid square--50 circle" alt="Avatar Image"></div>
                                    <div class="reviewer-caps">
                                        <h6 class="fw-semibold text-dark m-0">{{item.name}}</h6>
                                        <p class="text-muted-2 m-0 text-mid">{{item.date}}</p>
                                    </div>
                                </div>
                                <div class="reviewer-post"><span class="badge bg-green rounded-pill">Student</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { reviewData } from '@/data/data.js'

const { $tns } = useNuxtApp()

const slider = ref(null)

onMounted(() => {
  $tns({
    container: slider.value,
    items: 3,
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButtonOutput: false,
    loop: true,
    rewind: true,
    mouseDrag: true,
    nav: false,
    controls: false,
    gutter: 0,
    speed: 400,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 }
    }
  })
})
</script>