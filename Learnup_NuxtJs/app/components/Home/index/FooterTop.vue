<template>
    <section class="bg-cover newsletter bg-main" :style="sectionStyle">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-8 col-sm-12">
                    <div class="text-center">
                        <div class="subscribe-caption d-block mb-4">
                            <h2 class="text-light">Join Thousand of Happy Students!</h2>
                            <p class="text-light opacity-75">Subscribe our newsletter & get latest news and updation!</p>
                        </div>
                        <form class="subscribe-form" @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <input v-model="email" type="email" class="form-control rounded-pill" placeholder="Your Email Address" required="required">
                                <input type="submit" class="btn btn-dark rounded-pill" value="Get Started">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

import subscribeBg from '@/assets/img/subscribe-bg.png'

const email = ref('')

const sectionStyle = computed(() => ({
  backgroundImage: `url(${subscribeBg})`
}))

const handleSubmit = () => {
  console.log('Subscribed Email:', email.value)
  alert(`Subscribed successfully with: ${email.value}`)
  email.value = ''
}
</script>