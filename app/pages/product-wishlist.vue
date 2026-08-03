<template>

    <Preloader />
    <NavDark />

    <section class="bg-cover page-title" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="breadcrumb m-0">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb simple light">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Store</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Wishlist</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                        <h1 class="text-light">Wishlist</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div class="table-responsive">
                        <table class="table table-striped wishlist">
                            <tbody>

                                <tr v-for="(item, index) in wishlistData" :key="index">
                                    <th scope="row"><a href="#" class="remove_cart"><i class="ti-close"></i></a></th>
                                    <td><div class="tb_course_thumb"><img :src="item.image" class="img-fluid" alt="" /></div></td>
                                    <th>{{item.name}}<span class="tb_date text-muted">{{item.date}}</span></th>
                                    <td><span class="wish_price theme-cl">{{item.price}}</span></td>
                                    <template v-if="item.stock === true">
                                        <td>
                                            <span class="badge bg-green rounded-pill">In Stock</span>
                                        </td>
                                        <td>
                                            <a href="#" class="btn btn-main">
                                                Add To Cart
                                            </a>
                                        </td>
                                    </template>

                                    <template v-else>
                                        <td>
                                            <span class="badge bg-red rounded-pill">Out of Stock</span>
                                        </td>
                                        <td>
                                            <a href="#" class="btn btn-red">
                                                Remove
                                            </a>
                                        </td>
                                    </template>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
            
        </div>
    </section>

    <FooterTop />
    <FooterDark />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { wishlistData } from '@/data/shop.js'

</script>