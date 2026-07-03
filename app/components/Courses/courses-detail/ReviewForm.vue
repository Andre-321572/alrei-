<template>
    <div class="edu_wraper border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
        <h4 class="edu_title fw-bold mb-4">{{ $t('submit_review') }}</h4>

        <!-- Success alert -->
        <div v-if="success" class="alert alert-success rounded-3 d-flex align-items-center gap-2 mb-4">
            <i class="bi bi-check-circle-fill fs-5"></i>
            <span>{{ $t('review_submitted') }}</span>
        </div>

        <form @submit.prevent="handleSubmit" class="review-form-box">
            <!-- Star Rating -->
            <div class="mb-4">
                <label class="form-label fw-semibold text-dark mb-2">{{ $t('your_rating') }}</label>
                <div class="d-flex gap-1">
                    <i
                        v-for="n in 5"
                        :key="n"
                        :class="['bi fs-3 cursor-pointer', n <= hoverRating || n <= form.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted']"
                        @mouseenter="hoverRating = n"
                        @mouseleave="hoverRating = 0"
                        @click="form.rating = n"
                        style="cursor:pointer; transition: color 0.15s;"
                    ></i>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label class="form-label fw-semibold text-dark mb-2">{{ $t('your_name') }}</label>
                        <input
                            v-model="form.name"
                            class="form-control rounded-3 py-2"
                            type="text"
                            :placeholder="$t('your_name')"
                            required
                        >
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label class="form-label fw-semibold text-dark mb-2">{{ $t('your_email') }}</label>
                        <input
                            v-model="form.email"
                            class="form-control rounded-3 py-2"
                            type="email"
                            :placeholder="$t('your_email')"
                            required
                        >
                    </div>
                </div>

                <div class="col-lg-12">
                    <div class="form-group">
                        <label class="form-label fw-semibold text-dark mb-2">{{ $t('your_review') }}</label>
                        <textarea
                            v-model="form.comment"
                            class="form-control rounded-3"
                            rows="5"
                            :placeholder="$t('your_review')"
                            required
                        ></textarea>
                    </div>
                </div>

                <div class="col-lg-12">
                    <div v-if="error" class="alert alert-danger rounded-3 py-2 mb-3 small">
                        <i class="bi bi-exclamation-triangle me-2"></i>{{ error }}
                    </div>
                    <button
                        type="submit"
                        class="btn btn-main px-5 rounded-pill py-2 fw-semibold"
                        :disabled="loading || form.rating === 0"
                    >
                        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                        {{ $t('submit_review') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

const props = defineProps({
    course: {
        type: Object,
        default: () => ({ id: 0 })
    }
})

const api = useApi()
const { isAuthenticated } = useAuth()
const router = useRouter()

const hoverRating = ref(0)
const loading = ref(false)
const success = ref(false)
const error = ref(null)

const form = ref({
    rating: 0,
    name: '',
    email: '',
    comment: ''
})

const handleSubmit = async () => {
    if (!isAuthenticated.value) {
        router.push('/login')
        return
    }

    if (form.value.rating === 0) return

    loading.value = true
    error.value = null

    try {
        await api(`/courses/${props.course.id}/reviews`, {
            method: 'POST',
            body: {
                rating: form.value.rating,
                comment: form.value.comment
            }
        })
        success.value = true
        form.value = { rating: 0, name: '', email: '', comment: '' }
    } catch (err) {
        error.value = err?.data?.message || 'Failed to submit review. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>