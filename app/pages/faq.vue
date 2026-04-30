<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="pageTitle-wrap text-center">
                        <h1 class="text-light">{{ $t('frequently_asked_questions') }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row align-items-center justify-content-center mb-5">
                <div class="col-xl-12 col-lg-12 col-12">	
                    <ul class="nav nav-tabs simple smalls scroll-tab align-items-center justify-content-center border-0 mb-4" id="courseTab" role="tablist">
                        <li class="nav-item ms-0" role="presentation">
                            <a class="nav-link active" id="pills-general-tab" data-bs-toggle="pill" href="#pills-general" role="tab" aria-controls="pills-general" aria-selected="true">
                                {{ $t('general') }}
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-payment-tab" data-bs-toggle="pill" href="#pills-payment" role="tab" aria-controls="pills-payment" aria-selected="false" tabindex="-1">{{ $t('payment') }}</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-instructor-tab" data-bs-toggle="pill" href="#pills-instructor" role="tab" aria-controls="pills-instructor" aria-selected="false" tabindex="-1">
                                {{ $t('instructor') }}
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-enrollment-tab" data-bs-toggle="pill" href="#pills-enrollment" role="tab" aria-controls="pills-enrollment" aria-selected="false" tabindex="-1">
                                {{ $t('enrollment') }}
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" id="pills-support-tab" data-bs-toggle="pill" href="#pills-support" role="tab" aria-controls="pills-support" aria-selected="false" tabindex="-1">{{ $t('support') }}</a>
                        </li>
                    </ul>	
                </div>
            </div>
            
            <div class="row justify-content-center">
                
                <div class="col-xl-12 col-lg-12 col-12">
                    
                    <div class="tab-content" id="courseTabContent">
                        
                        <div class="tab-pane fade show active" id="pills-general" role="tabpanel" aria-labelledby="pills-general-tab" tabindex="0">
                            <div class="row g-4">
                
                                <div 
                                    class="col-xxl-6 col-xl-6 col-lg-6"
                                    v-for="(item, index) in faqOne"
                                    :key="index"
                                >
                                    <div class="faq-group d-flex flex-column gap-3">
                                        
                                        <div 
                                            class="single-group"
                                            v-for="(el, idx) in item.data"
                                            :key="idx"
                                        >
                                            <h4 class="text-dark">{{el.title}}</h4>
                                            <p class="text-muted">{{el.desc}}</p>
                                        </div>
                                            
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <!-- payment Content -->
                        <div class="tab-pane fade" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab" tabindex="0">
                            <div class="row g-4">
                
                                <div 
                                    class="col-xxl-6 col-xl-6 col-lg-6"
                                    v-for="(item, index) in faqTwo"
                                    :key="index"
                                >
                                    <div class="faq-group d-flex flex-column gap-3">
                                        
                                        <div 
                                            class="single-group"
                                            v-for="(el, idx) in item.data"
                                            :key="idx"
                                        >
                                            <h4 class="text-dark">{{el.title}}</h4>
                                            <p class="text-muted">{{el.desc}}</p>
                                        </div>
                                            
                                    </div>
                                </div>					
                                
                            </div>
                        </div>
                        
                        <!-- instructor Content -->
                        <div class="tab-pane fade" id="pills-instructor" role="tabpanel" aria-labelledby="pills-instructor-tab" tabindex="0">
                            <div class="row g-4">
                
                                <div 
                                    class="col-xxl-6 col-xl-6 col-lg-6"
                                    v-for="(item, index) in faqThree"
                                    :key="index"
                                >
                                    <div class="faq-group d-flex flex-column gap-3">
                                        
                                        <div 
                                            class="single-group"
                                            v-for="(el, idx) in item.data"
                                            :key="idx"
                                        >
                                            <h4 class="text-dark">{{el.title}}</h4>
                                            <p class="text-muted">{{el.desc}}</p>
                                        </div>
                                            
                                    </div>
                                </div>						
                                
                            </div>
                        </div>
                        
                        <!-- enrollment Content -->
                        <div class="tab-pane fade" id="pills-enrollment" role="tabpanel" aria-labelledby="pills-enrollment-tab" tabindex="0">
                            <div class="row g-4">
                
                                <div 
                                    class="col-xxl-6 col-xl-6 col-lg-6"
                                    v-for="(item, index) in faqOne"
                                    :key="index"
                                >
                                    <div class="faq-group d-flex flex-column gap-3">
                                        
                                        <div 
                                            class="single-group"
                                            v-for="(el, idx) in item.data"
                                            :key="idx"
                                        >
                                            <h4 class="text-dark">{{el.title}}</h4>
                                            <p class="text-muted">{{el.desc}}</p>
                                        </div>
                                            
                                    </div>
                                </div>						
                                
                            </div>
                        </div>
                        
                        <!-- Support Content -->
                        <div class="tab-pane fade" id="pills-support" role="tabpanel" aria-labelledby="pills-support-tab" tabindex="0">
                            <div class="row g-4">
                
                                <div 
                                    class="col-xxl-6 col-xl-6 col-lg-6"
                                    v-for="(item, index) in faqFour"
                                    :key="index"
                                >
                                    <div class="faq-group d-flex flex-column gap-3">
                                        
                                        <div 
                                            class="single-group"
                                            v-for="(el, idx) in item.data"
                                            :key="idx"
                                        >
                                            <h4 class="text-dark">{{el.title}}</h4>
                                            <p class="text-muted">{{el.desc}}</p>
                                        </div>
                                            
                                    </div>
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

import { faqOne, faqTwo, faqThree, faqFour } from '@/data/data.js'

</script>