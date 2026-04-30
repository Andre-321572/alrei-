<template>

  <Preloader />

  <div class="shadow-sm">
      <NavDark />
  </div>

  <ProductHeader :shop="ShopData" />

  <section class="bg-light">
    <div class="container">
      
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6 col-sm-12">
          <div class="sec-heading center">
            <p>Related Product</p>
            <h2>Hot & New Related Product</h2>
          </div>
        </div>
      </div>
      
      <div class="row align-items-center justify-content-center g-4">
        
        <div 
          class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6"
          v-for="(item, index) in shopData.slice(0, 4)" 
          :key="index"
        >
    
          <div class="card shadow-sm">
            <div class="position-relative">
                <img :src="item.image" class="img-fluid" alt="Book Name">
                <div class="card-img-overlay d-flex z-index-0 p-3">
                    <div class="position-absolute end-0 top-0 me-3 mt-3">
                        <a href="#" class="square--40 circle btn-dark" data-bs-toggle="tooltip" data-bs-title="Add To Basket"><i class="bi bi-basket2"></i></a>
                    </div>
                </div>
            </div>

            <div class="card-body px-3">
                <h6 class="card-title">
                    <NuxtLink :to="`/product-detail/${item.id}`" class="stretched-link">{{item.title}}</NuxtLink>
                </h6>
                <div class="d-flex align-items-center gap-1">
                    <span class="star text-warning"><i class="bi bi-star-fill"></i></span>
                    <span class="overall-rate text-dark fw-semibold">{{item.rate}}</span>
                    <span class="total-rating text-mid text-muted">({{item.review}} Reviews)</span>
                </div>
            </div>

            <div class="card-footer bg-white border-top py-3">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="h6 fw-light mb-0">By <span class="fw-semibold">{{item.auther}}</span></span>
                    <h5 class="text-green mb-0">${{item.price}}</h5>
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
import ProductHeader from '@/components/Pages/Shop-Pages/ProductHeader.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { shopData } from '@/data/shop.js'

// Import useRoute and computed
import { useRoute } from '#app'
import { computed } from 'vue'

// ROUTE PARAMS
const route = useRoute()
const id = computed(() => Number(route.params.id))

// GET Shop DATA BASED ON ID
const ShopData = computed(() => {
  if (!id.value) {
    return shopData[1] // default shop if no id
  }
  return shopData.find(item => item.id === id.value)
})

</script>