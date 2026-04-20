<template>
    <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
        <div class="d-flex w-100">
            <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i class="bi bi-ui-checks-grid me-2"></i>Dashboard Menu
            </a>
        </div>
    </div>
    <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header d-lg-none border-bottom">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
            
            <div class="dashboard-navbar card p-3 pt-4 border">
        
                <div class="author-info-wwrap">
                    <div class="avatar-box d-flex justify-content-center mb-2"><div class="square--120 circle shadow-sm border border-3"><img :src="avatar3" class="img-fluid circle" alt="Avatar"></div></div>
                    <div class="author-caps text-center mb-4">
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center justify-content-center">
                                <h5 class="fw-medium m-0">Adam L. Markram</h5><span class="verified text-green ms-2"><i class="bi bi-patch-check-fill"></i></span>
                            </div>
                            <div class="d-flex align-items-center justify-content-center gap-1">
                                <span class="rating-star"><i class="bi bi-star-fill text-warning"></i></span>
                                <span class="fw-semibold text-dark">4.9</span>
                                <span class="text-muted text-mid">(2.15k Reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <div class="d-flex flex-column gap-1">
                            <h6 class="text-dark lh-1 fw-semibold m-0">42,570</h6>
                            <span class="text-muted-2 m-0">Students</span>
                        </div>
                        <div class="d-flex flex-column gap-2">
                            <h6 class="text-dark lh-1 fw-semibold m-0">46+</h6>
                            <span class="text-muted-2 m-0">Courses</span>
                        </div>
                    </div>
                </div>
                
                <div class="d-navigation">
                    <ul id="side-menu">
                        <li><NuxtLink to="/instructor-dashboard" :class="{ active: isActive('/instructor-dashboard') }"><i class="bi bi-ui-radios-grid"></i>Dashboard</NuxtLink></li>
                        <li><NuxtLink to="/instructor-courses" :class="{ active: isActive('/instructor-courses') }"><i class="bi bi-basket2"></i>Courses</NuxtLink></li>
                        <li><NuxtLink to="/instructor-create-course" :class="{ active: isActive('/instructor-create-course') }"><i class="bi bi-patch-plus"></i>Create Course</NuxtLink></li>
                        <li><NuxtLink to="/instructor-earning" :class="{ active: isActive('/instructor-earning') }"><i class="bi bi-coin"></i>Earning</NuxtLink></li>
                        <li><NuxtLink to="/instructor-students" :class="{ active: isActive('/instructor-students') }"><i class="bi bi-people"></i>Students</NuxtLink></li>
                        <li><NuxtLink to="/instructor-orders" :class="{ active: isActive('/instructor-orders') }"><i class="bi bi-bag-check"></i>My Orders</NuxtLink></li>
                        <li><NuxtLink to="/instructor-reviews" :class="{ active: isActive('/instructor-reviews') }"><i class="bi bi-star-half"></i>Reviews</NuxtLink></li>
                        <li><NuxtLink to="/instructor-payout" :class="{ active: isActive('/instructor-payout') }"><i class="bi bi-wallet2"></i>Payout</NuxtLink></li>
                        <li><a href="#"><i class="bi bi-question-octagon"></i>Help & Support</a></li>
                    </ul>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>

import { useRoute } from '#app'

const route = useRoute()

const isActive = (path) => route.path === path

import avatar3 from "@/assets/img/avatar-3.jpg";

</script>