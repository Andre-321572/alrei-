<template>
    <div class="ed_view_box border">

        <div class="courses-video">
            <div class="thumb">
                <img class="pro_img img-fluid w100" :src="courses4" alt="7.jpg">
                <div class="overlay_icon">
                    <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bb-video-box">
                        <a href="#" class="play-popup-video">
                            <i class="bi bi-play-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="author-body py-3">
            <div class="ed_view_price">
                <span class="badge bg-light-red text-red rounded-pill">25% off</span>
                <h2 class="lh-base">$179.45</h2>
            </div>
            <div class="ed_view_features mb-4">
                <h6 class="fw-semibold">Course Features</h6>
                <ul>

                    <li v-for="(item, index) in feature" :key="index">
                        <i class="bi bi-check-circle-fill me-2 text-green"></i>
                        {{item}}
                    </li>
                    
                </ul>
            </div>
            <div class="ed_view_link d-flex align-items-center justify-content-center flex-column gap-3 m-0 p-0">
                <a href="#" class="btn btn-gray rounded-pill w-100"><i class="bi bi-basket2 me-2"></i>Add To Cart</a>
                <a href="#" class="btn btn-main w-100 rounded-pill">Enrolled Now</a>
            </div>
        </div>

    </div>

    <div class="edu_wraper border">
        <h4 class="edu_title">Course Features</h4>
        <ul class="edu_list right">
            
            <li v-for="(item, index) in data" :key="index">
                <span class="info-title"><i :class="item.icon"></i>{{item.title}}</span>
                <span class="text-dark right">{{item.desc}}</span>
            </li>
            
        </ul>
    </div>
</template>

<script setup>

import courses4 from "@/assets/img/courses-4.jpg";

const feature = [
    'Fully Programming','Help Code to Code','Free Trial 7 Days','Unlimited Videos','24x7 Support'
]

const data = [
    { icon:'bi bi-people', title:'Student Enrolled', desc:'1740' },
    { icon:'bi bi-camera-reels', title:'Lectures', desc:'10' },
    { icon:'bi bi-controller', title:'Quizzes', desc:'4' },
    { icon:'bi bi-clock-history', title:'Duration', desc:'60h 40min' },
    { icon:'bi bi-tags', title:'Skill Level', desc:'Beginner' },
    { icon:'bi bi-flag', title:'Language', desc:'English' },
    { icon:'bi bi-shield-check', title:'Certification', desc:'Yes' },
]

</script>