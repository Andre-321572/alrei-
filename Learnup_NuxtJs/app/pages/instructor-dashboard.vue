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
                                    <li class="breadcrumb-item"><a href="#">{{ $t('home') }}</a></li>
                                    <li class="breadcrumb-item"><a href="#">{{ $t('instructor_dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row gy-3 mb-4">
                
                        <div 
                            class="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            v-for="(item, index) in instructorAbout" 
                            :key="index"
                        >
                            <div class="card rounded-3 border px-3 py-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div :class="`square--60 circle bg-light-${item.theme} fs-3`">
                                        <i :class="item.icon"></i>
                                    </div>
                                    <div class="d-flex flex-column gap-1">
                                        <h2 class="fw-semibold m-0">{{item.value}}</h2><span class="text-muted">{{item.title}}</span>
                                    </div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">{{ $t('recent_selling_courses') }}</h4>
                                        <a href="#" class="btns text-muted mb-0">{{ $t('view_all') }}</a>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="table-responsive border-0 rounded-3">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">{{ $t('course_name') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('selling') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('amount') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('period') }}</th>
                                                    <th scope="col" class="border-0 rounded-end">{{ $t('action') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr
                                                    v-for="(item, index) in recentSellingCourses" 
                                                    :key="index"
                                                >
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="w-15">
                                                                <img :src="item.image" class="img-fluid rounded" alt="">
                                                            </div>
                                                            <h6 class="mb-0 fw-semibold ms-2 table-responsive-title">	
                                                                <a href="#">{{item.title}}</a>
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td><span class="text-muted-2">{{item.selling}}</span></td>
                                                    <td><span class="text-muted-2">{{item.amount}}</span></td>
                                                    <td>
                                                        <span class="badge bg-light-green text-green">{{item.time}}</span>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-sm btn-gray me-1 mb-0"><i class="bi bi-pencil-square"></i></a>
                                                        <button class="btn btn-sm btn-light-red mb-0"><i class="bi bi-trash3"></i></button>
                                                    </td>
                                                </tr>
        
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Pagination -->
                                    <div class="d-sm-flex justify-content-sm-between align-items-sm-center mt-3">
                                        <p class="mb-0 text-center text-sm-start text-muted">{{ $t('showing_entries', { start: 1, end: 8, total: 20 }) }}</p>
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

import { instructorAbout, recentSellingCourses } from '@/data/instructor.js'

</script>