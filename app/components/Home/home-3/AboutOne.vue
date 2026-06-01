<template>
     <div class="row g-4 align-items-center">
            
        <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="benifit-oflearning">
                <div class="d-block mb-4">
                    <h2>Why Choose LearnUp Online Platform for Grow My Career</h2>
                    <p class="text-muted">We’re developing an innovative Bootstrap-powered UI Kit tool designed specifically for developers, engineers, full-stack developers, and digital agencies.</p>
                    <p class="text-muted">You made all the required mock ups for commissioned layout, got all the approvals, built a tested code base or had them built, you decided on a content management system, got a license for it or adapted open source software for your client's needs.</p>
                </div>
                
                <div class="benifit-wraps mb-4">
                    <ul class="p-0 m-0 row g-4">

                        <li 
                            class="col-sm-6 fs-5"
                            v-for="(item, index) in data"
                            :key="index"
                        >
                            <div class="d-flex align-items-center gap-2">
                                <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6">
                                    {{ item }}
                                </span>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <a href="#" class="btn btn-main rounded-pill px-5">Create an Account</a>
            </div>
            
        </div>
        
        <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="facts-img">
                <img :src="heroImg" class="img-fluid" alt="" />
            </div>
        </div>

    </div>
</template>

<script setup>

const data = [
    "Wide Range of Courses",
    "Cost-Effective",
    "Global Networking",
    "Get Certificate"
]

import heroImg from "@/assets/img/hero-img-5.png"

</script>