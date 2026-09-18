<template>
    <div class="row justify-content-center g-4">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in blogData.slice(0, 3)" :key="index">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <NuxtLink :to="localePath('/blog-detail/' + item.slug)">
                    <img :src="item.image" class="card-img-top object-fit-cover" style="height: 190px;" :alt="item.title">
                </NuxtLink>
                <div class="card-body d-flex flex-column p-4">
                    <div class="mb-2">
                        <span class="badge bg-light-main text-main px-3 py-1 rounded-pill small fw-semibold">{{ item.category }}</span>
                    </div>
                    <h5 class="card-title fs-6 fw-bold mb-3">
                        <NuxtLink :to="localePath('/blog-detail/' + item.slug)" class="text-dark text-decoration-none">{{ item.cardTitle }}</NuxtLink>
                    </h5>
                    <p class="card-text text-muted small flex-grow-1 lh-base mb-3">{{ item.desc }}</p>
                    <div class="d-flex align-items-center justify-content-between pt-3 border-top text-muted small">
                        <span><i class="bi bi-person me-1"></i>{{ item.author }}</span>
                        <span><i class="bi bi-calendar me-1"></i>{{ item.date }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { blogData } from '@/data/data.js'
const localePath = useLocalePath()
</script>