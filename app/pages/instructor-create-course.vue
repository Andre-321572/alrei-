<template>

    <Preloader />
    <InstructorNavbar />

    <section class="bg-gredient py-5">
        <div class="container">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-12">
                    <div class="text-center">
                        <h1 class="text-light">Add New Course</h1>
                        <p class="fs-6 text-light">Just fill the form carefully and create your new courses.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-light py-5">
        <div class="container">			
            <div class="row align-items-center justify-content-center">
            
                <div class="col-xl-10 col-lg-12">
                
                    <div class="card shadow-sm">
                        <div class="card-body p-4 p-lg-5">

                            <div class="step-indicator mb-4">
                                <div :class="{ active: activeTab >= 1 }"><span>1</span><p>Info</p></div>
                                <div :class="{ active: activeTab >= 2 }"><span>2</span><p>Curriculum</p></div>
                                <div :class="{ active: activeTab >= 3 }"><span>3</span><p>Pricing</p></div>
                                <div :class="{ active: activeTab >= 4 }"><span>4</span><p>Publish</p></div>
                            </div>

                            <form @submit.prevent="handleSubmit" id="multiStepForm">
                            
                                <div v-show="activeTab === 1" class="step active">
                                    
                                    <div class="mb-4">
                                        <h5 class="text-darks mb-0 lh-base">Basic Information</h5>
                                        <p class="text-muted">Fill basic information regarding your course.</p>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Title</label>
                                        <input v-model="course.title" type="text" class="form-control" placeholder="Enter course title">
                                        <small class="text-muted">Write a 60 character course title.</small>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Courses category</label>
                                        <select v-model="course.category_id" class="form-control form-select" id="c-category">
                                            <option value="">Select Category</option>
                                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Courses Level</label>
                                        <select v-model="course.level" class="form-control" id="level">
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                            <option value="all">All Levels</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Description</label>
                                        <textarea v-model="course.description" class="form-control" rows="3" placeholder="Enter description"></textarea>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <h5 class="text-darks mb-0 lh-base">Course Media</h5>
                                        <p class="text-muted">Upload a professional thumbnail, a preview video, and any additional resources.</p>
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label">Course Thumbnail <span class="text-danger">*</span></label>
                                        <div class="border rounded d-flex align-items-center justify-content-between p-3">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-image fs-4 text-primary me-3"></i>
                                                <input @change="handleThumbnailChange" type="file" id="thumbnailInput" class="form-control" accept="image/*">
                                            </div>
                                            <img v-if="preview" :src="preview" id="thumbnailPreview" class="img-thumbnail ms-3" style="width: 100px;" alt="Preview">
                                        </div>
                                        <small class="text-muted d-block mt-2">Recommended: 800x600px | JPG/PNG</small>
                                    </div>
                                </div>
                                
                                <div v-show="activeTab === 2" class="step active">
                                    <div class="mb-4">
                                        <h5 class="lh-base m-0">Course Curriculum</h5>
                                        <p class="text-muted">Add course sections and lessons below. You can add as many as needed.</p>
                                    </div>

                                    <div id="curriculumContainer">
                                        <div class="section border p-3 rounded mb-4">
                                            <p class="text-muted">Curriculum management will be available after basic course creation.</p>
                                        </div>
                                    </div>
                                </div>

                                <div v-show="activeTab === 3" class="step active">
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Is this as a free course?</label>
                                        <div class="form-check">
                                            <input v-model="course.is_free" id="freecpurse" class="form-check-input" type="checkbox">
                                            <label for="freecpurse" class="form-check-label text-muted-2">Check if this is a free course.</label>
                                        </div>
                                    </div>
                                    
                                    <div v-if="!course.is_free" class="form-group mb-3">
                                        <label class="form-label">Course Price (FCFA)</label>
                                        <input v-model="course.price" type="number" class="form-control" placeholder="e.g., 5000">
                                    </div>
                                </div>

                                <div v-show="activeTab === 4" class="step active">
                                    <div class="mb-4 text-center">
                                        <h3>Ready to Publish?</h3>
                                        <p>Review your information before submitting.</p>
                                    </div>
                                </div>

                                <!-- Buttons -->
                                <div class="d-flex justify-content-between mt-4">
                                    <button v-if="activeTab > 1" type="button" class="btn btn-gray px-4" @click="prevTab">Previous</button>
                                    <div v-else></div>
                                    <button :disabled="submitting" type="button" class="btn btn-main px-4" @click="nextTabOrSubmit">
                                        {{ submitting ? 'Submitting...' : (activeTab === 4 ? 'Submit' : 'Next') }}
                                    </button>
                                </div>
                            
                            </form>
                        </div>
                    </div>						
                    
                </div>	
            
            </div>
        </div>
    </section>

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const activeTab = ref(1)
const preview = ref('')
const submitting = ref(false)
const categories = ref([])

const course = reactive({
    title: '',
    category_id: '',
    level: 'beginner',
    description: '',
    is_free: false,
    price: 0,
    thumbnail: null
})

const api = useApi()

onMounted(async () => {
    try {
        const response = await api('/categories')
        categories.value = response.data
    } catch (error) {
        console.error('Failed to fetch categories:', error)
    }
})

const handleThumbnailChange = (e) => {
  const file = e.target.files[0]
  if (file) {
      course.thumbnail = file
      preview.value = URL.createObjectURL(file)
  }
}

const nextTab = () => {
  if (activeTab.value < 4) activeTab.value++
}

const prevTab = () => {
  if (activeTab.value > 1) activeTab.value--
}

const nextTabOrSubmit = async () => {
  if (activeTab.value < 4) {
    activeTab.value++
  } else {
    await handleSubmit()
  }
}

const handleSubmit = async () => {
    submitting.value = true
    try {
        const formData = new FormData()
        formData.append('title', course.title)
        formData.append('category_id', course.category_id)
        formData.append('level', course.level)
        formData.append('description', course.description || '')
        formData.append('is_free', course.is_free ? 1 : 0)
        formData.append('price', course.is_free ? 0 : course.price)
        if (course.thumbnail) {
            formData.append('thumbnail', course.thumbnail)
        }

        await api('/instructor/courses', {
            method: 'POST',
            body: formData
        })

        navigateTo('/instructor-courses')
    } catch (error) {
        console.error('Failed to create course:', error)
        alert('Error creating course. Please check all fields.')
    } finally {
        submitting.value = false
    }
}

</script>