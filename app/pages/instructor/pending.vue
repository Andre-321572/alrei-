<template>
    <Preloader />
    <InstructorNavbar />

    <section class="bg-gredient p-0">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-5 pb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8 col-sm-12">
                    <div class="card border rounded-3 text-center p-5">
                        <div class="mb-4">
                            <div class="square--80 circle bg-light-warning mx-auto mb-4 d-flex align-items-center justify-content-center">
                                <i class="bi bi-hourglass-split fs-1 text-warning"></i>
                            </div>
                            <h2 class="fw-bold mb-2">{{ $t('account_pending_title') }}</h2>
                            <p class="text-muted">{{ $t('account_pending_desc') }}</p>
                        </div>

                        <div class="border rounded-3 p-4 bg-light mb-4 text-start">
                            <h6 class="fw-semibold mb-3">{{ $t('what_happens_next') }}</h6>
                            <ul class="list-unstyled mb-0">
                                <li class="d-flex align-items-start gap-2 mb-2">
                                    <i class="bi bi-check-circle-fill text-success mt-1"></i>
                                    <span>{{ $t('pending_step_1') }}</span>
                                </li>
                                <li class="d-flex align-items-start gap-2 mb-2">
                                    <i class="bi bi-envelope-fill text-primary mt-1"></i>
                                    <span>{{ $t('pending_step_2') }}</span>
                                </li>
                                <li class="d-flex align-items-start gap-2">
                                    <i class="bi bi-rocket-takeoff-fill text-warning mt-1"></i>
                                    <span>{{ $t('pending_step_3') }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="d-flex gap-3 justify-content-center flex-wrap">
                            <button class="btn btn-light border rounded-3" @click="logout">
                                <i class="bi bi-box-arrow-right me-2"></i>{{ $t('logout') }}
                            </button>
                            <NuxtLink to="/" class="btn btn-main rounded-3">
                                <i class="bi bi-house me-2"></i>{{ $t('go_home') }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FooterDark />
</template>

<script setup lang="ts">
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';

// Protège la page : seul un instructeur connecté peut y accéder
definePageMeta({
    middleware: ['auth'],
});

const { logout } = useAuth();
</script>
