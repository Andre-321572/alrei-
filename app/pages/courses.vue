<template>

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-250"></div>
        </div>
    </section>

    <section class="pt-5 pb-5">
        <div class="container">

            <div class="row mb-4 align-items-center">
                <div class="col-lg-6">
                    <h3 class="fw-bold mb-1">{{ $t('explore_courses') }}</h3>
                    <p class="text-muted mb-0">{{ $t('explore_courses_sub') }}</p>
                </div>
                <div class="col-lg-6">
                    <div class="input-group">
                        <input
                            v-model="search"
                            type="text"
                            class="form-control rounded-pill-start"
                            :placeholder="$t('search_courses')"
                            @input="filterCourses"
                        />
                        <span class="input-group-text bg-main text-white border-main rounded-pill-end">
                            <i class="bi bi-search"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-main" role="status"></div>
            </div>

            <div v-else-if="filtered.length > 0" class="row g-4">
                <div
                    class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                    v-for="item in filtered"
                    :key="item.id"
                >
                    <div class="education_block_grid border course-card rounded-4 overflow-hidden">
                        <div class="education-thumb position-relative">
                            <NuxtLink :to="`/course-detail/${item.slug}`">
                                <img :src="item.thumbnail || '/img/course-placeholder.jpg'" class="img-fluid w-100 course-thumb" alt="" />
                            </NuxtLink>
                            <div class="course-hours position-absolute top-0 start-0 ms-3 mt-3">
                                <span class="badge bg-dark rounded-pill"><i class="bi bi-clock-history me-1"></i>{{ item.level }}</span>
                            </div>
                        </div>

                        <div class="education-body p-2 pt-3 pb-2">
                            <div class="education-title mb-2">
                                <h4 class="fs-6 fw-semibold lh-sm">
                                    <NuxtLink :to="`/course-detail/${item.slug}`">{{ item.title }}</NuxtLink>
                                </h4>
                            </div>
                            <div class="cources-info small text-muted">
                                <ul class="list-unstyled mb-0 d-flex flex-wrap gap-2">
                                    <li><i class="bi bi-person me-1"></i>{{ item.instructor?.user?.name }}</li>
                                    <li><i class="bi bi-bar-chart me-1"></i>{{ item.level }}</li>
                                    <li class="fw-semibold text-main"><i class="bi bi-coin me-1"></i>{{ item.price }} $</li>
                                </ul>
                            </div>
                        </div>

                        <div class="education-footer border-top p-2">
                            <NuxtLink :to="`/course-detail/${item.slug}`" class="btn btn-md btn-outline-main rounded-pill w-100">
                                {{ $t('view_course') }}<i class="bi bi-arrow-right ms-2"></i>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-5">
                <i class="bi bi-search fs-1 text-muted"></i>
                <p class="text-muted mt-3">{{ $t('no_courses_found') }}</p>
            </div>

        </div>
    </section>

</template>

<script setup>
definePageMeta({ layout: 'default' })

const api = useApi()
const courses = ref([])
const loading = ref(true)
const search = ref('')
const filtered = ref([])

const filterCourses = () => {
    const q = search.value.toLowerCase()
    filtered.value = q
        ? courses.value.filter(c => c.title?.toLowerCase().includes(q) || c.instructor?.user?.name?.toLowerCase().includes(q))
        : courses.value
}

onMounted(async () => {
    try {
        const response = await api('/courses', { params: { per_page: 100 } })
        courses.value = response.data
        filtered.value = response.data
    } catch (error) {
        console.error('Failed to fetch courses:', error)
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.course-card {
    box-shadow: 0 4px 18px rgba(0,0,0,0.07);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-color: #e8ecf0 !important;
}
.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.13);
}
.course-thumb {
    height: 135px;
    object-fit: cover;
    display: block;
}
.rounded-pill-start { border-radius: 50rem 0 0 50rem !important; }
.rounded-pill-end  { border-radius: 0 50rem 50rem 0 !important; }
</style>
