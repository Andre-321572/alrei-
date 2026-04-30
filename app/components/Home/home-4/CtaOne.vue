<template>
    <section class="py-0">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="bg-cover bg-main rounded-4 position-relative" :style="bannerBg">
                        <div class="row align-items-start">
                            <div class="col-xxl-6 col-xl-7 col-lg-9">
                                <div class="py-5 px-md-5 px-4">
                                    <div class="become-content d-block mb-4">
                                        <h2 class="text-light">Join LearnUp Membership & Get Certificate!</h2>
                                        <p class="text-light fs-6 opacity-75">Connect with Experienced Professionals Who Are Passionate About Teaching</p>
                                    </div>
                                    <div class="btn-block">
                                        <a href="#" class="btn btn-lg btn-dark rounded-pill px-5">Become a Tutor</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="position-absolute end-0 bottom-0 d-lg-block d-none">
                            <img :src="cta2" class="img-fluid" width="470" alt="Image">								
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import cta2 from '@/assets/img/2.png'

import { computed } from 'vue'

/* Banner Background */
import becomebg from '@/assets/img/become-bg.png'

const bannerBg = computed(() => ({
    backgroundImage: `url(${becomebg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))
</script>