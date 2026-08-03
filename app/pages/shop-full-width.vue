<template>

    <Preloader />
    <NavDark />

    <section class="bg-cover page-title" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xxl-7 col-xl-8 col-lg-9 col-md-11">
                    
                    <div class="pageTitle-wrap text-center mb-3">
                        <h1 class="text-light">Welcome to our Book Store</h1>
                        <p class="text-light">Reference giving information on its origins, as well as a random Lipsum generator.</p>
                    </div>
                    
                    <div class="search-wraps">
                        <form class="search-form">
                            <div class="d-flex align-items-center justify-content-between bg-white rounded-pill p-2">
                                <input type="text" class="form-control border-0 shadow-none" placeholder="Search book name...">
                                <button class="square--50 circle border-0 btn-main" type="button"><i class="bi bi-search"></i></button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container">
            <div class="row">	
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="row align-items-center g-3 mb-3">
                        <div class="col-xxl-10 col-xl-9 col-lg-9 col-md-6 col-sm-12 col-12">
                            We found <strong>50</strong> books for you
                        </div>
                        <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                            <div class="filter_wraps d-flex align-items-center justify-content-center gap-2">
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
                    <div class="row align-items-center g-xl-3 g-4 mb-5">
                
                        <div 
                            class="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4"
                            v-for="(item, index) in shopData.slice(0, 8)" 
                            :key="index"
                        >
                    
                            <div class="card shadow-sm">
                                <div class="position-relative">
                                    <img :src="item.image" class="img-fluid" alt="Book Name">
                                    <div class="card-img-overlay d-flex z-index-0 p-3">
                                        <div class="position-absolute end-0 top-0 me-3 mt-3">
                                            <a href="#" class="square--40 circle btn-dark" data-bs-toggle="tooltip" data-bs-title="Add To Basket"><i class="bi bi-basket2"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body px-3">
                                    <h6 class="card-title">
                                        <NuxtLink :to="`/product-detail/${item.id}`" class="stretched-link">{{item.title}}</NuxtLink>
                                    </h6>
                                    <div class="d-flex align-items-center gap-1">
                                        <span class="star text-warning"><i class="bi bi-star-fill"></i></span>
                                        <span class="overall-rate text-dark fw-semibold">{{item.rate}}</span>
                                        <span class="total-rating text-mid text-muted">({{item.review}} Reviews)</span>
                                    </div>
                                </div>

                                <div class="card-footer bg-white border-top py-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="h6 fw-light mb-0">By <span class="fw-semibold">{{item.auther}}</span></span>
                                        <h5 class="text-green mb-0">${{item.price}}</h5>
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
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { shopData } from '@/data/shop.js'

</script>