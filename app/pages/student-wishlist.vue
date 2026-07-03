<template>

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <StudentAdminSidebar />
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Student Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Wishlist</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                    
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
                                <div class="head-title"><h4 class="mb-2 mb-sm-0">Wishlist Courses</h4></div>
                            </div>
                        </div>
                        
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div v-if="loading" class="text-center py-5">
                                <div class="spinner-border text-main" role="status"></div>
                            </div>
                            <div v-else-if="wishlistItems.length > 0" class="row g-3">
                                    
                                <div 
                                    class="col-xl-2 col-lg-2 col-md-3 col-sm-4"
                                    v-for="item in wishlistItems"
                                    :key="item.id"
                                >
                                    <div class="education_block_grid border">
                                    
                                         <div class="education-thumb position-relative">
                                            <NuxtLink :to="`/course-detail/${item.course.slug}`">
                                                <img :src="item.course.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid" alt="">
                                            </NuxtLink>
                                            <div class="course-hours position-absolute top-0 start-0 ms-2 mt-2">
                                                <span class="badge bg-dark rounded-pill"><i class="bi bi-clock-history me-1"></i>{{item.course.duration || 'N/A'}}</span>
                                            </div>
                                            <button @click="removeFromWishlist(item.course.id)" class="btn btn-sm btn-danger position-absolute top-0 end-0 me-2 mt-2 rounded-circle shadow-sm" title="Remove from wishlist">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                        
                                        <div class="education-body p-3">
                                            <div class="education-title">
                                                <div class="course-type d-flex align-items-center gap-2 mb-1">
                                                    <span class="badge bg-light-green text-green rounded-pill">{{ item.course.level ? $t(item.course.level.toLowerCase()) : $t('beginner') }}</span>
                                                </div>
                                                <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.course.slug}`" class="text-dark">{{item.course.title}}</NuxtLink></h4>
                                            </div>
                                            
                                            <div class="courses-ratings mb-4">
                                                <div class="d-flex align-items-center gap-1">
                                                    <div class="stars d-flex align-items-center gap-1">
                                                        <i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i><i class="bi bi-star-fill text-warning"></i>
                                                    </div>
                                                    <span class="overall-rates text-dark fw-medium ms-1">{{item.course.rating || '0'}}</span>
                                                </div>
                                            </div>
                                            
                                            <div class="education_block_author">
                                                <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                                    <span class="square--40"><img :src="item.course.instructor?.user?.avatar || '/img/avatar-placeholder.jpg'" class="img-fluid circle" alt="Author"></span>
                                                    <div class="d-flex align-items-start flex-column">
                                                        <span class="text-dark fw-light opacity-75">Lectures By:</span><span class="text-dark fw-semibold">{{item.course.instructor?.user?.name || 'Instructor'}}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div class="education-footer p-3">
                                                <h5 class="m-0 fw-semibold text-red">{{ item.course.price }} FCFA</h5>
                                            </div>
                                            <div class="enrolled-link">
                                                <NuxtLink :to="`/course-detail/${item.course.slug}`" class="main-link fw-medium">View Details<i class="bi bi-arrow-right ms-2"></i></NuxtLink>
                                            </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="text-center py-5 bg-white rounded-3 shadow-sm">
                                <p class="text-muted">Your wishlist is empty.</p>
                                <NuxtLink to="/student-all-courses" class="btn btn-outline-main mt-2">Browse Courses</NuxtLink>
                            </div>

                        </div>
                    </div>

                    
                </div>
            
            </div>
            
        </div>
    </section>

</template>

<script setup>
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';

const api = useApi()

// Protège la route
definePageMeta({
    layout: 'student',
    middleware: ['auth'],
});

const wishlistItems = ref([])

const loading = ref(true)

const fetchWishlist = async () => {
    loading.value = true
    try {
        const response = await api('/wishlist')
        wishlistItems.value = response.data
    } catch (error) {
        console.error('Failed to fetch wishlist:', error)
    } finally {
        loading.value = false
    }
}

const removeFromWishlist = async (courseId) => {
    try {
        await api(`/wishlist/${courseId}`, { method: 'DELETE' })
        // Refresh wishlist after removal
        await fetchWishlist()
    } catch (error) {
        console.error('Failed to remove from wishlist:', error)
    }
}

onMounted(() => {
    fetchWishlist()
})

/* Banner Background */

</script>