<template>
    <div class="ed_view_box border-0 shadow-lg rounded-4 overflow-hidden mb-4 bg-white">

        <div class="courses-video position-relative">
            <div class="thumb overflow-hidden rounded-top-4" style="background-color: #0b0f19; aspect-ratio: 16/9; max-height: 240px; position: relative;">
                <img 
                    class="pro_img w-100 h-100" 
                    :src="courseImage" 
                    @error="onImgError"
                    :alt="course?.title || ''"
                    style="object-fit: cover; object-position: center;"
                >
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
                    <h2 v-if="isFree" class="lh-base fw-bold text-success m-0">
                        <i class="bi bi-gift-fill me-2"></i>{{ $t('free') }}
                    </h2>
                    <template v-else>
                        <h2 class="lh-base fw-bold text-dark m-0">{{ course.discount_price || course.price }} €</h2>
                        <span v-if="course.discount_price" class="badge bg-light-danger text-danger rounded-pill px-3 py-2 ms-auto">
                            {{ Math.round((1 - course.discount_price / course.price) * 100) }}% off
                        </span>
                    </template>
                </div>
                <del v-if="!isFree && course.discount_price" class="text-muted fs-5">{{ course.price }} €</del>
            </div>

            <div class="ed_view_link d-flex align-items-center justify-content-center flex-column gap-3 mt-4 p-0">
                <button 
                    @click="handleFollowCourse" 
                    :class="['btn w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2', 
                            isEnrolled && enrollmentStatus === 'pending' ? 'btn-warning text-dark' : 
                            (isEnrolled && enrollmentStatus === 'rejected' ? 'btn-danger text-white' : 'btn-main')]" 
                    style="font-size: 1.1rem;"
                    :disabled="enrolling"
                >
                    <span v-if="enrolling" class="spinner-border spinner-border-sm"></span>
                    <template v-else>
                        <i :class="isEnrolled ? (enrollmentStatus === 'pending' ? 'bi bi-clock-history' : (enrollmentStatus === 'rejected' ? 'bi bi-x-circle' : 'bi bi-play-circle-fill')) : (isFree ? 'bi bi-person-check-fill' : 'bi bi-mortarboard-fill')"></i>
                        <span>
                            {{ isEnrolled ? (enrollmentStatus === 'pending' ? 'En attente de validation' : (enrollmentStatus === 'rejected' ? 'Candidature non retenue' : ($t('enrolled_continue') || 'Accéder au cours'))) : (isFree ? ($t('join_course') || 'Rejoindre le cours') : ($t('follow_course') || 'Suivre le cours')) }}
                        </span>
                    </template>
                </button>

                <button v-if="course.access_key" @click="handleEnrollWithKey" class="btn btn-light border w-100 rounded-pill py-2 fw-medium text-dark">
                    <i class="bi bi-key me-2 text-warning"></i>{{ $t('enroll_with_key') }}
                </button>

                <button @click="handleAddToWishlist" class="btn btn-link text-decoration-none text-muted w-100 py-2">
                    <i class="bi bi-heart me-2"></i>{{ $t('add_to_wishlist') }}
                </button>
            </div>

            <div v-if="scholarships.length > 0" class="mt-4 pt-4 border-top">
                <h5 class="mb-3 text-primary fw-bold"><i class="bi bi-mortarboard me-2"></i>{{ $t('scholarships_available') }}</h5>
                <div v-for="sch in scholarships" :key="sch.id" class="card shadow-sm border-0 bg-light mb-3 rounded-3">
                    <div class="card-body p-3">
                        <h6 class="fw-bold mb-1 text-dark">{{ sch.name }}</h6>
                        <p class="small text-muted mb-3">{{ sch.description }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold">- {{ sch.value }} €</span>
                            <button @click="openMotivationModal(sch)" class="btn btn-sm btn-primary rounded-pill px-3 fw-semibold">{{ $t('apply') }}</button>
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
                    <h5 class="modal-title fw-bold">{{ $t('apply_scholarship') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <form @submit.prevent="submitApplication">
                        <div class="mb-3">
                            <label class="form-label fw-bold">{{ $t('motivation_letter') }}</label>
                            <textarea class="form-control" v-model="motivationLetter" rows="5" required :placeholder="$t('motivation_letter_placeholder')"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">{{ $t('supporting_document') }}</label>
                            <input type="file" class="form-control" @change="handleFileChange" required accept=".pdf,.doc,.docx,.jpg,.jpeg,.png">
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold" :disabled="applying">
                            {{ applying ? $t('sending') : $t('submit') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Auth Choice Modal -->
    <div class="modal fade" id="authChoiceModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div class="modal-header border-0 bg-light p-4">
                    <div>
                        <h5 class="modal-title fw-bold text-dark m-0">{{ $t('login_required_title') }}</h5>
                        <p class="small text-muted mb-0">{{ course.title }}</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 text-center">
                    <p class="fs-6 text-muted mb-4" style="white-space: pre-line;">
                        {{ $t('login_required_desc') }}
                    </p>
                    <div class="d-grid gap-3">
                        <button @click="goToLogin" class="btn btn-main btn-lg rounded-pill fw-bold shadow-sm">
                            <i class="bi bi-box-arrow-in-right me-2"></i>{{ $t('have_account_login') }}
                        </button>
                        <button @click="goToRegister" class="btn btn-outline-main btn-lg rounded-pill fw-bold">
                            <i class="bi bi-person-plus-fill me-2"></i>{{ $t('no_account_register') }}
                        </button>
                    </div>
                </div>
                <div class="modal-footer border-0 bg-light justify-content-center py-3">
                    <small class="text-muted">{{ $t('elearning_platform_subtitle') }}</small>
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
            price: 0,
            discount_price: null,
            access_key: null,
            level: 'Beginner',
            language: 'French',
            created_at: new Date().toISOString()
        })
    }
})

