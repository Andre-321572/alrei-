<template>
  <div class="quiz-player bg-white rounded-lg shadow-lg overflow-hidden border">
    <!-- Header with Progress and Timer -->
    <div class="quiz-header p-4 bg-light border-bottom">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold text-primary mb-0">{{ quiz.title }}</h5>
        <div v-if="timeRemaining !== null" :class="['timer fw-bold px-3 py-1 rounded-pill', timeRemaining < 60 ? 'bg-danger text-white pulse' : 'bg-white border text-dark']">
          <i class="bi bi-clock me-2"></i> {{ formatTime(timeRemaining) }}
        </div>
      </div>
      
      <div class="progress-container">
        <div class="d-flex justify-content-between small text-muted mb-1">
          <span>Question {{ currentIndex + 1 }} sur {{ totalQuestions }}</span>
          <span>{{ Math.round(progress) }}% complété</span>
        </div>
        <div class="progress rounded-pill" style="height: 8px;">
          <div class="progress-bar bg-warning transition-progress" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Question Body -->
    <div class="quiz-body p-4 p-md-5">
      <div v-if="currentQuestion" class="question-content">
        <h4 class="fw-bold text-dark mb-4">{{ currentQuestion.question_text }}</h4>

        <!-- Answers -->
        <div class="answers-grid">
          <!-- QCM / True-False -->
          <template v-if="currentQuestion.type === 'qcm' || currentQuestion.type === 'true_false'">
            <div 
              v-for="answer in currentQuestion.answers" 
              :key="answer.id"
              @click="selectAnswer(answer.id)"
              :class="['answer-option p-3 mb-3 border rounded-lg cursor-pointer transition-all d-flex align-items-center', 
                        userAnswers[currentQuestion.id]?.answer_id === answer.id ? 'border-warning bg-warning-light shadow-sm' : 'hover-bg-light']"
            >
              <div :class="['radio-circle me-3', userAnswers[currentQuestion.id]?.answer_id === answer.id ? 'active' : '']"></div>
              <span class="fw-medium">{{ answer.answer_text }}</span>
            </div>
          </template>

          <!-- Short Answer -->
          <template v-else-if="currentQuestion.type === 'short_answer'">
            <input 
              v-model="userAnswers[currentQuestion.id].answer_text" 
              type="text" 
              class="form-control form-control-lg rounded-lg border-2" 
              placeholder="Saisissez votre réponse ici..."
              @input="markAsChanged"
            >
          </template>

          <!-- Essay -->
          <template v-else-if="currentQuestion.type === 'essay'">
            <textarea 
              v-model="userAnswers[currentQuestion.id].answer_text" 
              class="form-control rounded-lg border-2" 
              rows="6" 
              placeholder="Rédigez votre réponse détaillée..."
              @input="markAsChanged"
            ></textarea>
          </template>
        </div>
      </div>
    </div>

    <!-- Footer Controls -->
    <div class="quiz-footer p-4 bg-light border-top d-flex justify-content-between align-items-center">
      <button 
        @click="prevQuestion" 
        class="btn btn-outline-secondary px-4 rounded-lg" 
        :disabled="currentIndex === 0"
      >
        <i class="bi bi-chevron-left me-1"></i> Précédent
      </button>

      <div class="d-flex gap-2">
        <button 
          v-if="currentIndex < totalQuestions - 1" 
          @click="nextQuestion" 
          class="btn btn-primary px-4 rounded-lg fw-bold"
        >
          Suivant <i class="bi bi-chevron-right ms-1"></i>
        </button>
        <button 
          v-else 
          @click="confirmSubmit" 
          class="btn btn-warning text-white px-5 rounded-lg fw-bold"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
          Terminer et Soumettre
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  quiz: { type: Object, required: true },
  attempt: { type: Object, required: true },
  isSubmitting: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'submit', 'timeUp'])

const currentIndex = ref(0)
const userAnswers = reactive({ ...props.attempt.student_answers_mapped || {} })
const timeRemaining = ref(props.quiz.duration_minutes ? props.quiz.duration_minutes * 60 : null)
const hasChanges = ref(false)

const totalQuestions = computed(() => props.quiz.questions?.length || 0)
const currentQuestion = computed(() => props.quiz.questions?.[currentIndex.value])
const progress = computed(() => ((currentIndex.value + 1) / totalQuestions.value) * 100)

// Initialize userAnswers with empty shells for all questions if not present
let autoSaveId = null
let timerId = null

onMounted(() => {
  props.quiz.questions.forEach(q => {
    if (!userAnswers[q.id]) {
      userAnswers[q.id] = { answer_id: null, answer_text: '' }
    }
  })
  
  if (timeRemaining.value !== null) {
    startTimer()
  }
  
  // Auto-save interval (30s)
  autoSaveId = setInterval(() => {
    if (hasChanges.value) {
      saveCurrent()
    }
  }, 30000)
})

onUnmounted(() => {
  if (autoSaveId) clearInterval(autoSaveId)
  if (timerId) clearInterval(timerId)
})

const startTimer = () => {
  timerId = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      clearInterval(timerId)
      emit('timeUp')
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const selectAnswer = (answerId) => {
  userAnswers[currentQuestion.value.id].answer_id = answerId
  hasChanges.value = true
  saveCurrent()
}

const markAsChanged = () => {
  hasChanges.value = true
}

const saveCurrent = () => {
  const qId = currentQuestion.value.id
  emit('save', qId, userAnswers[qId])
  hasChanges.value = false
}

const nextQuestion = () => {
  if (hasChanges.value) saveCurrent()
  if (currentIndex.value < totalQuestions.value - 1) {
    currentIndex.value++
  }
}

const prevQuestion = () => {
  if (hasChanges.value) saveCurrent()
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const confirmSubmit = () => {
  if (confirm('Êtes-vous sûr de vouloir soumettre vos réponses ? Cette action est irréversible.')) {
    if (hasChanges.value) saveCurrent()
    emit('submit')
  }
}
</script>

<style scoped>
.rounded-lg { border-radius: 1rem !important; }
.bg-warning-light { background-color: #fffbeb; }
.cursor-pointer { cursor: pointer; }
.transition-all { transition: all 0.2s ease; }
.transition-progress { transition: width 0.4s ease; }
.hover-bg-light:hover { background-color: #f9fafb; border-color: #d1d5db !important; }

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  position: relative;
}
.radio-circle.active {
  border-color: #f59e0b;
}
.radio-circle.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #f59e0b;
  border-radius: 50%;
}

.pulse { animation: pulse-red 1s infinite; }
@keyframes pulse-red {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); box-shadow: 0 0 10px rgba(220, 38, 38, 0.5); }
  100% { transform: scale(1); }
}
</style>
