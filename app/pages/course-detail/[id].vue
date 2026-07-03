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
              
              <DetailRating :course="course" v-if="course" />
              
              <CourseDetail :course="course" />
              
              <CourseRating :course="course" />
              
              <ReviewForm :course="course" />
              
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
import DetailRating from '@/components/Courses/courses-detail/DetailRating.vue';
import CourseDetail from '@/components/Courses/courses-detail/CourseDetail.vue';
import CourseRating from '@/components/Courses/courses-detail/CourseRating.vue';
import ReviewForm from '@/components/Courses/courses-detail/ReviewForm.vue';
import DetailSidebar from '@/components/Courses/courses-detail/DetailSidebar.vue';

const route = useRoute()
const api = useApi()

const course = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api(`/courses/${route.params.id}`)
    course.value = response.data
  } catch (error) {
    console.error('Course not found:', error)
  } finally {
    loading.value = false;
  }
})


</script>