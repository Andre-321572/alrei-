<template>
  <div class="quiz-list-component">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="quizzes.length > 0" class="row g-4">
      <div v-for="quiz in quizzes" :key="quiz.id" class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm rounded-lg overflow-hidden transition-hover">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <span :class="['badge rounded-pill px-3 py-2', isClosed(quiz) ? 'bg-light text-muted' : 'bg-success-soft text-success']">
                {{ isClosed(quiz) ? 'Fermé' : 'Ouvert' }}
              </span>
              <div v-if="isAdmin" class="dropdown">
                <button class="btn btn-link text-muted p-0" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                  <li><a @click.prevent="$emit('edit', quiz)" class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Modifier</a></li>
                  <li><a @click.prevent="$emit('delete', quiz.id)" class="dropdown-item text-danger" href="#"><i class="bi bi-trash me-2"></i>Supprimer</a></li>
                </ul>
              </div>
            </div>

            <h5 class="fw-bold text-dark mb-2">{{ quiz.title }}</h5>
            <p class="text-muted small mb-4 line-clamp-2">{{ quiz.description || 'Aucune description fournie.' }}</p>

            <div class="d-flex flex-wrap gap-3 mb-4">
              <div class="d-flex align-items-center text-muted small">
                <i class="bi bi-card-list me-1 text-primary"></i>
                {{ quiz.questions_count }} questions
              </div>
              <div class="d-flex align-items-center text-muted small">
                <i class="bi bi-clock me-1 text-primary"></i>
                {{ quiz.duration_minutes ? quiz.duration_minutes + ' min' : 'Sans limite' }}
              </div>
              <div class="d-flex align-items-center text-muted small">
                <i class="bi bi-trophy me-1 text-primary"></i>
                {{ quiz.passing_score }}% requis
              </div>
            </div>

            <div class="mt-auto">
              <button 
                @click="handleStart(quiz)" 
                class="btn btn-warning text-white fw-bold w-100 rounded-lg py-2"
                :disabled="isClosed(quiz)"
              >
                Passer le quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 bg-light rounded-lg">
      <i class="bi bi-clipboard-x display-4 text-muted"></i>
      <p class="mt-3 text-muted fw-semibold">Aucun questionnaire disponible pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  quizzes: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
})

const emit = defineEmits(['start', 'edit', 'delete'])

const isClosed = (quiz) => {
  const now = new Date()
  if (quiz.open_at && new Date(quiz.open_at) > now) return true
  if (quiz.close_at && new Date(quiz.close_at) < now) return true
  return false
}

const handleStart = (quiz) => {
  emit('start', quiz)
}
</script>

<style scoped>
.rounded-lg { border-radius: 1rem !important; }
.bg-success-soft { background-color: #d1fae5; color: #065f46; }
.transition-hover:hover { transform: translateY(-5px); transition: transform 0.3s ease; box-shadow: 0 1rem 3rem rgba(0,0,0,.1) !important; }
.btn-warning { background-color: #f59e0b; border-color: #f59e0b; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
