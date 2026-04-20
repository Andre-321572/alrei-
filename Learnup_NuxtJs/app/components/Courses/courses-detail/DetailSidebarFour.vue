<template>
    <div class="ed_view_box style_2 overlio">
                    
        <div class="ed_author">
            <div class="ed_author_thumb">
                <img class="img-fluid circle" :src="avatar3" alt="7.jpg">
            </div>
            <div class="ed_author_box">
                <h4>Adam K. Marck</h4>
                <span>Full-Stack Developer from Las Vegas</span>
            </div>
        </div>
        
        <div class="author-body p-3">
            <div class="ed_view_price">
                <span class="badge bg-light-red text-red rounded-pill">25% off</span>
                <h2 class="lh-base">$179.45</h2>
            </div>
            <div class="ed_view_features mb-4">
                <h6 class="fw-semibold">Course Features</h6>
                <ul>
                    <li><i class="bi bi-check-circle-fill me-2 text-green"></i>Fully Programming</li>
                    <li><i class="bi bi-check-circle-fill me-2 text-green"></i>Help Code to Code</li>
                    <li><i class="bi bi-check-circle-fill me-2 text-green"></i>Free Trial 7 Days</li>
                    <li><i class="bi bi-check-circle-fill me-2 text-green"></i>Unlimited Videos</li>
                    <li><i class="bi bi-check-circle-fill me-2 text-green"></i>24x7 Support</li>
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