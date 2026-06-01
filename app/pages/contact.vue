<template>

    <Preloader />
    <NavDark />

    <section class="bg-cover page-title" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
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
                                
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div class="icons">
                                        <div class="square--50 rounded-3 bg-light-main"><i class="bi bi-pin-map-fill text-main"></i></div>
                                    </div>
                                    <div class="caps-content">
                                        <h5 class="cn-info-title mb-0">{{ $t('reach_us') }}</h5>
                                        <p class="text-muted lh-base">BP : 4401, Lomé - TOGO, Route Internationale d’Atakpamé, Centre FOPADESC Agoè - Nyivé</p>
                                    </div>
                                </div>
                                
                                <div class="d-flex align-items-start gap-3 mb-3">
                                    <div class="icons">
                                        <div class="square--50 rounded-3 bg-light-main"><i class="bi bi-envelope-open text-main"></i></div>
                                    </div>
                                    <div class="caps-content">
                                        <h5 class="cn-info-title mb-0">{{ $t('drop_mail') }}</h5>
                                        <p class="text-muted lh-base">support@alrei.com<br>contact@alrei.com</p>
                                    </div>
                                </div>
                                
                                <div class="d-flex align-items-start gap-3">
                                    <div class="icons">
                                        <div class="square--50 rounded-3 bg-light-main"><i class="bi bi-telephone text-main"></i></div>
                                    </div>
                                    <div class="caps-content">
                                        <h5 class="cn-info-title mb-0">{{ $t('call_us') }}</h5>
                                        <p class="text-muted lh-base"> (+228) 22 25 03 90<br></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
    </section>

    <!-- Localisation / Map -->
    <section class="map-section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="map-wrapper">
                        <div class="map-header mb-2">
                            <i class="bi bi-geo-alt-fill text-main me-1"></i>
                            <span class="fw-semibold small">Centre FOPADESC Agoè - Nyivé, Lomé, TOGO</span>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d1.2255!3d6.2075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1c113ac7e4b%3A0x9a13b0b34c7a5e8d!2sAgo%C3%A9-Ny%C3%AAv%C3%A9%2C%20Lom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2sfr!4v1716900000000!5m2!1sfr!2sfr"
                            width="100%"
                            height="300"
                            style="border:0; border-radius: 10px;"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

</script>

<style scoped>
.map-section {
    padding: 20px 0 40px;
}

.map-wrapper {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
}

.map-header {
    color: #444;
    font-size: 0.85rem;
}
</style>