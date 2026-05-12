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
                                    <li class="breadcrumb-item"><a href="#">{{ $t('home') }}</a></li>
                                    <li class="breadcrumb-item"><a href="#">{{ $t('instructor_dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('earning') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row gy-3 mb-4">
                
                        <div 
                            class="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            v-for="(item, index) in earningAbout" 
                            :key="index"
                        >
                            <div class="card rounded-3 border px-3 py-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div :class="`square--60 circle bg-light-${item.theme} fs-3`"><i :class="item.icon"></i></div>
                                    <div class="d-flex flex-column gap-1">
                                        <h2 class="fw-semibold m-0">{{item.value}}</h2><span class="text-muted">{{item.title}}</span>
                                    </div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border bg-transparent rounded-3">
                                <!-- Card header START -->
                                <div class="card-header border-bottom">
                                    <div class="d-flex align-items-center justify-content-between w-100">
                                        <h4 class="mb-2 mb-sm-0">{{ $t('recent_selling_courses') }}</h4>
                                        <a href="#" class="btns text-muted mb-0">{{ $t('view_all') }}</a>
                                    </div>
                                </div>

                                <!-- Card body START -->
                                <div class="card-body">
                                    <div class="table-responsive border-0 rounded-3">
                                        <table class="table align-middle p-4 mb-0">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col" class="border-0 rounded-start">{{ $t('course_name') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('selling') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('amount') }}</th>
                                                    <th scope="col" class="border-0">{{ $t('period') }}</th>
                                                    <th scope="col" class="border-0 rounded-end">{{ $t('action') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                 <tr v-if="loading">
                                                     <td colspan="5" class="text-center py-5">
                                                         <div class="spinner-border text-primary" role="status"></div>
                                                     </td>
                                                 </tr>
                                                 <tr v-else-if="recentSellingCourses.length === 0">
                                                     <td colspan="5" class="text-center py-5">
                                                         <p class="text-muted mb-0">Aucune vente récente.</p>
                                                     </td>
                                                 </tr>
                                                 <tr v-for="(item, index) in recentSellingCourses" :key="index">
                                                     <td>
                                                         <div class="d-flex align-items-center">
                                                             <div class="w-15">
                                                                 <img :src="item.course.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid rounded" alt="">
                                                             </div>
                                                             <h6 class="mb-0 fw-semibold ms-2 table-responsive-title">	
                                                                 <a href="#">{{item.course.title}}</a>
                                                             </h6>
                                                         </div>
                                                     </td>
                                                     <td><span class="text-muted-2">{{item.user.name}}</span></td>
                                                     <td><span class="text-muted-2">{{item.course.price}} FCFA</span></td>
                                                     <td>
                                                         <span class="badge bg-light-green text-green">{{ new Date(item.created_at).toLocaleDateString() }}</span>
                                                     </td>
                                                     <td>
                                                         <NuxtLink :to="`/course-detail/${item.course.slug}`" class="btn btn-sm btn-gray me-1 mb-0"><i class="bi bi-eye"></i></NuxtLink>
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
                                                <li class="page-item mb-0"><a class="page-link" href="#">5</a></li>
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
    middleware: ['instructor'],
});

import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const api = useApi()
const stats = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const loadData = async () => {
    loading.value = true
    try {
        const response = await api('/instructor/dashboard')
        stats.value = response
    } catch (err: any) {
        error.value = err?.data?.message || 'Impossible de charger les données.'
        console.error('Failed to fetch instructor earnings:', err)
    } finally {
        loading.value = false
    }
}

onMounted(loadData)

const earningAbout = computed(() => {
    const { t } = useI18n()
    return [
        {
            icon: 'bi bi-coin text-green',
            theme: 'green',
            value: `${stats.value?.earnings_month || 0} FCFA`,
            title: t('sales_this_month')
        },
        {
            icon: 'bi bi-wallet2 text-red',
            theme: 'red',
            value: `${stats.value?.pending_payout || 0} FCFA`,
            title: t('next_payout')
        },
        {
            icon: 'bi bi-piggy-bank text-main',
            theme: 'main',
            value: `${stats.value?.total_earnings || 0} FCFA`,
            title: t('sales_overall')
        },
    ]
})

const recentSellingCourses = computed(() => {
    return stats.value?.recent_enrollments || []
})

</script>