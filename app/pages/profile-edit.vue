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
                                    <li class="breadcrumb-item"><a href="#">{{ $t('dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('profile_edit') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card border">
                            
                                <div class="card-header">
                                    <h4 class="mb-0">{{ $t('profile_details') }}</h4>
                                </div>
                                
                                <div class="card-body">
                                    <div class="d-lg-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center mb-4 mb-lg-0">
                                            <img :src="avatar1" id="image-uploaded" class="img-fluid circle w-20" alt="avatar Image">
                                            <div class="ms-3">
                                                <h4 class="mb-0">{{ $t('your_avatar') }}</h4>
                                                <p class="ext-mid text-muted mb-0">{{ $t('avatar_instructions') }}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center gap-2">
                                            <a href="#" class="btn btn-light-green btn-sm">{{ $t('update') }}</a>
                                            <a href="#" class="btn btn-light-red btn-sm">{{ $t('delete') }}</a>
                                        </div>
                                    </div>
                                    
                                    <hr class="my-4">
                                    
                                    <div class="form-section">
                                    
                                        <h4 class="mb-0">{{ $t('personal_details') }}</h4>
                                        <p class="text-muted mb-4">{{ $t('personal_details_desc') }}</p>
                                        
                                        <!-- Form -->
                                        <form class="row g-3">
                                        
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('first_name') }}</label>
                                                <input type="text" class="form-control" :placeholder="$t('first_name')">
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('last_name') }}</label>
                                                <input type="text" class="form-control" :placeholder="$t('last_name')" required="">
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('phone') }}</label>
                                                <input type="text" class="form-control" :placeholder="$t('phone')" required="">
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('email') }}</label>
                                                <input class="form-control" type="email" placeholder="Your eMail">
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('address_line_1') }}</label>
                                                <input type="text" class="form-control" :placeholder="$t('address_line_1')">
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('address_line_2') }}</label>
                                                <input type="text" class="form-control" :placeholder="$t('address_line_2')">
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('state') }}</label>
                                                <select class="form-control" id="state">
                                                    <option value="one">San Diego</option>
                                                    <option value="two">San Jose</option>
                                                    <option value="three">San Francisco</option>
                                                    <option value="four">San Antonio</option>
                                                    <option value="five">Las Vegas</option>
                                                    <option value="six">Los Angeles</option>
                                                </select>
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('country') }}</label>
                                                <select class="form-control" id="country">
                                                    <option value="india">India</option>
                                                    <option value="usa">United State</option>
                                                    <option value="uk">United Kingdom</option>
                                                    <option value="australia">Australia</option>
                                                    <option value="brazil">Brazil</option>
                                                    <option value="shrilanka">Shrilanka</option>
                                                </select>
                                            </div>
                                        
                                            <div class="col-12">
                                                <button class="btn btn-main px-5" type="button">{{ $t('update_profile') }}</button>
                                            </div>
                                        
                                        </form>
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

import avatar1 from "@/assets/img/avatar-1.jpg";

</script>