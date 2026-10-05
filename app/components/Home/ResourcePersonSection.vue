<template>
    <section class="py-5 bg-alrei-green text-white position-relative overflow-hidden">
        <div class="container py-4 position-relative z-1">
            <div class="row align-items-center g-4">
                <div class="col-lg-7 col-md-12">
                    <span class="badge bg-light text-main px-3 py-2 rounded-pill fw-bold mb-3">{{ t('resource_person_badge') }}</span>
                    <h2 class="text-white fw-bold display-6 mb-3">{{ t('resource_person_title') }}</h2>
                    <p class="lead text-white opacity-90 mb-4">
                        {{ t('resource_person_text') }}
                    </p>
                    <div class="row g-3 mb-4">
                        <div class="col-sm-6" v-for="(point, idx) in points" :key="idx">
                            <div class="d-flex align-items-center gap-2">
                                <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                                <span class="small fw-semibold">{{ t(point.key) }}</span>
                            </div>
                        </div>
                    </div>
                    <NuxtLink :to="localePath('/contact')" class="btn btn-warning btn-lg px-4 rounded-pill text-dark fw-bold shadow">
                        {{ t('resource_cta_btn') }} <i class="bi bi-arrow-right ms-2"></i>
                    </NuxtLink>
                </div>
                
                <div class="col-lg-5 col-md-12">
                    <div class="bg-white text-dark p-4 rounded-4 shadow-lg border border-light">
                        <h4 class="fs-5 fw-bold mb-2 text-main"><i class="bi bi-person-lines-fill me-2"></i>{{ t('express_interest_title') }}</h4>
                        <p class="small text-muted mb-3">{{ t('express_interest_desc') }}</p>
                        
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-2">
                                <input v-model="form.name" type="text" class="form-control form-control-sm" :placeholder="t('form_full_name') + ' *'" required />
                            </div>
                            <div class="mb-2">
                                <input v-model="form.email" type="email" class="form-control form-control-sm" :placeholder="t('form_email_address') + ' *'" required />
                            </div>
                            <div class="mb-2">
                                <input v-model="form.expertise" type="text" class="form-control form-control-sm" :placeholder="t('form_expertise') + ' *'" required />
                            </div>
                            <div class="mb-3">
                                <textarea v-model="form.message" class="form-control form-control-sm" rows="2" :placeholder="t('form_message_placeholder') + ' *'" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-main btn-sm w-100 rounded-pill fw-bold" :disabled="submitting">
                                <span v-if="submitting">{{ t('form_submit_sending') }}</span>
                                <span v-else>{{ t('form_submit_btn') }}</span>
                            </button>
                        </form>
                        <div v-if="sent" class="alert alert-success mt-3 mb-0 small p-2 text-center rounded-3">
                            {{ t('form_success_msg') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const points = [
    { key: "resource_point_1", fallback: "Enseigner à partir des réalités africaines" },
    { key: "resource_point_2", fallback: "Méthodes participatives et accessibles" },
    { key: "resource_point_3", fallback: "Relier théorie et pratique syndicale" },
    { key: "resource_point_4", fallback: "Échanges constructifs inter-pays" }
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

