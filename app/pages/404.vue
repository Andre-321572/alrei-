<template>

    <section class="error-wrap">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-10">
                    <div class="text-center">
                        <img :src="ErrorI" class="img-fluid" alt="">
                        <p>Maecenas quis consequat libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper</p>
                        <NuxtLink class="btn btn-main px-4" to="/">Back To Home</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>

import ErrorI from "@/assets/img/404.png";

</script>