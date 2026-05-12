<template>
    
    <Preloader />
    <NavDark />

    <div class="bg-cover position-relative" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 col-lg-9 col-md-12">
                    <div class="ht-200"></div>
                </div>
            </div>
        </div>
    </div>

    <section class="pt-0">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-xxl-6 col-xl-7 col-lg-9 col-md-12">
                
                    <div class="card border py-xl-5 p-4 login-card overlio overlios">
                        
                        <div class="web-logo d-flex align-items-center justify-content-center mb-3">
                            <div class="logo"><img :src="logoIcon" class="img-fluid" width="90" alt="Logo"></div>
                        </div>
                        
                        <div class="login-caps mb-4">
                            <div class="text-center">
                                <h2 class="fw-semibold m-0">{{ $t('hi_welcome_to') }}</h2>
                                <h3 class="fw-semibold m-0">{{ $t('online_study_center') }}</h3>
                            </div>
                        </div>
                        
                        <div class="d-block mb-4">
                            <ul class="nav nav-tabs simple d-flex align-items-center justify-content-center border-0" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link px-md-5" id="signin-tab" data-bs-toggle="tab" data-bs-target="#signin-tab-pane" type="button" role="tab" aria-controls="signin-tab-pane" aria-selected="true">{{ $t('sign_in') }}</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link px-md-5 active" id="register-tab" data-bs-toggle="tab" data-bs-target="#register-tab-pane" type="button" role="tab" aria-controls="register-tab-pane" aria-selected="false">{{ $t('register') }}</button>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="tab-content" id="myTabContent">
                            
                            <!-- Login tab -->
                            <div class="tab-pane fade p-0" id="signin-tab-pane" role="tabpanel" aria-labelledby="signin-tab" tabindex="0">
                                <div class="login-form">
                                    <form @submit.prevent="handleLogin">
                                        
                                        <div class="form-group mb-4">
                                            <input v-model="loginEmail" type="email" class="form-control" placeholder="Enter your email.." required>
                                        </div>
                                        
                                        <div class="form-group mb-4">
                                            <div class="position-relative">
                                                <input v-model="loginPassword" type="password" class="form-control" placeholder="********" required>
                                                <span class="position-absolute top-50 end-0 translate-middle-y me-3"><i class="bi bi-eye text-muted"></i></span>
                                            </div>
                                        </div>

                                        <div v-if="loginError" class="alert alert-danger py-2 mb-3">{{ loginError }}</div>
                                        
                                        <div class="form-group mb-4">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div class="form-check">
                                                    <input id="saveinfo" class="form-check-input" name="saveinfo" type="checkbox">
                                                    <label for="saveinfo" class="form-check-label">{{ $t('remember_me') }}</label>
                                                </div>
                                                <div class="forget-password"><a href="#" class="text-decoration-underline">{{ $t('forgot_password') }}</a></div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-main w-100" :disabled="loginLoading">
                                                <span v-if="loginLoading" class="spinner-border spinner-border-sm me-2"></span>
                                                {{ $t('sign_in') }}
                                            </button>
                                        </div>
                                        
                                    </form>
                                </div>	
                            </div>
                            
                            <!-- Register tab -->
                            <div class="tab-pane fade show active p-0" id="register-tab-pane" role="tabpanel" aria-labelledby="register-tab" tabindex="0">
                                <div class="login-form">
                                    <form @submit.prevent="handleRegister">
                                        
                                        <div class="form-group mb-3">
                                            <div class="row g-3">
                                                <div class="form-group col-6"><input v-model="regFirstName" type="text" class="form-control" :placeholder="$t('first_name')" required></div>
                                                <div class="form-group col-6"><input v-model="regLastName" type="text" class="form-control" :placeholder="$t('last_name')" required></div>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group mb-3">
                                            <input v-model="regEmail" type="email" class="form-control" placeholder="Enter your email.." required>
                                        </div>
                                        
                                        <div class="form-group mb-3">
                                            <div class="position-relative">
                                                <input v-model="regPassword" type="password" class="form-control" placeholder="********" required>
                                                <span class="position-absolute top-50 end-0 translate-middle-y me-3"><i class="bi bi-eye text-muted"></i></span>
                                            </div>
                                        </div>

                                        <div v-if="regError" class="alert alert-danger py-2 mb-3">{{ regError }}</div>
                                        
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-main w-100" :disabled="regLoading">
                                                <span v-if="regLoading" class="spinner-border spinner-border-sm me-2"></span>
                                                {{ $t('sign_up') }}
                                            </button>
                                        </div>
                                        
                                        <div class="deider-wrap w-100 mt-4 mb-4">
                                            <div class="d-block border-top position-relative">
                                                <span class="position-absolute top-50 start-50 translate-middle square--40 circle bg-white text-muted z-1">{{ $t('or') }}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="social-login-wrap">
                                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-4">
                                                <a href="#" class="btn btn-md btn-gray rounded-3 border-2 flex-fill">{{ $t('signup_with') }}<i class="bi bi-apple ms-2"></i></a>
                                                <a href="#" class="btn btn-md btn-gray rounded-3 border-2 flex-fill">{{ $t('signup_with') }}<i class="bi bi-google text-red ms-2"></i></a>
                                            </div>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                    
                    
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <FooterTop />
    <Footer />
    <ScrollToTop />

</template>

<script setup>
import { ref } from 'vue';
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import log from "@/assets/img/log.png";
import logoIcon from "@/assets/img/Logo alrei.png"

const { login, register } = useAuth();
const router = useRouter();

// Login Form
const loginEmail = ref('');
const loginPassword = ref('');
const loginLoading = ref(false);
const loginError = ref('');

const handleLogin = async () => {
    loginLoading.value = true;
    loginError.value = '';
    try {
        await login({
            email: loginEmail.value,
            password: loginPassword.value
        });
    } catch (err) {
        loginError.value = err.data?.message || 'Identifiants invalides';
    } finally {
        loginLoading.value = false;
    }
};

// Register Form
const regFirstName = ref('');
const regLastName = ref('');
const regEmail = ref('');
const regPassword = ref('');
const regLoading = ref(false);
const regError = ref('');

const handleRegister = async () => {
    regLoading.value = true;
    regError.value = '';
    try {
        await register({
            name: `${regFirstName.value} ${regLastName.value}`,
            email: regEmail.value,
            password: regPassword.value,
            password_confirmation: regPassword.value,
            role: 'student'
        });
    } catch (err) {
        regError.value = err.data?.message || 'Erreur lors de l\'inscription';
    } finally {
        regLoading.value = false;
    }
};

</script>