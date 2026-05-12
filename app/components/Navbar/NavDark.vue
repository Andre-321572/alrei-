<template>
    <div :class="['header header-light', { 'header-fixed': isSticky }]">
        <div class="container">
            <nav id="navigation" :class="isMobile ? 'navigation navigation-portrait' : 'navigation navigation-landscape'">
                <div class="nav-header">
                    <NuxtLink class="nav-brand" to="/">
                        <img :src="logo" class="logo" alt="" style="height:65px;width:auto;" />
                    </NuxtLink>
                    <div class="nav-toggle" @click="toggle = !toggle"></div>
                </div>
                <div :class="['nav-menus-wrapper', { 'nav-menus-wrapper-open': toggle }]">
                    <span class="nav-menus-wrapper-close-button" @click="toggle = !toggle">
                        ✕
                    </span>
                    <ul class="nav-menu">
                    
                        <li :class="['/'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('home') }}
                            </a>
                           
                        </li>
                        
                        <li v-if="!isInstructor" :class="['/grid-with-sidebar','/list-with-sidebar','/full-width-course','/full-width-course-2','/full-width-course-3','/full-width-course-4','/detail','/detail-2','/detail-3','/detail-4','/detail-5','/detail-6','/find-instructor','/instructor-detail'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('courses') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu">
                                <li :class="['/grid-with-sidebar'].includes(current) ? 'active' : ''"><a href="#">{{ $t('courses_grid_sidebar') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/grid-with-sidebar' ? 'active' : ''"><NuxtLink to="/grid-with-sidebar">{{ $t('sidebar_grid') }} </NuxtLink></li>
                                    </ul>
                                </li>
                                <li :class="current === '/list-with-sidebar' ? 'active' : ''"><NuxtLink to="/list-with-sidebar">{{ $t('list_layout_sidebar') }}</NuxtLink></li>
                                <li :class="['/full-width-course'].includes(current) ? 'active' : ''"><a href="#">{{ $t('courses_grid_full') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/full-width-course' ? 'active' : ''"><NuxtLink to="/full-width-course">{{ $t('courses_grid') }} </NuxtLink></li>
                                      
                                    </ul>
                                </li>
                                <li :class="['/detail'].includes(current) ? 'active' : ''"><a href="#">{{ $t('courses_detail') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/detail' ? 'active' : ''"><NuxtLink to="/detail">{{ $t('course_detail') }} </NuxtLink></li>
                                        
                                    </ul>
                                </li>
                                <li :class="current === '/find-instructor' ? 'active' : ''"><NuxtLink to="/find-instructor">{{ $t('find_instructor') }}</NuxtLink></li>
                                <li :class="current === '/instructor-detail' ? 'active' : ''"><NuxtLink to="/instructor-detail">{{ $t('instructor_detail') }}</NuxtLink></li>
                            </ul>
                        </li>
                        
                        <li :class="['/about-us','/blog','/blog-detail','/pricing','/register','/contact','/privacy','/faq','/shop-full-width','/shop-left-sidebar','/shop-right-sidebar','/product-detail','/add-to-cart','/product-wishlist','/checkout','/shop-order'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('pages') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu">
                                <li :class="['/shop-full-width','/product-detail','/add-to-cart','/product-wishlist','/checkout','/shop-order'].includes(current) ? 'active' : ''"><a href="#">{{ $t('shop_pages') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/shop-full-width' ? 'active' : ''"><NuxtLink to="/shop-full-width">{{ $t('shop_full_width') }}</NuxtLink></li>
                                        <li :class="current === '/product-detail' ? 'active' : ''"><NuxtLink to="/product-detail">{{ $t('shop_detail') }}</NuxtLink></li>
                                        <li :class="current === '/add-to-cart' ? 'active' : ''"><NuxtLink to="/add-to-cart">{{ $t('add_to_cart') }}</NuxtLink></li>
                                        <li :class="current === '/product-wishlist' ? 'active' : ''"><NuxtLink to="/product-wishlist">{{ $t('wishlist') }}</NuxtLink></li>
                                        <li :class="current === '/checkout' ? 'active' : ''"><NuxtLink to="/checkout">{{ $t('checkout') }}</NuxtLink></li>
                                        <li :class="current === '/shop-order' ? 'active' : ''"><NuxtLink to="/shop-order">{{ $t('order') }}</NuxtLink></li>
                                    </ul>
                                </li>
                                <li :class="current === '/about-us' ? 'active' : ''"><NuxtLink to="/about-us">{{ $t('about_us') }}</NuxtLink></li>
                                <li :class="current === '/blog' ? 'active' : ''"><NuxtLink to="/blog">{{ $t('blog_style') }}</NuxtLink></li>
                                <li :class="current === '/pricing' ? 'active' : ''"><NuxtLink to="/pricing">{{ $t('pricing') }}</NuxtLink></li>
                                <li :class="current === '/register' ? 'active' : ''"><NuxtLink to="/register">{{ $t('register') }}</NuxtLink></li>
                                <li :class="current === '/contact' ? 'active' : ''"><NuxtLink to="/contact">{{ $t('contact_us') }}</NuxtLink></li>
                                <li :class="current === '/privacy' ? 'active' : ''"><NuxtLink to="/privacy">{{ $t('privacy_policy') }}</NuxtLink></li>
                                <li :class="current === '/faq' ? 'active' : ''"><NuxtLink to="/faq">{{ $t('faqs') }}</NuxtLink></li>
                            </ul>
                        </li>
                        
                        <li v-if="isAuthenticated" :class="['/instructor-dashboard','/instructor-courses','/instructor-create-course','/instructor-course-added','/instructor-earning','/instructor-students','/instructor-orders','/instructor-reviews','/instructor-payout','/student-dashboard','/student-subscription','/student-course-resume','/student-wishlist','/student-payment-info','/profile-edit','/settings','/delete-account'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('accounts') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu">
                                <li v-if="isInstructor || isAdmin" :class="['/instructor-dashboard','/instructor-courses','/instructor-create-course','/instructor-course-added','/instructor-earning','/instructor-students','/instructor-orders','/instructor-reviews','/instructor-payout'].includes(current) ? 'active' : ''"><a href="#"><i class="bi bi-person-check me-2"></i>{{ $t('instructor_dashboard') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/instructor-dashboard' ? 'active' : ''"><NuxtLink to="/instructor-dashboard" class="active"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-courses' ? 'active' : ''"><NuxtLink to="/instructor-courses"><i class="bi bi-basket2 me-2"></i>{{ $t('courses') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-create-course' ? 'active' : ''"><NuxtLink to="/instructor-create-course"><i class="bi bi-patch-plus me-2"></i>{{ $t('create_course') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-earning' ? 'active' : ''"><NuxtLink to="/instructor-earning"><i class="bi bi-coin me-2"></i>{{ $t('earning') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-students' ? 'active' : ''"><NuxtLink to="/instructor-students"><i class="bi bi-people me-2"></i>{{ $t('students') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-orders' ? 'active' : ''"><NuxtLink to="/instructor-orders"><i class="bi bi-bag-check me-2"></i>{{ $t('my_orders') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-reviews' ? 'active' : ''"><NuxtLink to="/instructor-reviews"><i class="bi bi-star-half me-2"></i>{{ $t('reviews') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-payout' ? 'active' : ''"><NuxtLink to="/instructor-payout"><i class="bi bi-wallet2 me-2"></i>{{ $t('payout') }}</NuxtLink></li>
                                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                    </ul>
                                </li>
                                <li v-if="isStudent || isAdmin" :class="['/student-dashboard','/student-subscription','/student-course-resume','/student-wishlist','/student-payment-info'].includes(current) ? 'active' : ''"><a href="#"><i class="bi bi-mortarboard me-2"></i>{{ $t('student_dashboard') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/student-dashboard' ? 'active' : ''"><NuxtLink to="/student-dashboard"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                        <li :class="current === '/student-subscription' ? 'active' : ''"><NuxtLink to="/student-subscription"><i class="bi bi-basket2 me-2"></i>{{ $t('my_subscription') }}</NuxtLink></li>
                                        <li :class="current === '/student-course-resume' ? 'active' : ''"><NuxtLink to="/student-course-resume"><i class="bi bi-patch-plus me-2"></i>{{ $t('course_resume') }}</NuxtLink></li>
                                        <li :class="current === '/student-wishlist' ? 'active' : ''"><NuxtLink to="/student-wishlist"><i class="bi bi-wallet2 me-2"></i>{{ $t('wishlist') }}</NuxtLink></li>
                                        <li :class="current === '/student-payment-info' ? 'active' : ''"><NuxtLink to="/student-payment-info"><i class="bi bi-star-half me-2"></i>{{ $t('payment_info') }}</NuxtLink></li>
                                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                    </ul>
                                </li>
                                <li v-if="isAdmin" :class="current === '/admin-dashboard' ? 'active' : ''"><NuxtLink to="/admin-dashboard"><i class="bi bi-shield-lock me-2"></i>{{ $t('administration') }}</NuxtLink></li>
                                <li :class="current === '/profile-edit' ? 'active' : ''"><NuxtLink to="/profile-edit"><i class="bi bi-person-bounding-box me-2"></i>{{ $t('my_profile') }}</NuxtLink></li>
                                <li :class="current === '/settings' ? 'active' : ''"><NuxtLink to="/settings"><i class="bi bi-gear me-2"></i>{{ $t('settings') }}</NuxtLink></li>
                                <li :class="current === '/delete-account' ? 'active' : ''"><NuxtLink to="/delete-account"><i class="bi bi-trash3 me-2"></i>{{ $t('delete_accounts') }}</NuxtLink></li>
                                <li><a href="#" @click.prevent="logout"><i class="bi bi-box-arrow-right me-2"></i>{{ $t('logout') }}</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                    
                    <ul class="nav-menu nav-menu-social align-to-right">
                        <LocaleSwitcher />
                        
                        <li v-if="!isAuthenticated" class="become-tutor">
                            <NuxtLink to="/become-tutor"><i class="bi bi-person-circle"></i>{{ $t('become_tutor') }}</NuxtLink>
                        </li>
                        <li v-if="!isAuthenticated" class="join-btn">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#login"><i class="bi bi-box-arrow-in-right"></i>{{ $t('sign_in') }}</a>
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

    <LoginModal />
</template>

<script setup>
import LoginModal from './LoginModal.vue'
const logo = '/Logo alrei.png'
const logoIcon = '/Logo alrei.png'

import LocaleSwitcher from './LocaleSwitcher.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from '#app'


const isMobile = ref(false)
const toggle = ref(false)
const isSticky = ref(false)

const route = useRoute()
const { isAuthenticated, isInstructor, isStudent, isAdmin, logout } = useAuth()

const current = computed(() => route.path)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 992
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 992
}

const handleScroll = () => {
  isSticky.value = window.scrollY > 100
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