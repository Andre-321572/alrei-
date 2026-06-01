<template>
    <div class="row justify-content-center g-4">
                    
        <div v-for="(cat, index) in categories" :key="index" class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div class="card-hover style-2 p-4 rounded-3 card card-body d-flex flex-column gap-3 m-0">
                <div class="icon-wraps">
                    <span class="icon-slap fs-1"><i :class="cat.icon"></i></span>
                </div>
                <div>
                    <h4 class="text-dark fw-normal mb-0 lh-base">{{cat.title}}</h4>
                    <span class="text-muted-2">
                        <span class="fw-semibold me-1">{{cat.count}}</span>Courses
                    </span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { categoryOne } from '@/data/data.js'

const categories = ref([])

onMounted(() => {
  categories.value = categoryOne
})
</script>