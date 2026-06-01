<template>

    <Preloader />
    <InstructorNavbar />

    <section class="bg-cover py-5" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
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
                                <div :class="{ active: activeTab >= 3 }"><span>3</span><p>Publish</p></div>
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
                                        <label class="form-label">Langue principale du cours</label>
                                        <select v-model="course.language" class="form-control" id="language">
                                            <option value="fr">🇫🇷 Français</option>
                                            <option value="en">🇬🇧 English</option>
                                            <option value="pt">🇵🇹 Português</option>
                                        </select>
                                    </div>

                                    <!-- ===== CONTENU MULTILINGUE ===== -->
                                    <div class="mb-4 mt-4">
                                        <div class="d-flex align-items-center gap-2 mb-3">
                                            <div class="square--40 circle bg-light-primary">
                                                <i class="bi bi-collection-play text-primary"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-0 fw-bold">Contenu du cours</h6>
                                                <small class="text-muted">Choisissez le type de contenu et ajoutez les versions par langue.</small>
                                            </div>
                                        </div>

                                        <!-- Sélecteur Type de contenu -->
                                        <div class="d-flex gap-3 flex-wrap mb-4">
                                            <label
                                                v-for="ct in contentTypes"
                                                :key="ct.value"
                                                class="content-type-option"
                                                style="cursor:pointer;"
                                            >
                                                <input type="radio" v-model="contentType" :value="ct.value" class="d-none">
                                                <div
                                                    :class="['d-flex flex-column align-items-center justify-content-center gap-2 p-3 rounded-3 border-2 border', contentType === ct.value ? 'border-primary bg-light-primary shadow-sm' : 'border-light bg-white']"
                                                    style="min-width:120px; transition: all .2s;"
                                                >
                                                    <i :class="[ct.icon, 'fs-2', contentType === ct.value ? ct.activeColor : 'text-muted']"></i>
                                                    <span :class="['fw-semibold small', contentType === ct.value ? 'text-primary' : 'text-muted']">{{ ct.label }}</span>
                                                </div>
                                            </label>
                                        </div>

                                        <!-- Versions par langue (Document / Vidéo) -->
                                        <div v-if="contentType !== 'youtube'">
                                            <div class="d-flex align-items-center justify-content-between mb-2">
                                                <label class="form-label fw-semibold mb-0">
                                                    Versions par langue
                                                    <span class="badge bg-primary rounded-pill ms-1">{{ languageVersions.length }}</span>
                                                </label>
                                                <button
                                                    v-if="languageVersions.length < 3"
                                                    @click="addVersion"
                                                    type="button"
                                                    class="btn btn-outline-primary btn-sm rounded-pill"
                                                >
                                                    <i class="bi bi-plus-circle me-1"></i>Ajouter une langue
                                                </button>
                                            </div>

                                            <div class="d-flex flex-column gap-2">
                                                <div
                                                    v-for="(version, idx) in languageVersions"
                                                    :key="idx"
                                                    class="border rounded-3 p-3"
                                                    :style="{ borderLeft: '4px solid ' + (version.file ? '#198754' : '#dee2e6') + ' !important', background: version.file ? '#f0fdf4' : '#f8f9fa' }"
                                                >
                                                    <div class="row g-2 align-items-center">
                                                        <div class="col-md-3">
                                                            <label class="form-label small text-muted mb-1">Langue</label>
                                                            <select v-model="version.lang" class="form-select form-select-sm">
                                                                <option value="fr">🇫🇷 Français</option>
                                                                <option value="en">🇬🇧 English</option>
                                                                <option value="pt">🇵🇹 Português</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-8">
                                                            <label class="form-label small text-muted mb-1">
                                                                {{ contentType === 'document' ? 'Fichier (PDF, DOC, PPT…)' : 'Fichier vidéo (MP4, MOV…)' }}
                                                            </label>
                                                            <div class="d-flex align-items-center gap-2">
                                                                <input
                                                                    @change="e => handleVersionFile(e, idx)"
                                                                    type="file"
                                                                    class="form-control form-control-sm"
                                                                    :accept="contentType === 'document' ? '.pdf,.doc,.docx,.ppt,.pptx,.xlsx,.csv' : 'video/*'"
                                                                >
                                                                <span v-if="version.file" class="badge bg-success text-nowrap py-2">
                                                                    <i class="bi bi-check-circle me-1"></i>Chargé
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-1 text-end">
                                                            <button
                                                                v-if="languageVersions.length > 1"
                                                                @click="removeVersion(idx)"
                                                                type="button"
                                                                class="btn btn-outline-danger btn-sm rounded-circle"
                                                                style="width:32px;height:32px;padding:0;"
                                                                title="Supprimer"
                                                            >
                                                                <i class="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Lien YouTube -->
                                        <div v-if="contentType === 'youtube'">
                                            <label class="form-label fw-semibold">Lien YouTube</label>
                                            <div class="input-group">
                                                <span class="input-group-text text-white" style="background:#ff0000; border-color:#ff0000;">
                                                    <i class="bi bi-youtube fs-5"></i>
                                                </span>
                                                <input
                                                    v-model="youtubeUrl"
                                                    type="url"
                                                    class="form-control"
                                                    placeholder="https://www.youtube.com/watch?v=..."
                                                >
                                            </div>
                                            <small class="text-muted d-block mt-1">Collez l'URL complète de votre vidéo YouTube publique ou non-listée.</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Description</label>
                                        <textarea v-model="course.description" class="form-control" rows="3" placeholder="Enter description"></textarea>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Prerequisites</label>
                                        <textarea v-model="course.prerequisites" class="form-control" rows="2" placeholder="e.g. Basic knowledge of JavaScript"></textarea>
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
                                        {{ submitting ? 'Submitting...' : (activeTab === 3 ? 'Submit' : 'Next') }}
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

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const activeTab = ref(1)
const preview = ref('')
const submitting = ref(false)
const categories = ref([])

