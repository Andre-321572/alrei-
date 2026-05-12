<template>
    <div class="list-single-main-item fl-wrap border">
        <div class="list-single-main-item-title fl-wrap">
            <h3>{{ $t('reviews') }} - <span> {{ course?.reviews?.length || 0 }} </span></h3>
        </div>
        <div class="reviews-comments-wrap">

            <div v-if="!course?.reviews || course?.reviews?.length === 0" class="text-center py-4">
                <p class="text-muted">{{ $t('no_reviews_yet') }}</p>
            </div>

            <div 
                v-else
                class="reviews-comments-item"
                v-for="review in course.reviews" 
                :key="review.id"
            >
                <div class="review-comments-avatar">
                    <img :src="review.user?.avatar || avatar3" class="img-fluid" alt="">
                </div>
                <div class="reviews-comments-item-text">
                    <h4><a href="#">{{ review.user?.name }}</a><span class="reviews-comments-item-date">
                        <i class="bi bi-clock"></i>{{ new Date(review.created_at).toLocaleDateString() }}</span></h4>

                    <div class="listing-rating" data-starrating2="5">
                        <i v-for="n in 5" :key="n" :class="['fas fa-star', n <= review.rating ? 'text-warning' : 'text-muted']"></i>
                    </div>
                    <div class="clearfix"></div>
                    <p>{{ review.comment }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import avatar3 from "@/assets/img/avatar-3.jpg";
const { course } = defineProps({ course: Object })
</script>