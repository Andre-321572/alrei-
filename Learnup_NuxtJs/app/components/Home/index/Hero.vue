<template>
    <div class="hero_banner home-1 position-relative">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xl-8 col-lg-9 col-md-12">
                
                    <div class="hero-caption text-center mb-5">
                        <div class="d-block mb-2">
                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <div class="trustpilot-img"><img :src="trustpilot" class="img-fluid" width="150"></div>
                                <div class="trustpilot-rats d-flex align-items-center justify-content-center gap-2">
                                    <span class="text-dark fw-semibold">4.8</span>
                                    <span class="text-muted">(3213 Reviews)</span>
                                </div>
                            </div>
                        </div>
                        <h1 class="big-header-capt cl_2 mb-0">Start Learning Today, Succeed Tomorrow</h1>
                    </div>
                    
                    <div class="hero-search">
                        <form class="search-form shadow-sm">
                            <div class="form-group flex-fill">
                                <input type="text" class="form-control" placeholder="Search for courses, skills, and videos">
                                <i class="ico bi bi-search"></i>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-main"><i class="bi bi-send-fill rotate-45"></i></button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
            
        </div>
        <div class="position-absolute start-0 bottom-0"><img :src="catalog1" class="img-fluid" width="400"></div>
        <div class="position-absolute end-0 bottom-0"><img :src="catalog2" class="img-fluid" width="400"></div>
    </div>
</template>

<script setup>
import trustpilot from "@/assets/img/trustpilot.png"
import catalog1 from "@/assets/img/banner-catalog-1.png"
import catalog2 from "@/assets/img/banner-catalog-2.png"
</script>