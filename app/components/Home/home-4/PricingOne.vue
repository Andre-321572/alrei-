<template>
    <div class="row align-items-center justify-content-center">
        <div class="col-xl-12 col-lg-12 col-md-12">
            <!-- Toggle -->
            <div class="billing-toggle">
                <span class="fw-semibold">Monthly</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="billingSwitch" @click="handleChange">
                </div>
                <span class="fw-semibold">Yearly <span class="badge badge-sm bg-green rounded-pill">Save 20%</span></span>
            </div>
        </div>
    </div>
    
    <div class="row g-3">
    
        <!-- Single Package -->
        <div class="col-lg-4 col-md-4">
            <div class="card border rounded-3 p-3">
                <!-- Card Header -->
                <div class="card-header border-0 p-3 bg-light rounded-2">
                    <!-- Price and Info -->
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <!-- Info -->
                        <div>
                            <h5 class="mb-1">Basic</h5>
                            <div class="badge text-bg-dark mb-0 rounded-pill">Most popular</div>
                        </div>
                        <!-- Price -->
                        <div v-if="!month">
                            <h4 class="card-price text-success fs-2 mb-0">$19<span class="text-dark fw-normal fs-6">/mo</span></h4>
                        </div>
                        <div v-else>
                            <h4 class="card-price text-success fs-2 mb-0">$190<span class="text-dark fw-normal fs-6">/year</span></h4>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="position-relative my-3 text-center">
                    <hr>
                    <p class="small position-absolute text-muted top-50 start-50 translate-middle bg-body px-3">All plans included</p>
                </div>

                <!-- Card Body -->
                <div class="card-body pt-0">
                    <ul class="list-unstyled mt-2 mb-0">
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Up to 03 users monthly</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Access free courses</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Online Classess</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Unlimited Storage</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-x-octagon-fill text-danger me-2"></i>Offline Classess</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-x-octagon-fill text-danger me-2"></i>Create Projects</li>
                        <li class="h6 fw-light"><i class="bi bi-x-octagon-fill text-danger me-2"></i>24/7 dedicated Support</li>
                    </ul>
                </div>
                <!-- Card Footer -->
                <div class="card-footer text-center bg-white p-3 border-0">
                    <button type="button" class="btn btn-gray rounded-pill w-100">Get Started</button>
                </div>
            </div>
        </div>
        
        <!-- Single Package -->
        <div class="col-lg-4 col-md-4">
            <div class="card border rounded-3 p-3">
                <!-- Card Header -->
                <div class="card-header border-0 p-3 bg-light rounded-2">
                    <!-- Price and Info -->
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <!-- Info -->
                        <div>
                            <h5 class="mb-1">Standard</h5>
                            <div class="badge bg-red mb-0 rounded-pill">Recommended</div>
                        </div>
                        <!-- Price -->
                        <div v-if="!month">
                            <h4 class="card-price text-success fs-2 mb-0">$99<span class="text-dark fw-normal fs-6">/mo</span></h4>
                        </div>
                        <div v-else>
                            <h4 class="card-price text-success fs-2 mb-0">$299<span class="text-dark fw-normal fs-6">/year</span></h4>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="position-relative my-3 text-center">
                    <hr>
                    <p class="small position-absolute text-muted top-50 start-50 translate-middle bg-body px-3">All plans included</p>
                </div>

                <!-- Card Body -->
                <div class="card-body pt-0">
                    <ul class="list-unstyled mt-2 mb-0">
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Up to 05 users monthly</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Access free courses</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Online Classess</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Unlimited Storage</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Offline Classess</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-x-octagon-fill text-danger me-2"></i>Create Projects</li>
                        <li class="h6 fw-light"><i class="bi bi-x-octagon-fill text-danger me-2"></i>24/7 dedicated Support</li>
                    </ul>
                </div>
                <!-- Card Footer -->
                <div class="card-footer text-center bg-white p-3 border-0">
                    <button type="button" class="btn btn-main rounded-pill w-100">Get Started</button>
                </div>
            </div>
        </div>
        
        <!-- Single Package -->
        <div class="col-lg-4 col-md-4">
            <div class="card border rounded-3 p-3">
                <!-- Card Header -->
                <div class="card-header border-0 p-3 bg-light rounded-2">
                    <!-- Price and Info -->
                    <div class="d-flex justify-content-between align-items-center w-100">
                        <!-- Info -->
                        <div>
                            <h5 class="mb-1">Professional</h5>
                            <div class="badge text-bg-dark mb-0 rounded-pill">Best Value</div>
                        </div>
                        <!-- Price -->
                        <div v-if="!month">
                            <h4 class="card-price text-success fs-2 mb-0">$149<span class="text-dark fw-normal fs-6">/mo</span></h4>
                        </div>
                        <div v-else>
                            <h4 class="card-price text-success fs-2 mb-0">$599<span class="text-dark fw-normal fs-6">/year</span></h4>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="position-relative my-3 text-center">
                    <hr>
                    <p class="small position-absolute text-muted top-50 start-50 translate-middle bg-body px-3">All plans included</p>
                </div>

                <!-- Card Body -->
                <div class="card-body pt-0">
                    <ul class="list-unstyled mt-2 mb-0">
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Up to 05 users monthly</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Access free courses</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Online Classess</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Unlimited Storage</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Offline Classess</li>
                        <li class="mb-3 h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>Create Projects</li>
                        <li class="h6 fw-light"><i class="bi bi-patch-check-fill text-green me-2"></i>24/7 dedicated Support</li>
                    </ul>
                </div>
                <!-- Card Footer -->
                <div class="card-footer text-center bg-white p-3 border-0">
                    <button type="button" class="btn btn-gray rounded-pill w-100">Get Started</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'

const month = ref(false)

function handleChange() {
  month.value = !month.value
}
</script>