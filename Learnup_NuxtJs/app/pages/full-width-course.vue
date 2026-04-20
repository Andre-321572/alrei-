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
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Course</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Course Full Layout 01</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                        <h1 class="text-light">Courses Full Layout 01</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-xxl-12 col-lg-12 col-12">
                    <div class="row align-items-center g-3 mb-3">
                        <div class="col-xxl-9 col-xl-8 col-lg-9 col-md-6 col-sm-12 col-12">
                            We found <strong>142</strong> courses for you
                        </div>
                        <div class="col-xxl-3 col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12">
                            <div class="filter_wraps d-flex align-items-center justify-content-center gap-2">
                                <a class="btn btn-outline-dark flex-fill" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                    <i class="bi bi-sliders me-2"></i>Filter
                                </a>
                                <div class="position-relative flex-fill">
                                    <select id="sorting" class="form-control form-select">
                                        <option value="1">Free</option>
                                        <option value="2">Most Popular</option>
                                        <option value="3">Most Viewed</option>
                                        <option value="4">Newest</option>
                                        <option value="5">Trending</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row justify-content-center g-xl-3 g-4 mb-5">
                        
                        <div 
                            class="col-xxl-3 col-xl-4 col-lg-4 col-md-6"
                            v-for="(item, index) in coursesData.slice(0, 12)"
                            :key="index"
                        >
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{item.title}}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
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
    <FooterDark />
    <FilterModal />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import FilterModal from '@/components/Courses/full-width-course/FilterModal.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { coursesData } from '@/data/data.js'

</script>