<template>
    <section class="py-5 bg-light position-relative">
        <div class="container py-3">
            <div class="card border-0 bg-main text-white rounded-4 p-4 p-md-5 shadow-lg overflow-hidden position-relative">
                <div class="row align-items-center g-4 position-relative z-1">
                    <div class="col-lg-6 col-md-12">
                        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-2">{{ $t('stay_informed') }}</span>
                        <h3 class="text-white fw-bold mb-2">{{ $t('newsletter_title') }}</h3>
                        <p class="text-white opacity-90 mb-0 small">
                            {{ $t('newsletter_desc') }}
                        </p>
                    </div>
                    
                    <div class="col-lg-6 col-md-12">
                        <form @submit.prevent="handleSubscribe" class="d-flex flex-column flex-sm-row gap-2 mb-2">
                            <input 
                                v-model="email" 
                                type="email" 
                                class="form-control form-control-lg rounded-pill border-0 px-4 fs-6" 
                                :placeholder="$t('newsletter_email_placeholder')" 
                                required 
                            />
                            <button type="submit" class="btn btn-warning btn-lg rounded-pill px-4 text-dark fw-bold flex-shrink-0" :disabled="submitting">
                                <span v-if="submitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                                <span v-if="submitting">{{ $t('please_wait') }}</span>
                                <span v-else>{{ $t('subscribe') }}</span>
                            </button>
                        </form>
                        <p class="small text-white opacity-75 mb-0" style="font-size: 0.8rem;">
                            <i class="bi bi-lock me-1"></i>{{ $t('newsletter_disclaimer') }}
                        </p>
                        
                        <div v-if="success" class="alert alert-success text-dark mt-3 mb-0 small p-2 rounded-3 text-center shadow-sm">
                            <i class="bi bi-check-circle-fill me-1 text-success"></i> {{ successMsg }}
                        </div>
                        <div v-if="errorMsg" class="alert alert-danger mt-3 mb-0 small p-2 rounded-3 text-center shadow-sm">
                            {{ errorMsg }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const email = ref('')
const submitting = ref(false)
const success = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const api = useApi()

const handleSubscribe = async () => {
    if (!email.value) return
    submitting.value = true
    success.value = false
    errorMsg.value = ''
    successMsg.value = ''

    try {
        const res = await api('/newsletter/subscribe', {
            method: 'POST',
            body: { email: email.value }
        })
        successMsg.value = res?.message || 'Merci ! Vous êtes désormais abonné aux actualités ALREI.'
        success.value = true
        email.value = ''
    } catch (err) {
        if (err?.data?.message) {
            errorMsg.value = err.data.message
        } else {
            successMsg.value = 'Merci ! Vous êtes désormais abonné aux actualités ALREI.'
            success.value = true
            email.value = ''
        }
    } finally {
        submitting.value = false
    }
}
</script>
