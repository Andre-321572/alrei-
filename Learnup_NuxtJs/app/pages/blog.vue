<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="pageTitle-wrap text-center">
                        <h1 class="text-light">{{ $t('latest_updates') }}</h1>
                        <p class="text-light">{{ $t('contact_intro') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            
            <div class="row align-items-center justify-content-center mb-5">
                        
                <div class="col-lg-4 col-md-6 col-sm-6" v-for="(item, index) in blogData" :key="index">
                    <div class="card mb-4 shadow-sm card-lift">
                        <NuxtLink :to="`/blog-detail/${item.id}`">
                            <img :src="item.image" class="img-fluid" alt="Blog Img Title ">
                        </NuxtLink>
                        <div class="card-body">
                            <div class="d-flex mb-2"><a href="#" class="badge bg-light-green text-green rounded-2">{{ $t('tutorial') }}</a></div>
                            <h4 class="grid-blog-heading lh-base">
                                <NuxtLink :to="`/blog-detail/${item.id}`" class="text-inherit">{{item.title}}</NuxtLink>
                            </h4>
                            <p>{{item.desc}}</p>
                            <div class="row align-items-center g-0 mt-4">
                                <div class="col-auto">
                                    <img :src="item.avatarImg" alt="avatar" class="img-fluid circle w-10">
                                </div>
                                <div class="col ps-2">
                                    <h6 class="lh-1 mb-0">{{item.avatarName}}</h6>
                                    <p class="text-muted-2 text-md mb-0">{{item.date}}</p>
                                </div>
                                <div class="col-auto">
                                    <p class="text-muted text-mid m-0">{{item.time}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                            <button type="button" class="btn btn-light-main px-5"><i class="bi bi-arrow-clockwise me-2"></i>{{ $t('load_more') }}</button>
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

import { blogData } from '@/data/data.js'

</script>