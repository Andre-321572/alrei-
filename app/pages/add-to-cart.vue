<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="breadcrumb m-0">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb simple light">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Add to Cart</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                        <h1 class="text-light">Add To Cart</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-12">
                    <div class="table-responsive">
                        <table class="table add_to_cart">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item, index) in cartData" :key="index">
                                    <td><div class="tb_course_thumb"><img :src="item.image" class="img-fluid" alt="" /></div></td>
                                    <th>{{item.title}}<span class="tb_date text-muted">{{item.date}}</span></th>
                                    <td><span class="wish_price theme-cl">{{item.price}} FCFA</span></td>
                                    <td><input type="number" class="form-control qty" step="1" value="1" title="Qty" size="4" placeholder="" inputmode="numeric"></td>
                                    <td><a href="#" class="btn btn-remove">Remove</a></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Coupon Apply -->
                    <div class="checkout-coupon d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
                        <div class="checkout_coupon_flex">
                            <form class="form-inline d-flex align-items-center justify-content-start gap-2">
                                <input class="form-control w-50" type="search" placeholder="Coupon Code" >
                                <button type="button" class="btn btn-main">Apply Coupon</button>
                            </form>
                        </div>
                        <div class="ckt_last">
                            <form class="form-inline d-flex align-items-center justify-content-start gap-2">
                                <button type="button" class="btn btn-dark">Empty cart</button>
                                <button type="button" class="btn btn-main disabled">Update Cart</button>
                            </form>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-lg-4 col-md-12">
                    <!-- Total Cart -->
                    <div class="cart_totals checkout">
                        <h4>Billing Summary</h4>
                        <div class="cart-wrap">
                            <ul class="cart_list">
                                <li>Base price<strong>14000 FCFA</strong></li>
                                <li>Discount<strong>$10.00</strong></li>
                                <li>CGST<strong>$10.00</strong></li>
                                <li>SGST<strong>$10.00</strong></li>
                            </ul>
                            <div class="flex_cart">
                                <div class="flex_cart_1">
                                    Total Cost
                                </div>
                                <div class="flex_cart_2">
                                    $170.00
                                </div>
                            </div>
                            <button type="button" class="btn btn-main w-100">Proceed To Checkout</button>
                        </div>
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

import { cartData } from '@/data/shop.js'

</script>