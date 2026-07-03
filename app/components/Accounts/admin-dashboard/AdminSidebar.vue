<template>
    <div>
        <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
            <div class="d-flex w-100">
                <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100" data-bs-toggle="offcanvas" href="#adminOffcanvas" role="button">
                    <i class="bi bi-ui-checks-grid me-2"></i>{{ $t('menu') }}
                </a>
            </div>
        </div>

        <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="adminOffcanvas">
            <div class="offcanvas-header d-lg-none border-bottom">
                <h5 class="offcanvas-title">{{ $t('menu') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0 overlio">
                <div class="dashboard-navbar card p-3 pt-4 border">

                    <div class="author-info-wwrap">
                        <div class="author-caps text-center mb-4">
                            <div class="d-flex flex-column gap-2">
                                <div class="d-flex align-items-center justify-content-center">
                                    <h5 class="fw-medium m-0">{{ user?.name }}</h5>
                                    <span class="verified text-green ms-2"><i class="bi bi-patch-check-fill"></i></span>
                                </div>
                                <div class="text-muted text-mid small">{{ user?.email }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="d-navigation">
                        <ul id="side-menu">
                            <li>
                                <a :class="{ active: activeTab === 'instructors' }" @click.prevent="emit('update:activeTab', 'instructors')" href="#">
                                    <i class="bi bi-person-badge"></i>{{ $t('instructors') }}
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'students' }" @click.prevent="emit('update:activeTab', 'students')" href="#">
                                    <i class="bi bi-people"></i>{{ $t('students') }}
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'courses' }" @click.prevent="emit('update:activeTab', 'courses')" href="#">
                                    <i class="bi bi-book"></i>{{ $t('courses') }}
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'groups' }" @click.prevent="emit('update:activeTab', 'groups')" href="#">
                                    <i class="bi bi-diagram-3"></i>{{ $t('groups') }}
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'blogs' }" @click.prevent="emit('update:activeTab', 'blogs')" href="#">
                                    <i class="bi bi-newspaper"></i>{{ $t('blogs') }}
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'certificates' }" @click.prevent="emit('update:activeTab', 'certificates')" href="#">
                                    <i class="bi bi-patch-check"></i>{{ $t('certificates') }}
                                    <span v-if="pendingCertificates > 0" class="badge bg-danger rounded-pill ms-auto">{{ pendingCertificates }}</span>
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'scholarships' }" @click.prevent="emit('update:activeTab', 'scholarships')" href="#">
                                    <i class="bi bi-award"></i>{{ $t('scholarships') }}
                                    <span v-if="pendingScholarships > 0" class="badge bg-danger rounded-pill ms-auto">{{ pendingScholarships }}</span>
                                </a>
                            </li>
                            <li>
                                <a :class="{ active: activeTab === 'categories' }" @click.prevent="emit('update:activeTab', 'categories')" href="#">
                                    <i class="bi bi-tags"></i>Catégories
                                </a>
                            </li>
                            <li class="mt-3 border-top pt-3">
                                <NuxtLink to="/instructor-dashboard">
                                    <i class="bi bi-ui-radios-grid"></i>{{ $t('instructor_dashboard') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/profile-edit">
                                    <i class="bi bi-person-circle"></i>{{ $t('my_profile') }}
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


const props = defineProps({
    activeTab: { type: String, required: true },
    pendingCertificates: { type: Number, default: 0 },
    pendingScholarships: { type: Number, default: 0 },
});

const emit = defineEmits(['update:activeTab']);

const { user } = useAuth();
</script>
