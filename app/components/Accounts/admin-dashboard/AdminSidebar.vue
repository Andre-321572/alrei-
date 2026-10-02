<template>
    <div>
        <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
            <div class="d-flex w-100">
                <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100 shadow-xs" data-bs-toggle="offcanvas" href="#adminOffcanvas" role="button">
                    <UiIcon name="dashboard" size="18" class="me-2" />{{ $t('menu') }}
                </a>
            </div>
        </div>

        <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="adminOffcanvas">
            <div class="offcanvas-header d-lg-none border-bottom">
                <h5 class="offcanvas-title fw-bold text-dark">{{ $t('menu') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
                <div class="dashboard-navbar card border shadow-sm rounded-3 p-3 pt-4 shadcn-sidebar-card" style="position: sticky; top: 100px; z-index: 10; background: #ffffff;">

                    <!-- Author Info Card -->
                    <div class="author-info-wrap mb-3 p-3 rounded-3 bg-slate-50 border" style="background-color: #f8fafc; border-color: #e2e8f0;">
                        <div class="author-caps text-center">
                            <div class="d-flex flex-column gap-1">
                                <div class="d-flex align-items-center justify-content-center">
                                    <h5 class="fw-bold m-0 text-dark" style="font-size: 1rem;">{{ user?.name || 'Admin Alrei' }}</h5>
                                    <span class="verified text-primary ms-1 fs-6" title="Compte Vérifié"><UiIcon name="check" size="16" /></span>
                                </div>
                                <div class="text-muted small font-monospace" style="font-size: 0.8rem;">{{ user?.email || 'admin@alrei.com' }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar Menu Navigation -->
                    <div class="d-navigation">
                        <ul id="side-menu" class="shadcn-menu">
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'instructors' }" @click.prevent="handleTabClick('instructors')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="instructors" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('instructors') }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'country_summary' }" @click.prevent="handleTabClick('country_summary')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="globe" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('country_summary') }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'students' }" @click.prevent="handleTabClick('students')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="students" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('students') }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'courses' }" @click.prevent="handleTabClick('courses')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="courses" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('courses') }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'groups' }" @click.prevent="handleTabClick('groups')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="groups" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('groups') }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'blogs' }" @click.prevent="handleTabClick('blogs')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="blogs" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('blogs') }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'certificates' }" @click.prevent="handleTabClick('certificates')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="certificates" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('certificates') }}</span>
                                    <span v-if="pendingCertificates > 0" class="badge bg-danger rounded-pill ms-auto">{{ pendingCertificates }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'scholarships' }" @click.prevent="handleTabClick('scholarships')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="scholarships" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('scholarships') }}</span>
                                    <span v-if="pendingScholarships > 0" class="badge bg-danger rounded-pill ms-auto">{{ pendingScholarships }}</span>
                                </a>
                            </li>
                            <li class="shadcn-item">
                                <a :class="{ active: activeTab === 'categories' }" @click.prevent="handleTabClick('categories')" href="javascript:void(0)">
                                    <span class="shadcn-icon-box"><UiIcon name="categories" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('categories') }}</span>
                                </a>
                            </li>

                            <li class="mt-3 border-top pt-3 shadcn-item">
                                <NuxtLink :to="localePath('/instructor-dashboard')">
                                    <span class="shadcn-icon-box"><UiIcon name="dashboard" size="18" /></span>
                                    <span class="shadcn-label">{{ $t('instructor_dashboard') }}</span>
                                </NuxtLink>
                            </li>
                            <li class="shadcn-item">
                                <NuxtLink :to="localePath('/profile-edit')">
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
import UiIcon from '@/components/UI/UiIcon.vue'

const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

const props = defineProps({
    activeTab: { type: String, default: 'courses' },
    pendingCertificates: { type: Number, default: 0 },
    pendingScholarships: { type: Number, default: 0 },
});

const emit = defineEmits(['update:activeTab']);
const { user } = useAuth();

const handleTabClick = (tabName) => {
    emit('update:activeTab', tabName);
    if (!route.path.includes('/admin-dashboard')) {
        router.push(localePath('/admin-dashboard?tab=' + tabName));
    }
};
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
