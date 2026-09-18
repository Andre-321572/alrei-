<template>
  <div>
    <!-- Hero Banner avec Image Fond -->
    <section class="py-5 text-white position-relative overflow-hidden bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container py-4 position-relative z-1">
        <div class="row">
          <div class="col-lg-9">
            <span class="badge bg-white text-dark rounded-pill px-3 py-2 fw-bold mb-3 shadow-sm" style="font-size: 0.85rem;">
              {{ $t('contact_badge') }}
            </span>
            <h1 class="display-5 fw-bold mb-3 text-white lh-sm">
              {{ $t('contact_title') }}
            </h1>
            <p class="lead text-white-50 mb-0 fs-6 lh-base opacity-75">
              {{ $t('contact_subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenu Principal -->
    <section class="py-5 bg-light-subtle">
      <div class="container py-3">
        <div class="row g-4">
          <!-- Colonne Gauche: Formulaire de Demande -->
          <div class="col-lg-7">
            <div class="bg-white rounded-4 p-4 p-md-5 shadow-sm border h-100">
              <h3 class="fw-bold text-dark mb-2 fs-4" style="color: #1b3d22;">
                {{ $t('send_inquiry') }}
              </h3>
              <p class="text-muted fs-7 mb-4">
                {{ $t('inquiry_subtitle') }}
              </p>

              <form @submit.prevent="submitForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7 text-dark mb-1">{{ $t('full_name_req') }}</label>
                    <input v-model="form.name" type="text" class="form-control form-control-lg fs-7 border-light-subtle rounded-3 py-2 px-3" :placeholder="$t('full_name_placeholder')" required />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7 text-dark mb-1">{{ $t('email_req') }}</label>
                    <input v-model="form.email" type="email" class="form-control form-control-lg fs-7 border-light-subtle rounded-3 py-2 px-3" placeholder="nom@exemple.com" required />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7 text-dark mb-1">{{ $t('org_union') }}</label>
                    <input v-model="form.org" type="text" class="form-control form-control-lg fs-7 border-light-subtle rounded-3 py-2 px-3" :placeholder="$t('org_placeholder')" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7 text-dark mb-1">{{ $t('country_req') }}</label>
                    <input v-model="form.country" type="text" class="form-control form-control-lg fs-7 border-light-subtle rounded-3 py-2 px-3" :placeholder="$t('country_placeholder')" required />
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-semibold fs-7 text-dark mb-1">{{ $t('subject_req') }}</label>
                    <select v-model="form.subject" class="form-select form-select-lg fs-7 border-light-subtle rounded-3 py-2 px-3 text-secondary" required>
                      <option value="">{{ $t('select_subject') }}</option>
                      <option value="program">{{ $t('subj_program') }}</option>
                      <option value="tech">{{ $t('subj_tech') }}</option>
                      <option value="research">{{ $t('subj_research') }}</option>
                      <option value="partner">{{ $t('subj_partner') }}</option>
                      <option value="resource">{{ $t('subj_resource') }}</option>
                      <option value="other">{{ $t('subj_other') }}</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-semibold fs-7 text-dark mb-1">{{ $t('message_req') }}</label>
                    <textarea v-model="form.message" class="form-control fs-7 border-light-subtle rounded-3 p-3" rows="4" :placeholder="$t('message_placeholder')" required></textarea>
                  </div>
                  <div class="col-12">
                    <div class="form-check d-flex align-items-start gap-2">
                      <input id="consent" v-model="form.consent" type="checkbox" class="form-check-input mt-1" required />
                      <label class="form-check-label fs-8 text-muted" for="consent">
                        {{ $t('consent_text') }}
                      </label>
                    </div>
                  </div>
                  <div class="col-12 pt-3">
                    <button type="submit" class="btn btn-warning btn-lg rounded-pill px-5 py-3 fw-bold text-dark shadow-sm d-inline-flex align-items-center justify-content-center w-100 style-send-btn" :disabled="sending">
                      <span v-if="sending">{{ $t('sending') }}</span>
                      <span v-else class="d-inline-flex align-items-center gap-2">
                        {{ $t('send_request') }} <i class="bi bi-send-fill fs-6"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </form>

              <div v-if="submitted" class="alert alert-success mt-4 rounded-3 fs-7 border-0 shadow-sm">
                <i class="bi bi-check-circle-fill me-2"></i> {{ $t('contact_success') }}
              </div>
            </div>
          </div>

          <!-- Colonne Droite: Cartes Coordonnées & WhatsApp -->
          <div class="col-lg-5">
            <div class="d-flex flex-column gap-4">
              <!-- Carte Coordonnées Officielles -->
              <div class="rounded-4 p-4 shadow-sm border" style="background-color: #f1f4f9;">
                <div class="d-flex align-items-center mb-3">
                  <i class="bi bi-geo-alt-fill text-warning fs-4 me-2"></i>
                  <h4 class="fw-bold mb-0 fs-5" style="color: #d97706;">
                    {{ $t('official_contacts') }}
                  </h4>
                </div>
                <div class="fs-7 text-secondary mb-3 lh-base">
                  <p class="mb-2"><strong class="text-dark">{{ $t('center_label') }}</strong> {{ $t('alrei_center') }}</p>
                  <p class="mb-2"><strong class="text-dark">{{ $t('institution_label') }}</strong> {{ $t('institution_name') }}</p>
                  <p class="mb-0"><strong class="text-dark">{{ $t('address_label') }}</strong> {{ $t('address_full') }}</p>
                </div>

                <div class="bg-white rounded-3 p-3 border border-light-subtle fs-7 text-dark mb-3 shadow-xs">
                  <div class="mb-2"><i class="bi bi-envelope-fill text-warning me-2"></i><strong class="text-secondary">E-mail :</strong> <a href="mailto:alrei@ituc-africa.org" class="text-dark text-decoration-none fw-semibold">alrei@ituc-africa.org</a></div>
                  <div class="mb-2"><i class="bi bi-telephone-fill text-warning me-2"></i><strong class="text-secondary">Téléphone :</strong> <a href="tel:+22890943434" class="text-dark text-decoration-none fw-semibold">+228 90 94 34 34</a></div>
                  <div><i class="bi bi-whatsapp text-warning me-2"></i><strong class="text-secondary">WhatsApp :</strong> <a href="https://wa.me/22890943434" target="_blank" class="text-dark text-decoration-none fw-semibold">+228 90 94 34 34</a></div>
                </div>

                <div class="fs-8 text-muted">
                  <strong class="text-dark">{{ $t('official_sites') }}</strong><br />
                  • Plateforme e-learning : <a href="https://elearning.alrei.org/fr" target="_blank" class="text-decoration-none text-warning fw-semibold">elearning.alrei.org/fr</a><br />
                  • CSI-Afrique : <a href="https://www.ituc-africa.org" target="_blank" class="text-decoration-none text-warning fw-semibold">www.ituc-africa.org</a>
                </div>
              </div>

              <!-- Carte Assistance WhatsApp -->
              <div class="rounded-4 p-4 border" style="background-color: #d1e7dd; border-color: #badbcc !important;">
                <div class="d-flex align-items-center mb-2" style="color: #0f5132;">
                  <i class="bi bi-info-circle-fill fs-5 me-2"></i>
                  <h5 class="fw-bold mb-0 fs-6">
                    {{ $t('whatsapp_assistance') }}
                  </h5>
                </div>
                <p class="fs-7 mb-0 lh-base" style="color: #0f5132;">
                  {{ $t('whatsapp_assistance_desc') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  org: '',
  country: '',
  subject: '',
  message: '',
  consent: false
})

const sending = ref(false)
const submitted = ref(false)

function submitForm() {
  sending.value = true
  setTimeout(() => {
    sending.value = false
    submitted.value = true
    form.name = ''
    form.email = ''
    form.org = ''
    form.country = ''
    form.subject = ''
    form.message = ''
    form.consent = false
  }, 1000)
}
</script>

<style scoped>
.style-send-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
  border: none !important;
  color: #ffffff !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.style-send-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(217, 119, 6, 0.3) !important;
}
.fs-7 { font-size: 0.875rem; }
.fs-8 { font-size: 0.8rem; }
</style>