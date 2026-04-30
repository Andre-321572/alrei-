<template>
    <div class="row justify-content-center gx-xl-5 g-4">
                
        <div 
            class="col-lg-4 col-md-4 col-sm-12"
            v-for="(item, index) in data"
            :key="index"
        >
            <div class="prc-wraps">
                <div class="prc-thumb text-center mb-3">
                    <img :src="item.image" class="img-fluid w-20" alt="" />
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

import search from '@/assets/img/search.png'
import schedule from '@/assets/img/schedule.png'
import medal from '@/assets/img/medal.png'

const data = [
    {
        image: search,
        title: 'Find Course',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
        image: schedule,
        title: 'Book Your Scat',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
        image: medal,
        title: 'Get Certified',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    }
]
</script>