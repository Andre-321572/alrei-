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
                                    <li class="breadcrumb-item"><NuxtLink to="/">{{ $t('home') }}</NuxtLink></li>
                                    <li class="breadcrumb-item"><NuxtLink to="/instructor-dashboard">{{ $t('instructor_dashboard') }}</NuxtLink></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('orders') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">{{ $t('all_orders') }}</h4>
                                    </div>
                                </div>

                                <!-- Card body START -->
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
                
                                    <div v-if="loading" class="text-center py-5">
                                        <div class="spinner-border text-main" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>

                                    <div v-else-if="orders.length === 0" class="text-center py-5">
                                        <p class="text-muted mb-0">{{ $t('no_orders_found') }}</p>
                                    </div>

                                    <div v-else class="table-responsive border-0 rounded-3">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">{{ $t('order_title') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('order_id') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('date') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('amount') }}</th>
                                                    <th scope="col" class="border-0 rounded-end">{{ $t('payment') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in orders" :key="item.id">
                                                    <td>
                                                        <h6 class="mb-0 fw-semibold table-responsive-title">	
                                                            <NuxtLink :to="`/course-detail/${item.course.slug}`">{{ item.course.title }}</NuxtLink>
                                                        </h6>
                                                    </td>
                                                    <td>
                                                        <span class="text-dark">#{{ item.id }}</span>
                                                    </td>
                                                    <td><span class="text-muted-2">{{ new Date(item.created_at).toLocaleDateString() }}</span></td>
                                                    <td>
                                                        <span class="text-muted-2">{{ item.amount }} FCFA</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge" :class="item.payment_status === 'paid' ? 'bg-light-green text-green' : 'bg-light-red text-red'">
                                                            {{ item.payment_status }}
                                                        </span>
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

// Middleware to ensure user is an instructor
definePageMeta({
    middleware: ['instructor']
})

const api = useApi()
const orders = ref([])
const loading = ref(true)

const loadOrders = async () => {
    loading.value = true
    try {
        const response = await api('/instructor/orders')
        orders.value = response.data
    } catch (error) {
        console.error('Failed to load orders:', error)
    } finally {
        loading.value = false
    }
}

onMounted(loadOrders)
</script>