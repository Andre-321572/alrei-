<template>
  <div class="quiz-edit-page bg-light min-vh-100 py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="currentQuiz" class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 shadow-lg rounded-lg overflow-hidden">
            <div class="card-header bg-primary text-white p-4">
              <h4 class="fw-bold mb-0">Modifier le Questionnaire</h4>
            </div>
            <div class="card-body p-4 p-md-5">
              <div class="mb-4">
                <label class="form-label fw-bold">Titre du quiz</label>
                <input v-model="form.title" type="text" class="form-control form-control-lg rounded-lg" :class="{'is-invalid': errors.title}">
                <div v-if="errors.title" class="invalid-feedback">{{ errors.title[0] }}</div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Description (facultative)</label>
                <textarea v-model="form.description" class="form-control rounded-lg" rows="4"></textarea>
              </div>

              <div class="row mb-4">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label class="form-label fw-bold">Note de passage (%)</label>
                  <div class="input-group">
                    <input v-model="form.passing_score" type="number" class="form-control rounded-lg" :class="{'is-invalid': errors.passing_score}" min="0" max="100">
                    <span class="input-group-text bg-light border-0">%</span>
                  </div>
                  <div v-if="errors.passing_score" class="invalid-feedback d-block">{{ errors.passing_score[0] }}</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Limite de temps (min)</label>
                  <div class="input-group">
                    <input v-model="form.duration_minutes" type="number" class="form-control rounded-lg" :class="{'is-invalid': errors.duration_minutes}" placeholder="Optionnel">
                    <span class="input-group-text bg-light border-0">min</span>
                  </div>
                  <div v-if="errors.duration_minutes" class="invalid-feedback d-block">{{ errors.duration_minutes[0] }}</div>
                </div>
              </div>

              <div class="row mb-5 g-3">
                <div class="col-md-6">
                  <div class="form-check form-switch p-3 border rounded-lg">
                    <input v-model="form.shuffle_questions" class="form-check-input ms-0 me-2" type="checkbox" id="shuffleQ">
                    <label class="form-check-label fw-semibold" for="shuffleQ">Mélanger les questions</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-check form-switch p-3 border rounded-lg">
                    <input v-model="form.shuffle_answers" class="form-check-input ms-0 me-2" type="checkbox" id="shuffleA">
                    <label class="form-check-label fw-semibold" for="shuffleA">Mélanger les réponses</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-check form-switch p-3 border rounded-lg">
                    <input v-model="form.show_results_immediately" class="form-check-input ms-0 me-2" type="checkbox" id="showRes">
                    <label class="form-check-label fw-semibold" for="showRes">Résultats immédiats</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="p-3 border rounded-lg">
                    <label class="form-label small fw-bold mb-1">Nombre max de tentatives</label>
                    <input v-model="form.max_attempts" type="number" class="form-control form-control-sm" min="1">
                  </div>
                </div>
              </div>

              <div class="d-flex gap-3">
                <button @click="handleUpdate" class="btn btn-warning text-white px-5 py-3 fw-bold rounded-lg flex-grow-1" :disabled="saving">
                  <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
                  Enregistrer les modifications
                </button>
                <button @click="navigateTo('/courses/' + currentQuiz.course_id)" class="btn btn-light px-4 py-3 rounded-lg">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'quiz-manage'
})
const route = useRoute()
const quizId = route.params.id
const { currentQuiz, fetchQuiz, updateQuiz } = useQuizStore()

const loading = ref(true)
const saving = ref(false)
const errors = ref({})

const form = reactive({
  title: '',
  description: '',
  passing_score: 70,
  duration_minutes: null,
  max_attempts: 1,
  shuffle_questions: false,
  shuffle_answers: false,
  show_results_immediately: true
})

onMounted(async () => {
  try {
    const quiz = await fetchQuiz(quizId)
    Object.assign(form, {
      title: quiz.title,
      description: quiz.description || '',
      passing_score: quiz.passing_score,
      duration_minutes: quiz.duration_minutes,
      max_attempts: quiz.max_attempts,
      shuffle_questions: quiz.shuffle_questions,
      shuffle_answers: quiz.shuffle_answers,
      show_results_immediately: quiz.show_results_immediately
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const handleUpdate = async () => {
  saving.value = true
  errors.value = {}
  try {
    await updateQuiz(quizId, form)
    navigateTo(`/courses/${currentQuiz.value.course_id}`)
  } catch (error) {
    if (error.response?._data?.errors) {
      errors.value = error.response._data.errors
    }
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.rounded-lg { border-radius: 1rem !important; }
.bg-primary { background-color: #1e40af !important; }
.btn-warning { background-color: #f59e0b; border-color: #f59e0b; }
.form-switch .form-check-input { width: 3rem; height: 1.5rem; }
</style>
