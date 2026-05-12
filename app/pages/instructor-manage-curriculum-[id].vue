<template>
  <Preloader />
  <InstructorNavbar />

  <section class="bg-cover py-5" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xl-12">
          <div class="d-flex align-items-center justify-content-between">
            <div class="text-light">
              <h1 class="text-light mb-1">Manage Curriculum</h1>
              <p class="mb-0">{{ course.title }}</p>
            </div>
            <NuxtLink to="/instructor-courses" class="btn btn-outline-light">Back to Courses</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-light py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted small">Chargement du cours...</p>
      </div>

      <div v-else-if="fetchError" class="alert alert-danger mx-3 mt-4 d-flex align-items-center gap-3">
        <i class="bi bi-exclamation-triangle-fill fs-4"></i>
        <div>
          <strong>Impossible de charger le cours</strong>
          <p class="mb-1 small">{{ fetchError }}</p>
          <button @click="fetchCourse" class="btn btn-sm btn-outline-danger mt-1">
            <i class="bi bi-arrow-clockwise me-1"></i> Réessayer
          </button>
        </div>
      </div>

      <div v-else class="row">
        <div class="col-lg-12">
          
          <!-- Navigation Tabs -->
          <ul class="nav nav-pills nav-fill mb-4 bg-white p-2 rounded-4 shadow-sm" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-curriculum" type="button">Curriculum</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-quizzes" type="button">Quizzes</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link rounded-pill" data-bs-toggle="pill" data-bs-target="#pills-assignments" type="button">Assignments</button>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <!-- Curriculum Tab -->
            <div class="tab-pane fade show active" id="pills-curriculum">
              <div class="card shadow-sm border-0">
                <div class="card-header bg-white border-bottom d-flex justify-content-between align-items-center p-3">
                  <h5 class="mb-0">Course Content</h5>
                  <button @click="openSectionModal()" class="btn btn-primary btn-sm">
                    <i class="bi bi-plus-lg me-1"></i> Add Section
                  </button>
                </div>
                <div class="card-body p-0">
                  <div class="accordion accordion-flush" id="curriculumAccordion">
                    <div v-for="(section, sIndex) in course.sections" :key="section.id" class="accordion-item border-bottom">
                      <h2 class="accordion-header" :id="'heading' + section.id">
                        <button class="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + section.id">
                          <div class="d-flex justify-content-between align-items-center w-100 me-3">
                            <span class="fw-bold">{{ section.title }}</span>
                            <div class="btn-group btn-group-sm">
                              <button @click.stop="openSectionModal(section)" class="btn btn-outline-secondary border-0"><i class="bi bi-pencil"></i></button>
                              <button @click.stop="deleteSection(section.id)" class="btn btn-outline-danger border-0"><i class="bi bi-trash"></i></button>
                            </div>
                          </div>
                        </button>
                      </h2>
                      <div :id="'collapse' + section.id" class="accordion-collapse collapse" data-bs-parent="#curriculumAccordion">
                        <div class="accordion-body p-0">
                          <ul class="list-group list-group-flush">
                            <li v-for="(lesson, lIndex) in section.lessons" :key="lesson.id" class="list-group-item d-flex justify-content-between align-items-center p-3">
                              <div class="d-flex align-items-center">
                                <i :class="getLessonIcon(lesson.type)" class="fs-5 text-muted me-3"></i>
                                <div>
                                  <h6 class="mb-0">{{ lesson.title }}</h6>
                                  <small class="text-muted text-capitalize">{{ lesson.type }} • {{ lesson.duration ? lesson.duration + ' min' : 'No duration' }}</small>
                                </div>
                              </div>
                              <div class="btn-group btn-group-sm">
                                <button @click="openLessonModal(section.id, lesson)" class="btn btn-outline-secondary border-0"><i class="bi bi-pencil"></i></button>
                                <button @click="deleteLesson(lesson.id)" class="btn btn-outline-danger border-0"><i class="bi bi-trash"></i></button>
                              </div>
                            </li>
                            <li class="list-group-item bg-white text-center p-3">
                              <button @click="openLessonModal(section.id)" class="btn btn-outline-primary btn-sm border-dashed w-100">
                                <i class="bi bi-plus-lg me-1"></i> Add Lesson
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="course.sections && course.sections.length === 0" class="text-center py-5">
                    <i class="bi bi-folder2-open display-1 text-muted"></i>
                    <p class="mt-3 text-muted">No sections yet. Start by adding your first section.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quizzes Tab -->
            <div class="tab-pane fade" id="pills-quizzes">
              <QuizManager :course-id="courseId" />
            </div>

            <!-- Assignments Tab -->
            <div class="tab-pane fade" id="pills-assignments">
              <AssignmentManager :course-id="courseId" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Modal -->
  <div class="modal fade" id="sectionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editingSection ? 'Edit Section' : 'Add Section' }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Section Title</label>
            <input v-model="sectionForm.title" type="text" class="form-control" placeholder="e.g. Introduction to Nuxt.js">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button @click="saveSection" type="button" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Section' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Lesson Modal -->
  <div class="modal fade" id="lessonModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editingLesson ? 'Edit Lesson' : 'Add Lesson' }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Lesson Title</label>
              <input v-model="lessonForm.title" type="text" class="form-control" placeholder="e.g. Setting up the environment">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Lesson Type</label>
              <select v-model="lessonForm.type" class="form-select">
                <option value="video">Video</option>
                <option value="document">Document (PDF/Doc)</option>
                <option value="text">HTML Text Content</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </div>

          <div v-if="lessonForm.type === 'video'" class="mb-3">
            <label class="form-label">Video URL (YouTube/Vimeo)</label>
            <input v-model="lessonForm.video_url" type="url" class="form-control" placeholder="https://youtube.com/...">
          </div>

          <div v-if="lessonForm.type === 'document'" class="mb-3">
            <label class="form-label">Upload Document</label>
            <input @change="handleFileChange" type="file" class="form-control" accept=".pdf,.doc,.docx,.ppt,.pptx">
            <small v-if="editingLesson?.file_path" class="text-muted">Current file: {{ editingLesson.file_path.split('/').pop() }}</small>
          </div>

          <div v-if="lessonForm.type === 'text'" class="mb-3">
            <label class="form-label">Content (HTML/Text)</label>
            <textarea v-model="lessonForm.content" class="form-control" rows="5"></textarea>
          </div>

          <div class="mb-3">
            <label class="form-label">Duration (minutes)</label>
            <input v-model="lessonForm.duration" type="number" class="form-control" placeholder="10">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button @click="saveLesson" type="button" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Lesson' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <FooterDark />
  <ScrollToTop />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'nuxt/app'

