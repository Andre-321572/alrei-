<template>
    <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
        <div class="d-flex w-100">
            <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i class="bi bi-ui-checks-grid me-2"></i>{{ $t('menu') }}
            </a>
        </div>
    </div>
    <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header d-lg-none border-bottom">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">{{ $t('menu') }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
            
            <div class="dashboard-navbar card p-3 pt-4 border">
        
                <div class="author-info-wwrap">
                    <div class="avatar-box d-flex justify-content-center mb-2">
                        <div class="square--120 circle shadow-sm border border-3">
                            <img :src="user?.avatar || avatar3" class="img-fluid circle" alt="Avatar">
                        </div>
                    </div>
                    <div class="author-caps text-center mb-4">
                        <div class="d-flex flex-column gap-2">
                            <div class="d-flex align-items-center justify-content-center">
                                <h5 class="fw-medium m-0">{{ user?.name }}</h5>
                                <span v-if="user?.role === 'instructor' || user?.role === 'admin'" class="verified text-green ms-2">
                                    <i class="bi bi-patch-check-fill"></i>
                                </span>
                            </div>
                            <div class="text-muted text-mid small">{{ user?.email }}</div>
                        </div>
                    </div>
                </div>
                
                <div class="d-navigation">
                    <ul id="side-menu">
                        <li v-if="user?.role === 'admin'"><NuxtLink to="/admin-dashboard" :class="{ active: isActive('/admin-dashboard') }"><i class="bi bi-shield-lock"></i>{{ $t('admin_dashboard') }}</NuxtLink></li>
                        
                        <template v-if="user?.role === 'instructor' || user?.role === 'admin'">
                            <li><NuxtLink to="/instructor-dashboard" :class="{ active: isActive('/instructor-dashboard') }"><i class="bi bi-ui-radios-grid"></i>{{ $t('instructor_dashboard') }}</NuxtLink></li>
                            <li><NuxtLink to="/instructor-students" :class="{ active: isActive('/instructor-students') }"><i class="bi bi-people"></i>{{ $t('students') }}</NuxtLink></li>
                            <li>
                                <NuxtLink to="/messages" :class="{ active: isActive('/messages') }" class="d-flex justify-content-between align-items-center">
                                    <div><i class="bi bi-chat-dots"></i>Messages</div>
                                    <span v-if="unreadCount > 0" class="badge bg-danger rounded-pill">{{ unreadCount }}</span>
                                </NuxtLink>
                            </li>
                            <li><NuxtLink to="/instructor-courses" :class="{ active: isActive('/instructor-courses') }"><i class="bi bi-basket2"></i>{{ $t('my_courses') }}</NuxtLink></li>
                            <li><NuxtLink to="/instructor-create-course" :class="{ active: isActive('/instructor-create-course') }"><i class="bi bi-patch-plus"></i>{{ $t('create_course') }}</NuxtLink></li>
                            <li><NuxtLink to="/instructor-integrations" :class="{ active: isActive('/instructor-integrations') }"><i class="bi bi-plugin"></i>{{ $t('integrations') }}</NuxtLink></li>
                        </template>

                        <li><NuxtLink to="/profile-edit" :class="{ active: isActive('/profile-edit') }"><i class="bi bi-person-circle"></i>{{ $t('my_profile') }}</NuxtLink></li>
                    </ul>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { useRoute } from '#app'
import { ref, onMounted } from 'vue'
import avatar3 from "@/assets/img/avatar-3.jpg";

const route = useRoute()
const { user } = useAuth()

const isActive = (path) => route.path === path

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