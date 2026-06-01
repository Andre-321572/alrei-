<template>
  <div class="course-forum">
    <div v-if="selectedTopic" class="topic-detail">
      <button @click="selectedTopic = null" class="btn btn-link p-0 mb-3">
        <i class="bi bi-arrow-left me-2"></i>Retour aux sujets
      </button>
      
      <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <div class="d-flex align-items-center gap-3 mb-3">
          <div class="square--40 circle bg-light-primary text-primary fw-bold">
            {{ selectedTopic.user?.name?.charAt(0) }}
          </div>
          <div>
            <h5 class="fw-bold mb-0">{{ selectedTopic.title }}</h5>
            <small class="text-muted">Par {{ selectedTopic.user?.name }} • {{ formatDate(selectedTopic.created_at) }}</small>
          </div>
        </div>
        <p class="mb-0">{{ selectedTopic.content }}</p>
      </div>

      <div class="responses ms-md-5">
        <h6 class="fw-bold mb-3">Réponses ({{ selectedTopic.posts?.length || 0 }})</h6>
        <div v-for="post in selectedTopic.posts" :key="post.id" class="card border-0 shadow-sm rounded-4 p-3 mb-3 bg-light">
          <div class="d-flex align-items-center gap-2 mb-2">
            <div class="square--30 circle bg-secondary text-white small">
              {{ post.user?.name?.charAt(0) }}
            </div>
            <span class="fw-bold small">{{ post.user?.name }}</span>
            <small class="text-muted ms-auto">{{ formatDate(post.created_at) }}</small>
          </div>
          <p class="mb-0 small">{{ post.content }}</p>
        </div>

        <!-- Reply Form -->
        <div class="card border-0 shadow-sm rounded-4 p-3 mt-4">
          <textarea v-model="newPostContent" class="form-control border-0 bg-light" rows="3" :placeholder="replyPlaceholder"></textarea>
          <div class="text-end mt-2">
            <button @click="submitPost" :disabled="!newPostContent || submitting" class="btn btn-primary btn-sm px-4 rounded-pill">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-1"></span>Répondre
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="topic-list">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center gap-2">
          <h5 class="fw-bold mb-0">Forum d'entraide</h5>
          <span class="badge forum-lang-badge rounded-pill">
            <i class="bi bi-translate me-1"></i>{{ forumLanguageLabel }}
          </span>
        </div>
        <button @click="showCreateModal = true" class="btn btn-dark btn-sm px-4 rounded-pill">
          <i class="bi bi-plus-lg me-1"></i>Nouveau sujet
        </button>
      </div>

      <!-- Access Denied Message -->
      <div v-if="accessDenied" class="alert alert-warning rounded-4 d-flex align-items-center gap-3 border-0 shadow-sm">
        <i class="bi bi-lock-fill fs-4 text-warning"></i>
        <div>
          <p class="fw-bold mb-0">Forum restreint à votre langue d'inscription</p>
          <small class="text-muted">Votre compte est configuré pour le forum <strong>{{ forumLanguageLabel }}</strong>. Vous ne pouvez accéder qu'à ce forum.</small>
        </div>
      </div>

      <div v-else-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
      </div>

      <div v-else class="row g-3">
        <div v-for="topic in topics" :key="topic.id" class="col-12">
          <div @click="viewTopic(topic.id)" class="card border shadow-sm rounded-4 p-3 forum-card" role="button">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h6 class="fw-bold mb-1">{{ topic.title }}</h6>
                <p class="text-muted small mb-0 text-truncate w-shrunk-large">{{ topic.content }}</p>
              </div>
              <span class="badge bg-light-primary text-primary rounded-pill">{{ topic.posts_count }} rép.</span>
            </div>
            <div class="d-flex align-items-center gap-2 mt-3 pt-2 border-top">
              <div class="square--25 circle bg-light-secondary text-secondary tiny">
                {{ topic.user?.name?.charAt(0) }}
              </div>
              <small class="text-muted">{{ topic.user?.name }} • {{ formatDate(topic.created_at) }}</small>
            </div>
          </div>
        </div>
        
        <div v-if="topics.length === 0" class="text-center py-5">
          <p class="text-muted">Aucun sujet pour le moment. Soyez le premier à poser une question !</p>
        </div>
      </div>
    </div>

    <!-- Create Topic Modal -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal-dialog modal-dialog-centered custom-modal">
        <div class="modal-content border-0 shadow-xl rounded-4 overflow-hidden bg-white">
          <div class="modal-header border-0 bg-light p-4">
            <h5 class="fw-bold mb-0 text-dark">Nouveau sujet de discussion</h5>
            <button @click="showCreateModal = false" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-4">
              <label class="form-label small fw-bold text-muted text-uppercase tracking-wider mb-2">Titre</label>
              <input v-model="newTopic.title" type="text" class="form-control custom-input" placeholder="De quoi souhaitez-vous discuter ?">
            </div>
            <div class="mb-4">
              <label class="form-label small fw-bold text-muted text-uppercase tracking-wider mb-2">Message</label>
              <textarea v-model="newTopic.content" class="form-control custom-input" rows="5" placeholder="Détaillez votre question ou remarque..."></textarea>
            </div>
          </div>
          <div class="modal-footer border-0 p-4 pt-0">
            <button @click="showCreateModal = false" class="btn btn-link text-muted text-decoration-none fw-semibold me-2">Annuler</button>
            <button @click="submitTopic" :disabled="!newTopic.title || !newTopic.content || submitting" class="btn btn-main rounded-pill px-4 shadow-sm">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>Publier le sujet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  courseId: {
    type: [Number, String],
    required: true
  }
})

