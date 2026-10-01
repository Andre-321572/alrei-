<template>
  <div class="question-form p-4 bg-white rounded-lg shadow-sm border">
    <h5 class="fw-bold text-primary mb-4">{{ editingQuestion ? $t('edit_question') : $t('add_new_question') }}</h5>
    
    <div class="row mb-3">
      <div class="col-md-8">
        <label class="form-label fw-semibold">{{ $t('question_text') }}</label>
        <textarea v-model="form.question_text" class="form-control rounded-lg" rows="3" placeholder="..."></textarea>
      </div>
      <div class="col-md-4">
        <label class="form-label fw-semibold">{{ $t('question_type') }}</label>
        <select v-model="form.type" class="form-select rounded-lg">
          <option value="qcm">QCM</option>
          <option value="true_false">Vrai / Faux</option>
          <option value="short_answer">Réponse courte</option>
          <option value="essay">Essay</option>
        </select>
        
        <label class="form-label fw-semibold mt-3">{{ $t('points') }}</label>
        <input v-model="form.points" type="number" class="form-control rounded-lg" min="1">
      </div>
    </div>

    <!-- Réponses pour QCM et Vrai/Faux -->
    <div v-if="form.type === 'qcm' || form.type === 'true_false'" class="mb-4">
      <label class="form-label fw-semibold">{{ $t('possible_answers') }}</label>
      <div v-for="(answer, index) in form.answers" :key="index" class="input-group mb-2 shadow-sm rounded-lg overflow-hidden">
        <div class="input-group-text bg-white border-end-0">
          <input class="form-check-input mt-0" type="radio" :name="'correct_' + index" :checked="answer.is_correct" @change="setCorrect(index)">
        </div>
        <input v-model="answer.answer_text" type="text" class="form-control border-start-0 border-end-0" :placeholder="`Option ${index + 1}`">
        <button @click="removeAnswer(index)" class="btn btn-outline-danger" v-if="form.answers.length > 2 && form.type !== 'true_false'">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <button v-if="form.type === 'qcm'" @click="addAnswer" class="btn btn-link btn-sm text-warning fw-bold p-0">
        <i class="bi bi-plus-circle me-1"></i> {{ $t('add_option') }}
      </button>
    </div>

    <!-- Réponses pour Réponse Courte (Mots clés corrects) -->
    <div v-if="form.type === 'short_answer'" class="mb-4">
      <label class="form-label fw-semibold">{{ $t('accepted_keywords') }}</label>
      <input v-model="shortAnswerText" @input="updateShortAnswers" type="text" class="form-control rounded-lg" placeholder="Ex: Paris, France">
    </div>

    <!-- Feedback / Explication -->
    <div class="mb-4">
      <label class="form-label fw-semibold">{{ $t('explanation_feedback') }}</label>
      <textarea v-model="form.explanation" class="form-control rounded-lg" rows="2" placeholder="..."></textarea>
    </div>

    <div class="d-flex gap-2">
      <button @click="$emit('cancel')" class="btn btn-light px-4 rounded-lg">{{ $t('cancel') }}</button>
      <button @click="submit" class="btn btn-warning text-white px-4 rounded-lg fw-bold" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
        {{ editingQuestion ? $t('update_question') : $t('add_question') }}
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  editingQuestion: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  type: 'qcm',
  question_text: '',
  points: 1,
  explanation: '',
  answers: [
    { answer_text: '', is_correct: true, order: 0 },
    { answer_text: '', is_correct: false, order: 1 }
  ]
})

const shortAnswerText = ref('')

const resetForm = () => {
  form.type = 'qcm'
  form.question_text = ''
  form.points = 1
  form.explanation = ''
  form.answers = [
    { answer_text: '', is_correct: true, order: 0 },
    { answer_text: '', is_correct: false, order: 1 }
  ]
  shortAnswerText.value = ''
}

// Initialize form if editing
watch(() => props.editingQuestion, (newVal) => {
  if (newVal) {
    form.type = newVal.type
    form.question_text = newVal.question_text
    form.points = newVal.points
    form.explanation = newVal.explanation || ''
    if (newVal.answers && newVal.answers.length > 0) {
      form.answers = newVal.answers.map(a => ({ ...a }))
      if (newVal.type === 'short_answer') {
        shortAnswerText.value = newVal.answers.map(a => a.answer_text).join(', ')
      }
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Adjust answers based on type
watch(() => form.type, (newType) => {
  if (newType === 'true_false') {
    form.answers = [
      { answer_text: 'Vrai', is_correct: true, order: 0 },
      { answer_text: 'Faux', is_correct: false, order: 1 }
    ]
  } else if (newType === 'qcm' && form.answers.length < 2) {
    form.answers = [
      { answer_text: '', is_correct: true, order: 0 },
      { answer_text: '', is_correct: false, order: 1 }
    ]
  }
})

const addAnswer = () => {
  form.answers.push({ answer_text: '', is_correct: false, order: form.answers.length })
}

const removeAnswer = (index) => {
  form.answers.splice(index, 1)
  if (!form.answers.some(a => a.is_correct)) {
    form.answers[0].is_correct = true
  }
}

const setCorrect = (index) => {
  form.answers.forEach((a, i) => a.is_correct = i === index)
}

const updateShortAnswers = () => {
  const texts = shortAnswerText.value.split(',').map(t => t.trim()).filter(t => t !== '')
  form.answers = texts.map((t, i) => ({
    answer_text: t,
    is_correct: true,
    order: i
  }))
}

const submit = () => {
  if (!form.question_text) return alert('Veuillez saisir un énoncé.')
  emit('save', { ...form })
}
</script>

<style scoped>
.rounded-lg { border-radius: 0.75rem !important; }
.text-primary { color: #1e40af !important; }
.btn-warning { background-color: #f59e0b; border-color: #f59e0b; }
</style>
