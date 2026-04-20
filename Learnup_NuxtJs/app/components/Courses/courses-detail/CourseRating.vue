<template>
    <div class="list-single-main-item fl-wrap border">
        <div class="list-single-main-item-title fl-wrap">
            <h3>Item Reviews - <span> 3 </span></h3>
        </div>
        <div class="reviews-comments-wrap">

            <div 
                class="reviews-comments-item"
                v-for="(item, index) in courseRatingData" 
                :key="index"
            >
                <div class="review-comments-avatar">
                    <img :src="item.image" class="img-fluid" alt="">
                </div>
                <div class="reviews-comments-item-text">
                    <h4><a href="#">{{item.name}}</a><span class="reviews-comments-item-date">
                        <i class="bi bi-clock"></i>{{item.date}}</span></h4>

                    <div :class="['listing-rating', item.level]" data-starrating2="5">
                        <i v-for="(star, idx) in item.rate" :key="idx" :class="star"></i>
                        <span class="review-count">{{ item.review }}</span>
                    </div>
                    <div class="clearfix"></div>
                    <p>{{item.desc}}</p>
                    <div class="pull-left reviews-reaction">
                        <a href="#" class="comment-like active"><i class="bi bi-hand-thumbs-up"></i> {{item.like}}</a>
                        <a href="#" class="comment-dislike active"><i class="bi bi-hand-thumbs-down"></i> {{item.dislike}}</a>
                        <a href="#" class="comment-love active"><i class="bi bi-suit-heart"></i> {{item.love}}</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import { courseRatingData } from '@/data/data.js'

</script>