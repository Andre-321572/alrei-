<template>
    <div class="row align-items-center justify-content-center g-4 gx-lg-5">
            
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div class="benifit-oflearning">
                <div class="d-block mb-4">
                    <h2>{{ $t('benefit_online_learning') }}</h2>
                    <p>{{ $t('benefit_subtitle') }}</p>
                </div>
                
                <div class="benifit-wraps mb-4">
                    <div class="d-flex flex-column gap-4">
                        
                        <div class="d-flex align-items-center justify-content-start gap-3" v-for="(item, index) in data" :key="index">
                            <div class="icons"><span class="square--50 circle bg-light-green fs-5"><i class="bi bi-patch-check-fill text-green"></i></span></div>
                            <div class="caps">
                                <h5>{{ $t(item.titleKey) }}</h5>
                                <p class="text-muted-2 m-0">{{ $t(item.descKey) }}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <NuxtLink :to="localePath('/register?tab=register')" class="btn btn-main rounded-pill px-5">{{ $t('create_account') }}</NuxtLink>
            </div>
            
        </div>
        
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div class="facts-img">
                <img :src="hero2" class="img-fluid" alt="" />
            </div>
        </div>

    </div>
</template>

<script setup>
import hero2 from "@/assets/img/hero-img-2.png"

const localePath = useLocalePath()

const data = [
    {
        titleKey: 'benefit_1_title',
        descKey: 'benefit_1_desc'
    },
    {
        titleKey: 'benefit_2_title',
        descKey: 'benefit_2_desc'
    },
    {
        titleKey: 'benefit_3_title',
        descKey: 'benefit_3_desc'
    },
]
</script>