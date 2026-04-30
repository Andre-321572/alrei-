<template>
    <footer class="light-footer">
        <div>
            <div class="container">
                <div class="row">
                    
                    <div class="col-lg-3 col-md-3">
                        <div class="footer-widget">
                            <img :src="logo" class="img-footer" alt="" />
                            <div class="footer-add">
                                <address class="mb-4 lh-base">{{ $t('address_text') }}</address>
                                <div class="d-flex align-items-center call-now gap-2 mb-3">
                                    <div class="square--30 circle bg-light-main text-main"><i class="bi bi-telephone"></i></div>
                                    <div class="fs-6 fw-semibold">+228</div>
                                </div>
                                <div class="d-flex align-items-center call-now gap-2">
                                    <div class="square--30 circle bg-light-main text-main"><i class="bi bi-envelope"></i></div>
                                    <div class="fs-6 fw-semibold">support@alrei.com</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>		
                    <div class="col-lg-2 col-md-3">
                        <div class="footer-widget">
                            <h4 class="widget-title">{{ $t('navigations') }}</h4>
                            <ul class="footer-menu">

                                <li v-for="(item, index) in footerLink1" :key="index">
                                    <NuxtLink :to="item.link">{{ $t(item.name) }}</NuxtLink>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                            
                    <div class="col-lg-2 col-md-3">
                        <div class="footer-widget">
                            <h4 class="widget-title">{{ $t('new_categories') }}</h4>
                            <ul class="footer-menu">

                                <li v-for="(item, index) in footerCat" :key="index">
                                    <a href="#">{{ $t(item) }}</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    
                    <div class="col-lg-2 col-md-3">
                        <div class="footer-widget">
                            <h4 class="widget-title">{{ $t('help_support') }}</h4>
                            <ul class="footer-menu">

                                <li v-for="(item, index) in footerHelp" :key="index">
                                    <a href="#">{{ $t(item) }}</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    
                    <div class="col-lg-3 col-md-12">
                        <div class="footer-widget">
                            <h4 class="widget-title">{{ $t('download_apps') }}</h4>
                            <a href="#" class="other-store-link">
                                <div class="other-store-app">
                                    <div class="os-app-icon">
                                        <i class="bi bi-google-play"></i>
                                    </div>
                                    <div class="os-app-caps">
                                        Google Play
                                        <span>{{ $t('get_it_now') }}</span>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="other-store-link">
                                <div class="other-store-app">
                                    <div class="os-app-icon">
                                        <i class="bi bi-apple"></i>
                                    </div>
                                    <div class="os-app-caps">
                                        App Store
                                        <span>{{ $t('now_available') }}</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="container">
                <div class="row align-items-center g-3">
                    
                    <div class="col-lg-6 col-md-6">
                        <p class="mb-0">
                            © {{ currentYear }} Alrei. {{ $t('developed') }}
                                {{ $t('by') }}
                            <a href="https://www.neostart.tech/" target="_blank">
                                Neo Start Technology
                            </a>.
                        </p>
                    </div>
                    
                    <div class="col-lg-6 col-md-6 text-md-end">
                        <ul class="footer-bottom-social">
                            <li><a href="#"><i class="ti-facebook"></i></a></li>
                            <li><a href="#"><i class="ti-twitter"></i></a></li>
                            <li><a href="#"><i class="ti-instagram"></i></a></li>
                            <li><a href="#"><i class="ti-linkedin"></i></a></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const logo = '/Logo alrei.png'

import { computed } from 'vue'

import { footerCat, footerHelp, footerLink1 } from '@/data/data.js'

const currentYear = computed(() => new Date().getFullYear())
</script>