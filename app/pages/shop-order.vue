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
                                <li class="breadcrumb-item"><a href="#">Store</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Billing</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                        <h1 class="text-light">Billing Info</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-12">
                
                    <div class="cart_totals checkout mb-4">
                        <h4>Billing info</h4>
                        <div class="row g-3">
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>First Name</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                                                                
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>Town/City</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>State/Country</label>
                                    <select id="country" class="form-control form-select">
                                        <option value="1">United State</option>
                                        <option value="2">United Kingdom</option>
                                        <option value="3">India</option>
                                        <option value="3">China</option>
                                        <option value="3">Canada</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label>Zip/Postal Code</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-6 col-md-6">
                                <div class="sm-add-ship">
                                    <input id="aa-4" class="form-check-input" name="aa-4" type="checkbox">
                                    <label for="aa-4" class="form-check-label">Skip to a different address?</label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="cart_totals checkout">
                        <h4>Select Payment Methode</h4>
                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <label :class="['choose_payment_mt', selected === 'payment1' ? 'active' : '']">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="payment1"
                                        v-model="selected"
                                        style="display: none;"
                                    />
                                    <img :src="mastercard" alt="" />
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <label :class="['choose_payment_mt', selected === 'payment2' ? 'active' : '']">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="payment2"
                                        v-model="selected"
                                        style="display: none;"
                                    />
                                    <img :src="paypal" alt="" />
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <label :class="['choose_payment_mt', selected === 'payment3' ? 'active' : '']">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="payment3"
                                        v-model="selected"
                                        style="display: none;"
                                    />
                                    <img :src="visa" alt="" />
                                </label>
                            </div>
                        </div>
                        
                        <div class="row g-3">
                            
                            <div class="col-lg-12 col-md-12">
                                <div class="form-group">
                                    <label>Card Number</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-7 col-md-7">
                                <div class="form-group">
                                    <label>Card Holder</label>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-lg-3 col-md-3">
                                <div class="form-group">
                                    <label>Expiry Date</label>
                                    <input type="text" class="form-control" placeholder="mm/dd/yyyy">
                                </div>
                            </div>
                            
                            <div class="col-lg-2 col-md-2">
                                <div class="form-group">
                                    <label>CVC</label>
                                    <input type="text" class="form-control" placeholder="cvc">
                                </div>
                            </div>
                            
                            <div class="col-lg-12 col-md-12">
                                <div class="form-group">
                                    <button type="button" class="btn btn-dark full-width">Proceed To Checkout</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                
                <div class="col-lg-4 col-md-12">
                    <!-- Total Cart -->
                    <div class="cart_totals checkout">
                        <h4>Order Summary</h4>
                        <div class="cart-wrap">
                            <ul class="cart_list">
                                <li>Base price<strong class="fw-semibold text-muted">14000 FCFA</strong></li>
                                <li>Discount<strong class="fw-semibold text-muted">$10.00</strong></li>
                                <li>CGST<strong class="fw-semibold text-muted">$10.00</strong></li>
                                <li>SGST<strong class="fw-semibold text-muted">$10.00</strong></li>
                            </ul>
                            <div class="flex_cart">
                                <div class="flex_cart_1">
                                    Total Cost
                                </div>
                                <div class="flex_cart_2 text-green">
                                    $170.00
                                </div>
                            </div>
                            <button type="button" class="btn btn-main w-100">Proceed To Checkout<i class="bi bi-arrow-right ms-2"></i></button>
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

import { ref } from 'vue'

const selected = ref('payment1')

import mastercard from "@/assets/img/mastercard.png";
import paypal from "@/assets/img/paypal.png";
import visa from "@/assets/img/visa.png";

</script>