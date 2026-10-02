<template>
    <div>
        <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
            <div class="d-flex w-100">
                <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100 shadow-xs" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <UiIcon name="dashboard" size="18" class="me-2" />{{ $t('menu') }}
                </a>
            </div>
        </div>
        <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header d-lg-none border-bottom">
                <h5 class="offcanvas-title fw-bold text-dark" id="offcanvasExampleLabel">{{ $t('menu') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
                
                <div class="dashboard-navbar card border shadow-sm rounded-3 p-3 pt-4 shadcn-sidebar-card" style="background: #ffffff;">
            
                    <div class="author-info-wrap mb-3 p-3 rounded-3 bg-slate-50 border" style="background-color: #f8fafc; border-color: #e2e8f0;">
                        <div class="author-caps text-center">
                            <div class="d-flex flex-column gap-2 align-items-center">
                                <div class="square--70 circle mb-1 overflow-hidden shadow-sm border border-2 border-primary">
                                    <img :src="userAvatar" class="img-fluid circle w-100 h-100" style="object-fit: cover;" alt="Avatar">
                                </div>
                                <div class="d-flex align-items-center justify-content-center">
                                    <h5 class="fw-bold m-0 text-dark" style="font-size: 1rem;">{{ user?.name }}</h5>
                                    <span v-if="user?.role === 'instructor' || user?.role === 'admin'" class="verified text-primary ms-1 fs-6">
                                        <UiIcon name="check" size="16" />
                                    </span>
                                </div>
                                <div class="text-muted small font-monospace" style="font-size: 0.8rem;">{{ user?.email }}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-navigation">
                        <ul id="side-menu" class="shadcn-menu">
                            <li v-if="user?.role === 'admin'" class="shadcn-item">
                                <NuxtLink :to="localePath('/admin-dashboard')" :class="{ active: isActive('/admin-dashboard') }">
                                    <span class="shadcn-icon-box text-danger"><UiIcon name="shield" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('admin_dashboard') }}</span>
                                </NuxtLink>
                            </li>
                            
                            <template v-if="user?.role === 'instructor' || user?.role === 'admin'">
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-dashboard')" :class="{ active: isActive('/instructor-dashboard') }">
                                        <span class="shadcn-icon-box"><UiIcon name="dashboard" size="18" /></span>
                                        <span class="shadcn-label">{{ $t('instructor_dashboard') }}</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-courses')" :class="{ active: isActive('/instructor-courses') }">
                                        <span class="shadcn-icon-box"><UiIcon name="courses" size="18" /></span>
                                        <span class="shadcn-label">{{ $t('my_courses') }}</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-quizzes')" :class="{ active: isActive('/instructor-quizzes') }">
                                        <span class="shadcn-icon-box"><UiIcon name="quiz" size="18" /></span>
                                        <span class="shadcn-label">Quiz & Évaluations</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-assignments')" :class="{ active: isActive('/instructor-assignments') }">
                                        <span class="shadcn-icon-box"><UiIcon name="assignments" size="18" /></span>
                                        <span class="shadcn-label">Devoirs & Travaux</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-students')" :class="{ active: isActive('/instructor-students') }">
                                        <span class="shadcn-icon-box"><UiIcon name="students" size="18" /></span>
                                        <span class="shadcn-label">{{ $t('students') }}</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/messages')" :class="{ active: isActive('/messages') }" class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center gap-3">
                                            <span class="shadcn-icon-box"><UiIcon name="messages" size="18" /></span>
                                            <span class="shadcn-label">Messages</span>
                                        </div>
                                        <span v-if="unreadCount > 0" class="badge bg-danger rounded-pill">{{ unreadCount }}</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-create-course')" :class="{ active: isActive('/instructor-create-course') }">
                                        <span class="shadcn-icon-box"><UiIcon name="plus" size="18" /></span>
                                        <span class="shadcn-label">{{ $t('create_course') }}</span>
                                    </NuxtLink>
                                </li>
                                <li class="shadcn-item">
                                    <NuxtLink :to="localePath('/instructor-integrations')" :class="{ active: isActive('/instructor-integrations') }">
                                        <span class="shadcn-icon-box"><UiIcon name="plugin" size="18" /></span>
                                        <span class="shadcn-label">{{ $t('integrations') }}</span>
                                    </NuxtLink>
                                </li>
                            </template>

                            <li class="shadcn-item mt-2 border-top pt-2">
                                <NuxtLink :to="localePath('/profile-edit')" :class="{ active: isActive('/profile-edit') }">
                                    <span class="shadcn-icon-box"><UiIcon name="profile" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('my_profile') }}</span>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from '#app'
import UiIcon from '@/components/UI/UiIcon.vue'

const localePath = useLocalePath()
const route = useRoute()
const { user } = useAuth()
const api = useApi()
const { getAvatarUrl } = useAvatar()

const userAvatar = computed(() => getAvatarUrl(user.value?.avatar, user.value?.name))

const isActive = (path) => {
    const targetPath = localePath(path)
    return route.path === path || route.path === targetPath || (path !== '/' && route.path.endsWith(path))
}

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

<style scoped>
.shadcn-sidebar-card {
    transition: all 0.2s ease;
    border: 1px solid #e2e8f0 !important;
}

.shadcn-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.shadcn-item a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 8px;
    color: #475569;
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.15s ease-in-out;
}

.shadcn-icon-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #f1f5f9;
    color: #475569;
    transition: all 0.15s ease-in-out;
    flex-shrink: 0;
}

.shadcn-item a:hover {
    color: #0f172a;
    background-color: #f1f5f9;
}

.shadcn-item a:hover .shadcn-icon-box {
    background: #e2e8f0;
    color: #0f172a;
}

.shadcn-item a.active {
    color: #ffffff;
    background: #0f172a;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
}

.shadcn-item a.active .shadcn-icon-box {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
}

.shadcn-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
}
</style>