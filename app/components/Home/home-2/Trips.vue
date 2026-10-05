<template>
    <div class="trips_wrap full bg-alrei-green py-4">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4 col-md-4 col-sm-12" v-for="(item, index) in trips" :key="index">
                    <div class="trips d-flex align-items-center gap-3 pe-xl-5">
                        <div class="trips_icons flex-shrink-0">
                            <span class="square--60 circle bg-white text-success d-flex align-items-center justify-content-center shadow-sm">
                                <i :class="[item.icon, 'fs-3 text-success']"></i>
                            </span>
                        </div>
                        <div class="trips_detail">
                            <h5 class="text-light lh-base mb-1 fs-6 fw-bold">{{ t(item.titleKey) }}</h5>
                            <p class="text-light opacity-75 lh-sm m-0 small">{{ t(item.descKey) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()

const trips = [
    {
        icon: 'bi bi-mortarboard-fill',
        titleKey: 'feature_quality_courses_title',
        descKey: 'feature_quality_courses_desc'
    },
    {
        icon: 'bi bi-patch-check-fill',
        titleKey: 'feature_recognized_certs_title',
        descKey: 'feature_recognized_certs_desc'
    },
    {
        icon: 'bi bi-people-fill',
        titleKey: 'feature_expert_support_title',
        descKey: 'feature_expert_support_desc'
    }
]
</script>