<template>
  <div class="assignment-player card border-0 shadow-sm rounded-4 overflow-hidden">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else class="p-4 p-lg-5">
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h3 class="fw-bold mb-1">{{ assignment.title }}</h3>
          <p class="text-muted">Due Date: {{ formatDate(assignment.due_date) }}</p>
        </div>
        <div v-if="submission" class="badge" :class="submission.grade ? 'bg-success' : 'bg-warning'">
          {{ submission.grade ? 'Graded: ' + submission.grade + '/' + assignment.max_points : 'Pending Review' }}
        </div>
      </div>

      <div class="assignment-description mb-5">
        <h5 class="fw-bold mb-3">Instructions</h5>
        <div class="p-4 bg-light rounded-3">
          <p class="mb-0">{{ assignment.description }}</p>
          <div v-if="assignment.file_path" class="mt-3">
            <a :href="storageUrl(assignment.file_path)" target="_blank" class="btn btn-outline-dark btn-sm">
              <i class="bi bi-download me-2"></i> Download Resource
            </a>
          </div>
        </div>
      </div>

      <div class="submission-section">
        <h5 class="fw-bold mb-3">Your Submission</h5>
        
        <div v-if="submission && !editing" class="p-4 border rounded-3 bg-white">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <i class="bi bi-file-earmark-check fs-2 text-success me-3"></i>
              <div>
                <h6 class="mb-0">Assignment Submitted</h6>
                <small class="text-muted">On {{ formatDate(submission.submitted_at) }}</small>
              </div>
            </div>
            <div class="d-flex gap-2">
              <a :href="storageUrl(submission.file_path)" target="_blank" class="btn btn-sm btn-outline-primary">View File</a>
              <button v-if="!submission.grade" @click="editing = true" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
          </div>
          
          <div v-if="submission.feedback" class="mt-4 p-3 bg-light-info rounded-3">
            <h6 class="fw-bold"><i class="bi bi-chat-left-text me-2"></i>Instructor Feedback:</h6>
            <p class="mb-0 italic">{{ submission.feedback }}</p>
          </div>
        </div>

        <div v-else class="drop-zone p-5 border-2 border-dashed rounded-3 text-center bg-light">
          <input type="file" @change="handleFileChange" class="d-none" id="assignmentFile">
          <label for="assignmentFile" class="cursor-pointer">
            <div class="square--60 circle bg-primary text-light fs-3 mx-auto mb-3">
              <i class="bi bi-cloud-arrow-up"></i>
            </div>
            <h5 class="fw-bold">{{ file ? file.name : 'Upload your work' }}</h5>
            <p class="text-muted">Maximum file size: 10MB (PDF, ZIP, DOCX)</p>
            <button class="btn btn-primary rounded-pill px-4 mt-2" :disabled="submitting" @click.prevent="triggerFileInput">
              {{ submitting ? 'Uploading...' : 'Choose File' }}
            </button>
          </label>
          <div v-if="file" class="mt-4">
            <button @click="submitAssignment" :disabled="submitting" class="btn btn-success rounded-pill px-5">
              Confirm Submission
            </button>
            <button v-if="editing" @click="editing = false" class="btn btn-link text-muted">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi'

const config = useRuntimeConfig()
const props = defineProps({
  assignmentId: {
    type: Number,
    required: true
  }
})

const api = useApi()
const loading = ref(true)
const submitting = ref(false)
const assignment = ref({})
const submission = ref(null)
const file = ref(null)
const editing = ref(false)

onMounted(async () => {
  await fetchAssignment()
})

const fetchAssignment = async () => {
  loading.value = true
  try {
    const response = await api(`/assignments/${props.assignmentId}`)
    assignment.value = response.data
    submission.value = response.my_submission
  } catch (error) {
    console.error('Failed to fetch assignment:', error)
  } finally {
    loading.value = false
  }
}

const handleFileChange = (e) => {
  file.value = e.target.files[0]
}

const triggerFileInput = () => {
  document.getElementById('assignmentFile').click()
}

const submitAssignment = async () => {
  if (!file.value) return
  submitting.value = true
  
  const formData = new FormData()
  formData.append('file', file.value)

  try {
    const response = await api(`/assignments/${props.assignmentId}/submit`, {
      method: 'POST',
      body: formData
    })
    submission.value = response.data
    editing.value = false
    file.value = null
    alert('Assignment submitted successfully!')
  } catch (error) {
    console.error('Failed to submit assignment:', error)
    alert('Upload failed. Please check file size and try again.')
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'No date set'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const storageUrl = (path) => {
  return config.public.apiBase.replace('/api', '/storage/') + path
}
</script>

<style scoped>
.border-dashed { border-style: dashed !important; }
.cursor-pointer { cursor: pointer; }
.bg-light-info { background-color: #e0f2fe; }
</style>
