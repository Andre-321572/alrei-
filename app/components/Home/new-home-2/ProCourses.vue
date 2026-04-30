<template>
    <div class="row justify-content-center gx-lg-3 g-4">
                    
        <div 
            class="col-xl-3 col-lg-4 col-md-6"
            v-for="(item, index) in freeCoursesData"
            :key="index"
        >
            <div class="education_block_grid border">
            
                <div class="education-thumb position-relative">
                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                    <div class="course-hours position-absolute top-0 start-0 ms-2 mt-2">
                        <span class="badge bg-dark rounded-pill"><i class="bi bi-clock-history me-1"></i>22h 10m</span>
                    </div>
                </div>
                
                <div class="education-body p-3">
                    <div class="education-title">
                        <div class="course-type d-flex align-items-center gap-2 mb-1">
                            <span class="badge bg-light-green text-green rounded-pill">{{item.level}}</span>
                            <span class="badge bg-light-red text-red rounded-pill">Pro</span>
                        </div>
                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`" class="text-dark">{{item.title}}</NuxtLink></h4>
                    </div>
                    
                    <div class="courses-ratings mb-4">
                        <div class="d-flex align-items-center gap-1">
                            <div class="stars d-flex align-items-center gap-1">
                                <i class="bi bi-star-fill text-warning" v-for="i in 5" :key="i"></i>
                            </div>
                            <span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span>
                            <span class="total-reviews">({{item.review}})</span>
                        </div>
                    </div>
                    
                    <div class="education_block_author">
                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                            <span class="square--40"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                            <div class="d-flex align-items-start flex-column">
                                <span class="text-dark fw-light opacity-75">Lectures By:</span><span class="text-dark fw-semibold">{{item.autherName}}</span>
                            </div>
                        </a>
                    </div>
                </div>
                
                <div class="education-footer p-3">
                    <div class="corses-price">
                        <h5 class="m-0 fw-semibold text-red"><span class="text-dark">$</span>{{item.price}}</h5>
                    </div>
                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                </div>
            </div>	
        </div>
        
    </div>
</template>

<script setup>
import { freeCoursesData } from '@/data/data.js'
</script>