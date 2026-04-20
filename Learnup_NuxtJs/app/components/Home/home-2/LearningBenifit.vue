<template>
    <div class="row align-items-center justify-content-center g-4 gx-lg-5">
            
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div class="benifit-oflearning">
                <div class="d-block mb-4">
                    <h2>Benifit of online learning</h2>
                    <p>We’re developing an innovative Bootstrap-powered UI Kit tool designed specifically for developers, engineers, full-stack developers, and digital agencies.</p>
                </div>
                
                <div class="benifit-wraps mb-4">
                    <div class="d-flex flex-column gap-4">
                        
                        <div class="d-flex align-items-center justify-content-start gap-3" v-for="(item, index) in data" :key="index">
                            <div class="icons"><span class="square--50 circle bg-light-green fs-5"><i class="bi bi-patch-check-fill text-green"></i></span></div>
                            <div class="caps">
                                <h5>{{item.title}}</h5>
                                <p class="text-muted-2 m-0">{{item.desc}}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <a href="#" class="btn btn-main rounded-pill px-5">Create an Account</a>
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

    const data = [
        {
            title:'Wide Range of Courses',
            desc:'Choose from thousands of subjects and skills.'
        },
        {
            title:'Cost-Effective',
            desc:'Often more affordable than traditional classroom learning.'
        },
        {
            title:'Global Networking',
            desc:'Connect with learners and instructors from around the world.'
        },
    ]
</script>