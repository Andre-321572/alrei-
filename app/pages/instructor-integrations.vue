<template>
    <Preloader />
    <InstructorNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                    <Sidebar />
                </div>  
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><NuxtLink to="/">{{ $t('home') }}</NuxtLink></li>
                                    <li class="breadcrumb-item"><NuxtLink to="/instructor-dashboard">{{ $t('instructor_dashboard') }}</NuxtLink></li>
                                    <li class="breadcrumb-item active" aria-current="page">Intégrations</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-5">
                        <div class="col-lg-12">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h4 class="mb-0">Outils de Visioconférence</h4>
                                <p class="text-muted mb-0">Connectez vos comptes pour créer des sessions en direct.</p>
                            </div>
                            
                            <div class="row gy-4">
                                <!-- Zoom -->
                                <div class="col-md-6">
                                    <div class="card border rounded-3 p-4 h-100 shadow-sm">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <div class="square--60 circle bg-light-primary text-primary fs-2">
                                                <i class="bi bi-camera-video-fill"></i>
                                            </div>
                                            <div>
                                                <h5 class="mb-1">Zoom</h5>
                                                <span class="badge" :class="integrations.zoom ? 'bg-success' : 'bg-secondary'">
                                                    {{ integrations.zoom ? 'Connecté' : 'Non connecté' }}
                                                </span>
                                            </div>
                                        </div>
                                        <p class="text-muted small mb-4">Générez automatiquement des réunions Zoom pour vos cours en direct.</p>
                                        <button v-if="!integrations.zoom" @click="connect('zoom')" class="btn btn-outline-primary w-100">
                                            Se connecter à Zoom
                                        </button>
                                        <button v-else @click="disconnect('zoom')" class="btn btn-outline-danger w-100">
                                            Déconnecter
                                        </button>
                                    </div>
                                </div>

                                <!-- Google Meet -->
                                <div class="col-md-6">
                                    <div class="card border rounded-3 p-4 h-100 shadow-sm">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <div class="square--60 circle bg-light-danger text-danger fs-2">
                                                <i class="bi bi-google"></i>
                                            </div>
                                            <div>
                                                <h5 class="mb-1">Google Meet</h5>
                                                <span class="badge" :class="integrations.google ? 'bg-success' : 'bg-secondary'">
                                                    {{ integrations.google ? 'Connecté' : 'Non connecté' }}
                                                </span>
                                            </div>
                                        </div>
                                        <p class="text-muted small mb-4">Créez des événements Google Calendar et des liens Meet associés.</p>
                                        <button v-if="!integrations.google" @click="connect('google')" class="btn btn-outline-danger w-100">
                                            Se connecter à Google
                                        </button>
                                        <button v-else @click="disconnect('google')" class="btn btn-outline-danger w-100">
                                            Déconnecter
                                        </button>
                                    </div>
                                </div>

                                <!-- MS Teams -->
                                <div class="col-md-6">
                                    <div class="card border rounded-3 p-4 h-100 shadow-sm">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <div class="square--60 circle bg-light-info text-info fs-2">
                                                <i class="bi bi-microsoft-teams"></i>
                                            </div>
                                            <div>
                                                <h5 class="mb-1">Microsoft Teams</h5>
                                                <span class="badge" :class="integrations.microsoft ? 'bg-success' : 'bg-secondary'">
                                                    {{ integrations.microsoft ? 'Connecté' : 'Non connecté' }}
                                                </span>
                                            </div>
                                        </div>
                                        <p class="text-muted small mb-4">Planifiez des sessions via Microsoft Teams et Office 365.</p>
                                        <button v-if="!integrations.microsoft" @click="connect('microsoft')" class="btn btn-outline-info w-100">
                                            Se connecter à Microsoft
                                        </button>
                                        <button v-else @click="disconnect('microsoft')" class="btn btn-outline-danger w-100">
                                            Déconnecter
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <FooterDark />
    <ScrollToTop />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

definePageMeta({
    middleware: ['instructor'],
});

const api = useApi()

const integrations = ref({
    zoom: false,
    google: false,
    microsoft: false
})

const loadIntegrations = async () => {
    try {
        const response = await api('/integrations/status')
        if (response && response.status) {
            integrations.value = response.status
        }
    } catch (error) {
        console.error('Failed to load integrations', error)
    }
}

onMounted(() => {
    loadIntegrations()
})

const connect = async (provider) => {
    try {
        // Obtenir l'URL de redirection OAuth du backend ou connecter directement (S2S)
        const response = await api(`/integrations/${provider}/connect`)
        
        if (response.url) {
            // Cas Socialite (Google, Microsoft)
            window.location.href = response.url
        } else if (response.connected) {
            // Cas Server-to-Server (Zoom)
            alert(response.message || 'Connexion réussie !')
            loadIntegrations()
        }
    } catch (error) {
        const errorMsg = error.response?._data?.message || 'Erreur lors de la connexion.'
        alert(errorMsg)
    }
}

const disconnect = async (provider) => {
    if (confirm('Voulez-vous vraiment déconnecter ce service ?')) {
        try {
            await api(`/integrations/${provider}/disconnect`, { method: 'DELETE' })
            integrations.value[provider] = false
            alert('Service déconnecté avec succès.')
        } catch (error) {
            alert('Erreur lors de la déconnexion.')
        }
    }
}
</script>
