<template>
  <div class="course-quizzes-page bg-light min-vh-100 py-5">
    <div class="container">
      <div class="mb-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink :to="'/courses/' + courseId">Cours</NuxtLink></li>
            <li class="breadcrumb-item active">Questionnaires</li>
          </ol>
        </nav>
        <h2 class="fw-bold text-dark">Questionnaires du cours</h2>
        <p class="text-muted">Testez vos connaissances et validez vos compétences.</p>
      </div>

      <QuizList 
        :quizzes="quizList" 
        :loading="loading" 
        @start="handleStartQuiz"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'student', middleware: ['auth'] });
const route = useRoute()
const courseId = route.params.id
const { quizList, fetchQuizzes, startQuiz } = useQuizStore()
const loading = ref(true)

onMounted(async () => {
  await fetchQuizzes(courseId)
  loading.value = false
})

const handleStartQuiz = async (quiz) => {
  try {
    const response = await startQuiz(quiz.id)
    navigateTo(`/quizzes/${quiz.id}/play`)
  } catch (error) {
    alert(error.response?._data?.message || 'Impossible de démarrer le quiz.')
  }
}
</script>
