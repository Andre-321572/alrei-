<template>
  <div>
    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container-fluid px-0">
        <div class="ht-200"></div>
      </div>
    </section>

    <section class="pt-4 pb-5 bg-light">
      <div class="container">
        <div class="row gx-xl-5">
          <div class="col-lg-3">
            <Sidebar v-if="isAdmin || isInstructor" />
            <StudentAdminSidebar v-else />
          </div>

          <div class="col-lg-9 col-md-12 col-sm-12">
            <div class="row">
              <div class="col-lg-12 pb-4">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><NuxtLink to="/">Accueil</NuxtLink></li>
                    <li class="breadcrumb-item"><NuxtLink to="/instructor-dashboard">Tableau de Bord Instructeur</NuxtLink></li>
                    <li class="breadcrumb-item active" aria-current="page">Quiz & Évaluations</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div class="card border rounded-3 p-4 bg-white shadow-sm mb-4">
              <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div>
                  <h4 class="fw-bold mb-1 text-dark"><i class="bi bi-patch-question text-warning me-2"></i>Gestion des Quiz & Évaluations</h4>
                  <p class="text-muted small mb-0">Créez et configurez des questionnaires avec note minimum de passage et note maximum pour vos étudiants.</p>
                </div>
                <div v-if="courses.length > 0" class="w-auto" style="min-width: 250px;">
                  <label class="form-label fw-semibold small mb-1">Sélectionner un cours :</label>
                  <select v-model="selectedCourseId" class="form-select rounded-pill border-warning">
                    <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div v-if="loadingCourses" class="text-center py-5">
              <div class="spinner-border text-warning" role="status"></div>
              <p class="mt-2 text-muted small">Chargement de vos cours...</p>
            </div>

            <div v-else-if="courses.length === 0" class="card border rounded-3 p-5 text-center bg-white shadow-sm">
              <i class="bi bi-journal-x display-4 text-muted mb-3"></i>
              <h5>Aucun cours disponible</h5>
              <p class="text-muted">Vous n'avez pas encore créé de cours. Veuillez créer un cours pour ajouter des questionnaires.</p>
              <NuxtLink to="/instructor-create-course" class="btn btn-warning text-white fw-bold mx-auto px-4 rounded-pill">
                <i class="bi bi-plus-circle me-1"></i> Créer un cours
              </NuxtLink>
            </div>

            <div v-else-if="selectedCourseId">
              <QuizManager :key="selectedCourseId" :course-id="selectedCourseId" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue'
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue'
import QuizManager from '@/components/Instructor/QuizManager.vue'

const { isAdmin, isInstructor } = useAuth()
const api = useApi()
const courses = ref([])
const selectedCourseId = ref(null)
const loadingCourses = ref(true)

onMounted(async () => {
  try {
    const response = await api('/instructor/courses')
    courses.value = response.data || response || []
    if (courses.value.length > 0) {
      selectedCourseId.value = courses.value[0].id
    }
  } catch (error) {
    console.error('Failed to load instructor courses:', error)
  } finally {
    loadingCourses.value = false
  }
})

definePageMeta({
  layout: 'instructor',
  middleware: ['auth']
})
</script>
