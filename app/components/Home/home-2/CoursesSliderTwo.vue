<template>
    <div class="row g-4">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, index) in coursesList" :key="index">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="position-relative">
                    <img :src="item.image" class="card-img-top object-fit-cover" style="height: 200px;" :alt="item.title">
                    <div class="position-absolute top-0 start-0 m-3">
                        <span class="badge bg-main text-white px-3 py-2 rounded-pill shadow-sm">{{ item.badge }}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column p-4">
                    <div class="mb-2">
                        <span class="badge bg-light-main text-main me-2"><i class="bi bi-person-workspace me-1"></i>{{ item.accessType }}</span>
                    </div>
                    <h5 class="card-title fs-6 fw-bold mb-3">
                        <NuxtLink :to="localePath('/blog/' + item.slug)" class="text-dark text-decoration-none">{{ item.title }}</NuxtLink>
                    </h5>
                    <p class="card-text text-muted small mb-3 flex-grow-1 lh-base">{{ item.desc }}</p>
                    <div class="p-3 bg-light rounded-3 mb-3 small">
                        <div class="text-muted"><i class="bi bi-laptop me-2 text-main"></i><strong>Format :</strong> {{ item.format }}</div>
                        <div class="text-muted mt-1"><i class="bi bi-calendar-event me-2 text-main"></i><strong>Calendrier :</strong> {{ item.schedule }}</div>
                    </div>
                    <NuxtLink :to="localePath('/blog/' + item.slug)" class="btn btn-main rounded-pill w-100 fw-semibold">
                        {{ item.btnText }} <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { coursesData } from '@/data/data.js'
const localePath = useLocalePath()
const coursesList = ref(coursesData)
</script>