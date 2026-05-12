<template>
  <div class="quiz-manager">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0 text-primary fw-bold">Gestion des Questionnaires</h5>
      <button @click="openQuizModal()" class="btn btn-warning text-white fw-bold">
        <i class="bi bi-plus-lg me-1"></i> Créer Un Nouveau Questionnaire
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="mt-2 text-muted small">Chargement des questionnaires...</p>
    </div>

    <div v-else-if="loadError" class="alert alert-danger d-flex align-items-center gap-3 mt-3">
      <i class="bi bi-exclamation-triangle-fill fs-4"></i>
      <div>
        <strong>Erreur de chargement</strong>
        <p class="mb-1 small">{{ loadError }}</p>
      </div>
    </div>

    <div v-else class="row g-3">
      <div v-for="quiz in quizList" :key="quiz.id" class="col-md-6 col-lg-3">
        <div class="card shadow-sm border-0 rounded-lg">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="fw-bold mb-1 text-dark">{{ quiz.title }}</h6>
                <p class="small text-muted mb-0">
                  {{ quiz.questions_count }} Questions • Note de passage: {{ quiz.passing_score }}%
                  <span v-if="quiz.duration_minutes"> • {{ quiz.duration_minutes }} min</span>
                </p>
              </div>
              <div class="dropdown">
                <button class="btn btn-light btn-sm rounded-circle" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a @click.prevent="openQuizModal(quiz)" class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Modifier</a></li>
                  <li><a @click.prevent="goToQuestions(quiz.id)" class="dropdown-item" href="#"><i class="bi bi-list-check me-2"></i>Gérer les Questions</a></li>
                  <li><a @click.prevent="viewResults(quiz)" class="dropdown-item" href="#"><i class="bi bi-graph-up me-2"></i>Voir les Résultats</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a @click.prevent="handleDelete(quiz.id)" class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Supprimer</a></li>
                </ul>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button @click="goToQuestions(quiz.id)" class="btn btn-outline-warning btn-sm flex-grow-1 fw-bold">
                <i class="bi bi-list-check me-1"></i> Questions
              </button>
              <button @click="viewResults(quiz)" class="btn btn-outline-primary btn-sm flex-grow-1 fw-bold">
                <i class="bi bi-graph-up me-1"></i> Résultats
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="quizList.length === 0" class="col-12 text-center py-5">
        <i class="bi bi-question-circle display-4 text-muted"></i>
        <p class="mt-3 text-muted">Aucun questionnaire créé pour ce cours.</p>
      </div>
    </div>

    <!-- Modal Résultats -->
    <div class="modal fade" ref="resultsModalRef" id="resultsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-lg">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold text-primary">Résultats : {{ selectedQuiz?.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body pt-2">
            <div v-if="loadingAttempts" class="text-center py-4">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else-if="attempts.length === 0" class="text-center py-4">
              <i class="bi bi-info-circle fs-2 text-muted mb-2 d-block"></i>
              <p class="text-muted">Aucune tentative enregistrée pour ce quiz.</p>
            </div>
            <div v-else class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Étudiant</th>
                    <th>Score</th>
                    <th>Résultat</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="attempt in attempts" :key="attempt.id">
                    <td>
                      <div class="fw-bold text-dark">{{ attempt.user.name }}</div>
                      <small class="text-muted">{{ attempt.user.email }}</small>
                    </td>
                    <td>
                      <div class="fw-bold text-dark">{{ attempt.percentage }}%</div>
                      <small class="text-muted">{{ attempt.score }}/{{ attempt.total_points }} pts</small>
                    </td>
                    <td>
                      <span :class="['badge rounded-pill px-3', attempt.passed ? 'bg-light-success text-success' : 'bg-light-danger text-danger']">
                        {{ attempt.passed ? 'Réussi' : 'Échoué' }}
                      </span>
                    </td>
                    <td class="small text-muted">
                      {{ new Date(attempt.submitted_at).toLocaleDateString() }}<br>
                      {{ new Date(attempt.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Créer/Modifier Quiz -->
    <div class="modal fade" ref="quizModalRef" id="quizModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-lg">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold text-primary">{{ editingQuiz ? 'Modifier le Questionnaire' : 'Créer Un Nouveau Questionnaire' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label fw-semibold">Titre du quiz</label>
              <input v-model="quizForm.title" type="text" class="form-control rounded-lg" :class="{'is-invalid': errors.title}" placeholder="Ex: Évaluation finale">
              <div v-if="errors.title" class="invalid-feedback">{{ errors.title[0] }}</div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Description (facultative)</label>
              <textarea v-model="quizForm.description" class="form-control rounded-lg" rows="3"></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold">Note de passage (%)</label>
                <input v-model="quizForm.passing_score" type="number" class="form-control rounded-lg" :class="{'is-invalid': errors.passing_score}" min="0" max="100">
                <div v-if="errors.passing_score" class="invalid-feedback">{{ errors.passing_score[0] }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold">Limite de temps (min)</label>
                <input v-model="quizForm.duration_minutes" type="number" class="form-control rounded-lg" :class="{'is-invalid': errors.duration_minutes}" placeholder="Optionnel">
                <div v-if="errors.duration_minutes" class="invalid-feedback">{{ errors.duration_minutes[0] }}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Annuler</button>
            <button @click="handleSave" class="btn btn-warning text-white px-4 fw-bold" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
              Enregistrer le quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { navigateTo } from '#app'

const props = defineProps({
  courseId: {
    type: [Number, String],
    required: true
  }
})

const { quizList, fetchQuizzes, createQuiz, updateQuiz, deleteQuiz, fetchAttempts } = useQuizStore()
const loading = ref(true)
const saving = ref(false)
const errors = ref({})
const quizModalRef = ref(null)
const resultsModalRef = ref(null)

const attempts = ref([])
const loadingAttempts = ref(false)
const selectedQuiz = ref(null)

const editingQuiz = ref(null)
const quizForm = reactive({
  title: '',
  description: '',
  passing_score: 70,
  duration_minutes: null
})

let modalInstance = null
let resultsModalInstance = null

const loadError = ref(null)

onMounted(async () => {
  try {
    await fetchQuizzes(props.courseId)
  } catch (err) {
    console.error('QuizManager: failed to load quizzes', err)
    loadError.value = err?.data?.message || err?.message || 'Impossible de charger les questionnaires. Vérifiez que le backend Laravel est démarré.'
  } finally {
    loading.value = false
  }
  
  // Initialize Bootstrap modals
  if (process.client) {
    const { Modal } = await import('bootstrap')
    if (quizModalRef.value) {
      modalInstance = new Modal(quizModalRef.value)
    }
    if (resultsModalRef.value) {
      resultsModalInstance = new Modal(resultsModalRef.value)
    }
  }
})

const initModal = async () => {
  if (!modalInstance && process.client) {
    const { Modal } = await import('bootstrap')
    if (quizModalRef.value) {
      modalInstance = new Modal(quizModalRef.value)
    }
  }
}

const openQuizModal = async (quiz = null) => {
  await initModal()
  errors.value = {}
  editingQuiz.value = quiz
  if (quiz) {
    quizForm.title = quiz.title
    quizForm.description = quiz.description || ''
    quizForm.passing_score = quiz.passing_score
    quizForm.duration_minutes = quiz.duration_minutes
  } else {
    quizForm.title = ''
    quizForm.description = ''
    quizForm.passing_score = 70
    quizForm.duration_minutes = null
  }
  if (modalInstance) modalInstance.show()
}

const handleSave = async () => {
  saving.value = true
  errors.value = {}
  try {
    if (editingQuiz.value) {
      await updateQuiz(editingQuiz.value.id, quizForm)
      // On rafraîchit localement ou on recharge
      await fetchQuizzes(props.courseId)
    } else {
      await createQuiz(props.courseId, quizForm)
    }
    if (modalInstance) modalInstance.hide()
  } catch (error) {
    if (error.response?._data?.errors) {
      errors.value = error.response._data.errors
    }
    console.error('Failed to save quiz:', error)
  } finally {
    saving.value = false
  }
}

const handleDelete = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce questionnaire ?')) {
    try {
      await deleteQuiz(id, props.courseId)
    } catch (error) {
      console.error('Failed to delete quiz:', error)
    }
  }
}

const viewResults = async (quiz) => {
  selectedQuiz.value = quiz
  loadingAttempts.value = true
  if (resultsModalInstance) resultsModalInstance.show()
  
  try {
    attempts.value = await fetchAttempts(quiz.id)
  } catch (error) {
    console.error('Failed to fetch attempts:', error)
  } finally {
    loadingAttempts.value = false
  }
}

const goToQuestions = (quizId) => {
  navigateTo(`/admin/quizzes/${quizId}/questions`)
}
</script>

<style scoped>
.rounded-lg { border-radius: 0.75rem !important; }
.btn-warning { background-color: #f59e0b; border-color: #f59e0b; color: white; }
.btn-warning:hover { background-color: #d97706; border-color: #d97706; }
.text-primary { color: #1e40af !important; }
.bg-light-success { background-color: #ecfdf5; color: #10b981; }
.bg-light-danger { background-color: #fef2f2; color: #ef4444; }
</style>
