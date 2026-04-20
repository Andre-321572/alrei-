<template>
    <div class="row justify-content-center g-4">

        <div 
            class="col-lg-4 col-md-4 col-sm-6" 
            v-for="(item, index) in featureCategoryData" 
            :key="index"
        >
            <div :class="`edu_cat_2 cat-${index + 1}`">
                <div class="edu_cat_icons">
                    <a class="pic-main" href="#"><img :src="item.image" class="img-fluid" alt="" /></a>
                </div>
                <div class="edu_cat_data">
                    <h4 class="title"><a href="#">{{item.title}}</a></h4>
                    <ul class="meta">
                        <li class="video"><i class="ti-video-clapper"></i>{{item.class}} Classes</li>
                    </ul>
                </div>
            </div>							
        </div>
        
    </div>
</template>

<script setup>
import { featureCategoryData } from '@/data/data.js'
</script>