<template>
  <div class="quiz-result py-4">
    <!-- Result Header Card -->
    <div class="card border-0 shadow-lg rounded-lg overflow-hidden mb-5">
      <div :class="['card-body text-center p-5 text-white', attempt.passed ? 'bg-success-gradient' : 'bg-danger-gradient']">
        <div class="result-icon mb-4">
          <i :class="['bi display-1', attempt.passed ? 'bi-check-circle-fill' : 'bi-x-circle-fill']"></i>
        </div>
        <h2 class="fw-bold mb-1">{{ attempt.passed ? 'Félicitations !' : 'Dommage...' }}</h2>
        <p class="fs-5 opacity-75">{{ attempt.passed ? 'Vous avez réussi ce questionnaire.' : 'Vous n\'avez pas atteint la note de passage.' }}</p>
        
        <div class="row mt-5 g-4 justify-content-center">
          <div class="col-6 col-md-3">
            <div class="bg-white bg-opacity-20 rounded-lg p-3">
              <h3 class="fw-bold mb-0">{{ attempt.percentage }}%</h3>
              <span class="small text-uppercase opacity-75">Score final</span>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bg-white bg-opacity-20 rounded-lg p-3">
              <h3 class="fw-bold mb-0">{{ attempt.score }}/{{ attempt.total_points }}</h3>
              <span class="small text-uppercase opacity-75">Points</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card-footer bg-white border-0 p-4 d-flex justify-content-center gap-3">
        <button @click="$emit('retry')" v-if="canRetry" class="btn btn-warning text-white px-4 fw-bold rounded-pill">
          Recommencer ({{ remainingAttempts }} restantes)
        </button>
        <button @click="$emit('back')" class="btn btn-outline-secondary px-4 fw-bold rounded-pill">
          Retour au cours
        </button>
      </div>
    </div>

    <!-- Detailed Correction -->
    <h4 class="fw-bold text-primary mb-4">Correction Détaillée</h4>
    <div v-for="(q, idx) in attempt.quiz.questions" :key="q.id" class="card border-0 shadow-sm rounded-lg mb-4">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h6 class="fw-bold mb-0">{{ idx + 1 }}. {{ q.question_text }}</h6>
          <span :class="['badge rounded-pill', getStudentAnswer(q.id)?.is_correct ? 'bg-success' : 'bg-danger']">
            {{ getStudentAnswer(q.id)?.points_earned }} / {{ q.points }} pts
          </span>
        </div>

        <!-- Answers Display -->
        <div class="mt-3">
          <!-- QCM / True-False -->
          <div v-if="q.type === 'qcm' || q.type === 'true_false'" class="row g-2">
            <div v-for="ans in q.answers" :key="ans.id" class="col-md-6">
              <div :class="['p-3 rounded-lg border small d-flex align-items-center', 
                            ans.is_correct ? 'border-success bg-success-light text-success' : 
                            (getStudentAnswer(q.id)?.answer_id === ans.id ? 'border-danger bg-danger-light text-danger' : 'bg-light')]">
                <i :class="['bi me-2', 
                            ans.is_correct ? 'bi-check-circle-fill' : 
                            (getStudentAnswer(q.id)?.answer_id === ans.id ? 'bi-x-circle-fill' : 'bi-circle')]"></i>
                {{ ans.answer_text }}
                <span v-if="getStudentAnswer(q.id)?.answer_id === ans.id" class="ms-auto x-small">(Votre réponse)</span>
              </div>
            </div>
          </div>

          <!-- Short Answer -->
          <div v-else-if="q.type === 'short_answer' || q.type === 'essay'" class="mt-2">
            <div class="p-3 rounded-lg border bg-light">
              <p class="small text-muted mb-1">Votre réponse :</p>
              <p class="mb-0 fw-medium">{{ getStudentAnswer(q.id)?.answer_text || '(Aucune réponse)' }}</p>
            </div>
            <div v-if="q.type === 'short_answer'" class="mt-2 text-success small">
              <i class="bi bi-info-circle me-1"></i> Réponses attendues : {{ q.answers.map(a => a.answer_text).join(', ') }}
            </div>
          </div>
        </div>

        <!-- Explanation -->
        <div v-if="q.explanation" class="mt-4 p-3 bg-blue-light rounded-lg border-blue border-start border-4">
          <p class="small fw-bold text-primary mb-1"><i class="bi bi-lightbulb me-1"></i> Explication :</p>
          <p class="small mb-0 text-dark">{{ q.explanation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  attempt: { type: Object, required: true },
  canRetry: { type: Boolean, default: false },
  remainingAttempts: { type: Number, default: 0 }
})

const getStudentAnswer = (questionId) => {
  return props.attempt.student_answers.find(sa => sa.question_id === questionId)
}
</script>

<style scoped>
.rounded-lg { border-radius: 1rem !important; }
.bg-success-gradient { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.bg-danger-gradient { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.bg-success-light { background-color: #ecfdf5; }
.bg-danger-light { background-color: #fef2f2; }
.bg-blue-light { background-color: #eff6ff; }
.border-blue { border-color: #1e40af !important; }
.text-primary { color: #1e40af !important; }
.btn-warning { background-color: #f59e0b; border-color: #f59e0b; }
.x-small { font-size: 0.7rem; }
</style>
