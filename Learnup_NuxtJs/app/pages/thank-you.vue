<template>

    <Preloader />

    <div class="shadow-sm">
        <NavDark />
    </div>

    <section>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-7 col-lg-8 col-md-12">
                    <div class="thankyou-wrap text-center">
                        <div class="square--90 circle bg-green text-light mx-auto mb-4"><i class="bi bi-patch-check-fill fs-1"></i></div>
                        <h2 class="text-dark">Course submission completed successfully.</h2>
                        <p>Thank you for submitting your item. We will review it shortly and notify you by email once your course has been accepted. Please ensure that your <a href="#" class="text-main">Payment and Tax information</a> is accurate and up to date.</p>
                        <NuxtLink to="/" class="btn btn-light-main mt-4 mb-5">Back to Homepage</NuxtLink>
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

</script>