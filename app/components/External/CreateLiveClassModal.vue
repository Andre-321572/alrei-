<template>
  <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-main text-white">
          <h5 class="modal-title"><i class="bi bi-camera-video me-2"></i>Programmer une classe en direct</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>
        <div class="modal-body p-4">
          <!-- Success Alert -->
          <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i> {{ successMessage }}
            <button type="button" class="btn-close" @click="successMessage = ''"></button>
          </div>

          <!-- Error Alert -->
          <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ errorMessage }}
            <button type="button" class="btn-close" @click="errorMessage = ''"></button>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label fw-bold">Cours associé</label>
              <select v-model="form.course_id" class="form-select" required>
                <option value="" disabled>Choisir un cours...</option>
                <option v-for="course in courses" :key="course.id" :value="course.id">
                  {{ course.title }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Outil de Visioconférence</label>
              <select v-model="form.provider" class="form-select" required>
                <option value="" disabled>Choisir un outil...</option>
                <option value="zoom">Zoom</option>
                <option value="google">Google Meet</option>
                <option value="microsoft">Microsoft Teams</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Sujet de la réunion</label>
              <input v-model="form.title" type="text" class="form-control" placeholder="Ex: Session de révision Chapitre 1" required>
            </div>

            <div class="row">
              <div class="col-md-7 mb-3">
                <label class="form-label fw-bold">Date et heure</label>
                <input v-model="form.start_time" type="datetime-local" class="form-control" required>
              </div>
              <div class="col-md-5 mb-3">
                <label class="form-label fw-bold">Durée (min)</label>
                <input v-model="form.duration" type="number" class="form-control" min="15" step="15" required>
              </div>
            </div>

            <div class="alert alert-info small mt-3">
              <i class="bi bi-info-circle me-1"></i> La réunion sera automatiquement créée sur le compte de l'outil sélectionné.
            </div>

            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-main py-2" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'Création en cours...' : 'Créer la réunion' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useExternal } from '@/composables/useExternal'

const props = defineProps({
  courses: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'success'])
const { loading, createLiveClass } = useExternal()

const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  course_id: '',
  provider: '',
  title: '',
  start_time: '',
  duration: 60
})

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const response = await createLiveClass(form.value)
    successMessage.value = 'Félicitations ! La réunion a été créée avec succès.'
    
    // Attendre un peu avant de fermer pour que l'utilisateur voit le succès
    setTimeout(() => {
        emit('success', response.data)
        emit('close')
    }, 1500)
    
  } catch (err) {
    console.error('Submit error:', err)
    errorMessage.value = err?.data?.message || "Erreur lors de la création de la réunion. Vérifiez vos identifiants ou votre connexion."
  }
}
</script>

<style scoped>
.btn-main {
  background-color: var(--main-color);
  color: white;
}
.bg-main {
  background-color: var(--main-color);
}
</style>