definePageMeta({
  middleware: 'instructor'
})
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import QuizManager from '@/components/Instructor/QuizManager.vue';
import AssignmentManager from '@/components/Instructor/AssignmentManager.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const route = useRoute()
const courseId = route.params.id
const api = useApi()

const course = ref({ title: '', sections: [] })
const loading = ref(true)
const saving = ref(false)
const fetchError = ref(null)

const editingSection = ref(null)
const sectionForm = reactive({ title: '' })

const editingLesson = ref(null)
const currentSectionId = ref(null)
const lessonForm = reactive({
  title: '',
  type: 'video',
  content: '',
  video_url: '',
  duration: '',
  file: null
})

let sectionModal = null
let lessonModal = null

onMounted(async () => {
  await fetchCourse()
  
  // Initialize Bootstrap modals
  if (process.client) {
    const { Modal } = await import('bootstrap')
    sectionModal = new Modal(document.getElementById('sectionModal'))
    lessonModal = new Modal(document.getElementById('lessonModal'))
  }
})

const fetchCourse = async () => {
  loading.value = true
  fetchError.value = null

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject({ message: 'TIMEOUT' }), 8000)
  )

  try {
    const response = await Promise.race([
      api(`/courses/by-id/${courseId}`),
      timeoutPromise
    ])
    course.value = response.data
  } catch (error) {
    console.error('Failed to fetch course:', error)
    if (error?.message === 'TIMEOUT') {
      fetchError.value = `⏱ Serveur inaccessible. Vérifiez que Laravel tourne sur http://127.0.0.1:8000`
    } else if (error?.status === 404) {
      fetchError.value = `❌ Cours introuvable (ID: ${courseId}). Vérifiez que le cours existe en base de données.`
    } else if (error?.status === 401) {
      fetchError.value = `🔒 Non autorisé. Veuillez vous reconnecter.`
    } else if (error?.status === 500) {
      fetchError.value = `💥 Erreur serveur (500). Vérifiez les logs Laravel.`
    } else {
      fetchError.value = `⚠ ${error?.data?.message || error?.message || 'Erreur inconnue (code: ' + error?.status + ')'}`
    }
  } finally {
    loading.value = false
  }
}

