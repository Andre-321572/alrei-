<template>
    <div class="rating-overview border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
        <div class="rating-overview-box">
            <span class="rating-overview-box-total text-dark">{{ avgRating }}</span>
            <span class="rating-overview-box-percent">out of 5.0</span>
            <div class="star-rating d-flex align-items-center justify-content-center gap-1 text-mid">
                <i v-for="n in 5" :key="n" :class="['bi', n <= Math.round(avgRating) ? 'bi-star-fill' : 'bi-star']"></i>
            </div>
        </div>

        <div class="rating-bars">
            <div v-for="star in [5,4,3,2,1]" :key="star" class="rating-bars-item">
                <span class="rating-bars-name">{{ star }} Star</span>
                <span class="rating-bars-inner">
                    <span :class="['rating-bars-rating', star >= 4 ? 'high' : star === 3 ? 'good' : star === 2 ? 'mid' : 'poor']">
                        <span class="rating-bars-rating-inner" :style="{ width: pct(star) + '%' }"></span>
                    </span>
                    <strong>{{ pct(star) }}%</strong>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    course: { type: Object, default: () => ({}) }
})

const reviews = computed(() => props.course?.reviews || [])
const total   = computed(() => reviews.value.length)

const avgRating = computed(() => {
    if (!total.value) return (props.course?.average_rating || 0).toFixed(1)
    const sum = reviews.value.reduce((a, r) => a + (r.rating || 0), 0)
    return (sum / total.value).toFixed(1)
})

const countFor = (star) => reviews.value.filter(r => r.rating === star).length

const pct = (star) => {
    if (!total.value) return 0
    return Math.round((countFor(star) / total.value) * 100)
}
</script>
