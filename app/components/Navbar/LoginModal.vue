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
                            <div class="d-flex align-items-center justify-content-between gap-4">
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
                                
                                <div class="row g-2 mb-2">
                                    <div class="col-6"><input v-model="regFirstName" type="text" class="form-control form-control-sm" placeholder="Prénom *" required></div>
                                    <div class="col-6"><input v-model="regLastName" type="text" class="form-control form-control-sm" placeholder="Nom *" required></div>
                                </div>

                                <div class="row g-2 mb-2">
                                    <div class="col-6">
                                        <select v-model="regCountry" class="form-control form-control-sm" required>
                                            <option value="">-- Pays * --</option>
                                            <option v-for="c in worldCountries" :key="c" :value="c">{{ c }}</option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <select v-model="regGender" class="form-control form-control-sm" required>
                                            <option value="M">Masculin</option>
                                            <option value="F">Féminin</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row g-2 mb-2">
                                    <div class="col-6"><input v-model="regOrganisation" type="text" class="form-control form-control-sm" placeholder="Organisation/Syndicat *" required></div>
                                    <div class="col-6"><input v-model="regOrganisationEmail" type="email" class="form-control form-control-sm" placeholder="Email Organisation *" required></div>
                                </div>
                                
                                <div class="row g-2 mb-2">
                                    <div class="col-6"><input v-model="regEmail" type="email" class="form-control form-control-sm" placeholder="Email personnel *" required></div>
                                    <div class="col-6">
                                        <InternationalPhoneInput
                                            v-model="regWhatsapp"
                                            :residence-country="regCountry"
                                            placeholder="WhatsApp *"
                                            :required="true"
                                        />
                                    </div>
                                </div>

                                <div class="row g-2 mb-2">
                                    <div class="col-5">
                                        <input v-model="regBirthDate" type="date" class="form-control form-control-sm" title="Date de naissance *" required>
                                    </div>
                                    <div class="col-4"><input v-model.number="regExperienceYears" type="number" class="form-control form-control-sm" placeholder="Exp. (Ans)"></div>
                                    <div class="col-3">
                                        <select v-model="preferredLanguage" class="form-control form-control-sm" required>
                                            <option value="fr">FR</option>
                                            <option value="en">EN</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="row g-2 mb-2">
                                    <div class="col-6">
                                        <input v-model="regPassword" type="password" class="form-control form-control-sm" placeholder="Mot de passe *" minlength="8" required>
                                    </div>
                                    <div class="col-6">
                                        <input v-model="regPasswordConfirmation" type="password" class="form-control form-control-sm" placeholder="Confirmation *" minlength="8" required>
                                    </div>
                                </div>

                                <div v-if="regError" class="alert alert-danger py-1 fs-7 mb-2">{{ regError }}</div>
                                
                                <div class="form-group mb-3">
                                    <button type="submit" class="btn btn-main w-100 py-2" :disabled="regLoading">
                                        <span v-if="regLoading" class="spinner-border spinner-border-sm me-2"></span>
                                        Créer mon compte
                                    </button>
                                </div>
                                
                                <div class="form-group mb-3">
                                    <div class="text-center text-muted small">Vous avez déjà un compte ? <a href="#" data-bs-toggle="modal" data-bs-target="#login" data-bs-dismiss="modal" class="fw-semibold text-main">{{ $t('sign_in') }}</a></div>
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
        
        if (process.client) {
            const modalElement = document.getElementById('login');
            const { $bootstrap } = useNuxtApp();
            const modalInstance = $bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
            
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
import InternationalPhoneInput from '@/components/InternationalPhoneInput.vue';
const regFirstName = ref('');
const regLastName = ref('');
const regCountry = ref('');
const regGender = ref('M');
const regOrganisation = ref('');
const regOrganisationEmail = ref('');
const regEmail = ref('');
const regWhatsapp = ref('');
const regBirthDate = ref('');
const regExperienceYears = ref('');
const preferredLanguage = ref('fr');
const regPassword = ref('');
const regPasswordConfirmation = ref('');

const regLoading = ref(false);
const regError = ref('');

const worldCountries = [
    'Togo', 'Niger', 'Sénégal', 'Burkina Faso', 'Bénin', 'Côte d\'Ivoire', 'Mali', 'Guinée', 'Mauritanie',
    'Comores', 'Tchad', 'Tunisie', 'Malawi', 'Nigeria', 'Congo', 'Rép. Dém. du Congo (RDC)', 'Cameroun',
    'Gabon', 'Namibie', 'Algérie', 'Maroc', 'Égypte', 'Afrique du Sud', 'Ghana', 'Kenya', 'Éthiopie',
    'Madagascar', 'Rwanda', 'Burundi', 'Djibouti', 'Érythrée', 'Guinée équatoriale', 'Guinée-Bissau',
    'Lesotho', 'Libéria', 'Libye', 'Maurice', 'Mozambique', 'Rép. Centrafricaine', 'Sao Tomé-et-Principe',
    'Seychelles', 'Sierra Leone', 'Somalie', 'Soudan', 'Soudan du Sud', 'Eswatini', 'Tanzanie', 'Ouganda',
    'Zambie', 'Zimbabwe', 'France', 'Belgique', 'Suisse', 'Canada', 'États-Unis', 'Royaume-Uni', 'Allemagne',
    'Espagne', 'Italie', 'Portugal', 'Pays-Bas', 'Suède', 'Norvège', 'Danemark', 'Finlande', 'Pologne',
    'Russie', 'Turquie', 'Émirats arabes unis', 'Arabie saoudite', 'Qatar', 'Chine', 'Inde', 'Japon',
    'Brésil', 'Mexique', 'Argentine', 'Australie'
];

const computedAge = computed(() => {
    if (!regBirthDate.value) return null;
    const birth = new Date(regBirthDate.value);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age > 0 ? age : null;
});

const handleRegister = async () => {
    regError.value = '';

    if (regPassword.value !== regPasswordConfirmation.value) {
        regError.value = 'Les mots de passe ne correspondent pas.';
        return;
    }

    if (regPassword.value.length < 8) {
        regError.value = 'Le mot de passe doit contenir au moins 8 caractères.';
        return;
    }

    regLoading.value = true;
    try {
        await register({
            first_name: regFirstName.value,
            last_name: regLastName.value,
            name: `${regFirstName.value} ${regLastName.value}`,
            email: regEmail.value,
            password: regPassword.value,
            password_confirmation: regPasswordConfirmation.value,
            role: 'student',
            country: regCountry.value,
            gender: regGender.value,
            organisation: regOrganisation.value,
            organisation_email: regOrganisationEmail.value,
            whatsapp_number: regWhatsapp.value,
            birth_date: regBirthDate.value || null,
            age: computedAge.value,
            experience_years: regExperienceYears.value || null,
            preferred_language: preferredLanguage.value,
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
