<template>
    <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
        <div class="d-flex w-100">
            <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i class="bi bi-ui-checks-grid me-2"></i>{{ $t('dashboard_menu') }}
            </a>
        </div>
    </div>
    <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header d-lg-none border-bottom">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">{{ $t('filter') }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
            
            <div class="dashboard-navbar card p-3 pt-4 border">
        
                <ClientOnly>
                <div class="author-info-wwrap">
                    <div class="avatar-box d-flex justify-content-center mb-4">
                        <div class="square--120 circle shadow-sm border border-3 position-relative">
                            <img :src="userAvatar" class="img-fluid circle" alt="Avatar">
                            <span class="badge bg-green text-light rounded-pill position-absolute top-100 start-50 translate-middle text-capitalize">{{ userRole }}</span>
                        </div>
                    </div>
                    <div class="author-caps text-center mb-4">
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center justify-content-center">
                                <h5 class="fw-semibold m-0">{{ userName }}</h5>
                            </div>
                            <div class="d-flex align-items-center justify-content-center gap-1">
                                <span class="text-mid text-muted-2">{{ user?.email }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <div class="d-flex flex-column justify-content-center align-items-center gap-1">
                            <h6 class="text-dark lh-1 fw-semibold m-0">12</h6>
                            <span class="text-muted-2 m-0">{{ $t('done_courses') }}</span>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center gap-2">
                            <h6 class="text-dark lh-1 fw-semibold m-0">156</h6>
                            <span class="text-muted-2 m-0">{{ $t('done_lessons') }}</span>
                        </div>
                    </div>
                </div>
                </ClientOnly>
                
                <div class="d-navigation">
                    <ul id="side-menu"> 
                        <li><NuxtLink to="/student-dashboard" :class="{ active: isActive('/student-dashboard') }"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                        <li><NuxtLink to="/student-all-courses" :class="{ active: isActive('/student-all-courses') }"><i class="bi bi-play-circle me-2"></i>{{ $t('all_courses') }}</NuxtLink></li>
                        <li>
                            <NuxtLink to="/messages" :class="{ active: isActive('/messages') }" class="d-flex justify-content-between align-items-center">
                                <div><i class="bi bi-chat-dots me-2"></i>Messages</div>
                                <span v-if="unreadCount > 0" class="badge bg-danger rounded-pill">{{ unreadCount }}</span>
                            </NuxtLink>
                        </li>
                        <li><NuxtLink to="/student-assignments" :class="{ active: isActive('/student-assignments') }"><i class="bi bi-file-earmark-text me-2"></i>{{ $t('my_assignments') }}</NuxtLink></li>
                        <li><NuxtLink to="/student-subscription" :class="{ active: isActive('/student-subscription') }"><i class="bi bi-basket2 me-2"></i>{{ $t('my_subscription') }}</NuxtLink></li>
                        <li><NuxtLink to="/student-course-resume" :class="{ active: isActive('/student-course-resume') }"><i class="bi bi-patch-plus me-2"></i>{{ $t('course_resume') }}</NuxtLink></li>
                        <li><NuxtLink to="/student-certificates" :class="{ active: isActive('/student-certificates') }"><i class="bi bi-award me-2"></i>{{ $t('my_certificates') }}</NuxtLink></li>
                        <li><NuxtLink to="/student-wishlist" :class="{ active: isActive('/student-wishlist') }"><i class="bi bi-heart me-2"></i>{{ $t('wishlist') }}</NuxtLink></li>
                        <li><NuxtLink to="/student-payment-info" :class="{ active: isActive('/student-payment-info') }"><i class="bi bi-credit-card me-2"></i>{{ $t('payments') }}</NuxtLink></li>
                        <li><NuxtLink to="/profile-edit" :class="{ active: isActive('/profile-edit') }"><i class="bi bi-person-circle me-2"></i>{{ $t('my_profile') }}</NuxtLink></li>
                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                    </ul>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import avatar1 from "@/assets/img/avatar-1.jpg";
import { useAuth } from '@/composables/useAuth';

const route = useRoute()
const isActive = (path: string) => route.path === path

const { user, api } = useAuth()
const userAvatar = computed(() => user.value?.avatar || avatar1)
const userName   = computed(() => user.value?.name   || 'Étudiant')
const userRole   = computed(() => user.value?.role   || 'student')

const unreadCount = ref(0)
const fetchUnreadCount = async () => {
    try {
        const response = await api('/messages/unread-count')
        unreadCount.value = response.data?.count || response.count || 0
    } catch (error) {
        console.error('Failed to fetch unread count:', error)
    }
}

onMounted(() => {
    fetchUnreadCount()
})
</script>