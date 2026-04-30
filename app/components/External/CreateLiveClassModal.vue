<template>
  <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-main text-white">
          <h5 class="modal-title"><i class="bi bi-camera-video me-2"></i>Programmer une Classe Zoom</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('close')"></button>
        </div>
        <div class="modal-body p-4">
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
              <label class="form-label fw-bold">Sujet de la réunion</label>
              <input v-model="form.topic" type="text" class="form-control" placeholder="Ex: Session de révision Chapitre 1" required>
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

            <div class="alert alert-info small">
              <i class="bi bi-info-circle me-1"></i> La réunion sera automatiquement créée sur votre compte Zoom.
            </div>

            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-main py-2" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'Création en cours...' : 'Créer la réunion Zoom' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useExternal } from '@/composables/useExternal'

const props = defineProps({
  courses: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'success'])
const { loading, createLiveClass } = useExternal()

const form = ref({
  course_id: '',
  topic: '',
  start_time: '',
  duration: 60
})

const handleSubmit = async () => {
  try {
    const response = await createLiveClass(form.value)
    alert('Félicitations ! La réunion Zoom a été créée avec succès.')
    emit('success', response.data)
    emit('close')
  } catch (error) {
    alert("Erreur lors de la création de la réunion. Vérifiez vos identifiants Zoom.")
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
