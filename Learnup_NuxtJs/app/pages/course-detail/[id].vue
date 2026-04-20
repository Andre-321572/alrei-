<template>

  <Preloader />
  
  <div class="shadow-sm">
      <NavDark />
  </div>

  <CourseHeader :course="CourseData" />

  <section>
    <div class="container">
      <div class="row">
        <div class="col-xl-8 col-lg-8 col-md-12 pe-xl-4">
          
          <CoursesOverview />
          
          <Circullum />
          
          <DetailRating />
          
          <CourseDetail />
          
          <CourseRating />
          
          <ReviewForm />
          
        </div>
        
        <!-- Sidebar -->
        <div class="col-xl-4 col-lg-4 col-md-12">
        
          <DetailSidebar />
          
        </div>
      
      </div>
    </div>
  </section>

  <FooterTop />
  <FooterDark />
  <ScrollToTop />


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
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import CourseHeader from '@/components/Courses/courses-detail/CourseHeader.vue';
import CoursesOverview from '@/components/Courses/courses-detail/CoursesOverview.vue';
import Circullum from '@/components/Courses/courses-detail/Circullum.vue';
import DetailRating from '@/components/Courses/courses-detail/DetailRating.vue';
import CourseDetail from '@/components/Courses/courses-detail/CourseDetail.vue';
import CourseRating from '@/components/Courses/courses-detail/CourseRating.vue';
import ReviewForm from '@/components/Courses/courses-detail/ReviewForm.vue';
import DetailSidebar from '@/components/Courses/courses-detail/DetailSidebar.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { coursesData, freeCoursesData } from '@/data/data.js'

// Import useRoute and computed
import { useRoute } from '#app'
import { computed } from 'vue'

import { ref } from 'vue'

const modalRef = ref(null)

// ROUTE PARAMS
const route = useRoute()
const id = computed(() => Number(route.params.id))

// GET Course DATA BASED ON ID
const CourseData = computed(() => {
  // Try to find the course in coursesData
  let course = coursesData.find(item => item.id === id.value)
  if (!course) {
    // If not found, try in freeCoursesData
    course = freeCoursesData.find(item => item.id === id.value)
  }
  // If still not found, fallback to default course
  return course || coursesData[21]
})

</script>