<template>
    <div class="card rounded-4 border shadow-0">
        <div class="card-body">
        
            <div class="ed_view_price mb-4">
                <h2 class="theme-cl mb-0">$149.200</h2>
                <div class="offer-box"><span class="old-prc">$199.20</span><span class="offer-box">25% Off</span></div>
            </div>
            
            <div class="ed_view_link d-flex align-items-center justify-content-center flex-column gap-3 mb-4 p-0">
                <a href="#" class="btn btn-outline-main rounded-pill w-100"><i class="bi bi-basket2 me-2"></i>Add To Cart</a>
                <a href="#" class="btn btn-main w-100 rounded-pill">Enrolled Now</a>
            </div>
            
            <div class="ed-view-features full-list mb-4">
                <h6 class="fw-semibold">Course Features</h6>
                <ul>
                    <li><span class="bg-light-green text-green"><i class="bi bi-eye-fill"></i></span>14.4k Students Enrolled</li>
                    <li><span class="bg-warning bg-opacity-10 text-warning"><i class="bi bi-bar-chart"></i></span>Principiante</li>
                    <li><span class="bg-info bg-opacity-10 text-info"><i class="bi bi-clock-history"></i></span>12 hour 30 min</li>
                    <li><span class="bg-light-red text-red"><i class="bi bi-trophy"></i></span>Get Certified</li>
                    <li><span class="bg-success bg-opacity-10 text-success"><i class="bi bi-clock-history"></i></span>Lifetime Access</li>
                </ul>
            </div>
            
            <!-- About Mentor Profile -->
            <div class="mentor-card">
                
                <div class="d-flex align-items-center gap-3 mb-4">
                    <div class="mentor-thumb">
                        <div class="square--80"><img :src="avatar3" class="img-fluid circle" alt="Mentor Avatar"></div>
                    </div>
                    <div class="mentor-caps">
                        <div class="mentor-title d-flex align-items-center">
                            <h5 class="m-0">Adnil M. Marc</h5><span class="fs-6 text-green verified-mentor ms-1"><i class="bi bi-patch-check-fill"></i></span>
                        </div>
                        <div class="mentor-expert"><span class="text-mid text-muted">Full-Stack Developer, Designer</span></div>
                        <div class="d-flex align-items-center justify-content-start gap-2 mt-1">
                            <span class="rating-star text-warning"><i class="bi bi-star-fill"></i></span>
                            <span class="overall-rating text-dark fw-semibold">4.8</span>
                            <span class="total-rating text-mid">(12.3k Reviews)</span>
                        </div>
                    </div>
                </div>
                
                <div class="mentor-basic-info">
                    <div class="d-flex justify-content-between mb-4">
                        <div class="d-flex flex-column gap-1">
                            <h6 class="text-dark lh-1 fw-semibold m-0">42,570</h6>
                            <span class="text-muted-2 m-0">Students</span>
                        </div>
                        <div class="d-flex flex-column gap-2">
                            <h6 class="text-dark lh-1 fw-semibold m-0">46+</h6>
                            <span class="text-muted-2 m-0">Courses</span>
                        </div>
                        <div class="d-flex flex-column gap-2">
                            <h6 class="text-dark lh-1 fw-semibold m-0">12,322</h6>
                            <span class="text-muted-2 m-0">Reviews</span>
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between gap-3">
                        <div class="flex-fill view-button">
                            <a href="#" class="btn btn-md btn-outline-main border-2 rounded-pill w-100">View Profile</a>
                        </div>
                        <div class="flex-fill follow-button">
                            <a href="#" class="btn btn-md btn-outline-dark border-2 rounded-pill w-100">Follow</a>
                        </div>
                    </div>
                    
                </div>
            
            </div>
        
        </div>
    </div>
</template>

<script setup>
import avatar3 from "@/assets/img/avatar-3.jpg";
</script>