<template>
    <a
        id="back2Top"
        href="#"
        @click.prevent="backToTop"
        :class="['top-scroll', scroll ? 'd-block' : 'd-none']"
        title="Back to top"
    >
        <i class="ti-arrow-up"></i>
    </a>
</template>

<script setup>

const scroll = ref(false)

const handleScroll = () => {
  scroll.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>