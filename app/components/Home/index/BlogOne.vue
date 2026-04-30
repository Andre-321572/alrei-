<template>
    <div class="row justify-content-center g-4">
                    
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in blogData.slice(0, 3)" :key="index">
            <div class="card mb-4 shadow-sm card-lift">
                <NuxtLink :to="`/blog-detail/${item.id}`">
                    <img :src="item.image" class="img-fluid" alt="Blog Img Title ">
                </NuxtLink>
                <!-- Card body -->
                <div class="card-body">
                    <div class="d-flex mb-2"><a href="#" class="badge bg-light-green text-green rounded-2">Tutorial</a></div>
                    <h4 class="grid-blog-heading lh-base">
                        <NuxtLink :to="`/blog-detail/${item.id}`" class="text-inherit">{{item.title}}</NuxtLink>
                    </h4>
                    <p>{{item.desc}}</p>
                    <!-- Row  -->
                    <div class="row align-items-center g-0 mt-4">
                        <div class="col-auto">
                            <img :src="item.avatarImg" alt="avatar" class="img-fluid circle w-10">
                        </div>
                        <div class="col ps-2">
                            <h6 class="lh-1 mb-0">{{item.avatarName}}</h6>
                            <p class="text-muted-2 text-md mb-0">{{item.date}}</p>
                        </div>
                        <div class="col-auto">
                            <p class="text-muted text-mid m-0">{{item.time}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { blogData } from '@/data/data.js'
</script>