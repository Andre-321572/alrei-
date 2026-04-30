<template>
    <div class="single_instructor border">
        <div class="single_instructor_thumb">
            <a href="#"><img :src="avatar3" class="img-fluid" alt=""></a>
        </div>
        <div class="single_instructor_caption">
            <h4><a href="#">Adam K. Marck</a></h4>
            <ul class="instructor_info">
                <li><i class="bi bi-camera-reels"></i>72 Videos</li>
                <li><i class="bi bi-collection-play"></i>102 Lectures</li>
                <li><i class="bi bi-mortarboard"></i>15+ Year Exp.</li>
            </ul>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi.</p>
            <ul class="social_info">
                <li><a href="#"><i class="bi bi-facebook"></i></a></li>
                <li><a href="#"><i class="bi bi-linkedin"></i></a></li>
                <li><a href="#"><i class="bi bi-twitter"></i></a></li>
                <li><a href="#"><i class="bi bi-behance"></i></a></li>
                <li><a href="#"><i class="bi bi-youtube"></i></a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import avatar3 from "@/assets/img/avatar-3.jpg";

</script>