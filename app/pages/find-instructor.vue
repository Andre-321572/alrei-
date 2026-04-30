<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="breadcrumb m-0">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb simple light">
                                <li class="breadcrumb-item"><NuxtLink to="/">{{ $t('home') }}</NuxtLink></li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container">

            <div class="row gx-xxl-4">
            
                <div class="col-xxl-3 col-lg-4 col-12">	
                    
                    <InstructorSidebar />
                    
                </div>	
                
                <div class="col-xxl-9 col-lg-8 col-12">
                    
                    <!-- Row -->
                    <div class="row align-items-center g-3 mb-3">
                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-12">
                            <span v-html="$t('we_found_courses', { count: 142 })"></span>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
                            <div class="filter_wraps">
                                <div class="position-relative">
                                    <select id="sorting" class="form-control form-select">
                                        <option value="1">{{ $t('free') }}</option>
                                        <option value="2">{{ $t('most_popular') }}</option>
                                        <option value="3">{{ $t('most_viewed') }}</option>
                                        <option value="4">{{ $t('newest') }}</option>
                                        <option value="5">{{ $t('trending') }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /Row -->
                    
                    <div class="row g-xl-3 g-4 mb-5">
                
                        <div 
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                            v-for="(item, index) in instructorsData" 
                            :key="index"
                        >
                            <div class="card border p-2">
                                <div class="row g-0">
                                    <div class="col-md-4 overflow-hidden">
                                        <img :src="item.image" class="img-fluid rounded-2" alt="Card image">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body py-2">
                                            <!-- Title -->
                                            <h4 class="card-title d-flex align-items-center mb-0 lh-base">
                                                <NuxtLink :to="`/instructor-detail/${item.id}`">{{item.name}}</NuxtLink><span class="verified text-green fs-6 ms-2"><i class="bi bi-patch-check-fill"></i></span>
                                            </h4>
                                            <div class="d-block mb-3">
                                                <div class="d-flex align-items-center gap-3 flex-wrap">
                                                    <span class="text-muted">{{item.roal}}</span>
                                                    <span class="text-muted">@{{item.company}}</span>
                                                </div>
                                            </div>
                                            
                                            <p class="text-truncate-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula magna, gravida id suscipit vitae, condimentum ac mauris. Mauris nibh leo, aliquet vel turpiscing elit. Nam ligula magcing elit.</p>
                                            
                                            <div class="gap-2 d-flex flex-wrap mb-4 mb-lg-5">

                                                <a v-for="(skill, idx) in item.skill" :key="idx" href="#" class="badge badge-outline">
                                                    {{ skill }}
                                                </a>
                                                
                                            </div>
                
                                            <!-- Price and avatar -->
                                            <div class="d-flex justify-content-between align-items-center">
                                                <!-- Avatar -->
                                                <div class="d-flex align-items-center gap-2">
                                                    <span class="text-warning"><i class="bi bi-star-fill"></i></span>
                                                    <span class="text-dark fw-semibold">{{item.rate}}</span>
                                                    <span class="text-muted">({{item.review}} Reviews)</span>
                                                </div>
                                                <!-- Price -->
                                                <div class="botton-wrap">
                                                    <NuxtLink :to="`/instructor-detail/${item.id}`" class="btn btn-md btn-outline-dark">{{ $t('view_profile', 'View Profile') }}</NuxtLink>    
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <!-- Pagination -->
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <ul class="pagination d-flex align-items-center justify-content-center">
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Previous">
                                            <span class="ti-arrow-left"></span>
                                            <span class="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item active"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#"><i class="bi bi-three-dots"></i></a></li>
                                        <li class="page-item"><a class="page-link" href="#">18</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Next">
                                            <span class="ti-arrow-right"></span>
                                            <span class="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <FooterTop />
    <Footer />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import InstructorSidebar from '@/components/Courses/find-instructor/InstructorSidebar.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { instructorsData } from '@/data/data.js'

</script>