<template>
    <div class="ed_view_box style_3">
                    
        <div class="sm">
            <div class="thumb">
                <img class="img-fluid ht-300 w-100 object-fit" :src="avatar3" alt="7.jpg">
            </div>
        </div>

        <div class="author-body px-4 py-3">
            <div class="ed_view_price p-0">
                <span class="badge bg-light-red text-red rounded-pill">25% off</span>
                <h2 class="lh-base">$179.45</h2>
            </div>
            <div class="ed-view-features half-list mb-4">
                <h6 class="fw-semibold">Course Features</h6>
                <ul>
                    <li><span><i class="bi bi-eye-fill"></i></span>3k Students View</li>
                    <li><span><i class="bi bi-clock-history"></i></span>2 hour 30 min</li>
                    <li><span><i class="bi bi-bar-chart"></i></span>Principiante</li>
                    <li><span><i class="bi bi-trophy"></i></span>04 Certified</li>
                </ul>
            </div>
            <div class="ed_view_link d-flex align-items-center justify-content-center flex-column gap-3 m-0 p-0">
                <a href="#" class="btn btn-outline-main rounded-pill w-100"><i class="bi bi-basket2 me-2"></i>Add To Cart</a>
                <a href="#" class="btn btn-main w-100 rounded-pill">Enrolled Now</a>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import avatar3 from "@/assets/img/avatar-3.jpg";
</script>