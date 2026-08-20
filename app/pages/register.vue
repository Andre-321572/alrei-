<template>
    

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
                                    <button class="nav-link px-md-5" :class="{ active: activeTab === 'login' }" id="signin-tab" type="button" role="tab" @click="activeTab = 'login'">{{ $t('sign_in') }}</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link px-md-5" :class="{ active: activeTab === 'register' }" id="register-tab" type="button" role="tab" @click="activeTab = 'register'">{{ $t('register') }}</button>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="tab-content" id="myTabContent">
                            
                            <!-- Login tab -->
                            <div class="tab-pane fade p-0" :class="{ 'show active': activeTab === 'login' }" id="signin-tab-pane" role="tabpanel">
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
                            <div class="tab-pane fade p-0" :class="{ 'show active': activeTab === 'register' }" id="register-tab-pane" role="tabpanel">
                                <div class="login-form">
                                    <form @submit.prevent="handleRegister">
                                        
                                        <div class="row g-2 mb-2">
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('first_name') }} *</label>
                                                <input v-model="regFirstName" type="text" class="form-control" :placeholder="$t('first_name')" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('last_name') }} *</label>
                                                <input v-model="regLastName" type="text" class="form-control" :placeholder="$t('last_name')" required>
                                            </div>
                                        </div>

                                        <div class="row g-2 mb-2">
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('country_residence') }} *</label>
                                                <select v-model="regCountry" class="form-control" required>
                                                    <option value="">{{ $t('select_country') }}</option>
                                                    <option v-for="c in worldCountries" :key="c" :value="c">{{ c }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('gender') }} *</label>
                                                <select v-model="regGender" class="form-control" required>
                                                    <option value="M">{{ $t('male') }}</option>
                                                    <option value="F">{{ $t('female') }}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="row g-2 mb-2">
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('organisation_union') }} *</label>
                                                <input v-model="regOrganisation" type="text" class="form-control" placeholder="Ex: CNT, UDTS, USTN..." required>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('organisation_email') }} *</label>
                                                <input v-model="regOrganisationEmail" type="email" class="form-control" placeholder="org@syndicat.org" required>
                                            </div>
                                        </div>

                                        <div class="row g-2 mb-2">
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('personal_email') }} *</label>
                                                <input v-model="regEmail" type="email" class="form-control" placeholder="votre.email@gmail.com" required>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('whatsapp_international') }} *</label>
                                                <InternationalPhoneInput
                                                    v-model="regWhatsapp"
                                                    :residence-country="regCountry"
                                                    placeholder="90 00 00 00"
                                                    :required="true"
                                                />
                                            </div>
                                        </div>

                                        <div class="row g-2 mb-2">
                                            <div class="col-md-4">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('birth_date') }} *</label>
                                                <input v-model="regBirthDate" type="date" class="form-control" required>
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('experience_years') }}</label>
                                                <input v-model.number="regExperienceYears" type="number" min="0" max="60" class="form-control" placeholder="Ex: 8">
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('language') }} *</label>
                                                <select v-model="preferredLanguage" class="form-control" required>
                                                    <option value="fr">Français</option>
                                                    <option value="en">English</option>
                                                    <option value="pt">Português</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="border rounded p-2 mb-3 bg-light">
                                            <div class="form-group mb-2">
                                                <label class="form-label small fw-semibold mb-1">{{ $t('nomination_letter') }}</label>
                                                <input type="file" @change="handleNominationUpload" class="form-control form-control-sm" accept=".pdf,.doc,.docx">
                                            </div>
                                            <div class="form-group mb-0">
                                                <label class="form-label small fw-semibold mb-1">{{ $t('motivation_letter') }}</label>
                                                <input type="file" @change="handleMotivationUpload" class="form-control form-control-sm" accept=".pdf,.doc,.docx">
                                            </div>
                                        </div>

                                        <div class="row g-2 mb-3">
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('password') }} *</label>
                                                <div class="position-relative">
                                                    <input v-model="regPassword" :type="showRegPassword ? 'text' : 'password'" class="form-control" :placeholder="$t('min_8_chars')" minlength="8" required>
                                                    <span class="position-absolute top-50 end-0 translate-middle-y me-3" @click="showRegPassword = !showRegPassword" style="cursor: pointer;">
                                                        <i :class="['bi', showRegPassword ? 'bi-eye-slash' : 'bi-eye', 'text-muted']"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label text-muted small fw-semibold mb-1">{{ $t('confirm_password') }} *</label>
                                                <div class="position-relative">
                                                    <input v-model="regPasswordConfirmation" :type="showRegPasswordConfirm ? 'text' : 'password'" class="form-control" :placeholder="$t('repeat_password')" minlength="8" required>
                                                    <span class="position-absolute top-50 end-0 translate-middle-y me-3" @click="showRegPasswordConfirm = !showRegPasswordConfirm" style="cursor: pointer;">
                                                        <i :class="['bi', showRegPasswordConfirm ? 'bi-eye-slash' : 'bi-eye', 'text-muted']"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div v-if="regError" class="alert alert-danger py-2 mb-3">{{ regError }}</div>
                                        
                                        <div class="form-group mb-3">
                                            <button type="submit" class="btn btn-main w-100 py-2 fs-6" :disabled="regLoading">
                                                <span v-if="regLoading" class="spinner-border spinner-border-sm me-2"></span>
                                                {{ $t('create_my_account') }}
                                            </button>
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

