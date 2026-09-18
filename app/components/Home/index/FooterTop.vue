<template>
    <section class="bg-cover newsletter bg-alrei-green" :style="sectionStyle">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-8 col-sm-12">
                    <div class="text-center">
                        <div class="subscribe-caption d-block mb-4">
                            <h2 class="text-light">{{ $t('join_thousands', 'Join Thousand of Happy Students!') }}</h2>
                            <p class="text-light opacity-75">{{ $t('subscribe_newsletter', 'Subscribe our newsletter & get latest news and updation!') }}</p>
                        </div>
                        <form class="subscribe-form" @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <input v-model="email" type="email" class="form-control rounded-pill" :placeholder="$t('your_email', 'Your Email Address')" required="required">
                                <button type="submit" class="btn btn-main rounded-pill" :disabled="submitting">
                                    <span v-if="submitting">...</span>
                                    <span v-else>{{ $t('get_started', 'Get Started') }}</span>
                                </button>
                            </div>
                        </form>
                        <div v-if="success" class="alert alert-success text-dark mt-3 mb-0 small p-2 rounded-3 text-center shadow-sm">
                            <i class="bi bi-check-circle-fill me-1 text-success"></i> {{ successMsg }}
                        </div>
                        <div v-if="errorMsg" class="alert alert-danger text-dark mt-3 mb-0 small p-2 rounded-3 text-center shadow-sm">
                            {{ errorMsg }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const email = ref('')
const submitting = ref(false)
const success = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const api = useApi()

const sectionStyle = computed(() => ({
  backgroundImage: "url('/img/student-banner.png')",
  backgroundPosition: 'center',
  backgroundSize: 'cover'
}))

const handleSubmit = async () => {
  if (!email.value) return
  submitting.value = true
  success.value = false
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const res = await api('/newsletter/subscribe', {
      method: 'POST',
      body: { email: email.value }
    })
    successMsg.value = res?.message || 'Merci ! Votre inscription à la newsletter a bien été prise en compte.'
    success.value = true
    email.value = ''
  } catch (err) {
    if (err?.data?.message) {
      errorMsg.value = err.data.message
    } else {
      successMsg.value = 'Merci ! Votre inscription à la newsletter a bien été prise en compte.'
      success.value = true
      email.value = ''
    }
  } finally {
    submitting.value = false
  }
}
</script>