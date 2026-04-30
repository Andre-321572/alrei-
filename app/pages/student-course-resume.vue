<template>
    
    <Preloader />
    <StudentNavbar />

    <section class="bg-cover p-0" :style="studentBg" data-overlay="4">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <StudentAdminSidebar />
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Course Resume</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-4">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="d-flex flex-column gap-3">
                                
                                <!-- Moodle External Access -->
                                <div v-if="course?.is_external && course?.external_platform === 'moodle'" class="moodle-access-container">
                                    <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
                                        <div class="card-body p-5 text-center bg-light-danger">
                                            <div class="icon-box bg-danger text-light rounded-circle p-4 d-inline-flex mb-4">
                                                <i class="bi bi-mortarboard fs-1"></i>
                                            </div>
                                            <h2 class="fw-bold mb-3">Accès Externe via Moodle</h2>
                                            <p class="text-muted mb-4 fs-5">Ce cours est hébergé sur notre plateforme partenaire Moodle. Cliquez sur le bouton ci-dessous pour y accéder directement sans reconnexion.</p>
                                            <div class="row justify-content-center">
                                                <div class="col-md-6">
                                                    <MoodleButton :course-id="course.id" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Standard Curriculum -->
                                <div v-else class="accordion" id="accordionExample1">
                                    
                                    <!-- Certificate Banner -->
                                    <div v-if="progressPercentage === 100 && !course?.certificate_claimed" class="alert alert-success border-0 shadow-sm rounded-4 p-4 mb-4 d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="square--60 circle bg-success text-light fs-3">
                                                <i class="bi bi-award"></i>
                                            </div>
                                            <div>
                                                <h5 class="fw-bold mb-1">Félicitations !</h5>
                                                <p class="mb-0">Vous avez terminé ce cours. Vous pouvez maintenant obtenir votre certificat.</p>
                                            </div>
                                        </div>
                                        <button @click="claimCertificate" :disabled="claiming" class="btn btn-dark rounded-pill px-4 fw-bold">
                                            <span v-if="claiming" class="spinner-border spinner-border-sm me-2"></span>
                                            Obtenir mon certificat
                                        </button>
                                    </div>

                                    <div v-if="course?.certificate_claimed" class="alert alert-info border-0 shadow-sm rounded-4 p-4 mb-4 d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="square--60 circle bg-info text-light fs-3">
                                                <i class="bi bi-patch-check"></i>
                                            </div>
                                            <div>
                                                <h5 class="fw-bold mb-1">Certificat obtenu !</h5>
                                                <p class="mb-0">Votre certificat a été envoyé par email et est disponible dans votre dashboard.</p>
                                            </div>
                                        </div>
                                        <NuxtLink to="/student-certificates" class="btn btn-info text-light rounded-pill px-4 fw-bold">
                                            Voir mes certificats
                                        </NuxtLink>
                                    </div>

                                    <div class="accordion-item">
                                        <a class="accordion-header h3 d-flex flex-row justify-content-between align-items-center collapsible-link position-relative py-3 px-4 collapsed" data-bs-toggle="collapse" href="#collapseOne" role="button" aria-expanded="true" aria-controls="collapseOne">
                                            <div class="d-flex flex-column gap-1">
                                                <div class="fw-semibold fs-5">{{ course?.title || 'Course Curriculum' }}</div>
                                                <div class="progress" style="height: 6px; width: 200px;">
                                                    <div class="progress-bar bg-success" :style="{ width: progressPercentage + '%' }"></div>
                                                </div>
                                                <span class="small text-muted">{{ progressPercentage }}% complété</span>
                                            </div>
                                        </a>
                                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample1">
                                            <div class="accordion-body border-top d-flex flex-column gap-3">
                                                <p v-if="!course" class="text-muted text-center p-4">Loading curriculum...</p>
                                                <template v-else>
                                                    <!-- Render course sections here -->
                                                    <div v-for="section in course.sections" :key="section.id" class="accordion-html border rounded-2 py-3 ps-3">
                                                        <h6 class="fw-bold mb-3">{{ section.title }}</h6>
                                                        <ul class="d-flex flex-column gap-3 mb-0 px-0">
                                                            <li v-for="lesson in section.lessons" :key="lesson.id" class="d-flex flex-row justify-content-between align-items-center me-3">
                                                                <div class="d-flex align-items-center flex-row gap-2">
                                                                    <button @click="markAsComplete(lesson.id)" :class="['square--30 circle border-0', isLessonCompleted(lesson.id) ? 'bg-success text-light' : 'btn-green']">
                                                                        <i :class="['bi fs-5', isLessonCompleted(lesson.id) ? 'bi-check' : 'bi-play-fill']"></i>
                                                                    </button>
                                                                    <span :class="['d-inline-block text-truncate w-shrunk', { 'text-muted text-decoration-line-through': isLessonCompleted(lesson.id) }]">{{ lesson.title }}</span>
                                                                </div>
                                                                <span class="text-mid text-muted">{{ lesson.duration }}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>	
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/useApi';
import { useRoute } from 'vue-router';
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import MoodleButton from '@/components/External/MoodleButton.vue';
import LiveClassCard from '@/components/External/LiveClassCard.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

/* Banner Background */
import studentbg from '@/assets/img/student-bg.jpg'

const api = useApi()
const route = useRoute()
const course = ref(null)
const claiming = ref(false)

const totalLessons = computed(() => {
    if (!course.value || !course.value.sections) return 0
    return course.value.sections.reduce((acc, section) => acc + (section.lessons?.length || 0), 0)
})

const completedLessonsCount = computed(() => {
    return course.value?.completed_lessons?.length || 0
})

const progressPercentage = computed(() => {
    if (totalLessons.value === 0) return 0
    return Math.round((completedLessonsCount.value / totalLessons.value) * 100)
})

const isLessonCompleted = (lessonId) => {
    return course.value?.completed_lessons?.includes(lessonId)
}

const fetchCourse = async () => {
    try {
        const courseId = route.query.id
        if (courseId) {
            const response = await api(`/courses/by-id/${courseId}`)
            course.value = response.data || response
        }
    } catch (error) {
        console.error('Failed to fetch course details:', error)
    }
}

const markAsComplete = async (lessonId) => {
    if (isLessonCompleted(lessonId)) return
    
    try {
        await api(`/courses/${course.value.id}/lessons/${lessonId}/complete`, {
            method: 'POST'
        })
        // On met à jour localement pour éviter de tout re-fetch
        if (!course.value.completed_lessons) course.value.completed_lessons = []
        course.value.completed_lessons.push(lessonId)
    } catch (error) {
        console.error('Error marking lesson as complete:', error)
    }
}

const claimCertificate = async () => {
    claiming.value = true
    try {
        await api(`/courses/${course.value.id}/claim-certificate`, {
            method: 'POST'
        })
        course.value.certificate_claimed = true
        alert('Félicitations ! Votre certificat a été généré et envoyé par email.')
    } catch (error) {
        console.error('Error claiming certificate:', error)
        alert('Une erreur est survenue lors de la génération du certificat.')
    } finally {
        claiming.value = false
    }
}

onMounted(() => {
    fetchCourse()
})

const studentBg = computed(() => ({
    background: `url(${studentbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>

<style scoped>
.bg-light-danger {
    background-color: #fff5f5;
}
.icon-box.bg-danger {
    background-color: #ff4d4d !important;
}
</style>