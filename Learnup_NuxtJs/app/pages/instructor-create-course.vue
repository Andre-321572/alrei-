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

                            <form id="multiStepForm">
                            
                                <div :class="['step', { active: activeTab === 1 }]">
                                    
                                    <div class="mb-4">
                                        <h5 class="text-darks mb-0 lh-base">Basic Information</h5>
                                        <p class="text-muted">Fill basic information regarding your course.</p>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Title</label>
                                        <input type="text" class="form-control" placeholder="Enter course title">
                                        <small class="text-muted">Write a 60 character course title.</small>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Courses category</label>
                                        <select class="form-control form-select" id="c-category">
                                            <option value="webdesign">Web Design</option>
                                            <option value="graphicdesign">Graphic Design</option>
                                            <option value="finance">Finance</option>
                                            <option value="itsoftware">IT & Software</option>
                                            <option value="ecommerce">Ecommerce</option>
                                            <option value="bootstrap">Bootstrap</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Courses Level</label>
                                        <select class="form-control" id="level">
                                            <option value="beignners">Beignners</option>
                                            <option value="advance">Advance</option>
                                            <option value="intermediate">Intermediate</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Description</label>
                                        <textarea class="form-control" rows="3" placeholder="Enter description"></textarea>
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
                                            <img v-if="preview" :src="preview" id="thumbnailPreview" src="" class="img-thumbnail ms-3" style="width: 100px; display: none;" alt="Preview">
                                        </div>
                                        <small class="text-muted d-block mt-2">Recommended: 800x600px | JPG/PNG</small>
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label">Preview Video</label>
                                        <div class="border rounded p-3 d-flex align-items-center">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-play-circle fs-4 text-primary me-3"></i>
                                                <input @change="handleThumbnailChange2" class="form-control" type="file" accept="video/mp4,video/webm">
                                            </div>
                                            <img v-if="preview2" :src="preview2" id="thumbnailPreview" src="" class="img-thumbnail ms-3" style="width: 100px; display: none;" alt="Preview">
                                        </div>
                                        <small class="text-muted d-block mt-2">Format: MP4/WebM | Max: 100MB</small>
                                    </div>

                                    <div class="mb-4">
                                        <label class="form-label">Course Resources</label>
                                        <div class="border rounded p-3 d-flex align-items-center">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-folder2-open fs-4 text-primary me-3"></i>
                                                <input @change="handleThumbnailChange3" class="form-control" type="file" multiple>
                                            </div>
                                            <img v-if="preview3" :src="preview3" id="thumbnailPreview" src="" class="img-thumbnail ms-3" style="width: 100px; display: none;" alt="Preview">
                                        </div>
                                        <small class="text-muted d-block mt-2">Optional: PDF, ZIP, or DOCX | Max 5 files</small>
                                    </div>
                                </div>
                                
                                <div :class="['step', { active: activeTab === 2 }]">
                                    <div class="mb-4">
                                        <h5 class="lh-base m-0">Course Curriculum</h5>
                                        <p class="text-muted">Add course sections and lessons below. You can add as many as needed.</p>
                                    </div>

                                    <div id="curriculumContainer">
                                        <div class="section border p-3 rounded mb-4">
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h6 class="mb-0 text-dark">Lesson Title</h6>
                                            <button type="button" class="btn btn-sm btn-red remove-section rounded-2">Remove Section</button>
                                            </div>

                                            <div class="mb-3">
                                            <label class="form-label">Lesson Title</label>
                                            <input type="text" class="form-control" placeholder="e.g., Getting Started">
                                            </div>

                                            <div class="lessons">
                                            <div class="lesson mb-3">
                                                <label class="form-label">Lecture Title</label>
                                                <input type="text" class="form-control mb-2" placeholder="e.g., Introduction">
                                                <textarea class="form-control" rows="2" placeholder="Lecture description..."></textarea>
                                            </div>
                                            </div>

                                            <button type="button" class="btn btn-sm btn-light-main add-lesson rounded-2">+ Add Lecture</button>
                                        </div>
                                    </div>

                                    <button type="button" class="btn btn-outline-main rounded-2" id="addSection">+ Add Lesson</button>
                                </div>

                                <div :class="['step', { active: activeTab === 3 }]">
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Is this as a free course?</label>
                                        <div class="form-check">
                                            <input id="freecpurse" class="form-check-input" name="freecpurse" type="checkbox">
                                            <label for="freecpurse" class="form-check-label text-muted-2">Check if this is a free course.</label>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Price ($)</label>
                                        <input type="number" class="form-control" placeholder="e.g., 99">
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">This course has a discount</label>
                                        <div class="form-check">
                                            <input id="coursediscount" class="form-check-input" name="coursediscount" type="checkbox">
                                            <label for="coursediscount" class="form-check-label text-muted-2">Check if this course has discount.</label>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Discount Price ($)</label>
                                        <input type="number" class="form-control" placeholder="e.g., 99">
                                        <span class="text-muted text-mid">This course has <i class="fs-semibold text-green">10.5%</i> discount.</span>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Discount Expiry Period</label>
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="form-check">
                                                <input id="lifetime" class="form-check-input" name="expireperiod" type="radio">
                                                <label for="lifetime" class="form-check-label text-muted-2">Lifetime</label>
                                            </div>
                                            <div class="form-check">
                                                <input id="limitedtime" class="form-check-input" name="expireperiod" type="radio" checked>
                                                <label for="limitedtime" class="form-check-label text-muted-2">Limited Period</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Number of Days</label>
                                        <input type="number" class="form-control" placeholder="e.g., 20">
                                    </div>
                                </div>

                                <div :class="['step', { active: activeTab === 4 }]">
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">SEO Meta Title</label>
                                        <input type="text" class="form-control" placeholder="e.g., Advance Java Script">
                                        <span class="text-muted text-mid">Use max 65 characters only.</span>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">SEO Description</label>
                                        <input type="number" class="form-control" placeholder="e.g., Meta Description">
                                        <span class="text-muted text-mid">Use max 150 characters only.</span>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Course Tags</label>
                                        <input type="number" class="form-control" placeholder="e.g., Design, Figma, Java">
                                        <span class="text-muted text-mid">Use tags with commas.</span>
                                    </div>
                                    
                                    <div class="form-group mb-3">
                                        <label class="form-label">Visibility</label>
                                        <select class="form-control" id="visibility">
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Buttons -->
                                <div class="d-flex justify-content-between mt-4">
                                    <button type="button" class="btn btn-gray px-4" id="prevBtn" @click="prevTab">Previous</button>
                                    <button type="button" class="btn btn-main px-4" id="nextBtn" @click="nextTabOrSubmit">
                                        {{ activeTab === 4 ? 'Submit' : 'Next' }}
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

import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

import { ref } from 'vue'

const activeTab = ref(1)
const preview = ref('')
const preview2 = ref('')
const preview3 = ref('')

const handleThumbnailChange = (e) => {
  const file = e.target.files[0]
  if (file) preview.value = URL.createObjectURL(file)
}
const handleThumbnailChange2 = (e) => {
  const file = e.target.files[0]
  if (file) preview2.value = URL.createObjectURL(file)
}
const handleThumbnailChange3 = (e) => {
  const file = e.target.files[0]
  if (file) preview3.value = URL.createObjectURL(file)
}

const nextTab = () => {
  if (activeTab.value < 4) activeTab.value++
}

const prevTab = () => {
  if (activeTab.value > 1) activeTab.value--
}

const nextTabOrSubmit = () => {
  if (activeTab.value < 4) {
    activeTab.value++
  } else {
    window.location.href = '/thank-you'
  }
}

</script>