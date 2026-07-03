<template>
    <div :class="['header header-light', { 'header-fixed': isSticky }]">
        <div class="container">
            <nav id="navigation" class="navigation navigation-landscape">
                <div class="nav-header d-flex align-items-center justify-content-between w-100">
                    <NuxtLink class="nav-brand" to="/">
                        <img :src="logo" class="logo" alt="" style="height:45px;width:auto;" />
                    </NuxtLink>

                    <div class="d-flex align-items-center gap-3">
                        <LocaleSwitcher />

                        <NuxtLink to="/student-all-courses" class="btn btn-sm btn-main rounded-pill px-4">
                            <i class="bi bi-play-circle me-1"></i>{{ $t('my_courses') }}
                        </NuxtLink>

                        <ClientOnly>
                            <div class="btn-group account-drop">
                                <button type="button" class="btn btn-order-by-filt border-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img :src="userAvatar" class="avater-img" alt="">
                                </button>
                                <div class="dropdown-menu pull-right animated flipInX box-shadow-sm">
                                    <div class="dropdown-header py-3 border-bottom">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="square--50 circle"><img :src="userAvatar" class="img-fluid circle" alt=""></div>
                                            <div class="d-flex flex-column gap-1">
                                                <h6 class="fw-semibold m-0">{{ userName }}</h6>
                                                <span class="text-mid text-muted-2 text-capitalize">{{ userRole }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-body">
                                        <ul>
                                            <li><NuxtLink to="/student-dashboard"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                            <li><NuxtLink to="/student-all-courses"><i class="bi bi-play-circle me-2"></i>{{ $t('all_courses') }}</NuxtLink></li>
                                            <li><NuxtLink to="/student-wishlist"><i class="bi bi-wallet2 me-2"></i>{{ $t('wishlist') }}</NuxtLink></li>
                                            <li><NuxtLink to="/student-subscription"><i class="bi bi-basket2 me-2"></i>{{ $t('my_subscription') }}</NuxtLink></li>
                                            <li><NuxtLink to="/profile-edit"><i class="bi bi-person-circle me-2"></i>{{ $t('my_profile') }}</NuxtLink></li>
                                            <li><a href="#" @click.prevent="logout"><i class="bi bi-box-arrow-right me-2"></i>{{ $t('logout') }}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="clearfix"></div>
</template>

<script setup lang="ts">
import LocaleSwitcher from './LocaleSwitcher.vue';
import avatar3 from "@/assets/img/avatar-3.jpg";

const logo = '/Logo alrei.png';
const isSticky = ref(false);

const { user, logout, fetchUser, isAuthenticated } = useAuth();
const userAvatar = computed(() => user.value?.avatar || avatar3);
const userName   = computed(() => user.value?.name  || 'Invité');
const userRole   = computed(() => user.value?.role  || '');

const handleScroll = () => { isSticky.value = window.scrollY > 100; };

onMounted(async () => {
    window.addEventListener('scroll', handleScroll);
    if (isAuthenticated.value && !user.value) await fetchUser();
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
