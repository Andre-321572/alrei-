<template>
  <div class="assignment-manager">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0 fw-bold text-primary">Gestion des Devoirs & Travaux</h5>
      <button @click="openAssignmentModal()" class="btn btn-warning text-white fw-bold">
        <i class="bi bi-plus-lg me-1"></i> Créer Un Nouveau Devoir
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="mt-2 text-muted small">Chargement des devoirs...</p>
    </div>

    <div v-else-if="loadError" class="alert alert-danger d-flex align-items-center gap-3 mt-3">
      <i class="bi bi-exclamation-triangle-fill fs-4"></i>
      <div>
        <strong>Erreur de chargement</strong>
        <p class="mb-1 small">{{ loadError }}</p>
      </div>
    </div>

    <div v-else class="row g-4">
      <div v-for="assignment in assignments" :key="assignment.id" class="col-md-6 col-lg-4">
        <div class="card shadow-sm border-0 h-100 rounded-lg">
          <div class="card-body p-3 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="fw-bold mb-0 text-dark">{{ assignment.title }}</h6>
                <div class="dropdown">
                  <button class="btn btn-light btn-sm rounded-circle" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a @click.prevent="openAssignmentModal(assignment)" class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Modifier</a></li>
                    <li><a @click.prevent="viewSubmissions(assignment)" class="dropdown-item" href="#"><i class="bi bi-people me-2"></i>Consulter les dépositions</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a @click.prevent="deleteAssignment(assignment.id)" class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Supprimer</a></li>
                  </ul>
                </div>
              </div>
              
              <p class="small text-muted mb-2">
                <i class="bi bi-calendar-event me-1"></i>Échéance : {{ formatDate(assignment.due_date) }}
              </p>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <span class="badge bg-success-subtle text-success border border-success-subtle">
                  <i class="bi bi-check-circle me-1"></i>Min. valider : {{ assignment.min_points || assignment.passing_score || Math.round((assignment.max_points || 20) * 0.5) }} pts
                </span>
                <span class="badge bg-primary-subtle text-primary border border-primary-subtle">
                  <i class="bi bi-award me-1"></i>Note max : {{ assignment.max_points || 20 }} pts
                </span>
                <span v-if="assignment.is_final" class="badge bg-danger"><i class="bi bi-star-fill me-1"></i> Évaluation Finale</span>
              </div>
            </div>

            <button @click="viewSubmissions(assignment)" class="btn btn-outline-primary btn-sm w-100 fw-bold mt-2">
              <i class="bi bi-eye me-1"></i> Soumissions & Notation
            </button>
          </div>
        </div>
      </div>

      <div v-if="assignments.length === 0" class="col-12 text-center py-5">
        <i class="bi bi-file-earmark-text display-4 text-muted"></i>
        <p class="mt-3 text-muted">Aucun devoir créé pour ce cours pour le moment.</p>
      </div>
    </div>

    <!-- Assignment Modal -->
    <div class="modal fade" id="assignmentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-lg">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold text-primary">{{ editingAssignment ? 'Modifier le Devoir' : 'Créer Un Nouveau Devoir' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label fw-semibold">Titre du devoir</label>
              <input v-model="assignmentForm.title" type="text" class="form-control rounded-lg" placeholder="Ex: Travail pratique - Étude de cas">
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Description / Consignes</label>
              <textarea v-model="assignmentForm.description" class="form-control rounded-lg" rows="3" placeholder="Instructions détaillées pour les étudiants..."></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold">Score min. pour valider (pts)</label>
                <input v-model="assignmentForm.min_points" type="number" class="form-control rounded-lg" placeholder="Ex: 10">
                <small class="text-muted d-block mt-1">Note minimum de réussite</small>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold">Point maximum (Note max)</label>
                <input v-model="assignmentForm.max_points" type="number" class="form-control rounded-lg" placeholder="Ex: 20">
                <small class="text-muted d-block mt-1">Total de points maximum</small>
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label fw-semibold">Date d'échéance</label>
                <input v-model="assignmentForm.due_date" type="datetime-local" class="form-control rounded-lg">
              </div>
            </div>
            <div class="mb-3 form-check form-switch mt-2">
              <input v-model="assignmentForm.is_final" class="form-check-input" type="checkbox" id="isFinalAssignment">
              <label class="form-check-label fw-bold text-danger" for="isFinalAssignment">
                <i class="bi bi-star-fill me-1"></i> Ce devoir est l'évaluation finale pour l'obtention du certificat
              </label>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Fichier de ressource (Optionnel)</label>
              <input @change="handleFileChange" type="file" class="form-control rounded-lg">
            </div>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Annuler</button>
            <button @click="saveAssignment" class="btn btn-warning text-white px-4 fw-bold" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
              Enregistrer le devoir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Submissions Modal -->
    <div class="modal fade" id="submissionsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-lg">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold text-primary">Soumissions : {{ selectedAssignment?.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Étudiant</th>
                    <th>Date de dépôt</th>
                    <th>Fichier rendu</th>
                    <th>Note atribuée</th>
                    <th>Commentaires / Feedback</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sub in submissions" :key="sub.id">
                    <td>
                      <div class="fw-bold text-dark">{{ sub.user?.name }}</div>
                      <small class="text-muted">{{ sub.user?.email }}</small>
                    </td>
                    <td>{{ formatDate(sub.submitted_at) }}</td>
                    <td>
                      <a v-if="sub.file_path" :href="storageUrl(sub.file_path)" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill">
                        <i class="bi bi-download me-1"></i> Télécharger
                      </a>
                      <span v-else class="text-muted small">Aucun fichier</span>
                    </td>
                    <td>
                      <div class="input-group input-group-sm" style="width: 100px;">
                        <input v-model="sub.grade" type="number" class="form-control text-center" placeholder="0">
                        <span class="input-group-text">/{{ selectedAssignment?.max_points || 20 }}</span>
                      </div>
                    </td>
                    <td>
                      <input v-model="sub.feedback" type="text" class="form-control form-control-sm" placeholder="Ex: Excellent travail...">
                    </td>
                    <td>
                      <button @click="gradeSubmission(sub)" class="btn btn-success btn-sm fw-bold rounded-pill px-3">
                        <i class="bi bi-check-lg me-1"></i> Valider
                      </button>
                    </td>
                  </tr>
                  <tr v-if="submissions.length === 0">
                    <td colspan="6" class="text-center py-4 text-muted">Aucune déposition soumise pour ce devoir.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'

