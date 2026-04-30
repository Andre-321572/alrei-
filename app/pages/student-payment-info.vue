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
                                    <li class="breadcrumb-item active" aria-current="page">Payment Info</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-4">
                
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="card border">
                            
                                <div class="card-header">
                                    <h4 class="text-dark mb-0">Payment Methods</h4>
                                    <span>Set your primary account</span>
                                </div>
                                
                                <div class="card-body">
                                
                                    <ul class="list-group list-group-flush">
                                
                                        <li 
                                            class="list-group-item px-0 pb-2"
                                            v-for="(item, index) in cartData"
                                            :key="index"
                                        >
                                            <div class="d-flex justify-content-between">
                                            
                                                <div class="d-flex align-items-center">
                                                    <img :src="item.image" alt="card" class="w-15 me-3">
                                                    <div>
                                                        <h5 class="text-dark fs-6 mb-0">{{item.title}}</h5>
                                                        <p class="text-muted mb-0">{{item.time}}</p>
                                                    </div>
                                                </div>
                                                
                                                <div class="d-flex align-items-center">
                                                    <span class="dropdown dropstart">
                                                        <a class="btn-link text-muted" href="#" role="button" id="paymentDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="bi bi-three-dots-vertical"></i>
                                                        </a>
                                                        <span class="dropdown-menu" aria-labelledby="paymentDropdown">
                                                            <a class="dropdown-item" href="#">
                                                                <i class="bi bi-patch-check"></i>
                                                                Make it Primary
                                                            </a>
                                                            <span class="dropdown-header"><i class="bi bi-gear-wide me-1"></i>Setting</span>
                                                            <a class="dropdown-item" href="#">
                                                                <i class="bi bi-pencil-square bi bi-gear-wide"></i>
                                                                Edit
                                                            </a>
                                                            <a class="dropdown-item" href="#">
                                                                <i class="bi bi-trash3"></i>
                                                                Remove
                                                            </a>
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <a href="#" class="btn btn-outline-main btn-md mt-3" data-bs-toggle="modal" data-bs-target="#paymentModal">Add Payment Method</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card bg-transparent border rounded-3">
                                <div class="card-header bg-transparent border-bottom">
                                    <h4 class="mb-2 mb-sm-0">Billing history</h4>
                                </div>

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

                                    <div class="table-responsive border-0">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">Date</th>
                                                    <th scope="col" class="border-0">Course Name</th>
                                                    <th scope="col" class="border-0">Payment Method</th>
                                                    <th scope="col" class="border-0">Status</th>
                                                    <th scope="col" class="border-0">Total</th>
                                                    <th scope="col" class="border-0 rounded-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr v-for="(item, index) in paymentData" :key="index">
                                                    <td>{{item.date}}</td>

                                                    <td>
                                                        <h6 class="mt-2 mt-lg-0 mb-0"><a href="#">{{item.name}}</a></h6>
                                                    </td>

                                                    <td><img :src="item.image" class="w-12" alt=""><span class="ms-2">{{item.cardNo}}</span></td>

                                                    <td>
                                                        <span v-if="item.status === 'Paid'" class="badge bg-success bg-opacity-10 text-success">Paid</span>
                                                        <span v-else-if="item.status === 'Pending'" class="badge bg-info bg-opacity-10 text-info">Pending</span>
                                                        <span v-else-if="item.status === 'Cancel'" class="badge bg-danger bg-opacity-10 text-danger">Cancel</span>
                                                    </td>
                                                    
                                                    <td>{{item.value}}</td>

                                                    <td>
                                                        <a href="#" class="square--40 circle btn-light-main" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Download" data-bs-original-title="Download"><i class="bi bi-download"></i></a>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
                                        <p class="mb-0 text-center text-muted">Showing 1 to 10 of 25 entries</p>
                                        <!-- Pagination -->
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

    <!-- Payment Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-labelledby="paymentModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            
                <div class="modal-header bg-dark align-items-center d-flex">
                    <h4 class="modal-title text-light fs-6" id="paymentModalLabel">Add New Payment Method</h4>
                    <a href="#" class="text-light" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-circle"></i></a>
                </div>
                
                <!-- Modal body -->
                <div class="modal-body p-4">
                
                    <!-- Form -->
                    <form class="row g-3 mb-4 needs-validation" novalidate>
                    
                        <div class="mb-3 col-12 col-md-12 mb-4">
                            <h5 class="text-dark fs-6 mb-1">Choose Card Type</h5>
                            <!-- Radio button -->
                            <div class="d-inline-flex gap-4">
                                <div class="form-check d-flex align-items-center gap-2">
                                    <input type="radio" id="mastercard" name="paymentcard" class="form-check-input" required />
                                    <label class="form-check-label" for="mastercard"><img :src="card1" class="w-12" alt="card" /></label>
                                </div>
                                <!-- Radio button -->
                                <div class="form-check d-flex align-items-center gap-2">
                                    <input type="radio" id="visacard" name="paymentcard" class="form-check-input" required />
                                    <label class="form-check-label" for="visacard"><img :src="card2" class="w-12" alt="card" /></label>
                                </div>

                                <!-- Radio button -->
                                <div class="form-check d-flex align-items-center gap-2">
                                    <input type="radio" id="americanexpress" name="paymentcard" class="form-check-input" required />
                                    <label class="form-check-label" for="americanexpress"><img :src="card3" class="w-12" alt="card" /></label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Name on card -->
                        <div class="mb-3 col-12 col-md-6">
                            <label for="nameoncard" class="form-label">Card Holder</label>
                            <input type="text" class="form-control"  placeholder="Name">
                        </div>
                        
                        <!-- Month -->
                        <div class="mb-3 col-12 col-md-3">
                            <div class="form-group">
                                <label class="form-label">Month</label>
                                <select class="form-control select">
                                    <option value="">Month</option>
                                    <option value="Jan">Jan</option>
                                    <option value="Feb">Feb</option>
                                    <option value="Mar">Mar</option>
                                    <option value="Apr">Apr</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="Aug">Aug</option>
                                    <option value="Sep">Sep</option>
                                    <option value="Oct">Oct</option>
                                    <option value="Nov">Nov</option>
                                    <option value="Dec">Dec</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Year -->
                        <div class="mb-3 col-12 col-md-3">
                            <label class="form-label">Year</label>
                            <select class="form-control select">
                                <option value="">Year</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2027">2027</option>
                            </select>
                        </div>
                        
                        <!-- Card number -->
                        <div class="mb-3 col-md-8 col-12">
                            <label class="form-label">Card Number</label>
                            <input class="form-control" type="text">
                        </div>
                        
                        <!-- CVV -->
                        <div class="col-md-4 col-12">
                            <div class="mb-3">
                                <label class="form-label" for="digit-mask">
                                    CVV Code
                                    <i class="bi bi-patch-question ms-1" data-bs-toggle="tooltip" data-placement="top" title="A 3 - digit number, typically printed on the back of a card."></i>
                                </label>
                                <input class="form-control" type="text">
                            </div>
                        </div>
                        
                        <!-- Button -->
                        <div class="col-md-12 col-12">
                            <div class="d-flex align-items-center justify-content-between gap-2">
                                <button class="btn btn-main" type="button">Save & Add New Card</button>
                                <button class="btn btn-gray" type="button" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { cartData, paymentData } from '@/data/student.js'

import card1 from "@/assets/img/card-1.png";
import card2 from "@/assets/img/card-2.png";
import card3 from "@/assets/img/card-3.png";

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