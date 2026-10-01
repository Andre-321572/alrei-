<template>
    <div class="course-join-cta-card border-0 shadow-lg rounded-4 p-4 p-md-5 mb-4 position-relative overflow-hidden" 
         style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f766e 100%); color: white;">
        <div class="position-absolute end-0 bottom-0 opacity-10 pointer-events-none pe-3 pb-3">
            <i class="bi bi-mortarboard-fill" style="font-size: 14rem; line-height: 1; color: white;"></i>
        </div>

        <div class="position-relative z-1">
            <div class="row align-items-center g-4">
                <div class="col-lg-8">
                    <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3 d-inline-flex align-items-center gap-1">
                        <i class="bi bi-stars"></i> {{ $t('alrei_training') }}
                    </span>
                    <h3 class="fw-bolder text-white mb-2 display-7">
                        {{ $t('join_training') }}
                    </h3>
                    <p class="text-light opacity-90 mb-3 fs-6 lh-base" style="max-width: 620px;">
                        {{ course?.title }}
                    </p>

                    <div class="d-flex flex-wrap gap-4 text-light small opacity-85">
                        <span class="d-flex align-items-center gap-1"><i class="bi bi-check-circle-fill text-success"></i> {{ $t('flexible_online_access') }}</span>
                        <span class="d-flex align-items-center gap-1"><i class="bi bi-shield-check text-warning"></i> {{ $t('alrei_certificate') }}</span>
                        <span class="d-flex align-items-center gap-1"><i class="bi bi-globe text-info"></i> {{ $t('african_union_network') }}</span>
                    </div>
                </div>

                <div class="col-lg-4 text-lg-end text-center">
                    <button 
                        @click="handleJoinCourse" 
                        class="btn btn-warning btn-lg rounded-pill px-4 py-3 fw-bolder shadow-lg w-100 d-inline-flex align-items-center justify-content-center gap-2 text-dark transform-hover"
                        style="font-size: 1.15rem;"
                    >
                        <span>{{ isEnrolled ? $t('access_course') : $t('join_course') }}</span>
                        <i class="bi bi-arrow-right-circle-fill fs-5"></i>
                    </button>
                    <p class="small text-light opacity-75 mt-2 mb-0">
                        {{ isAuthenticated ? $t('you_are_logged_in') : $t('login_or_create_account') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    course: {
        type: Object,
        required: true
    }
})

const { isAuthenticated } = useAuth()
const router = useRouter()
const route = useRoute()
const api = useApi()

const isEnrolled = ref(false)

const isFree = computed(() => {
    if (!props.course) return true
    const p = props.course.price
    return !p || p == 0 || p === '0' || p === 'Free' || p === 'Gratuit' || props.course.is_free === true
})

const checkEnrollmentStatus = async () => {
    if (isAuthenticated.value && props.course?.id) {
        try {
            const res = await api(`/courses/${props.course.id}/enrollment-status`)
            if (res && (res.enrolled || res.is_enrolled)) {
                isEnrolled.value = true
            }
        } catch (e) {
            // silent catch
        }
    }
}

onMounted(() => {
    checkEnrollmentStatus()
})

const handleJoinCourse = async () => {
    if (!isAuthenticated.value) {
        // Redirige directement vers la page de connexion (register avec onglet login et paramètre redirect)
        router.push({
            path: '/register',
            query: {
                tab: 'login',
                redirect: route.fullPath
            }
        })
        return
    }

    if (isEnrolled.value) {
        router.push(`/student-course-resume?course_id=${props.course.id}`)
        return
    }

    if (isFree.value) {
        try {
            await api(`/courses/${props.course.id}/enroll`, { method: 'POST' })
            isEnrolled.value = true
            alert('Félicitations ! Vous avez rejoint ce cours avec succès.')
            router.push('/student-dashboard')
        } catch (err) {
            if (err.status === 409 || err.data?.message?.includes('enrolled')) {
                isEnrolled.value = true
                router.push('/student-dashboard')
            } else {
                alert(err.data?.message || 'Erreur lors de l\'inscription au cours.')
            }
        }
    } else {
        router.push(`/checkout?course_id=${props.course.id}`)
    }
}
</script>
