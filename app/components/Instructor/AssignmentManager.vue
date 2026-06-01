<template>
  <div class="assignment-manager">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0">Course Assignments</h5>
      <button @click="openAssignmentModal()" class="btn btn-primary btn-sm">
        <i class="bi bi-plus-lg me-1"></i> Create Assignment
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
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
      <div v-for="assignment in assignments" :key="assignment.id" class="col-md-6">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h6 class="fw-bold mb-1">{{ assignment.title }}</h6>
                <p class="small text-muted mb-0">Due: {{ formatDate(assignment.due_date) }}
                  <br>
                  <span v-if="assignment.is_final" class="badge bg-danger mt-1"><i class="bi bi-star-fill me-1"></i> Évaluation Finale</span>
                </p>
              </div>
              <div class="dropdown">
                <button class="btn btn-light btn-sm rounded-circle" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a @click.prevent="openAssignmentModal(assignment)" class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Edit</a></li>
                  <li><a @click.prevent="viewSubmissions(assignment)" class="dropdown-item" href="#"><i class="bi bi-people me-2"></i>View Submissions</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a @click.prevent="deleteAssignment(assignment.id)" class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Delete</a></li>
                </ul>
              </div>
            </div>
            <button @click="viewSubmissions(assignment)" class="btn btn-outline-primary btn-sm w-100">
              <i class="bi bi-eye me-1"></i> View Submissions
            </button>
          </div>
        </div>
      </div>

      <div v-if="assignments.length === 0" class="col-12 text-center py-5">
        <i class="bi bi-file-earmark-text display-4 text-muted"></i>
        <p class="mt-3 text-muted">No assignments created for this course yet.</p>
      </div>
    </div>

    <!-- Assignment Modal -->
    <div class="modal fade" id="assignmentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingAssignment ? 'Edit Assignment' : 'Create Assignment' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Assignment Title</label>
              <input v-model="assignmentForm.title" type="text" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Description / Instructions</label>
              <textarea v-model="assignmentForm.description" class="form-control" rows="3"></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Due Date</label>
                <input v-model="assignmentForm.due_date" type="datetime-local" class="form-control">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Max Points</label>
                <input v-model="assignmentForm.max_points" type="number" class="form-control">
              </div>
            </div>
            <div class="mb-3 form-check form-switch mt-2">
              <input v-model="assignmentForm.is_final" class="form-check-input" type="checkbox" id="isFinalAssignment">
              <label class="form-check-label fw-bold text-danger" for="isFinalAssignment">
                <i class="bi bi-star-fill me-1"></i> Ce devoir est l'évaluation finale pour l'obtention du certificat
              </label>
            </div>
            <div class="mb-3">
              <label class="form-label">Resource File (Optional)</label>
              <input @change="handleFileChange" type="file" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button @click="saveAssignment" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : 'Save Assignment' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Submissions Modal -->
    <div class="modal fade" id="submissionsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Submissions: {{ selectedAssignment?.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead class="bg-light">
                  <tr>
                    <th>Student</th>
                    <th>Submitted On</th>
                    <th>File</th>
                    <th>Grade</th>
                    <th>Feedback</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sub in submissions" :key="sub.id">
                    <td>{{ sub.user?.name }}</td>
                    <td>{{ formatDate(sub.submitted_at) }}</td>
                    <td><a :href="storageUrl(sub.file_path)" target="_blank" class="btn btn-link btn-sm p-0">Download</a></td>
                    <td>
                      <input v-model="sub.grade" type="number" class="form-control form-control-sm" style="width: 70px;">
                    </td>
                    <td>
                      <input v-model="sub.feedback" type="text" class="form-control form-control-sm" placeholder="Great work!">
                    </td>
                    <td>
                      <button @click="gradeSubmission(sub)" class="btn btn-success btn-sm">Grade</button>
                    </td>
                  </tr>
                  <tr v-if="submissions.length === 0">
                    <td colspan="6" class="text-center py-4">No submissions yet.</td>
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
import { ref, reactive, onMounted } from 'vue'
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
  max_points: 100,
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
    assignmentForm.max_points = assignment.max_points
    assignmentForm.is_final = assignment.is_final ? true : false
  } else {
    assignmentForm.title = ''
    assignmentForm.description = ''
    assignmentForm.due_date = ''
    assignmentForm.max_points = 100
    assignmentForm.is_final = false
  }
  assignmentForm.file = null
  assignmentModal.show()
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
