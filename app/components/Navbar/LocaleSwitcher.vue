<template>
  <li class="nav-item dropdown lang-selector">
    <a class="nav-link dropdown-toggle" href="#" id="langDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" @click.prevent="toggleDropdown">
      <i class="bi bi-globe me-1"></i> {{ currentLocaleName }}
    </a>
    <ul class="nav-dropdown nav-submenu dropdown-menu" aria-labelledby="langDropdown" :style="{ display: (isMobile && isOpen) ? 'block !important' : '' }">
      <li v-for="locale in availableLocales" :key="locale.code">
        <NuxtLink class="dropdown-item" :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from '#app'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const isMobile = ref(false)
const isOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const currentLocaleName = computed(() => {
  return locales.value.find(i => i.code === locale.value)?.name
})

const toggleDropdown = () => {
  if (isMobile.value) {
    isOpen.value = !isOpen.value
  }
}

const checkIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 992
  }
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})

watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<style scoped>
.lang-selector {
    cursor: pointer;
}
.lang-selector .nav-link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
}
</style>
