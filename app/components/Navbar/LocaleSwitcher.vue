<template>
  <li class="nav-item dropdown lang-selector">
    <a class="nav-link dropdown-toggle" href="#" id="langDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" @click.prevent="toggleDropdown">
      <i class="bi bi-globe me-1"></i> {{ currentLocaleName }}
    </a>
    <ul class="nav-dropdown nav-submenu dropdown-menu" aria-labelledby="langDropdown" :class="{ show: isOpen }" :style="{ display: (isMobile && isOpen) ? 'block !important' : '' }">
      <li v-for="loc in availableLocales" :key="loc.code">
        <NuxtLink class="dropdown-item" :to="switchLocalePath(loc.code)" @click="changeLocale(loc.code)">
          {{ loc.name }}
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { useRoute } from '#app'

const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const isMobile = ref(false)
const isOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const currentLocaleName = computed(() => {
  return locales.value.find(i => i.code === locale.value)?.name || 'Français'
})

const changeLocale = async (code) => {
  isOpen.value = false
  await setLocale(code)
  const target = switchLocalePath(code)
  if (target && route.path !== target) {
    await navigateTo(target)
  }
}

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
