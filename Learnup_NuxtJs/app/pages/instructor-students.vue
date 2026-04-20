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
                                    <li class="breadcrumb-item active" aria-current="page">Students List</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">All Students</h4>
                                    </div>
                                </div>

                                <!-- Card body START -->
                                <div class="card-body">
                                    <div class="row g-3 align-items-center justify-content-between mb-4">
                                        <div class="col-md-7">
                                            <form class="rounded position-relative">
                                                <input class="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search">
                                                <button class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                                                    <i class="bi bi-search text-muted opacity-75 fs-6 "></i>
                                                </button>
                                            </form>
                                        </div>

                                        <div class="col-md-3">
                                            <form>
                                                <div class="position-relative">
                                                    <select id="sorting" class="form-control form-select">
                                                        <option value="1">Free</option>
                                                        <option value="2">Most Popular</option>
                                                        <option value="3">Most Viewed</option>
                                                        <option value="4">Newest</option>
                                                        <option value="5">Trending</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                
                                    <div class="table-responsive border-0 rounded-3">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">Student Name</th>
                                                    <th scope="col" class="border-0">progress</th>
                                                    <th scope="col" class="border-0">Courses</th>
                                                    <th scope="col" class="border-0">Enrolled Date</th>
                                                    <th scope="col" class="border-0 rounded-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr v-for="(item, index) in studentList" :key="index">
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2">
                                                            <div class="w-15">
                                                                <img :src="item.image" class="img-fluid rounded" alt="">
                                                            </div>
                                                            <div class="student-info">
                                                                <h6 class="mb-0 fw-semibold table-responsive-title">	
                                                                    <a href="#">{{item.name}}</a>
                                                                </h6>
                                                                <div class="d-flex gap-2">
                                                                    <p class="mb-0 text-muted-2 me-1"><i class="bi bi-geo-alt-fill me-1"></i>{{item.location}}</p>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="progress-info">
                                                            <h6 class="fw-semibold">{{item.progress}}</h6>
                                                            <div class="d-flex w-30">
                                                                <div class="progress w-100" role="progressbar" aria-label="Success striped example" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                                                                    <div class="progress-bar progress-bar-striped bg-success" :style="{ width: item.progress }"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span class="text-muted-2">{{item.course}}</span></td>
                                                    <td>
                                                        <span class="text-muted-2">{{item.date}}</span>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-sm btn-gray me-1 mb-0"data-bs-toggle="modal" data-bs-target="#messageModal"><i class="bi bi-chat-dots"></i></a>
                                                        <a class="btn btn-sm btn-light-red mb-0" data-bs-toggle="tooltip" data-bs-title="Block"><i class="bi bi-ban"></i></a>
                                                    </td>
                                                </tr>
        
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Pagination -->
                                    <div class="d-sm-flex justify-content-sm-between align-items-sm-center mt-3">
                                        <p class="mb-0 text-center text-sm-start text-muted">Showing 1 to 8 of 20 entries</p>
                                        <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
                                            <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                                                <li class="page-item mb-0"><a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item mb-0 active"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">4</a></li>
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

    <!-- Message Modal -->
    <div class="modal modal-lg fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-light border-0 px-md-5">
                    <h4 class="modal-title fw-medium" id="messageModalLabel">Send Message</h4>
                    <a href="#" data-bs-dismiss="modal" aria-label="Close" class="square--30 circle bg-white text-dark"><i class="bi bi-x"></i></a>
                </div>
                <div class="modal-body p-md-5">
                    <div class="messageForm">
                        <div class="form-group mb-3">
                            <textarea class="form-control" placeholder="Type your Message To Dan"></textarea>
                        </div>
                        <button type="button" class="btn btn-main fw-medium px-md-5">Send message<i class="bi bi-arrow-right ms-2"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { studentList } from '@/data/instructor.js'

</script>