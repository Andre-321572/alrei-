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

const route = useRoute()
const api = useApi()
const { t } = useI18n()

const course = ref(null)
const loading = ref(true)

const config = useRuntimeConfig()
const getImageUrl = (path, fallback = '/img/courses-1.jpg') => {
  if (!path) return fallback
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  if (path.startsWith('/img/') || path.startsWith('/assets/')) return path
  
  const apiBase = config.public.apiBase || 'http://localhost:8000/api'
  const backendUrl = apiBase.replace(/\/api\/?$/, '')
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  if (cleanPath.startsWith('storage/')) {
    return `${backendUrl}/${cleanPath}`
  }
  return `${backendUrl}/storage/${cleanPath}`
}

onMounted(async () => {
  const paramId = route.params.id
  try {
    const response = await api(`/courses/${paramId}`).catch(() => api(`/courses/by-id/${paramId}`))
    if (response && (response.data || response.id)) {
      const data = response.data || response
      const { getThemeImage } = useCourseTheme()
      course.value = {
        ...data,
        image: getThemeImage(data),
        thumbnail: getThemeImage(data)
      }
    } else {
      course.value = null
    }
  } catch (error) {
    console.error('Course not found:', error)
    course.value = null
  } finally {
    loading.value = false;
  }
})
</script>