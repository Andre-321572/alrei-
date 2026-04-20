<template>
    <div class="row align-items-center justify-content-center gx-xl-5 gx-lg-5 g-4">
            
        <div class="col-xl-6 col-lg-6 col-sm-12">
            <div class="history-Wraping">
                <div class="d-block mb-4">
                    <h2 class="display-5 fw-normal">Explore Our History & <br>Core Value</h2>
                    <p class="text-muted-2">You made all the required mock ups for commissioned layout, got all the approvals, built a tested code base or had them built, you decided on a content management system, got a license for it or adapted open source software for your client's needs.</p>
                </div>
                
                <div class="benifit-wraps mb-4">
                    <div class="d-flex flex-column gap-4">
                        
                        <div 
                            class="d-flex align-items-center justify-content-start gap-3"
                            v-for="(item, index) in data"
                            :key="index"
                        >
                            <div class="icons"><span class="square--50 circle bg-light-green fs-5"><i class="bi bi-patch-check-fill text-green"></i></span></div>
                            <div class="caps">
                                <h5>{{item.title}}</h5>
                                <p class="text-muted-2 m-0">{{item.desc}}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <a href="#" class="btn btn-dark rounded-pill px-5">Get Membership</a>
            </div>
            
        </div>
        
        <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12 order-lg-2">
            <div class="facts-img">
                <img :src="aboutImg" class="img-fluid" alt="" />
            </div>
        </div>

    </div>
</template>

<script setup>

import aboutImg from '@/assets/img/custom-img-1.png'

const data = [
    {
        title: 'Wide Range of Courses',
        desc: 'Choose from thousands of subjects and skills.'
    },
    {
        title: 'Cost-Effective',
        desc: 'Often more affordable than traditional classroom learning.'
    },
    {
        title: 'Global Networking',
        desc: 'Connect with learners and instructors from around the world.'
    },
]

</script>