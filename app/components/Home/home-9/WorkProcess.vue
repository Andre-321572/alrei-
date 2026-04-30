<template>
    <div class="row justify-content-center gx-xl-5 g-4">
                
        <div 
            class="col-lg-4 col-md-4 col-sm-12"
            v-for="(item, index) in workData"
            :key="index"
        >
            <div class="prc-wraps">
                <div class="prc-icons mb-3">
                    <div :class="`square--80 circle bg-light-${item.theme} mx-auto`">
                        <span :class="`text-${item.theme} fs-3`"><i :class="item.icon"></i></span>
                    </div>
                </div>
                <div class="prc-caption text-center">
                    <h4>{{item.title}}</h4>
                    <p class="text-muted-2">{{item.desc}}</p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { workData } from '@/data/data.js'
</script>