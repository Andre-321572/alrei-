<template>
    <div>
        <!-- Hero Header -->
        <div class="bg-cover py-5 border-bottom text-white" style="background: linear-gradient(to right, rgba(15, 35, 20, 0.85) 0%, rgba(15, 35, 20, 0.6) 100%), url('/img/student-banner.png'); background-position: center; background-size: cover;">
            <div class="container py-4 position-relative z-1 text-center">
                <div class="row justify-content-center">
                    <div class="col-lg-9 col-xl-8">
                        <h1 class="display-5 fw-extrabold text-white mb-3 lh-sm" style="text-shadow: 0 2px 4px rgba(0,0,0,0.6);">{{ $t('courses_hero_title') }}</h1>
                        <p class="lead text-white mb-0 fs-5 fw-medium lh-base" style="opacity: 0.95; text-shadow: 0 2px 4px rgba(0,0,0,0.7);">
                            {{ $t('courses_hero_subtitle') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ITCILO Filter Navigation Bar & Popover Panel (Exact Style of Image 2) -->
        <div class="itcilo-filter-wrapper bg-white border-bottom shadow-sm">
            <div class="container position-relative">
                <div class="d-flex flex-wrap align-items-center justify-content-start gap-4 py-3 text-uppercase fw-bold fs-7 letter-spacing-1">
                    
                    <!-- Tab: TYPE -->
                    <button 
                        @click="toggleTab('TYPE')" 
                        class="btn btn-link text-decoration-none p-0 border-0 fw-bold fs-7 d-inline-flex align-items-center gap-1 transform-none"
                        :class="activeTab === 'TYPE' ? 'text-primary' : 'text-secondary'"
                    >
                        <span>{{ $t('filter_type') }}</span>
                        <i :class="activeTab === 'TYPE' ? 'bi bi-chevron-up text-primary' : 'bi bi-chevron-down text-muted'"></i>
                        <span v-if="selectedTypes.length > 0" class="badge bg-primary text-white rounded-circle ms-1 small px-2 py-1">{{ selectedTypes.length }}</span>
                    </button>

                    <!-- Tab: TOPIC -->
                    <button 
                        @click="toggleTab('TOPIC')" 
                        class="btn btn-link text-decoration-none p-0 border-0 fw-bold fs-7 d-inline-flex align-items-center gap-1 transform-none"
                        :class="activeTab === 'TOPIC' ? 'text-primary' : 'text-secondary'"
                    >
                        <span>{{ $t('filter_topic') }}</span>
                        <i :class="activeTab === 'TOPIC' ? 'bi bi-chevron-up text-primary' : 'bi bi-chevron-down text-muted'"></i>
                        <span v-if="selectedTopics.length > 0" class="badge bg-primary text-white rounded-circle ms-1 small px-2 py-1">{{ selectedTopics.length }}</span>
                    </button>

                    <!-- Tab: LANGUAGE -->
                    <button 
                        @click="toggleTab('LANGUAGE')" 
                        class="btn btn-link text-decoration-none p-0 border-0 fw-bold fs-7 d-inline-flex align-items-center gap-1 transform-none"
                        :class="activeTab === 'LANGUAGE' ? 'text-primary' : 'text-secondary'"
                    >
                        <span>{{ $t('filter_language') }}</span>
                        <i :class="activeTab === 'LANGUAGE' ? 'bi bi-chevron-up text-primary' : 'bi bi-chevron-down text-muted'"></i>
                        <span v-if="selectedLanguages.length > 0" class="badge bg-primary text-white rounded-circle ms-1 small px-2 py-1">{{ selectedLanguages.length }}</span>
                    </button>

                    <!-- Tab: MODE -->
                    <button 
                        @click="toggleTab('MODE')" 
                        class="btn btn-link text-decoration-none p-0 border-0 fw-bold fs-7 d-inline-flex align-items-center gap-1 transform-none"
                        :class="activeTab === 'MODE' ? 'text-primary' : 'text-secondary'"
                    >
                        <span>{{ $t('filter_mode') }}</span>
                        <i :class="activeTab === 'MODE' ? 'bi bi-chevron-up text-primary' : 'bi bi-chevron-down text-muted'"></i>
                        <span v-if="selectedModes.length > 0" class="badge bg-primary text-white rounded-circle ms-1 small px-2 py-1">{{ selectedModes.length }}</span>
                    </button>

                    <!-- Tab: PLACE -->
                    <button 
                        @click="toggleTab('PLACE')" 
                        class="btn btn-link text-decoration-none p-0 border-0 fw-bold fs-7 d-inline-flex align-items-center gap-1 transform-none"
                        :class="activeTab === 'PLACE' ? 'text-primary' : 'text-secondary'"
                    >
                        <span>{{ $t('filter_place') }}</span>
                        <i :class="activeTab === 'PLACE' ? 'bi bi-chevron-up text-primary' : 'bi bi-chevron-down text-muted'"></i>
                        <span v-if="selectedPlaces.length > 0" class="badge bg-primary text-white rounded-circle ms-1 small px-2 py-1">{{ selectedPlaces.length }}</span>
                    </button>

                    <button v-if="hasActiveFilters" @click="resetFilters" class="btn btn-link text-danger text-decoration-none small ms-auto fw-semibold p-0">
                        <i class="bi bi-x-circle me-1"></i>{{ $t('reset_search') }}
                    </button>
                </div>

                <!-- Popover Panel (Exact ITCILO Box Style from Image 2) -->
                <div v-if="activeTab" class="itcilo-popover card border-0 shadow-lg rounded-3 p-4 position-absolute start-0 z-3 mt-1 w-100" style="background: white;">
                    <!-- Pointer Caret -->
                    <div class="popover-caret" :style="caretStyle"></div>

                    <div class="popover-body-content">
                        <!-- TYPE options -->
                        <div v-if="activeTab === 'TYPE'" class="d-flex flex-wrap gap-4 align-items-center py-2">
                            <label v-for="opt in typeOptions" :key="opt.value" class="form-check d-flex align-items-center gap-2 cursor-pointer m-0">
                                <input type="checkbox" class="form-check-input mt-0" :value="opt.value" v-model="selectedTypes">
                                <span class="form-check-label fw-bold text-dark fs-6">{{ opt.label }}</span>
                            </label>
                        </div>

                        <!-- TOPIC options -->
                        <div v-if="activeTab === 'TOPIC'" class="d-flex flex-wrap gap-4 align-items-center py-2">
                            <label v-for="opt in topicOptions" :key="opt.value" class="form-check d-flex align-items-center gap-2 cursor-pointer m-0">
                                <input type="checkbox" class="form-check-input mt-0" :value="opt.value" v-model="selectedTopics">
                                <span class="form-check-label fw-bold text-dark fs-6">{{ opt.label }}</span>
                            </label>
                        </div>

                        <!-- LANGUAGE options -->
                        <div v-if="activeTab === 'LANGUAGE'" class="d-flex flex-wrap gap-4 align-items-center py-2">
                            <label v-for="opt in languageOptions" :key="opt.value" class="form-check d-flex align-items-center gap-2 cursor-pointer m-0">
                                <input type="checkbox" class="form-check-input mt-0" :value="opt.value" v-model="selectedLanguages">
                                <span class="form-check-label fw-bold text-dark fs-6">{{ opt.label }}</span>
                            </label>
                        </div>

                        <!-- MODE options -->
                        <div v-if="activeTab === 'MODE'" class="d-flex flex-wrap gap-4 align-items-center py-2">
                            <label v-for="opt in modeOptions" :key="opt.value" class="form-check d-flex align-items-center gap-2 cursor-pointer m-0">
                                <input type="checkbox" class="form-check-input mt-0" :value="opt.value" v-model="selectedModes">
                                <span class="form-check-label fw-bold text-dark fs-6">{{ opt.label }}</span>
                            </label>
                        </div>

                        <!-- PLACE options -->
                        <div v-if="activeTab === 'PLACE'" class="d-flex flex-wrap gap-4 align-items-center py-2">
                            <label v-for="opt in placeOptions" :key="opt.value" class="form-check d-flex align-items-center gap-2 cursor-pointer m-0">
                                <input type="checkbox" class="form-check-input mt-0" :value="opt.value" v-model="selectedPlaces">
                                <span class="form-check-label fw-bold text-dark fs-6">{{ opt.label }}</span>
                            </label>
                        </div>

                        <!-- Popover Action Footer -->
                        <div class="d-flex justify-content-end align-items-center gap-2 mt-4 pt-3 border-top">
                            <button @click="resetTabFilters(activeTab)" class="btn btn-light text-secondary fw-bold px-3 py-2 rounded-2 text-uppercase small" style="background: #f1f5f9; border: 1px solid #cbd5e1;">
                                {{ $t('reset') }}
                            </button>
                            <button @click="applyFilters" class="btn btn-primary fw-bold px-4 py-2 rounded-2 text-uppercase small text-white shadow-sm" style="background-color: #0082c8; border-color: #0082c8;">
                                {{ $t('apply') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-5 bg-white">
            <div class="container">
                <div v-if="filtered.length > 0" class="row g-4">
                    <div class="col-lg-4 col-md-6" v-for="item in filtered" :key="item.id">
                        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
                            <div class="position-relative">
                                <img :src="item.image" class="card-img-top object-fit-cover" style="height: 200px;" :alt="item.title" @error="(e) => { e.target.src = getFallback(item.id) }">
                                <div class="position-absolute top-0 start-0 m-3">
                                    <span class="badge bg-main text-white px-3 py-2 rounded-pill shadow-sm">{{ item.badge }}</span>
                                </div>
                            </div>
                            
                            <div class="card-body d-flex flex-column p-4">
                                <div class="mb-2">
                                    <span class="badge bg-light-main text-main"><i class="bi bi-person-badge me-1"></i>{{ item.accessType }}</span>
                                </div>
                                
                                <h5 class="card-title fs-6 fw-bold mb-3">
                                    <NuxtLink :to="localePath('/course-detail/' + item.id)" class="text-dark text-decoration-none">{{ item.title }}</NuxtLink>
                                </h5>
                                
                                <p class="card-text text-muted small mb-3 flex-grow-1 lh-base">{{ item.desc }}</p>
                                
                                <div class="bg-light p-3 rounded-3 mb-3 small">
                                    <div class="text-muted"><i class="bi bi-laptop me-2 text-main"></i><strong>{{ $t('format_label') }}</strong> {{ item.format }}</div>
                                    <div class="text-muted mt-1"><i class="bi bi-calendar-event me-2 text-main"></i><strong>{{ $t('schedule_label') }}</strong> {{ item.schedule }}</div>
                                </div>

                                <NuxtLink :to="localePath('/course-detail/' + item.id)" class="btn btn-main rounded-pill w-100 fw-semibold">
                                    {{ $t('read_announcement') }} <i class="bi bi-arrow-right ms-2"></i>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-5">
                    <div class="square--60 circle bg-light-main text-main mx-auto mb-3 fs-3">
                        <i class="bi bi-search"></i>
                    </div>
                    <h5 class="fw-bold mb-2">{{ $t('no_courses_match') }}</h5>
                    <p class="text-muted max-w-500 mx-auto small mb-4">
                        {{ $t('no_courses_sub') }}
                    </p>
                    <button @click="resetFilters" class="btn btn-outline-main rounded-pill px-4 btn-sm fw-bold">
                        {{ $t('reset_search') }}
                    </button>
                </div>
            </div>
        </section>

        <!-- Banner d'accès aux formations -->
        <section class="py-4 bg-alrei-green text-white">
            <div class="container text-center">
                <h4 class="text-white fw-bold mb-2 fs-5">{{ $t('access_help_title') }}</h4>
                <p class="small text-white opacity-90 mb-3">{{ $t('access_help_desc') }}</p>
                <div class="d-flex justify-content-center gap-3">
                    <NuxtLink :to="localePath('/pricing')" class="btn btn-warning rounded-pill px-4 text-dark fw-bold btn-sm">
                        {{ $t('check_access_conditions') }}
                    </NuxtLink>
                    <NuxtLink :to="localePath('/faq')" class="btn btn-outline-light rounded-pill px-4 btn-sm fw-bold">
                        {{ $t('faq_button') }}
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const api = useApi()
const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()

const search = ref(route.query.q || '')
const selectedDomain = ref('')
const selectedAccess = ref('')

const activeTab = ref(null)
const selectedTypes = ref([])
const selectedTopics = ref([])
const selectedLanguages = ref([])
const selectedModes = ref([])
const selectedPlaces = ref([])

const courses = ref([])
const filtered = ref([])
const loading = ref(true)

const typeOptions = computed(() => [
    { value: 'Standard Course', label: t('type_standard') },
    { value: 'Free', label: t('type_free') },
    { value: 'Master', label: t('type_master') }
])

const topicOptions = computed(() => [
    { value: 'Leadership', label: t('theme_leadership') },
    { value: 'Syndicalisation', label: t('theme_unionization') },
    { value: 'Économie', label: t('theme_economy') },
    { value: 'Climat', label: t('theme_climate') },
    { value: 'Numérisation', label: t('theme_digitalization') }
])

const languageOptions = computed(() => [
    { value: 'French', label: t('french') },
    { value: 'English', label: t('english') },
    { value: 'Portuguese', label: t('portuguese') }
])

const modeOptions = computed(() => [
    { value: 'Self-paced', label: t('online_self_paced') },
    { value: 'Facilitated', label: t('online_facilitated') },
    { value: 'Hybrid', label: t('mode_hybrid') }
])

const placeOptions = computed(() => [
    { value: 'Online', label: t('place_online') },
    { value: 'Africa', label: t('place_africa') },
    { value: 'International', label: t('place_international') }
])

const toggleTab = (tab) => {
    activeTab.value = activeTab.value === tab ? null : tab
}

const caretStyle = computed(() => {
    const map = {
        TYPE: '25px',
        TOPIC: '95px',
        LANGUAGE: '180px',
        MODE: '280px',
        PLACE: '360px'
    }
    return { left: map[activeTab.value] || '25px' }
})

const hasActiveFilters = computed(() => {
    return (
        search.value.trim() !== '' ||
        selectedDomain.value !== '' ||
        selectedAccess.value !== '' ||
        selectedTypes.value.length > 0 ||
        selectedTopics.value.length > 0 ||
        selectedLanguages.value.length > 0 ||
        selectedModes.value.length > 0 ||
        selectedPlaces.value.length > 0
    )
})

const filterCourses = () => {
    let result = [...courses.value]
    
    if (search.value.trim()) {
        const q = search.value.toLowerCase()
        result = result.filter(c => (c.title || '').toLowerCase().includes(q) || (c.desc || '').toLowerCase().includes(q))
    }
    if (selectedDomain.value) {
        result = result.filter(c => (c.title || '').toLowerCase().includes(selectedDomain.value.toLowerCase()) || (c.desc || '').toLowerCase().includes(selectedDomain.value.toLowerCase()))
    }
    if (selectedAccess.value) {
        result = result.filter(c => (c.accessType || '').toLowerCase().includes(selectedAccess.value.toLowerCase()))
    }

    if (selectedTypes.value.length > 0) {
        result = result.filter(c => {
            return selectedTypes.value.some(t => {
                if (t === 'Free') return !c.price || c.price == 0 || c.accessType?.toLowerCase().includes('libre')
                if (t === 'Master') return (c.title || '').toLowerCase().includes('master') || (c.badge || '').toLowerCase().includes('pro')
                return true
            })
        })
    }

    if (selectedTopics.value.length > 0) {
        result = result.filter(c => {
            return selectedTopics.value.some(top => (c.title || '').toLowerCase().includes(top.toLowerCase()) || (c.desc || '').toLowerCase().includes(top.toLowerCase()))
        })
    }

    if (selectedLanguages.value.length > 0) {
        result = result.filter(c => {
            return selectedLanguages.value.some(l => (c.language || 'French').toLowerCase().includes(l.toLowerCase()))
        })
    }

    if (selectedModes.value.length > 0) {
        result = result.filter(c => {
            return selectedModes.value.some(m => (c.format || 'Auto-formation').toLowerCase().includes(m.toLowerCase()))
        })
    }

    filtered.value = result
}

const resetTabFilters = (tab) => {
    if (tab === 'TYPE') selectedTypes.value = []
    if (tab === 'TOPIC') selectedTopics.value = []
    if (tab === 'LANGUAGE') selectedLanguages.value = []
    if (tab === 'MODE') selectedModes.value = []
    if (tab === 'PLACE') selectedPlaces.value = []
    filterCourses()
}

const applyFilters = () => {
    filterCourses()
    activeTab.value = null
}

const resetFilters = () => {
    search.value = ''
    selectedDomain.value = ''
    selectedAccess.value = ''
    selectedTypes.value = []
    selectedTopics.value = []
    selectedLanguages.value = []
    selectedModes.value = []
    selectedPlaces.value = []
    filtered.value = [...courses.value]
    activeTab.value = null
}

const fallbackImages = [
    '/img/co-1.jpg',
    '/img/co-2.jpg',
    '/img/co-3.jpg',
    '/img/co-4.jpg',
    '/img/co-5.jpg',
    '/img/co-6.jpg',
    '/img/co-7.jpg',
    '/img/co-8.jpg'
]
const getFallback = (idOrIndex) => {
    const idx = Math.abs(Number(idOrIndex) || 0) % fallbackImages.length
    return fallbackImages[idx]
}

const config = useRuntimeConfig()
const getImageUrl = (path, fallback) => {
    if (!path) return fallback
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
    if (path.startsWith('/img/') || path.startsWith('/assets/')) return path
    
    const apiBase = config.public.apiBase || 'http://localhost:8000/api'
    const backendUrl = apiBase.replace(/\/api\/?$/, '')
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    
    if (cleanPath.startsWith('storage/')) {
        return `${backendUrl}/${cleanPath}`
    }
    return `${backendUrl}/storage/${cleanPath}`
}

const fetchCourses = async () => {
    loading.value = true
    try {
        const response = await api('/courses')
        const rawList = Array.isArray(response) ? response : (response?.data || [])
        const { getThemeImage } = useCourseTheme()
        courses.value = rawList.map((c, idx) => {
            return {
                id: c.id,
                slug: c.slug || c.id,
                image: getThemeImage(c, idx),
                title: c.title,
                desc: c.subtitle || c.description || '',
                badge: c.level || 'Formation',
                format: c.format || 'Formation en ligne',
                schedule: c.schedule || 'Permanent',
                accessType: c.access_type || (c.is_free ? 'Libre' : 'Sur candidature'),
                price: c.price,
                language: c.language
            }
        })
        filterCourses()
    } catch (error) {
        console.error('Failed to fetch courses:', error)
        courses.value = []
        filtered.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchCourses()
})
</script>

<style scoped>
.border-slate {
    border-color: #cbd5e1 !important;
}
.course-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.1) !important;
}
.itcilo-filter-wrapper {
    border-bottom: 1px solid #e2e8f0;
}
.letter-spacing-1 {
    letter-spacing: 0.05em;
}
.itcilo-popover {
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
}
.popover-caret {
    position: absolute;
    top: -8px;
    width: 14px;
    height: 14px;
    background: white;
    transform: rotate(45deg);
    border-left: 1px solid #e2e8f0;
    border-top: 1px solid #e2e8f0;
}
</style>
