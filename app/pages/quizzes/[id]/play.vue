<template>
  <div class="quiz-play-page bg-light min-vh-100 py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">Préparation de votre session...</p>
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

      <div v-else class="text-center py-5">
        <i class="bi bi-exclamation-triangle display-1 text-warning"></i>
        <h3 class="mt-3">Session introuvable</h3>
        <p>Veuillez retourner à la liste des quiz.</p>
        <NuxtLink to="/my-courses" class="btn btn-primary mt-3">Retour mes cours</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const quizId = route.params.id
const { currentQuiz, currentAttempt, isSubmitting, startQuiz, saveAnswer, submitQuiz } = useQuizStore()
const loading = ref(true)

definePageMeta({
  layout: false,
  middleware: 'auth'
})

onMounted(async () => {
  // If we refresh, we need to try and resume or restart
  if (!currentAttempt.value) {
    try {
      await startQuiz(quizId)
    } catch (error) {
      console.error(error)
      navigateTo('/my-courses')
    }
  }
  loading.value = false
})

const handleSaveAnswer = async (questionId, data) => {
  try {
    await saveAnswer(currentAttempt.value.id, questionId, data)
  } catch (error) {
    console.error('Auto-save failed:', error)
  }
}

const handleSubmitQuiz = async () => {
  try {
    const response = await submitQuiz(currentAttempt.value.id)
    navigateTo(`/quizzes/${quizId}/result/${currentAttempt.value.id}`)
  } catch (error) {
    alert('Erreur lors de la soumission du quiz.')
  }
}
</script>
