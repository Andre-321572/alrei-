<template>
  <div class="questions-management-page bg-light min-vh-100 py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="currentQuiz">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 class="fw-bold text-primary mb-1">Questions : {{ currentQuiz.title }}</h3>
            <p class="text-muted mb-0">{{ currentQuiz.questions?.length || 0 }} Questions configurées</p>
          </div>
          <button @click="showForm = true; editingQuestion = null" class="btn btn-warning text-white fw-bold px-4">
            <i class="bi bi-plus-lg me-1"></i> Ajouter une Question
          </button>
        </div>

        <!-- Question Form (Inline) -->
        <div v-if="showForm" class="mb-5">
          <InstructorQuestionForm 
            :editing-question="editingQuestion"
            @save="handleSaveQuestion"
            @cancel="showForm = false"
          />
        </div>

        <!-- Questions List -->
        <div class="questions-list">
          <div v-for="(q, idx) in currentQuiz.questions" :key="q.id" class="card border-0 shadow-sm rounded-lg mb-3 overflow-hidden">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start">
                <div class="d-flex gap-3">
                  <div class="question-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                    {{ idx + 1 }}
                  </div>
                  <div>
                    <h6 class="fw-bold mb-2">{{ q.question_text }}</h6>
                    <div class="d-flex gap-3 small text-muted">
                      <span><i class="bi bi-tag me-1 text-primary"></i>{{ q.type.toUpperCase() }}</span>
                      <span><i class="bi bi-star me-1 text-primary"></i>{{ q.points }} points</span>
                    </div>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <button @click="editQuestion(q)" class="btn btn-light btn-sm rounded-circle"><i class="bi bi-pencil"></i></button>
                  <button @click="handleDeleteQuestion(q.id)" class="btn btn-light btn-sm rounded-circle text-danger"><i class="bi bi-trash"></i></button>
                </div>
              </div>

              <!-- Answers Preview -->
              <div v-if="q.answers && q.answers.length > 0" class="mt-3 row g-2">
                <div v-for="ans in q.answers" :key="ans.id" class="col-md-6 col-lg-4">
                  <div :class="['p-2 rounded border small', ans.is_correct ? 'border-success bg-success-light text-success' : 'bg-light']">
                    <i :class="['bi me-1', ans.is_correct ? 'bi-check-circle-fill' : 'bi-circle']"></i>
                    {{ ans.answer_text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="!currentQuiz.questions || currentQuiz.questions.length === 0" class="text-center py-5 bg-white rounded-lg border">
            <p class="text-muted">Aucune question n'a été ajoutée pour le moment.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from '#app'

definePageMeta({
  layout: 'instructor',
  middleware: 'quiz-manage'
})
// Explicitly import components and composables to avoid auto-import issues on Windows
import InstructorQuestionForm from '@/components/Instructor/QuestionForm.vue'

const route = useRoute()
const quizId = route.params.id
const api = useApi()
const { currentQuiz, fetchQuiz } = useQuizStore()

const loading = ref(true)
const showForm = ref(false)
const editingQuestion = ref(null)

onMounted(async () => {
  try {
    await fetchQuiz(quizId)
  } catch (error) {
    console.error('Failed to fetch quiz questions:', error)
  } finally {
    loading.value = false
  }
})

const editQuestion = (question) => {
  editingQuestion.value = question
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSaveQuestion = async (formData) => {
  try {
    const url = editingQuestion.value 
      ? `/instructor/questions/${editingQuestion.value.id}` 
      : `/instructor/quizzes/${quizId}/questions`
    const method = editingQuestion.value ? 'PUT' : 'POST'
    
    await api(url, { method, body: formData })
    await fetchQuiz(quizId)
    showForm.value = false
    editingQuestion.value = null
  } catch (error) {
    alert('Erreur lors de l\'enregistrement de la question.')
  }
}

const handleDeleteQuestion = async (id) => {
  if (confirm('Supprimer cette question ?')) {
    try {
      await api(`/instructor/questions/${id}`, { method: 'DELETE' })
      await fetchQuiz(quizId)
    } catch (error) {
      alert('Erreur lors de la suppression.')
    }
  }
}
</script>

<style scoped>
.rounded-lg { border-radius: 1rem !important; }
.bg-success-light { background-color: #ecfdf5; }
.text-primary { color: #1e40af !important; }
.btn-warning { background-color: #f59e0b; border-color: #f59e0b; }
</style>
