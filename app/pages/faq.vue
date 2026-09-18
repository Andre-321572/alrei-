<template>
  <div>
    <!-- Hero Banner with Background Image -->
    <section class="py-5 text-white position-relative overflow-hidden bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container py-4 position-relative z-1">
        <div class="row">
          <div class="col-lg-8">
            <span class="badge bg-white text-dark rounded-pill px-3 py-2 fw-semibold mb-3 fs-7 shadow-sm">
              {{ $t('faq_badge') }}
            </span>
            <h1 class="display-5 fw-bold mb-3 text-white lh-sm">
              {{ $t('faq_hero_title') }}
            </h1>
            <p class="lead text-white-50 mb-0 fs-6">
              {{ $t('faq_hero_subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion Section -->
    <section class="py-5 bg-light-subtle">
      <div class="container py-3">
        <div class="row justify-content-center">
          <div class="col-lg-9">
            <h3 class="fw-bold text-dark mb-4 fs-4 text-center">
              {{ $t('how_to_use_alrei') }}
            </h3>

            <div id="faqAccordion" class="accordion shadow-sm rounded-4 overflow-hidden border">
              <div class="accordion-item border-0 border-bottom">
                <h2 id="headingOne" class="accordion-header">
                  <button class="accordion-button fw-semibold text-dark fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {{ $t('faq_q1') }}
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                  <div class="accordion-body text-secondary fs-7">
                    {{ $t('faq_a1') }}
                  </div>
                </div>
              </div>

              <div class="accordion-item border-0 border-bottom">
                <h2 id="headingTwo" class="accordion-header">
                  <button class="accordion-button collapsed fw-semibold text-dark fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    {{ $t('faq_q2') }}
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                  <div class="accordion-body text-secondary fs-7">
                    {{ $t('faq_a2') }}
                  </div>
                </div>
              </div>

              <div class="accordion-item border-0">
                <h2 id="headingThree" class="accordion-header">
                  <button class="accordion-button collapsed fw-semibold text-dark fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    {{ $t('faq_q3') }}
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                  <div class="accordion-body text-secondary fs-7">
                    {{ $t('faq_a3') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Technical Help Banner -->
            <div class="mt-5 rounded-4 p-4 p-md-5 border text-center shadow-sm" style="background-color: #d8f3e5; border-color: #b7e8cd !important;">
              <i class="bi bi-headset fs-1 text-success mb-3 d-block"></i>
              <h4 class="fw-bold text-success-emphasis mb-2">{{ $t('tech_help_title') }}</h4>
              <p class="text-success-emphasis mb-4 fs-6">{{ $t('tech_help_desc') }}</p>
              <NuxtLink :to="localePath('/contact')" class="btn btn-success rounded-pill px-5 py-3 fw-bold text-white shadow-sm" style="background-color: #193822; border: none;">
                {{ $t('send_email') }} <i class="bi bi-arrow-right ms-2"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
const localePath = useLocalePath()
const { t } = useI18n()
</script>

<style scoped>
.fs-7 { font-size: 0.875rem; }
</style>