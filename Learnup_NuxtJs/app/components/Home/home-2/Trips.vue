<template>
    <div class="trips_wrap full bg-main py-4">
        <div class="container">
            <div class="row g-4">
            
                <div class="col-lg-4 col-md-4 col-sm-12" v-for="(item, index) in tripsData" :key="index">
                    <div class="trips d-flex align-items-center gap-3 pe-xl-5">
                        <div class="trips_icons flex-1">
                            <span class="square--60 circle bg-transparents"><i :class="item.icon"></i></span>
                        </div>
                        <div class="trips_detail">
                            <h5 class="text-light lh-base mb-0">{{item.title}}</h5>
                            <p class="text-light opacity-75 lh-base m-0">{{item.desc}}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { tripsData } from '@/data/data.js'
</script>