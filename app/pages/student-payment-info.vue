<template>
    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-4 pb-5">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                    <StudentAdminSidebar />
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink></li>
                                    <li class="breadcrumb-item"><NuxtLink :to="localePath('/student-dashboard')">{{ $t('student_dashboard') }}</NuxtLink></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('payment_info') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <!-- Section 1: Modes de Prise en Charge & Bourses -->
                    <div class="row mb-4">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="card border rounded-3 shadow-sm">
                                <div class="card-header bg-light d-flex justify-content-between align-items-center py-3">
                                    <div>
                                        <h4 class="text-dark mb-0 fw-bold">Modes de Financement & Bourses ALREI</h4>
                                        <span class="text-muted small">Les formations du Centre ALREI sont financées par le mouvement syndical africain et la CSI-Afrique</span>
                                    </div>
                                    <button class="btn btn-green btn-sm rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#sponsorshipModal">
                                        <i class="bi bi-patch-check me-1"></i> Demander une prise en charge
                                    </button>
                                </div>
                                
                                <div class="card-body">
                                    <div class="row g-3">
                                        <div 
                                            v-for="(method, index) in fundingMethodsData" 
                                            :key="index"
                                            class="col-md-12"
                                        >
                                            <div class="p-3 border rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 bg-white hover-shadow transition">
                                                <div class="d-flex align-items-start gap-3">
                                                    <div class="p-2 rounded bg-light d-flex align-items-center justify-content-center" style="min-width: 48px; height: 48px;">
                                                        <i :class="method.icon"></i>
                                                    </div>
                                                    <div>
                                                        <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                                                            <h5 class="text-dark fs-6 mb-0 fw-semibold">{{ method.title }}</h5>
                                                            <span :class="['badge rounded-pill', method.badgeClass]">{{ method.badge }}</span>
                                                        </div>
                                                        <p class="text-muted mb-0 small">{{ method.description }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Section 2: Historique des Inscriptions et Factures -->
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card border rounded-3 shadow-sm">
                                <div class="card-header bg-light d-flex justify-content-between align-items-center py-3">
                                    <h4 class="mb-0 text-dark fw-bold">Historique des Inscriptions & Justificatifs</h4>
                                    <span class="badge bg-green text-light rounded-pill px-3">Formations Prises en Charge</span>
                                </div>

                                <div class="card-body">
                                    <div class="row g-3 align-items-center justify-content-between mb-4">
                                        <div class="col-md-7">
                                            <div class="position-relative">
                                                <input 
                                                    v-model="searchQuery"
                                                    class="form-control pe-5 bg-light border" 
                                                    type="search" 
                                                    placeholder="Rechercher une formation ou attestation..." 
                                                    aria-label="Search"
                                                >
                                                <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <select v-model="filterStatus" class="form-select bg-light border">
                                                <option value="all">Tous les régimes</option>
                                                <option value="covered">Pris en charge (Bourse ALREI)</option>
                                                <option value="pending">En attente de validation</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Table display -->
                                    <div v-if="filteredHistory.length > 0" class="table-responsive border-0">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">Date</th>
                                                    <th scope="col" class="border-0">Intitulé de la Formation</th>
                                                    <th scope="col" class="border-0">Régime / Financeur</th>
                                                    <th scope="col" class="border-0">Statut</th>
                                                    <th scope="col" class="border-0">Montant</th>
                                                    <th scope="col" class="border-0 rounded-end text-end">Attestation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in filteredHistory" :key="index">
                                                    <td class="text-nowrap small fw-medium">{{ item.date }}</td>
                                                    <td>
                                                        <h6 class="mt-2 mt-lg-0 mb-0 fs-6">
                                                            <span class="text-dark fw-semibold">{{ item.courseName }}</span>
                                                        </h6>
                                                    </td>
                                                    <td class="small text-muted">{{ item.fundingMethod }}</td>
                                                    <td>
                                                        <span :class="['badge rounded-pill', item.statusClass]">
                                                            {{ item.status }}
                                                        </span>
                                                    </td>
                                                    <td class="fw-bold text-success small">{{ item.amount }}</td>
                                                    <td class="text-end">
                                                        <button 
                                                            class="btn btn-sm btn-outline-success rounded-circle"
                                                            title="Télécharger l'attestation de prise en charge"
                                                            @click="downloadReceipt(item)"
                                                        >
                                                            <i class="bi bi-download"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Empty State -->
                                    <div v-else class="text-center py-5">
                                        <div class="mb-3">
                                            <i class="bi bi-shield-check fs-1 text-success opacity-75"></i>
                                        </div>
                                        <h5 class="fw-semibold text-dark mb-1">Aucune transaction bancaire requise</h5>
                                        <p class="text-muted small mx-auto" style="max-width: 480px;">
                                            Toutes les formations de l'Académie ALREI sont prises en charge par les bourses d'éducation ouvrière de la CSI-Afrique et vos organisations syndicales.
                                        </p>
                                        <NuxtLink :to="localePath('/courses')" class="btn btn-green btn-sm rounded-pill mt-2">
                                            <i class="bi bi-book me-1"></i> Parcourir le catalogue des formations
                                        </NuxtLink>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </div>
        </div>
    </section>

    <!-- Sponsorship / Scholarship Modal -->
    <div class="modal fade" id="sponsorshipModal" tabindex="-1" aria-labelledby="sponsorshipModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-dark text-white align-items-center">
                    <h5 class="modal-title fs-6 text-white fw-bold mb-0" id="sponsorshipModalLabel">
                        <i class="bi bi-award me-2 text-warning"></i> Demande de Bourse Syndicale ou Prise en Charge
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <div class="modal-body p-4">
                    <p class="text-muted small mb-4">
                        Remplissez ce formulaire pour solliciter une bourse d'études ouvrière ALREI / CSI-Afrique ou faire enregistrer la prise en charge par votre centrale syndicale nationale.
                    </p>

                    <form @submit.prevent="submitSponsorshipRequest" class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold text-dark small">Organisation Syndicale d'Appartenance *</label>
                            <input 
                                v-model="form.organization"
                                type="text" 
                                class="form-control" 
                                placeholder="ex: CNTS, UGTCI, ITUC-Africa..." 
                                required
                            >
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label fw-semibold text-dark small">Domaine de Formation Visé *</label>
                            <select v-model="form.domain" class="form-select" required>
                                <option value="" disabled>Sélectionner un domaine</option>
                                <option value="leadership">Leadership syndical & gouvernance</option>
                                <option value="negociation">Syndicalisation & négociation collective</option>
                                <option value="economie">Recherche sur le travail & politique économique</option>
                                <option value="climat">Changement climatique & transition juste</option>
                                <option value="numerisation">Numérisation & avenir du travail</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label fw-semibold text-dark small">Type de Financement Sollicité *</label>
                            <select v-model="form.type" class="form-select" required>
                                <option value="bourse-alrei">Bourse d'Études Ouvrière ALREI / CSI-Afrique</option>
                                <option value="prise-en-charge-centrale">Prise en charge par la Centrale Syndicale</option>
                                <option value="partenaire">Convention de Partenariat Institutionnel</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label fw-semibold text-dark small">Email du Responsable Formation / Syndical *</label>
                            <input 
                                v-model="form.contactEmail"
                                type="email" 
                                class="form-control" 
                                placeholder="contact@votre-syndicat.org" 
                                required
                            >
                        </div>

                        <div class="col-md-12">
                            <label class="form-label fw-semibold text-dark small">Motivation ou Recommandation Syndicale</label>
                            <textarea 
                                v-model="form.motivation"
                                class="form-control" 
                                rows="3"
                                placeholder="Précisez votre rôle syndical et les motivations liées à cette formation..."
                            ></textarea>
                        </div>

                        <div v-if="submittedSuccess" class="col-12">
                            <div class="alert alert-success border-0 d-flex align-items-center gap-2 mb-0 py-2">
                                <i class="bi bi-check-circle-fill"></i>
                                <span class="small">Votre demande a été enregistrée avec succès ! Notre comité de formation ALREI l'examinera sous 48h.</span>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4 d-flex align-items-center justify-content-end gap-2">
                            <button type="button" class="btn btn-secondary btn-sm rounded-pill" data-bs-dismiss="modal">Fermer</button>
                            <button type="submit" class="btn btn-green btn-sm rounded-pill px-4">Soumettre la demande</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import { fundingMethodsData, alreiPaymentHistoryData } from '@/data/student.js';

const localePath = useLocalePath();
const { t } = useI18n();

definePageMeta({
    layout: 'student',
});

const searchQuery = ref('');
const filterStatus = ref('all');
const history = ref([...alreiPaymentHistoryData]);

const filteredHistory = computed(() => {
    return history.value.filter(item => {
        const matchesQuery = item.courseName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                             item.fundingMethod.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesFilter = filterStatus.value === 'all' || 
                             (filterStatus.value === 'covered' && item.status === 'Pris en charge') ||
                             (filterStatus.value === 'pending' && item.status === 'En attente');
        return matchesQuery && matchesFilter;
    });
});

const form = reactive({
    organization: '',
    domain: '',
    type: 'bourse-alrei',
    contactEmail: '',
    motivation: ''
});

const submittedSuccess = ref(false);

const submitSponsorshipRequest = () => {
    submittedSuccess.value = true;
    setTimeout(() => {
        form.organization = '';
        form.domain = '';
        form.contactEmail = '';
        form.motivation = '';
        submittedSuccess.value = false;
    }, 4000);
};

const downloadReceipt = (item: any) => {
    alert(`Téléchargement de l'attestation de prise en charge pour : ${item.courseName}`);
};
</script>