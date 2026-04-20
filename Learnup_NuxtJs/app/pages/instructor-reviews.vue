<template>

    <Preloader />
    <InstructorNavbar />

    <section class="bg-gredient p-0">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <Sidebar />
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Instructor Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Reviews</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">Student Reviews</h4>
                                    </div>
                                </div>

                                <!-- Card body START -->
                                <div class="card-body">
                                    
                                    <div class="card-body mt-2 mt-sm-4">

                                        <div v-for="(item, index) in reviewData" :key="index">
                                            <div class="d-sm-flex">
                                                <img class="img-fluid square--80 circle float-start me-3" :src="item.image" alt="avatar">
                                                <div>
                                                    <div class="mb-3 d-sm-flex justify-content-sm-between align-items-center">
                                                        <div>
                                                            <h5 class="m-0">{{item.name}}</h5>
                                                            <span class="me-3 text-muted small">{{item.time}} </span>
                                                        </div>
                                                        <ul class="list-inline mb-0">
                                                            <li
                                                                class="list-inline-item me-0"
                                                                v-for="(el,i) in item.review"
                                                                :key="i"
                                                            >
                                                                <i :class="el"></i>
                                                            </li>
                                                        </ul>	
                                                    </div>
                                                    <h6><span class="fw-light">Review on:</span> {{item.title}}</h6>
                                                    <p>{{item.desc}} </p>
                                                    <div class="text-end">
                                                        <a class="btn btn-sm btn-gray rounded-pill px-3 mb-0" data-bs-toggle="collapse" href="#collapseComment" role="button" aria-expanded="false" aria-controls="collapseComment">
                                                            Reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>

                                    </div>
                                </div>
                                <div class="card-footer bg-white py-3">
                                    <!-- Pagination -->
                                    <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
                                        <p class="mb-0 text-center text-sm-start text-muted">Showing 1 to 8 of 20 entries</p>
                                        <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
                                            <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                                                <li class="page-item mb-0"><a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item mb-0 active"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">4</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">5</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                                            </ul>
                                        </nav>
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
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { reviewData } from '@/data/instructor.js'

</script>