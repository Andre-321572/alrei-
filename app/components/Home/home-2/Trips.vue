<template>
    <div class="trips_wrap full bg-alrei-green py-4">
        <div class="container">
            <div class="row g-4">
            
                <div class="col-lg-4 col-md-4 col-sm-12" v-for="(item, index) in trips" :key="index">
                    <div class="trips d-flex align-items-center gap-3 pe-xl-5">
                        <div class="trips_icons flex-1">
                            <span class="square--60 circle bg-transparents"><i :class="item.icon"></i></span>
                        </div>
                        <div class="trips_detail">
                            <h5 class="text-light lh-base mb-0">{{ $t(item.titleKey) }}</h5>
                            <p class="text-light opacity-75 lh-base m-0">{{ $t(item.descKey) }}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
const trips = [
    {
        icon: 'bi bi-camera-video fs-4 text-light',
        titleKey: 'trip_1_title',
        descKey: 'trip_1_desc'
    },
    {
        icon: 'bi bi-person-check fs-4 text-light',
        titleKey: 'trip_2_title',
        descKey: 'trip_2_desc'
    },
    {
        icon: 'bi bi-award fs-4 text-light',
        titleKey: 'trip_3_title',
        descKey: 'trip_3_desc'
    }
]
</script>