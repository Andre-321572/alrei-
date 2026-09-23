<template>
  <div>
    <!-- Hero Banner with Background Image -->
    <section class="py-5 text-white position-relative overflow-hidden bg-cover" style="background: linear-gradient(to right, rgba(15, 35, 20, 0.65) 0%, rgba(15, 35, 20, 0.2) 100%), url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container py-4 position-relative z-1">
        <div class="row">
          <div class="col-lg-9">
            <span class="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold mb-3 fs-7 shadow-sm">
              {{ $t('privacy_badge') }}
            </span>
            <h1 class="display-5 fw-extrabold mb-3 text-white lh-sm">
              {{ $t('privacy_hero_title') }}
            </h1>
            <p class="lead text-white mb-0 fs-5 fw-medium lh-base" style="opacity: 0.95;">
              {{ $t('privacy_hero_subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Content -->
    <section class="py-5 bg-light-subtle">
      <div class="container py-3">
        <div class="bg-white rounded-4 p-4 p-md-5 border shadow-sm">
          <p class="lead text-dark fs-6 mb-4 lh-base">
            {{ $t('privacy_intro') }}
          </p>

          <hr class="my-4 text-light-subtle" />

          <h4 class="fw-bold text-dark mb-3">{{ $t('privacy_sec1_title') }}</h4>
          <p class="text-secondary fs-6 lh-base mb-4">
            {{ $t('privacy_sec1_desc') }}
          </p>

          <h4 class="fw-bold text-dark mb-3">{{ $t('privacy_sec2_title') }}</h4>
          <p class="text-secondary fs-6 lh-base mb-4">
            {{ $t('privacy_sec2_desc') }}
          </p>

          <h4 class="fw-bold text-dark mb-3">{{ $t('privacy_sec3_title') }}</h4>
          <p class="text-secondary fs-6 lh-base mb-0">
            {{ $t('privacy_sec3_desc') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })
const { t } = useI18n()
</script>

<style scoped>
.fs-7 { font-size: 0.875rem; }
</style>