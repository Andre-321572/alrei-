<template>
  <div>
    <!-- Hero Banner with Background Image -->
    <section class="py-5 text-white position-relative overflow-hidden bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container py-4 position-relative z-1">
        <div class="row">
          <div class="col-lg-8">
            <span class="badge bg-white text-dark rounded-pill px-3 py-2 fw-semibold mb-3 fs-7 shadow-sm">
              {{ $t('pricing_badge') }}
            </span>
            <h1 class="display-5 fw-bold mb-3 text-white lh-sm">
              {{ $t('pricing_hero_title') }}
            </h1>
            <p class="lead text-white-50 mb-0 fs-6">
              {{ $t('pricing_hero_subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards / Access Modalities -->
    <section class="py-5 bg-light-subtle">
      <div class="container py-3">
        <div class="row g-4 mb-5">
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-dark border">
              <div class="mb-3">
                <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold">
                  {{ $t('pricing_free_badge') }}
                </span>
              </div>
              <h4 class="fw-bold text-dark mb-2">{{ $t('pricing_free_title') }}</h4>
              <p class="text-muted fs-7 mb-4">
                {{ $t('pricing_free_desc') }}
              </p>
              <div class="mt-auto border-top pt-3 fs-7 text-secondary">
                <p class="mb-1"><strong class="text-dark">{{ $t('target_public') }}</strong> {{ $t('pricing_free_target') }}</p>
                <NuxtLink :to="localePath('/courses')" class="btn btn-outline-dark rounded-pill w-100 mt-3 fw-semibold">
                  {{ $t('pricing_free_btn') }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-lg rounded-4 p-4 bg-white text-dark position-relative border border-warning" style="border-width: 2px !important;">
              <div class="position-absolute top-0 end-0 m-3">
                <span class="badge rounded-pill px-3 py-1 fw-bold text-dark" style="background-color: #f0a500;">
                  {{ $t('pricing_cohort_badge') }}
                </span>
              </div>
              <div class="mb-3">
                <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3 py-2 fw-semibold">
                  {{ $t('pricing_cohort_subbadge') }}
                </span>
              </div>
              <h4 class="fw-bold text-dark mb-2">{{ $t('pricing_cohort_title') }}</h4>
              <p class="text-muted fs-7 mb-4">
                {{ $t('pricing_cohort_desc') }}
              </p>
              <div class="mt-auto border-top pt-3 fs-7 text-secondary">
                <p class="mb-1"><strong class="text-dark">{{ $t('target_public') }}</strong> {{ $t('pricing_cohort_target') }}</p>
                <NuxtLink :to="localePath('/courses')" class="btn w-100 mt-3 fw-bold text-white rounded-pill shadow-sm" style="background-color: #f0a500; border: none;">
                  {{ $t('pricing_cohort_btn') }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-dark border">
              <div class="mb-3">
                <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold">
                  {{ $t('pricing_custom_card_badge') }}
                </span>
              </div>
              <h4 class="fw-bold text-dark mb-2">{{ $t('pricing_custom_card_title') }}</h4>
              <p class="text-muted fs-7 mb-4">
                {{ $t('pricing_custom_card_desc') }}
              </p>
              <div class="mt-auto border-top pt-3 fs-7 text-secondary">
                <p class="mb-1"><strong class="text-dark">{{ $t('target_public') }}</strong> {{ $t('pricing_custom_card_target') }}</p>
                <NuxtLink :to="localePath('/contact')" class="btn btn-outline-dark rounded-pill w-100 mt-3 fw-semibold">
                  {{ $t('pricing_custom_card_btn') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Custom Training Banner -->
        <div class="bg-white rounded-4 p-4 p-md-5 border shadow-sm">
          <h4 class="fw-bold text-dark mb-2">{{ $t('custom_training_title') }}</h4>
          <p class="text-secondary fs-6 mb-4">{{ $t('custom_training_desc') }}</p>
          <NuxtLink :to="localePath('/contact')" class="btn btn-success rounded-pill px-4 py-2 fw-semibold" style="background-color: #193822; border: none;">
            {{ $t('contact_alrei') }} <i class="bi bi-arrow-right ms-2"></i>
          </NuxtLink>
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