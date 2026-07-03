<template>
    <div class="ed_view_box border-0 shadow-lg rounded-4 overflow-hidden mb-4 bg-white">

        <div class="courses-video position-relative">
            <div class="thumb">
                <img class="pro_img img-fluid w-100" :src="course.thumbnail || '/img/course-placeholder.jpg'" alt="">
                <div v-if="course.video_preview" class="overlay_icon">
                    <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bb-video-box">
                        <a href="#" class="play-popup-video">
                            <i class="bi bi-play-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="author-body p-4">
            <div class="ed_view_price mb-3">
                <div class="d-flex align-items-center gap-2 mb-1">
                    <h2 class="lh-base fw-bold text-dark m-0">{{ course.discount_price || course.price }} $</h2>
                    <span v-if="course.discount_price" class="badge bg-light-danger text-danger rounded-pill px-3 py-2 ms-auto">{{ Math.round((1 - course.discount_price / course.price) * 100) }}% off</span>
                </div>
                <del v-if="course.discount_price" class="text-muted fs-5">{{ course.price }} $</del>
            </div>

            <div class="ed_view_link d-flex align-items-center justify-content-center flex-column gap-3 mt-4 p-0">
                <button @click="handleBuyNow" class="btn btn-main w-100 rounded-pill py-3 fw-bold shadow-sm" style="font-size: 1.1rem;">{{ $t('buy_now') }}</button>
                <button v-if="course.access_key" @click="handleEnrollWithKey" class="btn btn-light border w-100 rounded-pill py-2 fw-medium text-dark">
                    <i class="bi bi-key me-2 text-warning"></i>{{ $t('enroll_with_key') }}
                </button>
                <button @click="handleAddToWishlist" class="btn btn-link text-decoration-none text-muted w-100 py-2">
                    <i class="bi bi-heart me-2"></i>{{ $t('add_to_wishlist') }}
                </button>
            </div>

            <div v-if="scholarships.length > 0" class="mt-4 pt-4 border-top">
                <h5 class="mb-3 text-primary fw-bold"><i class="bi bi-mortarboard me-2"></i>Bourses disponibles</h5>
                <div v-for="sch in scholarships" :key="sch.id" class="card shadow-sm border-0 bg-light mb-3 rounded-3">
                    <div class="card-body p-3">
                        <h6 class="fw-bold mb-1 text-dark">{{ sch.name }}</h6>
                        <p class="small text-muted mb-3">{{ sch.description }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold">- {{ sch.value }} FCFA</span>
                            <button @click="openMotivationModal(sch)" class="btn btn-sm btn-primary rounded-pill px-3 fw-semibold">Postuler</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

    <div class="edu_wraper border-0 shadow-sm rounded-4 bg-white p-4">
        <h4 class="edu_title fw-bold mb-4">{{ $t('course_features') }}</h4>
        <ul class="edu_list right m-0 p-0" style="list-style: none;">
            <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="info-title text-muted"><i class="bi bi-bar-chart me-2"></i>{{ $t('level') }}</span>
                <span class="text-dark fw-medium">{{ course.level ? $t(course.level.toLowerCase()) : '' }}</span>
            </li>
            <li class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span class="info-title text-muted"><i class="bi bi-flag me-2"></i>{{ $t('language') }}</span>
                <span class="text-dark fw-medium">{{ course.language }}</span>
            </li>
            <li class="d-flex justify-content-between align-items-center py-2">
                <span class="info-title text-muted"><i class="bi bi-clock-history me-2"></i>{{ $t('updated_at') }}</span>
                <span class="text-dark fw-medium">{{ new Date(course.created_at).toLocaleDateString() }}</span>
            </li>
        </ul>
    </div>

    <!-- Motivation Modal -->
    <div class="modal fade" id="applyScholarshipModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg rounded-4">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">Demander une Bourse</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form @submit.prevent="submitApplication">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Lettre de motivation</label>
                            <textarea class="form-control" v-model="motivationLetter" rows="5" required placeholder="Expliquez pourquoi vous avez besoin de cette bourse..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Document justificatif (PDF/Image)</label>
                            <input type="file" class="form-control" @change="handleFileChange" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold" :disabled="applying">
                            {{ applying ? 'Envoi...' : 'Soumettre' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    course: {
        type: Object,
        default: () => ({
            id: 0,
            thumbnail: '/img/course-placeholder.jpg',
            video_preview: null,
            price: 149.00,
            discount_price: 119.00,
            access_key: null,
            level: 'Beginner',
            language: 'English',
            created_at: new Date().toISOString()
        })
    }
})

const { isAuthenticated } = useAuth()
const router = useRouter()
const api = useApi()

const scholarships = ref([])
const motivationLetter = ref('')
const supportingDocumentFile = ref(null)
const selectedScholarship = ref(null)
const applying = ref(false)
let applyModalInstance = null

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        supportingDocumentFile.value = file
    }
}

onMounted(async () => {
    try {
        const response = await api(`/courses/${props.course.id}/scholarships`)
        scholarships.value = response
    } catch (err) {
        console.error('Failed to load scholarships', err)
    }
})

const handleBuyNow = () => {
    if (!isAuthenticated.value) {
        router.push('/')
        return
    }
    router.push(`/course-detail/${props.course.id}`)
}

const handleAddToWishlist = async () => {
    if (!isAuthenticated.value) {
        router.push('/')
        return
    }
    try {
        await api('/wishlist', {
            method: 'POST',
            body: { course_id: props.course.id }
        })
        alert('Course added to wishlist!')
    } catch (error) {
        console.error('Failed to add to wishlist:', error)
        alert('Failed to add to wishlist. Maybe it is already there?')
    }
}

const handleEnrollWithKey = async () => {
    if (!isAuthenticated.value) {
        router.push('/')
        return
    }
    const key = prompt('Please enter the course access key:')
    if (!key) return
    try {
        await api(`/courses/${props.course.id}/enroll-with-key`, {
            method: 'POST',
            body: { access_key: key }
        })
        alert('Successfully enrolled!')
        router.push('/student-dashboard')
    } catch (error) {
        console.error('Enrollment failed:', error)
        alert('Invalid access key or enrollment failed.')
    }
}

const openMotivationModal = (sch) => {
    if (!isAuthenticated.value) {
        router.push('/')
        return
    }
    selectedScholarship.value = sch
    motivationLetter.value = ''
    if (import.meta.client) {
        const { $bootstrap } = useNuxtApp()
        if (!applyModalInstance) {
            applyModalInstance = new ($bootstrap).Modal(document.getElementById('applyScholarshipModal'))
        }
        applyModalInstance.show()
    }
}

const submitApplication = async () => {
    applying.value = true
    try {
        const formData = new FormData()
        formData.append('motivation_letter', motivationLetter.value)
        if (supportingDocumentFile.value) {
            formData.append('supporting_document', supportingDocumentFile.value)
        }
        await api(`/scholarships/${selectedScholarship.value.id}/apply`, {
            method: 'POST',
            body: formData
        })
        applyModalInstance?.hide()
        alert('Votre demande de bourse a été soumise avec succès !')
    } catch (error) {
        console.error('Application failed:', error)
        alert(error?.data?.message || 'Une erreur est survenue lors de la demande.')
    } finally {
        applying.value = false
    }
}
</script>
