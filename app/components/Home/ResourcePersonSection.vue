<template>
    <section class="py-5 bg-alrei-green text-white position-relative overflow-hidden">
        <div class="container py-4 position-relative z-1">
            <div class="row align-items-center g-4">
                <div class="col-lg-7 col-md-12">
                    <span class="badge bg-light text-main px-3 py-2 rounded-pill fw-bold mb-3">Partagez vos connaissances</span>
                    <h2 class="text-white fw-bold display-6 mb-3">Contribuez à l'éducation ouvrière en Afrique</h2>
                    <p class="lead text-white opacity-90 mb-4">
                        ALREI collabore avec des éducateurs syndicaux, organisateurs, chercheurs et spécialistes expérimentés pour animer des formations pertinentes. Partagez votre expertise et accompagnez les syndicalistes à travers le continent.
                    </p>
                    <div class="row g-3 mb-4">
                        <div class="col-sm-6" v-for="(point, idx) in points" :key="idx">
                            <div class="d-flex align-items-center gap-2">
                                <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                                <span class="small fw-semibold">{{ point }}</span>
                            </div>
                        </div>
                    </div>
                    <NuxtLink :to="localePath('/contact')" class="btn btn-warning btn-lg px-4 rounded-pill text-dark fw-bold shadow">
                        Contribuer comme personne-ressource <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
                
                <div class="col-lg-5 col-md-12">
                    <div class="bg-white text-dark p-4 rounded-4 shadow-lg border border-light">
                        <h4 class="fs-5 fw-bold mb-2 text-main"><i class="bi bi-person-lines-fill me-2"></i>Manifestez votre intérêt</h4>
                        <p class="small text-muted mb-3">Présentez brièvement votre expérience. L'équipe ALREI vous contactera si votre expertise correspond à un programme.</p>
                        
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-2">
                                <input v-model="form.name" type="text" class="form-control form-control-sm" placeholder="Nom complet *" required />
                            </div>
                            <div class="mb-2">
                                <input v-model="form.email" type="email" class="form-control form-control-sm" placeholder="Adresse e-mail *" required />
                            </div>
                            <div class="mb-2">
                                <input v-model="form.expertise" type="text" class="form-control form-control-sm" placeholder="Domaine d'expertise (ex: Économie, Droit) *" required />
                            </div>
                            <div class="mb-3">
                                <textarea v-model="form.message" class="form-control form-control-sm" rows="2" placeholder="Bref message ou sujet proposé *" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-main btn-sm w-100 rounded-pill fw-bold" :disabled="submitting">
                                <span v-if="submitting">Envoi en cours...</span>
                                <span v-else>Envoyer ma manifestation d'intérêt</span>
                            </button>
                        </form>
                        <div v-if="sent" class="alert alert-success mt-3 mb-0 small p-2 text-center rounded-3">
                            Merci de votre intérêt. ALREI examinera vos informations et vous contactera rapidement.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const localePath = useLocalePath()

const points = [
    "Enseigner à partir des réalités africaines",
    "Méthodes participatives et accessibles",
    "Relier théorie et pratique syndicale",
    "Échanges constructifs inter-pays"
]

const form = ref({ name: '', email: '', expertise: '', message: '' })
const submitting = ref(false)
const sent = ref(false)

const handleSubmit = () => {
    submitting.value = true
    setTimeout(() => {
        submitting.value = false
        sent.value = true
        form.value = { name: '', email: '', expertise: '', message: '' }
    }, 1000)
}
</script>
