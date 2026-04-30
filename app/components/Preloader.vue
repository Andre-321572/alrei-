<template>
    <div v-if="isVisible" id="preloader" ref="preloaderRef">
        <div class="preloader">
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const isVisible = ref(true)

const preloaderRef = ref(null)

onMounted(() => {
  if (preloaderRef.value) {
    setTimeout(() => {
      preloaderRef.value.style.transition = "opacity 0.3s ease"
      preloaderRef.value.style.opacity = "0"

      setTimeout(() => {
        isVisible.value = false
      }, 300)

    }, 200)
  }
})
</script>