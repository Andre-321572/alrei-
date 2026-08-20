<template>
    <div :class="['header header-transparent change-logo', { 'header-fixed': isSticky }]">
        <div class="container">
            <nav id="navigation" :class="isMobile ? 'navigation navigation-portrait' : 'navigation navigation-landscape'">
                <div class="nav-header">
                    <NuxtLink class="nav-brand static-logo" :to="localePath('/')">
                        <img :src="logoLight" class="logo" alt="" style="height:65px;width:auto;" />
                    </NuxtLink>
                    <NuxtLink class="nav-brand fixed-logo" :to="localePath('/')">
                        <img :src="logo" class="logo" alt="" style="height:65px;width:auto;" />
                    </NuxtLink>
                    <div class="nav-toggle" @click="toggle = !toggle"><i class="bi bi-list"></i></div>
                </div>
                <div :class="['nav-menus-wrapper', { 'nav-menus-wrapper-open': toggle }]">
                    <span class="nav-menus-wrapper-close-button" @click="toggle = !toggle">
                        ✕
                    </span>
                    <ul class="nav-menu">
                    
                        <li :class="current === '/' ? 'active' : ''">
                            <NuxtLink :to="localePath('/')">
                                {{ $t('home') }}
                            </NuxtLink>
                        </li>
                        
                        <li v-if="!isAdmin" :class="['/about-us','/blog','/blog-detail','/pricing','/404','/register','/contact','/privacy','/faq'].includes(current) ? 'active' : ''">
                            <a href="#" @click.prevent="toggleSubmenu('pages')">
                                {{ $t('pages') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu" :style="{ display: (isMobile && openSubmenus['pages']) ? 'block !important' : '' }">
                                <li :class="current === '/about-us' ? 'active' : ''"><NuxtLink :to="localePath('/about-us')">{{ $t('about_us') }}</NuxtLink></li>
                                <li :class="current === '/blog' ? 'active' : ''"><NuxtLink :to="localePath('/blog')">{{ $t('blog_style') }}</NuxtLink></li>
                                <li :class="current === '/blog-detail' ? 'active' : ''"><NuxtLink :to="localePath('/blog-detail')">{{ $t('blog_detail') }}</NuxtLink></li>
                                <li :class="current === '/pricing' ? 'active' : ''"><NuxtLink :to="localePath('/pricing')">{{ $t('pricing') }}</NuxtLink></li>
                                <li :class="current === '/404' ? 'active' : ''"><NuxtLink :to="localePath('/404')">{{ $t('page_404') }}</NuxtLink></li>
                                <li :class="current === '/register' ? 'active' : ''"><NuxtLink :to="localePath('/register?tab=register')">{{ $t('register') }}</NuxtLink></li>
                                <li :class="current === '/contact' ? 'active' : ''"><NuxtLink :to="localePath('/contact')">{{ $t('contact_us') }}</NuxtLink></li>
                                <li :class="current === '/privacy' ? 'active' : ''"><NuxtLink :to="localePath('/privacy')">{{ $t('privacy_policy') }}</NuxtLink></li>
                                <li :class="current === '/faq' ? 'active' : ''"><NuxtLink :to="localePath('/faq')">{{ $t('faqs') }}</NuxtLink></li>
                            </ul>
                        </li>
                        
                        <li v-if="isAuthenticated" :class="['/instructor-dashboard','/instructor-courses','/instructor-create-course','/instructor-course-added','/instructor-students','/instructor-reviews','/student-dashboard','/student-subscription','/student-course-resume','/student-wishlist','/student-payment-info','/profile-edit','/settings','/delete-account'].includes(current) ? 'active' : ''">
                            <a href="#" @click.prevent="toggleSubmenu('accounts')">
                                {{ $t('accounts') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu" :style="{ display: (isMobile && openSubmenus['accounts']) ? 'block !important' : '' }">
                                <li v-if="isInstructor" :class="['/instructor-dashboard','/instructor-courses','/instructor-create-course','/instructor-course-added','/instructor-students','/instructor-reviews'].includes(current) ? 'active' : ''">
                                    <a href="#" @click.prevent="toggleSubmenu('instructor_dash')">
                                        <i class="bi bi-person-check me-2"></i>{{ $t('instructor_dashboard') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                                    </a>
                                    <ul class="nav-dropdown nav-submenu" :style="{ display: (isMobile && openSubmenus['instructor_dash']) ? 'block !important' : '' }">
                                        <li :class="current === '/instructor-dashboard' ? 'active' : ''"><NuxtLink :to="localePath('/instructor-dashboard')"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-courses' ? 'active' : ''"><NuxtLink :to="localePath('/instructor-courses')"><i class="bi bi-basket2 me-2"></i>{{ $t('courses') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-create-course' ? 'active' : ''"><NuxtLink :to="localePath('/instructor-create-course')"><i class="bi bi-patch-plus me-2"></i>{{ $t('create_course') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-students' ? 'active' : ''"><NuxtLink :to="localePath('/instructor-students')"><i class="bi bi-people me-2"></i>{{ $t('students') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-reviews' ? 'active' : ''"><NuxtLink :to="localePath('/instructor-reviews')"><i class="bi bi-star-half me-2"></i>{{ $t('reviews') }}</NuxtLink></li>
                                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                    </ul>
                                </li>
                                <li v-if="isStudent" :class="['/student-dashboard','/student-subscription','/student-course-resume','/student-wishlist','/student-payment-info'].includes(current) ? 'active' : ''">
                                    <a href="#" @click.prevent="toggleSubmenu('student_dash')">
                                        <i class="bi bi-mortarboard me-2"></i>{{ $t('student_dashboard') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                                    </a>
                                    <ul class="nav-dropdown nav-submenu" :style="{ display: (isMobile && openSubmenus['student_dash']) ? 'block !important' : '' }">
                                        <li :class="current === '/student-dashboard' ? 'active' : ''"><NuxtLink :to="localePath('/student-dashboard')"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                        <li :class="current === '/student-subscription' ? 'active' : ''"><NuxtLink :to="localePath('/student-subscription')"><i class="bi bi-basket2 me-2"></i>{{ $t('my_subscription') }}</NuxtLink></li>
                                        <li :class="current === '/student-course-resume' ? 'active' : ''"><NuxtLink :to="localePath('/student-course-resume')"><i class="bi bi-patch-plus me-2"></i>{{ $t('course_resume') }}</NuxtLink></li>
                                        <li :class="current === '/student-wishlist' ? 'active' : ''"><NuxtLink :to="localePath('/student-wishlist')"><i class="bi bi-wallet2 me-2"></i>{{ $t('wishlist') }}</NuxtLink></li>
                                        <li :class="current === '/student-payment-info' ? 'active' : ''"><NuxtLink :to="localePath('/student-payment-info')"><i class="bi bi-star-half me-2"></i>{{ $t('payment_info') }}</NuxtLink></li>
                                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                    </ul>
                                </li>
                                <li v-if="isAdmin" :class="current === '/admin-dashboard' ? 'active' : ''"><NuxtLink :to="localePath('/admin-dashboard')"><i class="bi bi-shield-lock me-2"></i>{{ $t('administration') }}</NuxtLink></li>
                                <li :class="current === '/profile-edit' ? 'active' : ''"><NuxtLink :to="localePath('/profile-edit')"><i class="bi bi-person-bounding-box me-2"></i>{{ $t('my_profile') }}</NuxtLink></li>
                                <li :class="current === '/settings' ? 'active' : ''"><NuxtLink :to="localePath('/settings')"><i class="bi bi-gear me-2"></i>{{ $t('settings') }}</NuxtLink></li>
                                <li :class="current === '/delete-account' ? 'active' : ''"><NuxtLink :to="localePath('/delete-account')"><i class="bi bi-trash3 me-2"></i>{{ $t('delete_accounts') }}</NuxtLink></li>
                                <li><a href="#" @click.prevent="logout"><i class="bi bi-box-arrow-right me-2"></i>{{ $t('logout') }}</a></li>
                            </ul>
                        </li>
                        <li :class="current === '/blog' ? 'active' : ''">
                             <NuxtLink :to="localePath('/blog')">{{ $t('blog_style') }}</NuxtLink>
                         </li>
                         <li :class="current === '/contact' ? 'active' : ''">
                             <NuxtLink :to="localePath('/contact')">{{ $t('contact_us') }}</NuxtLink>
                         </li>
                         <LocaleSwitcher v-if="isMobile" />
                    </ul>
                    
                    <ul class="nav-menu nav-menu-social align-to-right">
                        <LocaleSwitcher />
                        
                        <li v-if="!isAuthenticated" class="become-tutor light">
                            <NuxtLink :to="localePath('/become-tutor')"><i class="bi bi-person-circle"></i>{{ $t('become_tutor') }}</NuxtLink>
                        </li>
                        <li v-if="!isAuthenticated" class="join-btn light">
                            <NuxtLink :to="localePath('/register?tab=login')"><i class="bi bi-box-arrow-in-right"></i>{{ $t('sign_in') }}</NuxtLink>
                        </li>
                        <li v-if="isAuthenticated" class="join-btn light">
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
const logoLight = '/Logo alrei.png'
const logo = '/Logo alrei.png'
const logoIcon = '/Logo alrei.png'

import LocaleSwitcher from './LocaleSwitcher.vue'
import { useRoute } from '#app'

const localePath = useLocalePath()

const isMobile = ref(false)
const toggle = ref(false)
const isSticky = ref(false)

const route = useRoute()
const { isAuthenticated, isInstructor, isStudent, isAdmin, logout } = useAuth()

const current = computed(() => route.path)

const openSubmenus = ref({})

const toggleSubmenu = (menuKey) => {
  if (isMobile.value) {
    openSubmenus.value[menuKey] = !openSubmenus.value[menuKey]
  }
}

watch(() => route.path, () => {
  toggle.value = false
  openSubmenus.value = {}
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