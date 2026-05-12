<template>
    <Preloader />
    <NavDark />

    <section class="bg-cover page-title" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="pageTitle-wrap text-center">
                        <h1 class="text-light">{{ $t('checkout') }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5 bg-light">
        <div class="container">
            <div v-if="count > 0" class="row">
                <div class="col-lg-8 col-md-12">
                    <div class="cart_totals checkout mb-4">
                        <h4>{{ $t('your_cart') }}</h4>
                        <div class="table-responsive">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr v-for="item in cart" :key="item.id" class="border-bottom">
                                        <td>
                                            <div class="d-flex align-items-center gap-3">
                                                <img :src="item.thumbnail || '/img/course-placeholder.jpg'" width="80" class="rounded" alt="">
                                                <div>
                                                    <h6 class="mb-0">{{ item.title }}</h6>
                                                    <span class="text-muted small">{{ item.instructor?.user?.name }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-end fw-bold">
                                            <span v-if="(item.discount_price || item.price) == 0" class="text-green">{{ $t('free') }}</span>
                                            <span v-else>{{ item.discount_price || item.price }} FCFA</span>
                                        </td>
                                        <td class="text-end">
                                            <button @click="removeFromCart(item.id)" class="btn btn-sm text-danger"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4 col-md-12">
                    <div class="cart_totals checkout">
                        <h4>{{ $t('order_summary') }}</h4>
                        <div class="cart-wrap">
                            <div class="flex_cart mb-4">
                                <div class="flex_cart_1 fs-5 fw-bold">{{ $t('total_cost') }}</div>
                                <div class="flex_cart_2 text-green fs-4 fw-bold">{{ total }} FCFA</div>
                            </div>
                            <button @click="handleCheckout" :disabled="loading" class="btn btn-main w-100 py-3 fs-6">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                {{ total == 0 ? $t('enroll_now') : $t('proceed_to_payment') }}<i class="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-else class="text-center py-5">
                <i class="bi bi-cart-x display-1 text-muted"></i>
                <h3 class="mt-4">{{ $t('cart_empty') }}</h3>
                <NuxtLink to="/courses" class="btn btn-main mt-3">{{ $t('browse_courses') }}</NuxtLink>
            </div>
        </div>
    </section>

    <FooterTop />
    <FooterDark />
    <ScrollToTop />
</template>

<script setup>
import { ref } from 'vue'
import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const { cart, total, count, removeFromCart, clearCart } = useCart()
const { isAuthenticated } = useAuth()
const api = useApi()
const loading = ref(false)

const handleCheckout = async () => {
    if (!isAuthenticated.value) {
        return navigateTo('/login')
    }

    loading.value = true
    try {
        const response = await api('/orders', {
            method: 'POST',
            body: {
                course_ids: cart.value.map(item => item.id),
                payment_method: total.value == 0 ? 'free' : 'stripe'
            }
        })

        if (total.value == 0) {
            clearCart()
            alert('Inscription réussie !')
            return navigateTo('/student-dashboard')
        }

        if (response.checkout_url) {
            // Rediriger vers Stripe
            window.location.href = response.checkout_url
        }
    } catch (error) {
        console.error('Checkout failed:', error)
        alert('Erreur lors de la création de la commande.')
    } finally {
        loading.value = false
    }
}
</script>