// Section Management
const openSectionModal = (section = null) => {
  editingSection.value = section
  sectionForm.title = section ? section.title : ''
  sectionModal.show()
}

const saveSection = async () => {
  saving.value = true
  try {
    if (editingSection.value) {
      await api(`/instructor/sections/${editingSection.value.id}`, {
        method: 'PUT',
        body: sectionForm
      })
    } else {
      await api(`/instructor/courses/${courseId}/sections`, {
        method: 'POST',
        body: sectionForm
      })
    }
    await fetchCourse()
    sectionModal.hide()
  } catch (error) {
    console.error('Failed to save section:', error)
  } finally {
    saving.value = false
  }
}

const deleteSection = async (id) => {
  if (confirm('Delete this section and all its lessons?')) {
    try {
      await api(`/instructor/sections/${id}`, { method: 'DELETE' })
      await fetchCourse()
    } catch (error) {
      console.error('Failed to delete section:', error)
    }
  }
}

// Lesson Management
const openLessonModal = (sectionId, lesson = null) => {
  currentSectionId.value = sectionId
  editingLesson.value = lesson
  
  if (lesson) {
    lessonForm.title = lesson.title
    lessonForm.type = lesson.type
    lessonForm.content = lesson.content || ''
    lessonForm.video_url = lesson.video_url || ''
    lessonForm.duration = lesson.duration || ''
  } else {
    lessonForm.title = ''
    lessonForm.type = 'video'
    lessonForm.content = ''
    lessonForm.video_url = ''
    lessonForm.duration = ''
  }
  lessonForm.file = null
  lessonModal.show()
}

const handleFileChange = (e) => {
  lessonForm.file = e.target.files[0]
}

const saveLesson = async () => {
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('title', lessonForm.title)
    formData.append('type', lessonForm.type)
    formData.append('content', lessonForm.content)
    formData.append('video_url', lessonForm.video_url)
    formData.append('duration', lessonForm.duration)
    if (lessonForm.file) {
      formData.append('file', lessonForm.file)
    }

    if (editingLesson.value) {
      // Laravel sometimes has issues with PUT and FormData, so we use POST with _method or just POST
      await api(`/instructor/lessons/${editingLesson.value.id}`, {
        method: 'POST',
        body: formData
      })
    } else {
      await api(`/instructor/sections/${currentSectionId.value}/lessons`, {
        method: 'POST',
        body: formData
      })
    }
    await fetchCourse()
    lessonModal.hide()
  } catch (error) {
    console.error('Failed to save lesson:', error)
  } finally {
    saving.value = false
  }
}

const deleteLesson = async (id) => {
  if (confirm('Delete this lesson?')) {
    try {
      await api(`/instructor/lessons/${id}`, { method: 'DELETE' })
      await fetchCourse()
    } catch (error) {
      console.error('Failed to delete lesson:', error)
    }
  }
}

const getLessonIcon = (type) => {
  switch (type) {
    case 'video': return 'bi bi-play-circle'
    case 'document': return 'bi bi-file-earmark-pdf'
    case 'text': return 'bi bi-card-text'
    case 'quiz': return 'bi bi-question-circle'
    default: return 'bi bi-file-earmark'
  }
}
</script>

<style scoped>
.accordion-button::after {
  background-size: 1.25rem;
}
.border-dashed {
  border-style: dashed !important;
}
</style>
