<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="pageTitle-wrap text-center">
                        <h1 class="text-light">{{ $t('get_in_touch') }}</h1>
                        <p class="text-light">{{ $t('contact_intro') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-7">
                    <div class="card border">
                        
                        <div class="card-header">
                            <h4 class="card-title">{{ $t('fill_the_form') }}</h4>
                        </div>
                        
                        <div class="card-body p-4">
                            <div class="row g-3">
                            
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label>{{ $t('name') }}</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label>{{ $t('email') }}</label>
                                        <input type="email" class="form-control">
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>{{ $t('subject') }}</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>{{ $t('message') }}</label>
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <button class="btn btn-main px-5" type="button">{{ $t('submit_request') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4 col-md-5">
                
                    <div class="card border">
                        
                        <div class="card-body">
                            <div class="contact-info">
                                <h4>{{ $t('get_in_touch') }}</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p>
                                
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div class="icons">
                                        <div class="square--50 rounded-3 bg-light-main"><i class="bi bi-pin-map-fill text-main"></i></div>
                                    </div>
                                    <div class="caps-content">
                                        <h5 class="cn-info-title mb-0">{{ $t('reach_us') }}</h5>
                                        <p class="text-muted lh-base">2512, New Market,<br>Eliza Road, Sincher 80 CA, Canada, USA</p>
                                    </div>
                                </div>
                                
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div class="icons">
                                        <div class="square--50 rounded-3 bg-light-main"><i class="bi bi-envelope-open text-main"></i></div>
                                    </div>
                                    <div class="caps-content">
                                        <h5 class="cn-info-title mb-0">{{ $t('drop_mail') }}</h5>
                                        <p class="text-muted lh-base">support@learnup.com<br>LearnUp@gmail.com</p>
                                    </div>
                                </div>
                                
                                <div class="d-flex align-items-start gap-3">
                                    <div class="icons">
                                        <div class="square--50 rounded-3 bg-light-main"><i class="bi bi-telephone text-main"></i></div>
                                    </div>
                                    <div class="caps-content">
                                        <h5 class="cn-info-title mb-0">{{ $t('call_us') }}</h5>
                                        <p class="text-muted lh-base">(41) 123 521 458<br>+91 235 548 7548</p>
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

</script>