// ===== Multilingual content =====
const contentType = ref<'document' | 'video' | 'youtube'>('document')
const languageVersions = ref([{ lang: 'fr', file: null as File | null }])
const youtubeUrl = ref('')

const contentTypes = [
    { value: 'document', label: 'Document',  icon: 'bi bi-file-earmark-richtext', activeColor: 'text-primary' },
    { value: 'video',    label: 'Vidéo',      icon: 'bi bi-camera-video-fill',     activeColor: 'text-danger'  },
    { value: 'youtube',  label: 'YouTube',    icon: 'bi bi-youtube',               activeColor: 'text-danger'  },
]

const addVersion = () => {
    const usedLangs = languageVersions.value.map(v => v.lang)
    const next = ['fr', 'en', 'pt'].find(l => !usedLangs.includes(l))
    if (next) languageVersions.value.push({ lang: next, file: null })
}

const removeVersion = (idx: number) => {
    languageVersions.value.splice(idx, 1)
}

const handleVersionFile = (e: Event, idx: number) => {
    const input = e.target as HTMLInputElement
    if (input.files?.[0]) {
        languageVersions.value[idx].file = input.files[0]
    }
}
// ================================

const course = reactive({
    title: '',
    category_id: '',
    level: 'beginner',
    language: 'fr',
    description: '',
    is_free: true,
    price: 0,
    thumbnail: null,
    prerequisites: ''
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
  if (activeTab.value < 3) activeTab.value++
}

const prevTab = () => {
  if (activeTab.value > 1) activeTab.value--
}

const nextTabOrSubmit = async () => {
  if (activeTab.value < 3) {
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
        formData.append('language', course.language)
        formData.append('description', course.description || '')
        formData.append('prerequisites', course.prerequisites || '')
        formData.append('is_free', '1')
        formData.append('price', '0')
        if (course.thumbnail) {
            formData.append('thumbnail', course.thumbnail)
        }
        // Multilingual content
        formData.append('content_type', contentType.value)
        if (contentType.value === 'youtube') {
            formData.append('youtube_url', youtubeUrl.value)
        } else {
            languageVersions.value.forEach((v, i) => {
                formData.append(`versions[${i}][lang]`, v.lang)
                if (v.file) formData.append(`versions[${i}][file]`, v.file)
            })
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