const { isAuthenticated } = useAuth()
const router = useRouter()
const route = useRoute()
const api = useApi()

const hasError = ref(false)

const courseImage = computed(() => {
    const { getThemeImage } = useCourseTheme()
    if (hasError.value) {
        return getThemeImage(props.course, 0, true)
    }
    return getThemeImage(props.course)
})

const onImgError = () => {
    hasError.value = true
}

const isFree = computed(() => {
    if (!props.course) return true
    const p = props.course.price
    return !p || p == 0 || p === '0' || p === 'Free' || p === 'Gratuit' || props.course.is_free === true
})

const isEnrolled = ref(false)
const enrollmentStatus = ref('none')
const enrolling = ref(false)
const scholarships = ref([])
const motivationLetter = ref('')
const supportingDocumentFile = ref(null)
const selectedScholarship = ref(null)
const applying = ref(false)
let applyModalInstance = null
let authChoiceModalInstance = null

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        supportingDocumentFile.value = file
    }
}

const checkEnrollmentStatus = async () => {
    if (isAuthenticated.value && props.course?.id) {
        try {
            const res = await api(`/courses/${props.course.id}/enrollment-status`)
            if (res && (res.enrolled || res.is_enrolled)) {
                isEnrolled.value = true
                enrollmentStatus.value = res.status || 'active'
            }
        } catch (e) {
            // silent catch
        }
    }
}

onMounted(async () => {
    await checkEnrollmentStatus()
    if (props.course?.id) {
        try {
            const response = await api(`/courses/${props.course.id}/scholarships`)
            scholarships.value = response
        } catch (err) {
            console.error('Failed to load scholarships', err)
        }
    }
})

