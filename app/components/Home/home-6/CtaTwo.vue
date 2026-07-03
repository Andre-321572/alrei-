<template>
    <section class="bg-cover newsletter bg-main position-relative" :style="subscribeBgStyle">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 col-lg-9 col-md-10 col-sm-12">
                    <div class="text-start">
                        <div class="subscribe-caption d-block mb-4">
                            <div class="d-flex align-items-center mb-1"><span  class="label bg-warning rounded-pill text-dark"><i class="bi bi-patch-check me-2"></i>Get Certificate</span></div>
                            <h2 class="fs-1 lh-base text-light">Advance Your Learning with Alrei's Quality Certification</h2>
                            <p class="text-light opacity-75">Subscribe our newsletter & get latest news and updation!</p>
                        </div>
                        <div class="d-block join-block">
                            <div class="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                <a href="#" class="btn mid btn-whites rounded-pill px-4">Get Started Today<i class="bi bi-send ms-2"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-absolute end-0 bottom-0 d-none d-lg-block"><img :src="subscribeShapes" class="img-fluid" width="500" alt="Image"></div>
    </section>
</template>

<script setup>


import subscribeShapes from '@/assets/img/subscribe-shapes.png'

/* Banner Background */
import subscribeBg from '@/assets/img/subscribe-bg.png'

const subscribeBgStyle = computed(() => ({
    backgroundImage: `url(${subscribeBg})`,
    backgroundRepeat: 'no-repeat',
}))

</script>