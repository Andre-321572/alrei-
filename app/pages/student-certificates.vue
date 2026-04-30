<template>
    <Preloader />
    <StudentNavbar />

    <section class="bg-cover p-0" :style="studentBg" data-overlay="4">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-4">
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
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Mes Certificats</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">Mes Certificats</h4></div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div v-if="loading" class="text-center py-5">
                                <div class="spinner-border text-main" role="status"></div>
                            </div>
                            <div v-else-if="certificates.length > 0" class="row g-3">
                                <div 
                                    class="col-xl-6 col-lg-6 col-md-12"
                                    v-for="cert in certificates" 
                                    :key="cert.id"
                                >
                                    <div class="education_block_grid border p-4 bg-white rounded-4 shadow-sm h-100">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <div class="square--60 circle bg-light-success text-success fs-3">
                                                <i class="bi bi-patch-check"></i>
                                            </div>
                                            <div>
                                                <h5 class="mb-1 fw-bold">{{ cert.course.title }}</h5>
                                                <p class="mb-0 text-muted small">Délivré le {{ new Date(cert.issued_at).toLocaleDateString() }}</p>
                                            </div>
                                        </div>
                                        <div class="bg-light p-3 rounded-3 mb-3">
                                            <div class="d-flex justify-content-between small text-muted">
                                                <span>ID Certificat:</span>
                                                <span class="fw-bold text-dark">{{ cert.certificate_number }}</span>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <button @click="downloadCert(cert)" class="btn btn-main flex-grow-1 rounded-pill">
                                                <i class="bi bi-download me-2"></i>Télécharger (PDF)
                                            </button>
                                            <NuxtLink :to="`/course-detail/${cert.course.slug}`" class="btn btn-outline-main rounded-circle">
                                                <i class="bi bi-eye"></i>
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-center py-5 bg-white rounded-4 shadow-sm border">
                                <div class="square--100 circle bg-light-primary text-primary mx-auto mb-3 fs-1">
                                    <i class="bi bi-award"></i>
                                </div>
                                <h5 class="fw-bold">Aucun certificat pour le moment</h5>
                                <p class="text-muted">Terminez vos cours à 100% pour obtenir vos certificats officiels.</p>
                                <NuxtLink to="/grid-with-sidebar" class="btn btn-main mt-2 rounded-pill px-4">Parcourir les cours</NuxtLink>
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
import { ref, onMounted, computed } from 'vue'
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

definePageMeta({
    middleware: ['auth'],
});

const api = useApi()
const certificates = ref([])
const loading = ref(true)

const fetchCertificates = async () => {
    loading.value = true
    try {
        const response = await api('/certificates')
        certificates.value = response
    } catch (error) {
        console.error('Failed to fetch certificates:', error)
    } finally {
        loading.value = false
    }
}

const downloadCert = async (cert) => {
    try {
        const response = await api(`/certificates/${cert.id}/download`, {
            method: 'GET',
        })
        // En Laravel/Nuxt avec api wrapper, il faut gérer le blob si c'est un flux
        // Mais si l'API retourne une URL ou si l'on veut forcer l'ouverture:
        window.open(`${useRuntimeConfig().public.apiBase}/certificates/${cert.id}/download`, '_blank')
    } catch (error) {
        console.error('Download error:', error)
    }
}

onMounted(() => {
    fetchCertificates()
})

import studentbg from '@/assets/img/student-bg.jpg'
const studentBg = computed(() => ({
    background: `url(${studentbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))
</script>
