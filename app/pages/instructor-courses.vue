<template>

    <Preloader />
    <InstructorNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <Sidebar />						
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Instructor Dashboard</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Courses</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">My All Courses</h4>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="row g-3 align-items-center justify-content-between mb-4">
                                        <div class="col-md-7">
                                            <form class="rounded position-relative">
                                                <input class="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search">
                                                <button class="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                                                    <i class="bi bi-search text-muted opacity-75 fs-6 "></i>
                                                </button>
                                            </form>
                                        </div>

                                        <div class="col-md-3">
                                            <form>
                                                <div class="position-relative">
                                                    <select id="sorting" class="form-control form-select">
                                                        <option value="1">Free</option>
                                                        <option value="2">Most Popular</option>
                                                        <option value="3">Most Viewed</option>
                                                        <option value="4">Newest</option>
                                                        <option value="5">Trending</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                
                                    <div class="table-responsive border-0 rounded-3">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">Course Title</th>
                                                    <th scope="col" class="border-0">Enrolled</th>
                                                    <th scope="col" class="border-0">Status</th>
                                                    <th scope="col" class="border-0">Price</th>
                                                    <th scope="col" class="border-0 rounded-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr
                                                    v-for="(item, index) in courses" 
                                                    :key="index"
                                                >
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2">
                                                            <div class="w-15">
                                                                <img :src="item.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid rounded" alt="" @error="(e) => e.target.src = '/img/course-placeholder.jpg'">
                                                            </div>
                                                            <div class="courses-info">
                                                                <h6 class="mb-0 fw-semibold table-responsive-title">	
                                                                    <NuxtLink :to="`/course-detail/${item.slug}`">{{item.title}}</NuxtLink>
                                                                 </h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span class="text-muted-2">{{item.enrollments_count || 0}}</span></td>
                                                    
                                                    <td>
                                                        <span v-if="item.status === 'published'" class="badge bg-light-green text-green">Published</span>
                                                        <span v-else-if="item.status === 'draft'" class="badge bg-light text-secondary">Draft</span>
                                                        <span v-else class="badge bg-light-red text-red">{{ item.status }}</span>
                                                    </td>
                                                    
                                                    <td>
                                                        <span class="text-muted-2">{{ item.is_free ? 'Free' : item.price + ' FCFA' }}</span>
                                                    </td>
                                                    <td>
                                                        <NuxtLink :to="`/instructor-manage-curriculum-${item.id}`" class="btn btn-sm btn-gray me-1 mb-0"><i class="bi bi-pencil-square"></i></NuxtLink>
                                                        <button @click="deleteCourse(item.id)" class="btn btn-sm btn-light-red mb-0"><i class="bi bi-trash3"></i></button>
                                                    </td>
                                                </tr>
                                                        
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- Pagination -->
                                    <div class="d-sm-flex justify-content-sm-between align-items-sm-center mt-3">
                                        <p class="mb-0 text-center text-sm-start text-muted">Showing 1 to 8 of 20 entries</p>
                                        <nav class="d-flex justify-content-center mb-0" aria-label="navigation">
                                            <ul class="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                                                <li class="page-item mb-0"><a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item mb-0 active"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#">4</a></li>
                                                <li class="page-item mb-0"><a class="page-link" href="#"><i class="fas fa-angle-right"></i></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            
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
import { ref, onMounted } from 'vue'
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const api = useApi()
const courses = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await api('/instructor/courses')
        courses.value = response.data
    } catch (error) {
        console.error('Failed to fetch instructor courses:', error)
    } finally {
        loading.value = false
    }
})

const deleteCourse = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            await api(`/instructor/courses/${id}`, { method: 'DELETE' })
            courses.value = courses.value.filter(c => c.id !== id)
        } catch (error) {
            console.error('Failed to delete course:', error)
            alert('Failed to delete course.')
        }
    }
}
</script>