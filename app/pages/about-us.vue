<template>
  <div>
    <!-- Hero Banner with Background Image -->
    <section class="py-5 text-white position-relative overflow-hidden bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container py-4 position-relative z-1">
        <div class="row">
          <div class="col-lg-8">
            <span class="badge bg-white text-dark rounded-pill px-3 py-2 fw-semibold mb-3 fs-7 shadow-sm">
              {{ $t('about_badge') }}
            </span>
            <h1 class="display-5 fw-bold mb-3 text-white lh-sm">
              {{ $t('about_title') }}
            </h1>
            <p class="lead text-white-50 mb-4 fs-6">
              {{ $t('about_subtitle') }}
            </p>
            <NuxtLink :to="localePath('/contact')" class="btn rounded-pill px-4 py-2 fw-bold text-white shadow-sm" style="background-color: #f0a500; border: none;">
              {{ $t('contact_alrei') }} <i class="bi bi-arrow-right ms-2"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- History & Presentation -->
    <section class="py-5 bg-white">
      <div class="container py-3">
        <div class="row g-4 align-items-center">
          <div class="col-lg-7">
            <h2 class="fw-bold text-dark mb-3 fs-3" style="color: #193822;">
              {{ $t('our_history_title') }}
            </h2>
            <p class="text-secondary fs-6 lh-base mb-3">
              {{ $t('our_history_text_1') }}
            </p>
            <p class="text-secondary fs-6 lh-base mb-0">
              {{ $t('our_history_text_2') }}
            </p>
          </div>
          <div class="col-lg-5">
            <div class="row g-3">
              <div class="col-12">
                <div class="p-4 rounded-4 bg-light border border-light-subtle shadow-sm">
                  <h4 class="fw-bold text-warning mb-2 fs-5"><i class="bi bi-eye me-2"></i>{{ $t('vision_title') }}</h4>
                  <p class="text-muted mb-0 fs-7">{{ $t('vision_desc') }}</p>
                </div>
              </div>
              <div class="col-12">
                <div class="p-4 rounded-4 bg-light border border-light-subtle shadow-sm">
                  <h4 class="fw-bold text-success mb-2 fs-5"><i class="bi bi-bullseye me-2"></i>{{ $t('mission_title') }}</h4>
                  <p class="text-muted mb-0 fs-7">{{ $t('mission_desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Governance Section -->
    <section class="py-5 bg-light-subtle">
      <div class="container py-3">
        <div class="bg-white rounded-4 p-4 p-md-5 border shadow-sm">
          <h3 class="fw-bold text-dark mb-3 fs-4" style="color: #193822;">
            {{ $t('governance_title') }}
          </h3>
          <p class="text-secondary fs-6 lh-base mb-0">
            {{ $t('governance_text') }}
          </p>
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