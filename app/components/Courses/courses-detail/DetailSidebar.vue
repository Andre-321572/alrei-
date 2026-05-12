<template>
    <div class="ed_view_box border">

        <div class="courses-video">
            <div class="thumb">
                <img class="pro_img img-fluid w100" :src="course.thumbnail || '/img/course-placeholder.jpg'" alt="">
                <div v-if="course.video_preview" class="overlay_icon">
                    <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="bb-video-box">
                        <a href="#" class="play-popup-video">
                            <i class="bi bi-play-fill"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="author-body py-3">
            <div class="ed_view_price">
                <span v-if="course.discount_price" class="badge bg-light-red text-red rounded-pill">{{ Math.round((1 - course.discount_price / course.price) * 100) }}% off</span>
                <h2 class="lh-base">{{ course.discount_price || course.price }} FCFA</h2>
                <del v-if="course.discount_price" class="text-muted small">{{ course.price }} FCFA</del>
            </div>
            
            <div class="ed_view_link d-flex align-items-center justify-content-center flex-column gap-3 mt-4 p-0">
                <button @click="handleAddToCart" class="btn btn-gray rounded-pill w-100" :disabled="isInCart">
                    <i class="bi bi-basket2 me-2"></i>{{ isInCart ? $t('in_cart') : $t('add_to_cart') }}
                </button>
                <button @click="handleBuyNow" class="btn btn-main w-100 rounded-pill">{{ $t('buy_now') }}</button>
                <button v-if="course.access_key" @click="handleEnrollWithKey" class="btn btn-outline-secondary w-100 rounded-pill">
                    <i class="bi bi-key me-2"></i>{{ $t('enroll_with_key') }}
                </button>
                <button @click="handleAddToWishlist" class="btn btn-outline-main w-100 rounded-pill">
                    <i class="bi bi-heart me-2"></i>{{ $t('add_to_wishlist') }}
                </button>
            </div>

        </div>

    </div>

    <div class="edu_wraper border">
        <h4 class="edu_title">{{ $t('course_features') }}</h4>
        <ul class="edu_list right">
            <li>
                <span class="info-title"><i class="bi bi-bar-chart"></i>{{ $t('level') }}</span>
                <span class="text-dark right">{{ course.level }}</span>
            </li>
            <li>
                <span class="info-title"><i class="bi bi-flag"></i>{{ $t('language') }}</span>
                <span class="text-dark right">{{ course.language }}</span>
            </li>
            <li>
                <span class="info-title"><i class="bi bi-clock-history"></i>{{ $t('updated_at') }}</span>
                <span class="text-dark right">{{ new Date(course.created_at).toLocaleDateString() }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    course: {
        type: Object,
        required: true
    }
})

const { addToCart, cart } = useCart()
const { isAuthenticated } = useAuth()
const router = useRouter()
const api = useApi()

const isInCart = computed(() => cart.value.some(item => item.id === props.course.id))

const handleAddToCart = () => {
    addToCart(props.course)
}

const handleBuyNow = () => {
    addToCart(props.course)
    router.push('/checkout')
}

const handleAddToWishlist = async () => {
    if (!isAuthenticated.value) {
        router.push('/login')
        return
    }

    try {
        await api('/wishlist', {
            method: 'POST',
            body: { course_id: props.course.id }
        })
        alert('Course added to wishlist!')
    } catch (error) {
        console.error('Failed to add to wishlist:', error)
        alert('Failed to add to wishlist. Maybe it is already there?')
    }
}
const handleEnrollWithKey = async () => {
    if (!isAuthenticated.value) {
        router.push('/login')
        return
    }

    const key = prompt('Please enter the course access key:')
    if (!key) return

    try {
        await api(`/courses/${props.course.id}/enroll-with-key`, {
            method: 'POST',
            body: { access_key: key }
        })
        alert('Successfully enrolled!')
        router.push('/student-dashboard')
    } catch (error) {
        console.error('Enrollment failed:', error)
        alert('Invalid access key or enrollment failed.')
    }
}
</script>