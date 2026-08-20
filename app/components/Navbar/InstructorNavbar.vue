<template>
    <div :class="['header header-light', { 'header-fixed': isSticky }]">
        <div class="container">
            <nav id="navigation" class="navigation navigation-landscape">
                <div class="nav-header d-flex align-items-center justify-content-between w-100">
                    <NuxtLink class="nav-brand" :to="localePath('/')">
                        <img :src="logo" class="logo" alt="" style="height:45px;width:auto;" />
                    </NuxtLink>

                    <div class="d-flex align-items-center gap-3">
                        <LocaleSwitcher />

                        <NuxtLink :to="localePath('/instructor-create-course')" class="btn btn-sm btn-main rounded-pill px-4">
                            <i class="bi bi-patch-plus-fill me-1"></i>{{ $t('create_course') }}
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
                                            <li><NuxtLink :to="localePath('/instructor-dashboard')"><i class="bi bi-ui-radios-grid"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                            <li><NuxtLink :to="localePath('/instructor-courses')"><i class="bi bi-basket2"></i>{{ $t('courses') }}</NuxtLink></li>
                                            <li><NuxtLink :to="localePath('/instructor-students')"><i class="bi bi-people"></i>{{ $t('students') }}</NuxtLink></li>
                                            <li><NuxtLink :to="localePath('/instructor-reviews')"><i class="bi bi-star-half"></i>{{ $t('reviews') }}</NuxtLink></li>
                                            <li><NuxtLink :to="localePath('/profile-edit')"><i class="bi bi-person-circle"></i>{{ $t('my_profile') }}</NuxtLink></li>
                                            <li><a href="#" @click.prevent="logout"><i class="bi bi-box-arrow-right"></i>{{ $t('logout') }}</a></li>
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

<script setup>
import LocaleSwitcher from './LocaleSwitcher.vue';
import avatar3 from "@/assets/img/avatar-3.jpg";

const localePath = useLocalePath();
const logo = '/Logo alrei.png';
const isSticky = ref(false);

const { user, logout } = useAuth();
const userAvatar = computed(() => user.value?.avatar || avatar3);
const userName   = computed(() => user.value?.name  || 'Guest');
const userRole   = computed(() => user.value?.role  || '');

const handleScroll = () => {
    if (window.scrollY > 150) {
        isSticky.value = true;
    } else if (window.scrollY < 40) {
        isSticky.value = false;
    }
};
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