const handleFollowCourse = async () => {
    if (!isAuthenticated.value) {
        // User not logged in -> open choice modal
        if (import.meta.client) {
            const { $bootstrap } = useNuxtApp()
            if (!authChoiceModalInstance) {
                const el = document.getElementById('authChoiceModal')
                if (el) authChoiceModalInstance = new ($bootstrap).Modal(el)
            }
            authChoiceModalInstance?.show()
        } else {
            router.push({ path: '/register', query: { tab: 'login', redirect: route.fullPath } })
        }
        return
    }

    // User is logged in
    if (isEnrolled.value) {
        if (enrollmentStatus.value === 'pending') {
            alert('Votre candidature (Lettre de nomination / Validation de dossier) a bien été reçue. Elle est actuellement en cours d\'examen par l\'administration.')
            return
        }
        if (enrollmentStatus.value === 'rejected') {
            alert('Désolé, votre candidature pour ce cours n\'a pas été retenue par l\'administration.')
            return
        }
        router.push(`/student-course-resume?id=${props.course.id}&course_id=${props.course.id}`)
        return
    }

    if (isFree.value || props.course?.is_nomination_only || props.course?.requires_approval) {
        enrolling.value = true
        try {
            const res = await api(`/courses/${props.course.id}/enroll`, { method: 'POST' })
            isEnrolled.value = true
            const status = res?.enrollment?.status || (props.course?.is_nomination_only || props.course?.requires_approval ? 'pending' : 'active')
            enrollmentStatus.value = status

            if (status === 'pending') {
                alert('Votre demande a été enregistrée ! Elle est actuellement en attente de validation par l\'administration.')
            } else {
                alert('Félicitations ! Vous êtes inscrit(e) à ce cours.')
                router.push('/student-dashboard')
            }
        } catch (error) {
            console.error('Enrollment error:', error)
            if (error.status === 409 || error.data?.message?.includes('enrolled')) {
                isEnrolled.value = true
                await checkEnrollmentStatus()
                if (enrollmentStatus.value === 'pending') {
                    alert('Votre dossier est en cours de validation par l\'administration.')
                } else {
                    router.push('/student-dashboard')
                }
            } else {
                alert(error.data?.message || 'Erreur lors de l\'inscription au cours.')
            }
        } finally {
            enrolling.value = false
        }
    } else {
        // Paid course -> checkout or apply
        router.push(`/checkout?course_id=${props.course.id}`)
    }
}

const goToLogin = () => {
    authChoiceModalInstance?.hide()
    router.push({ path: '/register', query: { tab: 'login', redirect: route.fullPath } })
}

const goToRegister = () => {
    authChoiceModalInstance?.hide()
    router.push({ path: '/register', query: { tab: 'register', redirect: route.fullPath } })
}

const handleAddToWishlist = async () => {
    if (!isAuthenticated.value) {
        goToLogin()
        return
    }
    try {
        await api('/wishlist', {
            method: 'POST',
            body: { course_id: props.course.id }
        })
        alert('Cours ajouté à vos favoris !')
    } catch (error) {
        console.error('Failed to add to wishlist:', error)
        alert('Impossible d\'ajouter aux favoris.')
    }
}

const handleEnrollWithKey = async () => {
    if (!isAuthenticated.value) {
        goToLogin()
        return
    }
    const key = prompt('Veuillez entrer la clé d\'accès du cours :')
    if (!key) return
    try {
        await api(`/courses/${props.course.id}/enroll-with-key`, {
            method: 'POST',
            body: { access_key: key }
        })
        alert('Inscription réussie !')
        router.push('/student-dashboard')
    } catch (error) {
        console.error('Enrollment failed:', error)
        alert('Clé d\'accès invalide.')
    }
}

const openMotivationModal = (sch) => {
    if (!isAuthenticated.value) {
        goToLogin()
        return
    }
    selectedScholarship.value = sch
    motivationLetter.value = ''
    if (import.meta.client) {
        const { $bootstrap } = useNuxtApp()
        if (!applyModalInstance) {
            applyModalInstance = new ($bootstrap).Modal(document.getElementById('applyScholarshipModal'))
        }
        applyModalInstance?.show()
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
