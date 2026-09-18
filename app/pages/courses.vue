<template>
    <div>
        <div class="bg-cover py-5 border-bottom text-white" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
            <div class="container py-3">
                <div class="row align-items-center g-4">
                    <div class="col-lg-7">
                        <span class="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold mb-2">Catalogue des programmes</span>
                        <h1 class="display-6 fw-bold text-white mb-3">Découvrir les formations</h1>
                        <p class="text-white opacity-75 lead mb-0">
                            Trouvez des modules à suivre à votre rythme, des formations animées, des webinaires et des programmes hybrides conçus pour les travailleurs et les acteurs syndicaux. Effectuez une recherche par thème, langue, format ou modalité d'accès.
                        </p>
                    </div>
                    
                    <div class="col-lg-5">
                        <div class="bg-white p-3 rounded-4 shadow-sm border">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                                <input
                                    v-model="search"
                                    type="text"
                                    class="form-control border-start-0 ps-0"
                                    placeholder="Rechercher par titre ou sujet lié au travail"
                                    @input="filterCourses"
                                />
                            </div>
                            
                            <div class="row g-2">
                                <div class="col-6">
                                    <select v-model="selectedDomain" @change="filterCourses" class="form-select form-select-sm">
                                        <option value="">Tous les thèmes</option>
                                        <option value="Leadership">Leadership syndical</option>
                                        <option value="Syndicalisation">Syndicalisation</option>
                                        <option value="Économie">Économie & Recherche</option>
                                        <option value="Climat">Climat & Transition juste</option>
                                        <option value="Numérisation">Numérisation</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <select v-model="selectedAccess" @change="filterCourses" class="form-select form-select-sm">
                                        <option value="">Toutes modalités d'accès</option>
                                        <option value="Libre">Accès libre</option>
                                        <option value="candidature">Sur candidature</option>
                                        <option value="désignation">Sur désignation</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-5 bg-white">
            <div class="container">
                <div v-if="filtered.length > 0" class="row g-4">
                    <div class="col-lg-4 col-md-6" v-for="item in filtered" :key="item.id">
                        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
                            <div class="position-relative">
                                <img :src="item.image" class="card-img-top object-fit-cover" style="height: 200px;" :alt="item.title">
                                <div class="position-absolute top-0 start-0 m-3">
                                    <span class="badge bg-main text-white px-3 py-2 rounded-pill shadow-sm">{{ item.badge }}</span>
                                </div>
                            </div>
                            
                            <div class="card-body d-flex flex-column p-4">
                                <div class="mb-2">
                                    <span class="badge bg-light-main text-main"><i class="bi bi-person-badge me-1"></i>{{ item.accessType }}</span>
                                </div>
                                
                                <h5 class="card-title fs-6 fw-bold mb-3">
                                    <NuxtLink :to="localePath('/blog-detail/' + item.slug)" class="text-dark text-decoration-none">{{ item.title }}</NuxtLink>
                                </h5>
                                
                                <p class="card-text text-muted small mb-3 flex-grow-1 lh-base">{{ item.desc }}</p>
                                
                                <div class="bg-light p-3 rounded-3 mb-3 small">
                                    <div class="text-muted"><i class="bi bi-laptop me-2 text-main"></i><strong>Format :</strong> {{ item.format }}</div>
                                    <div class="text-muted mt-1"><i class="bi bi-calendar-event me-2 text-main"></i><strong>Calendrier :</strong> {{ item.schedule }}</div>
                                </div>

                                <NuxtLink :to="localePath('/blog-detail/' + item.slug)" class="btn btn-main rounded-pill w-100 fw-semibold">
                                    Lire l'annonce <i class="bi bi-arrow-right ms-2"></i>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-5">
                    <div class="square--60 circle bg-light-main text-main mx-auto mb-3 fs-3">
                        <i class="bi bi-search"></i>
                    </div>
                    <h5 class="fw-bold mb-2">Aucun programme ne correspond à votre recherche</h5>
                    <p class="text-muted max-w-500 mx-auto small mb-4">
                        Supprimez un filtre ou abonnez-vous aux actualités pour recevoir les annonces de nouvelles possibilités de formation.
                    </p>
                    <button @click="resetFilters" class="btn btn-outline-main rounded-pill px-4 btn-sm fw-bold">
                        Réinitialiser la recherche
                    </button>
                </div>
            </div>
        </section>

        <!-- Banner d'accès aux formations -->
        <section class="py-4 bg-alrei-green text-white">
            <div class="container text-center">
                <h4 class="text-white fw-bold mb-2 fs-5">Besoin d'aide sur les modalités d'accès ?</h4>
                <p class="small text-white opacity-90 mb-3">Consultez notre guide sur les conditions d'accès aux formations ou contactez l'assistance ALREI.</p>
                <div class="d-flex justify-content-center gap-3">
                    <NuxtLink :to="localePath('/pricing')" class="btn btn-warning rounded-pill px-4 text-dark fw-bold btn-sm">
                        Consulter les conditions d'accès
                    </NuxtLink>
                    <NuxtLink :to="localePath('/faq')" class="btn btn-outline-light rounded-pill px-4 btn-sm fw-bold">
                        Foire aux questions (FAQ)
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { coursesData } from '@/data/data.js'
definePageMeta({ layout: 'default' })

const localePath = useLocalePath()
const route = useRoute()

const search = ref(route.query.q || '')
const selectedDomain = ref('')
const selectedAccess = ref('')

const courses = ref(coursesData)
const filtered = ref(coursesData)

const filterCourses = () => {
    let result = [...courses.value]
    
    if (search.value.trim()) {
        const q = search.value.toLowerCase()
        result = result.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
    }
    if (selectedDomain.value) {
        result = result.filter(c => c.title.toLowerCase().includes(selectedDomain.value.toLowerCase()) || c.desc.toLowerCase().includes(selectedDomain.value.toLowerCase()))
    }
    if (selectedAccess.value) {
        result = result.filter(c => c.accessType.toLowerCase().includes(selectedAccess.value.toLowerCase()))
    }
    
    filtered.value = result
}

const resetFilters = () => {
    search.value = ''
    selectedDomain.value = ''
    selectedAccess.value = ''
    filtered.value = [...courses.value]
}

onMounted(() => {
    if (route.query.q) {
        filterCourses()
    }
})
</script>

<style scoped>
.course-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.1) !important;
}
</style>
