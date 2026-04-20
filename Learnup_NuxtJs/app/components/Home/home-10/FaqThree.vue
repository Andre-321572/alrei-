<template>
    <div class="row align-items-center justify-content-center gx-xl-5 gx-lg-5 g-4">
                
        <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">
            <div class="facts-img">
                <img :src="custom3" class="img-fluid" alt="" />
            </div>
        </div>
        
        <div class="col-xl-6 col-lg-6 col-sm-12">
            <div class="supporting-wraps">
                <div class="supporting-wraps">
                    <div class="d-block mb-4">
                        <h2 class="display-5 fw-normal">Explore Our History & <br>Core Value</h2>
                        <p class="text-muted-2">You made all the required mock ups for commissioned layout, got all the approvals, built a tested code base or had them built, you decided on a content management system, got a license for it or adapted open source software for your client's needs.</p>
                    </div>
                
                    <div id="supportingExample" class="accordion supporting">

                        <!-- Part 1 -->
                        <div class="card border shadow-0 mb-3">
                            <div id="headingOne" class="card-header">
                                <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="d-block position-relative text-dark  fw-semibold collapsible-link py-2">Free Vs Premium Courses</a></h6>
                            </div>
                            <div id="collapseOne" aria-labelledby="headingOne" data-parent="#supportingExample" class="collapse show">
                                <div class="card-body text-muted p-3">
                                    We’re developing an innovative Bootstrap-powered UI Kit tool designed specifically for developers, engineers, full-stack developers, and digital agencies.
                                </div>
                            </div>
                        </div>

                        <!-- Part 2 -->
                        <div class="card border shadow-0 mb-3">
                            <div id="headingTwo" class="card-header">
                                <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" class="d-block position-relative collapsed text-dark  fw-semibold collapsible-link py-2">Advance in Membership Plan?</a></h6>
                            </div>
                            <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#supportingExample" class="collapse">
                                <div class="card-body text-muted p-3">
                                    We’re developing an innovative Bootstrap-powered UI Kit tool designed specifically for developers, engineers, full-stack developers, and digital agencies.
                                </div>
                            </div>
                        </div>

                        <!-- Part 3 -->
                        <div class="card border shadow-0 mb-3">
                            <div id="headingThree" class="card-header">
                                <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" class="d-block position-relative collapsed text-dark  fw-semibold collapsible-link py-2">High Value Supporting</a></h6>
                            </div>
                            <div id="collapseThree" aria-labelledby="headingThree" data-parent="#supportingExample" class="collapse">
                                <div class="card-body text-muted p-3">
                                    We’re developing an innovative Bootstrap-powered UI Kit tool designed specifically for developers, engineers, full-stack developers, and digital agencies.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script setup>
import custom3 from "@/assets/img/custom-img-3.png"
</script>