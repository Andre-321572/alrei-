
<template>
  <div>

    <Preloader />

    <NavDark />

    <section class="bg-gredient p-0">
        <div class="container-fluid px-0">
            <div class="ht-100"></div>
        </div>
    </section>

<template v-if="loading">
  <div class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2">{{ $t('loading_instructor') }}</p>
  </div>
</template>
<template v-else-if="mappedInstructor">
  <InstructorHeader :instructor="mappedInstructor" />
</template>
<template v-else>
  <div class="text-center py-5">
    <p>{{ $t('instructor_not_found') }}</p>
  </div>
</template>

    <FooterDark />
    <ScrollToTop />

</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from '#app'
import { useApi } from '@/composables/useApi'
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import InstructorHeader from '@/components/Courses/instructor-detail/InstructorHeader.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const route = useRoute()
const api = useApi()
const id = route.params.id
const instructor = ref(null)
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await api(`/instructors/${id}`)
        instructor.value = response.data
    } catch (error) {
        console.error('Failed to fetch instructor:', error)
    } finally {
        loading.value = false
    }
})

// Maper les données de l'API vers le format attendu par InstructorHeader
const mappedInstructor = computed(() => {
    if (!instructor.value) return null
    
    return {
        id: instructor.value.id,
        name: instructor.value.user?.name,
        image: instructor.value.user?.avatar || '/assets/img/avatar-1.jpg',
        roal: instructor.value.title || 'Instructor',
        company: instructor.value.user?.email, // Ou un autre champ
        skill: instructor.value.skills ? instructor.value.skills.split(',') : ['Expert'],
        rate: '4.9',
        review: '124',
        bio: instructor.value.bio,
        courses: instructor.value.courses || []
    }
})

</script>