<template>

    <Preloader />
    <StudentNavbar />

    <section class="bg-cover p-0" :style="studentBg" data-overlay="4">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <StudentAdminSidebar />
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">My Subscription</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="card border">
                            
                                <div class="card-header d-lg-flex justify-content-between align-items-center flex-wrap gap-1">
                                    <div class="mb-3 mb-lg-0">
                                        <h3 class="text-dark mb-0">My Subscriptions</h3>
                                        <p class="mb-0">Here is list of package/product that you have subscribed.</p>
                                    </div>
                                    <div>
                                        <NuxtLink to="/pricing" class="btn btn-light-red btn-sm rounded-2">Upgrade Now — Go Pro $49</NuxtLink>
                                    </div>
                                </div>
                                
                                <div class="card-body">
                                    <div class="border-bottom pt-0 pb-5">
                                    
                                        <div class="row mb-4">
                                            <div class="col-lg-6 col-md-8 col-7 mb-2 mb-lg-0">
                                                <span class="d-block">
                                                    <span class="h4">Monthly</span>
                                                    <span class="badge bg-green ms-2">Active</span>
                                                </span>
                                                <p class="mb-0 fs-6">Subscription ID: #LNR236582</p>
                                            </div>
                                            <div class="col-lg-3 col-md-4 col-5 mb-2 mb-lg-0">
                                                <span>Auto Renewal</span>
                                                <div class="form-check form-switch">
                                                    <input type="checkbox" class="form-check-input" id="customSwitch1" checked="">
                                                    <label class="form-check-label" for="customSwitch1"></label>
                                                </div>
                                            </div>
                                            <div class="col-lg-3 col-md-12 col-12 d-lg-flex align-items-start justify-content-end">
                                                <a href="#" class="btn btn-light-main btn-sm">Change Plan</a>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Started On</span>
                                                <h6 class="text-dark mb-0">10 May 2027</h6>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Price</span>
                                                <h6 class="text-dark mb-0">Monthly</h6>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Access</span>
                                                <h6 class="text-dark mb-0">Access All Courses</h6>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Billing Date</span>
                                                <h6 class="text-dark mb-0">Next Billing on 09 May 2027</h6>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="pt-5">
                                        <div class="row mb-4">
                                            <div class="col mb-2 mb-lg-0">
                                                <span class="d-block">
                                                    <span class="h4">Free Plan</span>
                                                    <span class="badge bg-red ms-2">Expired</span>
                                                </span>
                                                <p class="mb-0 fs-6">Subscription ID: #LNR2568742</p>
                                            </div>
                                            <div class="col-auto">
                                                <a href="#" class="btn btn-gray btn-sm disabled rounded-2">Disabled</a>
                                            </div>
                                        </div>
                                    
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Started On</span>
                                                <h6 class="text-dark mb-0">16 Aug 2027</h6>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Price</span>
                                                <h6 class="text-dark mb-0">Free - Trial a Month</h6>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Access</span>
                                                <h6 class="text-dark mb-0">Access All Courses</h6>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                <span class="text-muted fs-6">Billing Date</span>
                                                <h6 class="text-dark mb-0">Next Billing on A5 Aug 2027</h6>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>	
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { computed } from 'vue'

/* Banner Background */
import studentbg from '@/assets/img/student-bg.jpg'

const studentBg = computed(() => ({
    background: `url(${studentbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>