const api = useApi()
const { user } = useAuth()
const topics = ref([])
const loading = ref(true)
const selectedTopic = ref(null)
const showCreateModal = ref(false)
const submitting = ref(false)
const accessDenied = ref(false)

const newTopic = reactive({
  title: '',
  content: ''
})

const newPostContent = ref('')

const forumLang = computed(() => user.value?.preferred_language || 'fr')

const LANG_LABELS = {
  fr: '🇫🇷 Français',
  en: '🇬🇧 English',
  pt: '🇧🇷 Português',
}

const forumLanguageLabel = computed(() => LANG_LABELS[forumLang.value] || forumLang.value.toUpperCase())

const replyPlaceholder = computed(() => {
  if (forumLang.value === 'en') return 'Write your reply...'
  if (forumLang.value === 'pt') return 'Escreva sua resposta...'
  return 'Écrivez votre réponse...'
})

const fetchTopics = async () => {
  if (!props.courseId) return
  loading.value = true
  accessDenied.value = false
  try {
    const res = await api(`/courses/${props.courseId}/forum?lang=${forumLang.value}`)
    topics.value = res.data
  } catch (err) {
    if (err?.data?.status === 403 || err?.status === 403) {
      accessDenied.value = true
    } else {
      console.error('Forum fetch error:', err)
    }
    topics.value = []
  } finally {
    loading.value = false
  }
}

watch(() => props.courseId, (newId) => {
  if (newId) {
    selectedTopic.value = null
    fetchTopics()
  }
}, { immediate: true })

const viewTopic = async (topicId) => {
  try {
    const res = await api(`/forum/topics/${topicId}`)
    selectedTopic.value = res.data
  } catch (err) {
    if (err?.data?.status === 403 || err?.status === 403) {
      alert('Vous ne pouvez pas accéder à ce sujet (langue non autorisée).')
    } else {
      console.error(err)
    }
  }
}

const submitTopic = async () => {
  submitting.value = true
  try {
    await api(`/courses/${props.courseId}/forum/topics`, {
      method: 'POST',
      body: { ...newTopic, language: forumLang.value }
    })
    newTopic.title = ''
    newTopic.content = ''
    showCreateModal.value = false
    await fetchTopics()
  } catch (err) {
    console.error(err)
  } finally {
    submitting.value = false
  }
}

const submitPost = async () => {
  if (!newPostContent.value) return
  submitting.value = true
  try {
    await api(`/forum/topics/${selectedTopic.value.id}/posts`, {
      method: 'POST',
      body: { content: newPostContent.value }
    })
    newPostContent.value = ''
    await viewTopic(selectedTopic.value.id)
  } catch (err) {
    console.error(err)
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(fetchTopics)
</script>

<style scoped>
.forum-card {
  transition: all 0.2s ease;
  cursor: pointer;
}
.forum-card:hover {
  transform: translateY(-2px);
  border-color: var(--bs-primary) !important;
}
.custom-modal {
  width: 100%;
  max-width: 550px;
}
.custom-input {
  background-color: #f8f9fa;
  border: 2px solid #f8f9fa;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
  font-size: 15px;
}
.custom-input:focus {
  background-color: #ffffff;
  border-color: var(--alrei-orange);
  box-shadow: 0 0 0 4px rgba(242, 169, 0, 0.1);
  outline: none;
}
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}
.tracking-wider { letter-spacing: 0.05em; }
.w-shrunk-large { max-width: 80%; }
.tiny { font-size: 10px; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; }
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}
.forum-lang-badge {
  background: linear-gradient(135deg, #f2a900 0%, #e08c00 100%);
  color: #fff;
  font-size: 11px;
  padding: 4px 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
</style>
