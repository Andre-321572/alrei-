<template>
    <div :class="['header header-light', { 'header-fixed': isSticky }]">
        <div class="container">
            <nav id="navigation" :class="isMobile ? 'navigation navigation-portrait' : 'navigation navigation-landscape'">
                <div class="nav-header">
                    <NuxtLink class="nav-brand" :to="localePath('/')">
                        <img :src="logo" class="logo" alt="" style="height:65px;width:auto;" />
                    </NuxtLink>
                    <div class="nav-toggle" @click="toggle = !toggle"></div>
                </div>
                <div :class="['nav-menus-wrapper', { 'nav-menus-wrapper-open': toggle }]">
                    <span class="nav-menus-wrapper-close-button" @click="toggle = !toggle">
                        ✕
                    </span>
                    <ul class="nav-menu">
                        <li :class="current === '/' ? 'active' : ''">
                            <NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink>
                        </li>
                        <li :class="current === '/courses' ? 'active' : ''">
                            <NuxtLink :to="localePath('/courses')">{{ $t('courses') }}</NuxtLink>
                        </li>
                        <li :class="current === '/blog' ? 'active' : ''">
                            <NuxtLink :to="localePath('/blog')">{{ $t('blog') }}</NuxtLink>
                        </li>
                        <li :class="current === '/contact' ? 'active' : ''">
                            <NuxtLink :to="localePath('/contact')">{{ $t('contact') }}</NuxtLink>
                        </li>
                        <LocaleSwitcher v-if="isMobile" />
                    </ul>
                    
                    <ul class="nav-menu nav-menu-social align-to-right">
                        <LocaleSwitcher />
                        
                        <li v-if="!isAuthenticated" class="become-tutor">
                            <NuxtLink :to="localePath('/become-tutor')"><i class="bi bi-person-circle"></i>{{ $t('become_tutor') }}</NuxtLink>
                        </li>
                        <li v-if="!isAuthenticated" class="join-btn">
                            <NuxtLink :to="localePath('/register?tab=login')"><i class="bi bi-box-arrow-in-right"></i>{{ $t('sign_in') }}</NuxtLink>
                        </li>
                        <li v-if="isAuthenticated" class="join-btn">
                            <a href="#" @click.prevent="logout" class="bg-danger border-danger"><i class="bi bi-box-arrow-right"></i>{{ $t('logout') }}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <div class="clearfix"></div>
</template>

<script setup>
const logo = '/Logo alrei.png'
const logoIcon = '/Logo alrei.png'

import LocaleSwitcher from './LocaleSwitcher.vue'
import { useRoute } from '#app'

const localePath = useLocalePath()


const isMobile = ref(false)
const toggle = ref(false)
const isSticky = ref(false)

const route = useRoute()
const { isAuthenticated, logout } = useAuth()

const current = computed(() => route.path)

watch(() => route.path, () => {
  toggle.value = false
  document.body.style.overflow = 'auto' // Force le scroll
  document.body.classList.remove('offcanvas-open', 'modal-open') // Nettoyage Bootstrap
})

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 992
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 992
}

const handleScroll = () => {
  if (window.scrollY > 150) {
    isSticky.value = true;
  } else if (window.scrollY < 40) {
    isSticky.value = false;
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
  checkIsMobile()

  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>