<template>

  

  <div v-if="loading">
  </div>

  <div v-else-if="course">
      <CourseHeader :course="course" />

      <section>
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-lg-8 col-md-12 pe-xl-4">
              
              <CoursesOverview :course="course" />
              
              <Circullum :sections="course.sections" />
              
            </div>
            
            <!-- Sidebar -->
            <div class="col-xl-4 col-lg-4 col-md-12">
            
              <DetailSidebar :course="course" />
              
            </div>
          
          </div>
        </div>
      </section>
  </div>

  <div v-else class="text-center py-5">
      <h3>{{ $t('course_not_found') }}</h3>
      <NuxtLink to="/courses" class="btn btn-main mt-3">{{ $t('back_to_courses') }}</NuxtLink>
  </div>

  <!-- Modal -->
  <div 
      class="modal fade" 
      id="staticBackdrop" 
      data-bs-backdrop="static" 
      data-bs-keyboard="false" 
      tabindex="-1" 
      aria-labelledby="staticBackdropLabel" 
      aria-hidden="true"
      ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button 
                    type="button" 
                    class="btn-close" 
                    data-bs-dismiss="modal" 
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body p-0">
                <!-- YouTube iframe -->
                <iframe 
                    src="https://www.youtube.com/embed/S_CGed6E610" 
                    width="100%" 
                    height="450px" 
                    style="margin-bottom: 0; display: block;"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    </div>
  </div>

</template>

<script setup>
import CourseHeader from '@/components/Courses/courses-detail/CourseHeader.vue';
import CoursesOverview from '@/components/Courses/courses-detail/CoursesOverview.vue';
import Circullum from '@/components/Courses/courses-detail/Circullum.vue';
import DetailSidebar from '@/components/Courses/courses-detail/DetailSidebar.vue';
import { coursesData } from '@/data/data.js';

const route = useRoute()
const api = useApi()

const course = ref(null)
const loading = ref(true)

onMounted(async () => {
  const paramId = route.params.id
  try {
    const response = await api(`/courses/${paramId}`)
    if (response && (response.data || response.id)) {
      course.value = response.data || response
      const localMatch = coursesData.find(c => String(c.id) === String(paramId) || c.slug === paramId)
      if (localMatch && !course.value.thumbnail && !course.value.image) {
        course.value.image = localMatch.image
      }
    } else {
      throw new Error('No course data returned')
    }
  } catch (error) {
    // Fallback to local coursesData by id or slug
    const found = coursesData.find(c => String(c.id) === String(paramId) || c.slug === paramId)
    if (found) {
      course.value = {
        ...found,
        thumbnail: found.image,
        sections: found.sections || [
          {
            id: 1,
            title: "Module 1 : Cadre théorique et enjeux pour les travailleurs",
            instructor_name: "Dr. Amadou Diallo (Instituteur)",
            lessons: [
              { id: 1, title: "Introduction générale et objectifs du programme", duration: "20 min", type: "video" },
              { id: 2, title: "Transformations du monde du travail en Afrique", duration: "40 min", type: "document" }
            ]
          },
          {
            id: 2,
            title: "Module 2 : Stratégies d'action et syndicalisation",
            instructor_name: "Fatoumata Traoré (Institutrice)",
            lessons: [
              { id: 3, title: "Méthodes d'organisation et de mobilisation des membres", duration: "45 min", type: "video" },
              { id: 4, title: "Négociation collective et défense des droits", duration: "60 min", type: "text" }
            ]
          }
        ]
      }
    } else {
      // General default course fallback
      course.value = {
        id: paramId || 1,
        title: "Programme de Formation des Travailleurs ALREI",
        price: 0,
        is_free: true,
        image: '/img/co-1.jpg',
        thumbnail: '/img/co-1.jpg',
        description: "Développez vos compétences pratiques et connaissances théoriques avec les formations de l'Institut africain de recherche et d'éducation ouvrière (ALREI).",
        sections: [
          {
            id: 1,
            title: "Module 1 : Introduction générale",
            instructor_name: "Équipe Pédagogique ALREI",
            lessons: [{ id: 1, title: "Aperçu du cours", duration: "15 min", type: "video" }]
          }
        ]
      }
    }
  } finally {
    loading.value = false;
  }
})
</script>