</template>

<script setup>

import log from "@/assets/img/log.png";
import logoIcon from "@/assets/img/Logo alrei.png"

const { login, register } = useAuth();
const router = useRouter();
const route = useRoute();

const activeTab = ref('register');

const updateTabFromRoute = () => {
    if (route.query.tab === 'login' || route.query.tab === 'signin' || route.path.endsWith('/login')) {
        activeTab.value = 'login';
    } else {
        activeTab.value = 'register';
    }
};

onMounted(() => {
    updateTabFromRoute();
});

watch(() => [route.query.tab, route.path], () => {
    updateTabFromRoute();
});

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

// Register Form - TULDA Fields
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
const showRegPassword = ref(false);
const showRegPasswordConfirm = ref(false);

const nominationLetter = ref(null);
const motivationLetter = ref(null);
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

const handleNominationUpload = (event) => {
    nominationLetter.value = event.target.files[0];
};

const handleMotivationUpload = (event) => {
    motivationLetter.value = event.target.files[0];
};

const computedAge = computed(() => {
    if (!regBirthDate.value) return '';
    const birth = new Date(regBirthDate.value);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age > 0 ? age : '';
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
        const formData = new FormData();
        formData.append('first_name', regFirstName.value);
        formData.append('last_name', regLastName.value);
        formData.append('name', `${regFirstName.value} ${regLastName.value}`);
        formData.append('email', regEmail.value);
        formData.append('password', regPassword.value);
        formData.append('password_confirmation', regPasswordConfirmation.value);
        formData.append('role', 'student');
        formData.append('country', regCountry.value);
        formData.append('gender', regGender.value);
        formData.append('organisation', regOrganisation.value);
        formData.append('organisation_email', regOrganisationEmail.value);
        formData.append('whatsapp_number', regWhatsapp.value);
        formData.append('birth_date', regBirthDate.value || '');
        formData.append('age', computedAge.value || '');
        formData.append('experience_years', regExperienceYears.value || '');
        formData.append('preferred_language', preferredLanguage.value);

        if (nominationLetter.value) {
            formData.append('nomination_letter', nominationLetter.value);
        }
        if (motivationLetter.value) {
            formData.append('motivation_letter', motivationLetter.value);
        }

        await register(formData);
    } catch (err) {
        regError.value = err.data?.message || 'Erreur lors de l\'inscription';
    } finally {
        regLoading.value = false;
    }
};

</script>