const props = defineProps({
  courseId: {
    type: [Number, String],
    required: true
  }
})

const api = useApi()
const config = useRuntimeConfig()
const assignments = ref([])
const loading = ref(true)
const saving = ref(false)
const loadError = ref(null)

const editingAssignment = ref(null)
const assignmentForm = reactive({
  title: '',
  description: '',
  due_date: '',
  min_points: 10,
  max_points: 20,
  is_final: false,
  file: null
})

const selectedAssignment = ref(null)
const submissions = ref([])

let assignmentModal = null
let submissionsModal = null

onMounted(async () => {
  try {
    await fetchAssignments()
  } catch (err) {
    loadError.value = err?.data?.message || err?.message || 'Impossible de charger les devoirs. Vérifiez que le backend Laravel est démarré.'
  } finally {
    if (process.client) {
      const { Modal } = await import('bootstrap')
      assignmentModal = new Modal(document.getElementById('assignmentModal'))
      submissionsModal = new Modal(document.getElementById('submissionsModal'))
    }
  }
})

const fetchAssignments = async () => {
  loading.value = true
  try {
    const response = await api(`/courses/${props.courseId}/assignments`)
    assignments.value = response.data
  } catch (error) {
    console.error('Failed to fetch assignments:', error)
  } finally {
    loading.value = false
  }
}

const openAssignmentModal = (assignment = null) => {
  editingAssignment.value = assignment
  if (assignment) {
    assignmentForm.title = assignment.title
    assignmentForm.description = assignment.description
    assignmentForm.due_date = assignment.due_date ? assignment.due_date.substring(0, 16) : ''
    assignmentForm.min_points = assignment.min_points || assignment.passing_score || Math.round((assignment.max_points || 20) * 0.5)
    assignmentForm.max_points = assignment.max_points || 20
    assignmentForm.is_final = assignment.is_final ? true : false
  } else {
    assignmentForm.title = ''
    assignmentForm.description = ''
    assignmentForm.due_date = ''
    assignmentForm.min_points = 10
    assignmentForm.max_points = 20
    assignmentForm.is_final = false
  }
  assignmentForm.file = null
  if (assignmentModal) assignmentModal.show()
}

const handleFileChange = (e) => {
  assignmentForm.file = e.target.files[0]
}

const saveAssignment = async () => {
  saving.value = true
  const formData = new FormData()
  formData.append('title', assignmentForm.title)
  formData.append('description', assignmentForm.description)
  formData.append('due_date', assignmentForm.due_date)
  formData.append('min_points', assignmentForm.min_points)
  formData.append('max_points', assignmentForm.max_points)
  formData.append('is_final', assignmentForm.is_final)
  if (assignmentForm.file) {
    formData.append('file', assignmentForm.file)
  }

  try {
    const url = editingAssignment.value 
      ? `/instructor/assignments/${editingAssignment.value.id}` 
      : `/instructor/courses/${props.courseId}/assignments`
    
    await api(url, { 
      method: 'POST', // Use POST for FormData
      body: formData 
    })
    await fetchAssignments()
    assignmentModal.hide()
  } catch (error) {
    console.error('Failed to save assignment:', error)
  } finally {
    saving.value = false
  }
}

const viewSubmissions = async (assignment) => {
  selectedAssignment.value = assignment
  try {
    const response = await api(`/instructor/assignments/${assignment.id}/submissions`)
    submissions.value = response.data
    submissionsModal.show()
  } catch (error) {
    console.error('Failed to fetch submissions:', error)
  }
}

const gradeSubmission = async (sub) => {
  try {
    await api(`/instructor/submissions/${sub.id}/grade`, {
      method: 'POST',
      body: {
        grade: sub.grade,
        feedback: sub.feedback
      }
    })
    alert('Graded successfully!')
  } catch (error) {
    console.error('Failed to grade:', error)
  }
}

const deleteAssignment = async (id) => {
  if (confirm('Delete this assignment?')) {
    try {
      await api(`/instructor/assignments/${id}`, { method: 'DELETE' })
      await fetchAssignments()
    } catch (error) {
      console.error('Failed to delete assignment:', error)
    }
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'No date set'
  return new Date(dateString).toLocaleDateString()
}

const storageUrl = (path) => {
  return config.public.apiBase.replace('/api', '/storage/') + path
}
</script>
