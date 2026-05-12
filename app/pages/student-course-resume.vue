<template>
    
    <Preloader />
    <StudentNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
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
                                    
                                    <!-- Learning Tabs -->
                                    <ul class="nav nav-pills nav-fill mb-4 bg-white p-2 rounded-4 shadow-sm" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-curriculum" type="button">Curriculum</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-quizzes" type="button">Quiz ({{ course?.quizzes?.length || 0 }})</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-assignments" type="button">Devoirs ({{ course?.assignments?.length || 0 }})</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-forum" type="button">Forum</button>
                                        </li>
                                    </ul>

                                    <div class="tab-content" id="pills-tabContent">
                                        <!-- Curriculum Tab -->
                                        <div class="tab-pane fade show active" id="pills-curriculum">
                                            <div class="accordion-item shadow-sm border rounded-4 overflow-hidden">
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

                                        <!-- Quizzes Tab -->
                                        <div class="tab-pane fade" id="pills-quizzes">
                                            <div v-if="selectedQuizId">
                                                <button @click="selectedQuizId = null" class="btn btn-link p-0 mb-3 text-primary text-decoration-none">
                                                    <i class="bi bi-arrow-left me-2"></i>Retour aux Quiz
                                                </button>
                                                
                                                <div v-if="quizLoading" class="text-center py-5">
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="visually-hidden">Chargement...</span>
                                                    </div>
                                                    <p class="mt-2 text-muted">Préparation de votre tentative...</p>
                                                </div>
                                                
                                                <QuizPlayer
                                                    v-else-if="currentQuiz && currentAttempt"
                                                    :quiz="currentQuiz"
                                                    :attempt="currentAttempt"
                                                    :is-submitting="isSubmitting"
                                                    @save="handleSaveAnswer"
                                                    @submit="handleSubmitQuiz"
                                                    @time-up="handleSubmitQuiz"
                                                />
                                            </div>
                                            <div v-else class="row g-4">
                                                <div v-for="quiz in course?.quizzes" :key="quiz.id" class="col-md-6">
                                                    <div class="card border shadow-sm rounded-4 p-4 text-center h-100">
                                                        <div class="square--50 circle bg-light-primary text-primary fs-4 mx-auto mb-3">
                                                            <i class="bi bi-question-circle"></i>
                                                        </div>
                                                        <h6 class="fw-bold mb-1">{{ quiz.title }}</h6>
                                                        <p class="small text-muted mb-3">{{ quiz.questions_count }} questions</p>
                                                        <button @click="startSelectedQuiz(quiz.id)" class="btn btn-primary btn-sm rounded-pill w-100">Faire le Quiz</button>
                                                    </div>
                                                </div>
                                                <div v-if="!course?.quizzes?.length" class="col-12 text-center py-4">
                                                    <p class="text-muted">Aucun quiz disponible pour ce cours.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Assignments Tab -->
                                        <div class="tab-pane fade" id="pills-assignments">
                                            <div v-if="selectedAssignmentId">
                                                <button @click="selectedAssignmentId = null" class="btn btn-link p-0 mb-3"><i class="bi bi-arrow-left me-2"></i>Retour aux Devoirs</button>
                                                <AssignmentPlayer :assignment-id="selectedAssignmentId" />
                                            </div>
                                            <div v-else class="row g-4">
                                                <div v-for="assignment in course?.assignments" :key="assignment.id" class="col-md-6">
                                                    <div class="card border shadow-sm rounded-4 p-4 text-center">
                                                        <div class="square--50 circle bg-light-danger text-danger fs-4 mx-auto mb-3">
                                                            <i class="bi bi-file-earmark-text"></i>
                                                        </div>
                                                        <h6 class="fw-bold mb-1">{{ assignment.title }}</h6>
                                                        <div v-if="assignment.submission" class="mb-2">
                                                            <span v-if="assignment.submission.status === 'graded'" class="badge bg-light-success text-success rounded-pill px-3">Noté: {{ assignment.submission.grade }}/{{ assignment.max_points }}</span>
                                                            <span v-else class="badge bg-light-warning text-warning rounded-pill px-3">En attente de correction</span>
                                                        </div>
                                                        <p v-else class="small text-muted mb-3">Score Max: {{ assignment.max_points }}</p>
                                                        
                                                        <button @click="selectedAssignmentId = assignment.id" 
                                                                :class="['btn btn-sm rounded-pill w-100', assignment.submission ? 'btn-outline-danger' : 'btn-danger']">
                                                            {{ assignment.submission ? 'Voir ma soumission' : 'Soumettre' }}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Forum Tab -->
                                        <div class="tab-pane fade" id="pills-forum">
                                            <CourseForum :course-id="courseId" />
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


import QuizPlayer from '@/components/Learning/QuizPlayer.vue';
import AssignmentPlayer from '@/components/Learning/AssignmentPlayer.vue';
import CourseForum from '@/components/Learning/CourseForum.vue';
import { useQuizStore } from '@/composables/useQuizStore';

const api = useApi()
const route = useRoute()
const { currentQuiz, currentAttempt, isSubmitting, startQuiz, saveAnswer, submitQuiz } = useQuizStore()

const course = ref(null)
const claiming = ref(false)
const selectedQuizId = ref(null)
const quizLoading = ref(false)
const selectedAssignmentId = ref(null)

const startSelectedQuiz = async (quizId) => {
    quizLoading.value = true
    selectedQuizId.value = quizId
    try {
        await startQuiz(quizId)
    } catch (error) {
        console.error('Failed to start quiz:', error)
        alert(error?.response?._data?.message || 'Une erreur est survenue lors du démarrage du quiz.')
        selectedQuizId.value = null
    } finally {
        quizLoading.value = false
    }
}

const handleSaveAnswer = async (questionId, data) => {
    if (!currentAttempt.value) return
    try {
        await saveAnswer(currentAttempt.value.id, questionId, data)
    } catch (error) {
        console.error('Error saving answer:', error)
    }
}

const handleSubmitQuiz = async () => {
    if (!currentAttempt.value) return
    if (!confirm('Êtes-vous sûr de vouloir soumettre vos réponses ?')) return
    
    try {
        await submitQuiz(currentAttempt.value.id)
        alert('Félicitations ! Votre quiz a été soumis avec succès.')
        navigateTo('/student-dashboard')
    } catch (error) {
        console.error('Error submitting quiz:', error)
        alert('Une erreur est survenue lors de la soumission.')
    }
}

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



</script>

<style scoped>
.bg-light-danger {
    background-color: #fff5f5;
}
.bg-light-success {
    background-color: #f0fff4;
}
.bg-light-warning {
    background-color: #fffaf0;
}
.icon-box.bg-danger {
    background-color: #ff4d4d !important;
}
</style>