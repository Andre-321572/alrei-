<template>

    <Preloader />
    <NavDark />

    <section class="bg-cover page-title" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="breadcrumb m-0">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb simple light">
                                <li class="breadcrumb-item"><NuxtLink to="/">{{ $t('home') }}</NuxtLink></li>
                                <li class="breadcrumb-item"><a href="#">{{ $t('courses') }}</a></li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container">
            <div class="row">
                <div class="col-xxl-3 col-lg-4 col-12">	
                  <SidebarOne /> 
                </div>	
                
                <div class="col-xxl-9 col-lg-8 col-12">
                    <div class="row align-items-center g-3 mb-3">
                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-12">
                            <span v-html="$t('we_found_courses', { count: courses.length })"></span>
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
                            <div class="filter_wraps">
                                <div class="position-relative">
                                    <select id="sorting" class="form-control form-select">
                                        <option value="1">{{ $t('free') }}</option>
                                        <option value="2">{{ $t('most_popular') }}</option>
                                        <option value="3">{{ $t('most_viewed') }}</option>
                                        <option value="4">{{ $t('newest') }}</option>
                                        <option value="5">{{ $t('trending') }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="loading" class="text-center py-5">
                        <div class="spinner-border text-primary" role="status"></div>
                        <p class="mt-2">{{ $t('loading_courses') }}</p>
                    </div>

                    <div v-else class="row g-xl-3 g-4 mb-5">
                
                        <div 
                            class="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                            v-for="(item, index) in courses"
                            :key="index"
                        >
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="item.slug ? `/course-detail/${item.slug}` : `/course-detail/${item.id}`"><img :src="item.thumbnail" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="item.slug ? `/course-detail/${item.slug}` : `/course-detail/${item.id}`">{{item.title}}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{ getLecturesCount(item) }} {{ $t('lectures') }}</li>
                                            <li class="text-capitalize"><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>{{item.price}} FCFA</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">4.9</span><span class="total-reviews">(124)</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="getInstructorAvatar(item)" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{ getInstructorName(item) }}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><NuxtLink :to="item.slug ? `/course-detail/${item.slug}` : `/course-detail/${item.id}`" class="main-link fw-medium">{{ $t('enrolled_now') }}<i class="bi bi-arrow-right ms-2"></i></NuxtLink></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <!-- Pagination -->
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <ul class="pagination d-flex align-items-center justify-content-center">
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Previous">
                                            <span class="ti-arrow-left"></span>
                                            <span class="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item active"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link" href="#"><i class="bi bi-three-dots"></i></a></li>
                                        <li class="page-item"><a class="page-link" href="#">18</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Next">
                                            <span class="ti-arrow-right"></span>
                                            <span class="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

    <FooterTop />
    <Footer />
    <ScrollToTop />

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import SidebarOne from '@/components/Courses/courses-grid-sidebar/grid-with-sidebar/SidebarOne.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import Footer from '@/components/Footer/Footer.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const api = useApi()
const courses = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await api('/courses')
        courses.value = response.data
    } catch (error) {
        console.error('Failed to fetch courses:', error)
    } finally {
        loading.value = false
    }
})

const getInstructorAvatar = (course) => {
    return course.instructor?.user?.avatar || '/assets/img/avatar-1.jpg'
}

const getInstructorName = (course) => {
    return course.instructor?.user?.name || 'Instructor'
}

const getLecturesCount = (course) => {
    // Si l'API ne renvoie pas le compte, on simule ou on calcule
    return course.sections?.reduce((acc, s) => acc + (s.lessons?.length || 0), 0) || 12
}

</script>