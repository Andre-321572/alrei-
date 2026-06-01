<template>
    <section class="bg-cover" :style="tagStyle" data-overlay="5">
        <div class="container position-relative">
            <div class="row align-items-center justify-content-between g-4">
                
                <!-- Content Block -->
                <div class="col-xl-5 col-lg-6 col-md-12 col-sm-12">
                    <div class="caption-block">
                        <h2 class="display-3 text-light m-0">{{ $t('hello') }}</h2>
                        <h3 class="display-4 text-light">{{ $t('become_tutor_today') }}</h3>
                        <p class=" text-light">{{ $t('cta_description') }}</p>
                        <div class="benifit-wraps mb-4">
                            <ul class="p-0 m-0 row g-4">
                                <li class="col-sm-6 fs-5">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6  text-light">{{ $t('monthly_test_practis') }}</span>
                                    </div>
                                </li>
                                <li class="col-sm-6 fs-5">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6  text-light">{{ $t('offline_classes') }}</span>
                                    </div>
                                </li>
                                
                                <li class="col-sm-6 fs-5">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6  text-light">{{ $t('best_connectivity') }}</span>
                                    </div>
                                </li>
                                <li class="col-sm-6 fs-5">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="icons"><i class="bi bi-patch-check-fill text-green"></i></span><span class="fs-6  text-light">{{ $t('get_certificate') }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Form Block -->
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div class="card p-4 rounded-3 form-block">
                        <div class="d-block mb-4">
                            <h2>{{ $t('fill_form_and_join') }}</h2>
                            <p class="text-muted-2">{{ $t('discover_learners_world') }}</p>
                        </div>
                        <form class="row g-3">
                        
                            <div class="form-group col-md-6">
                                <input type="text" class="form-control" :placeholder="$t('name')">
                            </div>
                            
                            <div class="form-group col-md-6">
                                <input type="text" class="form-control" :placeholder="$t('email')">
                            </div>
                            
                            <div class="form-group col-md-6">
                                <input type="text" class="form-control" :placeholder="$t('subject')">
                            </div>
                            
                            <div class="form-group col-md-6">
                                <input type="text" class="form-control" :placeholder="$t('phone_no')">
                            </div>
                            
                            <div class="form-group col-md-12">
                                <textarea class="form-control" :placeholder="$t('message')"></textarea>
                            </div>
                            
                            <div class="form-group col-md-12">
                                <button type="button" class="btn btn-primary w-100">{{ $t('submit_request') }}</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
</template>

<script setup>

import { computed } from 'vue'

/* Banner Background */
import tagBg from '@/assets/img/tag-bg.jpg'

const tagStyle = computed(() => ({
    backgroundImage: `url(${tagBg})`,
    backgroundRepeat: 'no-repeat',
}))

</script>