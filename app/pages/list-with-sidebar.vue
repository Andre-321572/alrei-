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
                                <li class="breadcrumb-item"><a href="#">{{ $t('courses') }}</a></li>
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
                    <SidebarOne />
                </div>	
                
                <div class="col-xxl-9 col-lg-8 col-12">
                    
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
                    
                    <div class="row g-xl-3 g-4 mb-5">
                
                        <div 
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12"
                            v-for="(item, index) in coursesData.slice(0, 9)"
                            :key="index"
                        >
                            <div class="card border p-2">
                                <div class="row g-0">
                                    <div class="col-md-5 overflow-hidden">
                                        <img :src="item.image" class="img-fluid rounded-2" alt="Card image">
                                        <div class="position-absolute start-0 top-0 mt-3 ms-3">
                                            <div class="label text-light bg-green rounded-end"><span>Free</span></div>
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center mb-2">
                                                <a href="#" class="badge text-main bg-light-main mb-2 mb-sm-0">Development</a>
                                                <div>
                                                    <span class="h6 me-2"><i class="fas fa-star text-warning me-1"></i>4.5</span>
                                                    <a href="#" class="text-danger"><i class="bi bi-heart"></i></a>
                                                </div>
                                            </div>
                
                                            <h5 class="card-title"><a href="#">{{item.title}}</a></h5>
                                            <p class="text-truncate-2 d-none d-lg-block">Explore our curated collection of courses designed to enhance your web design and development skills. From mastering HTML and CSS to advanced JavaScript techniques.</p>
                
                                            <ul class="list-inline mb-3">
                                                <li class="list-inline-item text-muted mb-1 mb-sm-0"><i class="far fa-clock text-danger me-2"></i>21h 56m</li>
                                                <li class="list-inline-item text-muted mb-1 mb-sm-0"><i class="fas fa-table text-orange me-2"></i>{{item.lectures}} {{ $t('lectures') }}</li>
                                                <li class="list-inline-item text-muted"><i class="fas fa-signal text-success me-2"></i>Intermediate</li>
                                            </ul>
                
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <div class="avatar">
                                                        <img class="img-fluid circle w-8" :src="item.autherImg" alt="avatar">
                                                    </div>
                                                    <p class="mb-0 ms-2"><a href="#" class="h6 fw-normal">{{item.autherName}}</a></p>
                                                </div>
                                                <div class="btn-wraps">
                                                    <a href="#" class="btn btn-md btn-dark">{{ $t('view_more', 'View more') }}</a>    
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
import SidebarOne from '@/components/Courses/courses-grid-sidebar/grid-with-sidebar/SidebarOne.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { coursesData } from '@/data/data.js'

</script>