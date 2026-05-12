<template>

    <Preloader />
    <InstructorNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
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
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('delete_account') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border rounded-3 mb-0">
                                <div class="card-header border-bottom">
                                    <h3 class="card-header-title mb-0">{{ $t('deactivate_account') }}</h3>
                                </div>
                                <div class="card-body">
                                    <h5>{{ $t('why_delete_account') }}</h5>
                                    
                                    <div class="reason-group d-flex flex-column gap-4 mt-4 mb-5">
                                        
                                        <div class="d-flex align-items-start gap-2">
                                            <div class="check-box">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" value="" name="reason" id="reason1">
                                                    <label class="form-check-label" for="reason1"></label>
                                                </div>
                                            </div>
                                            <div class="caps">
                                                <h6 class="text-dark mb-0">{{ $t('reason_no_longer_need') }}</h6>
                                                <span class="text-muted">{{ $t('reason_no_longer_need_desc') }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex align-items-start gap-2">
                                            <div class="check-box">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" value="" name="reason" id="reason2">
                                                    <label class="form-check-label" for="reason2"></label>
                                                </div>
                                            </div>
                                            <div class="caps">
                                                <h6 class="text-dark mb-0">{{ $t('reason_not_satisfied') }}</h6>
                                                <span class="text-muted">{{ $t('reason_not_satisfied_desc') }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex align-items-start gap-2">
                                            <div class="check-box">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" value="" name="reason" id="reason3">
                                                    <label class="form-check-label" for="reason3"></label>
                                                </div>
                                            </div>
                                            <div class="caps">
                                                <h6 class="text-dark mb-0">{{ $t('reason_technical_issues') }}</h6>
                                                <span class="text-muted">{{ $t('reason_technical_issues_desc') }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex align-items-start gap-2">
                                            <div class="check-box">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" value="" name="reason" id="reason4">
                                                    <label class="form-check-label" for="reason4"></label>
                                                </div>
                                            </div>
                                            <div class="caps">
                                                <h6 class="text-dark mb-0">{{ $t('reason_privacy_data') }}</h6>
                                                <span class="text-muted">{{ $t('reason_privacy_data_desc') }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex align-items-start gap-2">
                                            <div class="check-box">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" value="" name="reason" id="reason5">
                                                    <label class="form-check-label" for="reason5"></label>
                                                </div>
                                            </div>
                                            <div class="caps">
                                                <h6 class="text-dark mb-0">{{ $t('reason_alternative_platform') }}</h6>
                                                <span class="text-muted">{{ $t('reason_alternative_platform_desc') }}</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="d-flex align-items-center gap-2">
                                        <a href="#" class="btn btn-light-green mb-2 mb-sm-0">{{ $t('keep_my_account') }}</a>
                                        <a href="#" class="btn btn-danger mb-0">{{ $t('delete_my_account') }}</a>
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

</script>