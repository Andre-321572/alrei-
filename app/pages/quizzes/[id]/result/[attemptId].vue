<template>
  <div class="quiz-result-page bg-light min-vh-100 py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="result">
        <QuizResult 
          :attempt="result"
          :can-retry="canRetry"
          :remaining-attempts="remainingAttempts"
          @retry="handleRetry"
          @back="handleBack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const quizId = route.params.id
const attemptId = route.params.attemptId
const { fetchResult, startQuiz, fetchHistory } = useQuizStore()
const loading = ref(true)
const result = ref(null)
const history = ref([])

onMounted(async () => {
  try {
    const response = await fetchResult(attemptId)
    result.value = response
    // Fetch history to see how many attempts are left
    history.value = await fetchHistory(quizId)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const canRetry = computed(() => {
  if (!result.value) return false
  return history.value.length < result.value.quiz.max_attempts
})

const remainingAttempts = computed(() => {
  if (!result.value) return 0
  const remaining = result.value.quiz.max_attempts - history.value.length
  return remaining > 0 ? remaining : 0
})

const handleRetry = async () => {
  try {
    await startQuiz(quizId)
    navigateTo(`/quizzes/${quizId}/play`)
  } catch (error) {
    alert(error.response?._data?.message || 'Impossible de recommencer.')
  }
}

const handleBack = () => {
  navigateTo(`/student-course-resume?id=${result.value.quiz.course_id}`)
}

definePageMeta({
  layout: 'student',
});
</script>
