<template>
    <!-- Log In Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="registermodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div class="modal-content" id="registermodal">
                <div class="position-absolute end-0 top-0 mt-3 me-3 z-1">
                    <span class="square--30 circle bg-light z-2" data-bs-dismiss="modal" aria-hidden="true"><i class="bi bi-x"></i></span>
                </div>
                <div class="modal-body p-4">
                    <div class="login-card">
                        
                        <div class="web-logo d-flex align-items-center justify-content-center mb-3">
                            <div class="logo"><img :src="logoIcon" class="img-fluid" width="90" alt="Logo"></div>
                        </div>
                        
                        <div class="login-caps mb-3">
                            <div class="text-center">
                                <h3 class="fw-semibold m-0">{{ $t('welcome_back') }}</h3>
                                <span>{{ $t('sign_in_carefully') }}</span>
                            </div>
                        </div>
                        
                        <div class="social-login-wrap mb-4">
                            <div class=" d-flex align-items-center justify-content-between gap-4">
                                <a href="#" class="btn btn-outline-gray rounded-3 flex-fill"><i class="bi bi-apple"></i></a>
                                <a href="#" class="btn btn-outline-gray rounded-3 flex-fill"><i class="bi bi-google text-red"></i></a>
                                <a href="#" class="btn btn-outline-gray rounded-3 flex-fill"><i class="bi bi-twitter text-info"></i></a>
                            </div>
                        </div>
                        
                        <div class="deider-wrap w-100 mt-3 mb-5">
                            <div class="d-block border-top position-relative">
                                <span class="position-absolute top-50 start-50 translate-middle square--40 circle bg-white text-muted z-1">OR</span>
                            </div>
                        </div>
                        
                        <div class="login-form">
                            <form @submit.prevent="handleLogin">
                                
                                <div class="form-group mb-3">
                                    <label class="form-label">{{ $t('email') }}</label>
                                    <input v-model="loginEmail" type="email" class="form-control" placeholder="example@gmail.com" required>
                                </div>
                                
                                <div class="form-group mb-3">
                                    <label class="form-label">{{ $t('password') }}</label>
                                    <div class="position-relative">
                                        <input v-model="loginPassword" type="password" class="form-control" placeholder="*******" required>
                                        <span class="position-absolute top-50 end-0 translate-middle-y me-3"><i class="bi bi-eye text-muted"></i></span>
                                    </div>
                                </div>

                                <div v-if="loginError" class="alert alert-danger py-2 mb-3">{{ loginError }}</div>
                                
                                <div class="form-group mb-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="flex-1">
                                            <input id="dd" class="checkbox-custom" name="dd" type="checkbox" checked>
                                            <label for="dd" class="checkbox-custom-label">{{ $t('remember_me') }}</label>
                                        </div>	
                                        <div class="eltio_a76">
                                            <a href="#" class="text-main fw-medium">{{ $t('forgot_password') }}</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <button type="submit" class="btn btn-main full-width fw-medium py-3" :disabled="loginLoading">
                                        <span v-if="loginLoading" class="spinner-border spinner-border-sm me-2"></span>
                                        {{ $t('sign_in') }}
                                    </button>
                                </div>
                                
                                <div class="loginbox-footer text-center mt-3">
                                    {{ $t('dont_have_account') }} <a href="#" data-bs-toggle="modal" data-bs-target="#signup" data-bs-dismiss="modal" class="text-main fw-medium ms-1">{{ $t('sign_up') }}</a>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sign Up Modal -->
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="sign-up" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div class="modal-content" id="sign-up">
                <div class="position-absolute end-0 top-0 mt-3 me-3 z-1">
                    <span class="square--30 circle bg-light z-2" data-bs-dismiss="modal" aria-hidden="true"><i class="bi bi-x"></i></span>
                </div>
                <div class="modal-body p-4">
                    <div class="login-card">
                        
                        <div class="web-logo d-flex align-items-center justify-content-center mb-3">
                            <div class="logo"><img :src="logoIcon" class="img-fluid" width="90" alt="Logo"></div>
                        </div>
                        
                        <div class="login-caps mb-4">
                            <div class="text-center">
                                <h2 class="fw-semibold m-0">{{ $t('hi_welcome_to') }}</h2>
                                <h3 class="fw-semibold m-0">{{ $t('online_study_center') }}</h3>
                            </div>
                        </div>
                        
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
                                
                                <div class="form-group mb-3">
                                    <div class="text-center text-muted">{{ $t('already_have_account') }} <a href="#" data-bs-toggle="modal" data-bs-target="#login" data-bs-dismiss="modal" class="fw-semibold">{{ $t('sign_in') }}</a></div>
                                </div>
                                
                                <div class="deider-wrap w-100 mt-4 mb-4">
                                    <div class="d-block border-top position-relative">
                                        <span class="position-absolute top-50 start-50 translate-middle square--40 circle bg-white text-muted z-1">{{ $t('or') }}</span>
                                    </div>
                                </div>
                                
                                <div class="social-login-wrap">
                                    <div class=" d-flex align-items-center justify-content-between gap-4">
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
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';
import { useRouter } from '#app';

const logoIcon = '/Logo alrei.png'

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
        
        // Fermer le modal proprement
        if (process.client) {
            const modalElement = document.getElementById('login');
            const { $bootstrap } = useNuxtApp();
            const modalInstance = $bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
            
            // Forcer la suppression du backdrop si nécessaire
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }
        
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
        
        if (process.client) {
            const modalElement = document.getElementById('signup');
            const { $bootstrap } = useNuxtApp();
            const modalInstance = $bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
            
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
        }

    } catch (err) {
        regError.value = err.data?.message || 'Erreur lors de l\'inscription';
    } finally {
        regLoading.value = false;
    }
};
</script>
