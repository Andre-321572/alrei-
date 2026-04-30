<template>

    <Preloader />
    <StudentNavbar />

    <section class="bg-cover p-0" :style="studentBg" data-overlay="4">
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
                                    <li class="breadcrumb-item active" aria-current="page">My Subscription</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="card border">
                            
                                <div class="card-header d-lg-flex justify-content-between align-items-center flex-wrap gap-1">
                                    <div class="mb-3 mb-lg-0">
                                        <h3 class="text-dark mb-0">My Subscriptions</h3>
                                        <p class="mb-0">Here is list of package/product that you have subscribed.</p>
                                    </div>
                                    <div>
                                        <NuxtLink to="/pricing" class="btn btn-light-red btn-sm rounded-2">Upgrade Now</NuxtLink>
                                    </div>
                                </div>
                                
                                <div class="card-body">
                                    <div v-if="loading" class="text-center py-5">
                                        <div class="spinner-border text-main" role="status"></div>
                                    </div>
                                    <div v-else-if="subscriptions.length > 0">
                                        <div 
                                            v-for="(sub, index) in subscriptions" 
                                            :key="sub.id"
                                            :class="['pt-0', index < subscriptions.length - 1 ? 'border-bottom pb-5 mb-5' : '']"
                                        >
                                            <div class="row mb-4">
                                                <div class="col-lg-6 col-md-8 col-7 mb-2 mb-lg-0">
                                                    <span class="d-block">
                                                        <span class="h4">{{ sub.plan.name }}</span>
                                                        <span :class="['badge ms-2', sub.status === 'active' ? 'bg-green' : 'bg-red']">{{ sub.status.toUpperCase() }}</span>
                                                    </span>
                                                    <p class="mb-0 fs-6">Subscription ID: {{ sub.subscription_id }}</p>
                                                </div>
                                                <div v-if="sub.status === 'active'" class="col-lg-3 col-md-4 col-5 mb-2 mb-lg-0">
                                                    <span>Auto Renewal</span>
                                                    <div class="form-check form-switch">
                                                        <input 
                                                            type="checkbox" 
                                                            class="form-check-input" 
                                                            :id="'switch' + sub.id" 
                                                            v-model="sub.auto_renew"
                                                            @change="toggleRenew(sub)"
                                                        >
                                                        <label class="form-check-label" :for="'switch' + sub.id"></label>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12 col-12 d-lg-flex align-items-start justify-content-end">
                                                    <NuxtLink to="/pricing" class="btn btn-light-main btn-sm">Change Plan</NuxtLink>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                    <span class="text-muted fs-6">Started On</span>
                                                    <h6 class="text-dark mb-0">{{ formatDate(sub.starts_at) }}</h6>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                    <span class="text-muted fs-6">Price</span>
                                                    <h6 class="text-dark mb-0">${{ sub.plan.price }} / {{ sub.plan.duration_days }} days</h6>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                    <span class="text-muted fs-6">Status</span>
                                                    <h6 class="text-dark mb-0">{{ sub.status === 'trialing' ? 'Free Trial' : 'Premium Access' }}</h6>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-6 mb-2 mb-lg-0">
                                                    <span class="text-muted fs-6">Billing Date</span>
                                                    <h6 class="text-dark mb-0">{{ sub.status === 'active' ? 'Next Billing on ' + formatDate(sub.ends_at) : 'Expired on ' + formatDate(sub.ends_at) }}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="text-center py-5">
                                        <div class="mb-3"><i class="bi bi-card-checklist fs-1 text-muted"></i></div>
                                        <p class="text-muted">You don't have any active subscriptions.</p>
                                        <NuxtLink to="/pricing" class="btn btn-main mt-2">View Pricing Plans</NuxtLink>
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
import { ref, onMounted, computed } from 'vue'
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const api = useApi()

// Protège la route
definePageMeta({
    middleware: ['auth'],
});

const subscriptions = ref([])

const loading = ref(true)

const fetchSubscriptions = async () => {
    loading.value = true
    try {
        const response = await api('/my-subscriptions')
        subscriptions.value = response.data
    } catch (error) {
        console.error('Failed to fetch subscriptions:', error)
    } finally {
        loading.value = false
    }
}

const toggleRenew = async (sub) => {
    try {
        await api(`/subscriptions/toggle-renew/${sub.id}`, {
            method: 'POST',
            body: { auto_renew: sub.auto_renew }
        })
    } catch (error) {
        console.error('Failed to update renewal status:', error)
        // Revert UI if failed
        sub.auto_renew = !sub.auto_renew
    }
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

onMounted(() => {
    fetchSubscriptions()
})

/* Banner Background */
import studentbg from '@/assets/img/student-bg.jpg'

const studentBg = computed(() => ({
    background: `url(${studentbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}))

</script>