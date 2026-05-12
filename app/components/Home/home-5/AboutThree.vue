<template>
    <div class="row align-items-center justify-content-center g-4 gx-lg-5">
            
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 order-lg-2">
            <div class="benifit-oflearning">
                <div class="d-block mb-4">
                    <h2 class="display-5 fw-normal text-dark">Why Alrei<br> Learning Platform?</h2>
                    <p class="text-muted">We’re developing an innovative Bootstrap-powered UI Kit tool designed specifically for developers, engineers, full-stack developers, and digital agencies.</p>
                    <p class="text-muted">You made all the required mock ups for commissioned layout, got all the approvals, built a tested code base or had them built, you decided on a content management system, got a license for it or adapted open source software for your client's needs.</p>
                </div>
                
                <div class="benifit-wraps mb-4">
                    <ul class="p-0 m-0 row g-4">
                        <li class="col-sm-6 fs-5">
                            <div class="d-flex align-items-center gap-2">
                                <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6">Wide Range of Courses</span>
                            </div>
                        </li>
                        <li class="col-sm-6 fs-5">
                            <div class="d-flex align-items-center gap-2">
                                <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6">Cost-Effective</span>
                            </div>
                        </li>
                        
                        <li class="col-sm-6 fs-5">
                            <div class="d-flex align-items-center gap-2">
                                <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6">Global Networking</span>
                            </div>
                        </li>
                        <li class="col-sm-6 fs-5">
                            <div class="d-flex align-items-center gap-2">
                                <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6">Get Certificate</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <a href="#" class="btn btn-main rounded-pill px-5">Create an Account</a>
            </div>
            
        </div>
        
        <div class="col-xl-5 col-lg-6 col-md-12 col-sm-12">
            <div class="facts-img">
                <img :src="custom5" class="img-fluid" alt="" />
            </div>
        </div>

    </div>
</template>

<script setup>
import custom5 from "@/assets/img/custom-img-5.png"
</script>