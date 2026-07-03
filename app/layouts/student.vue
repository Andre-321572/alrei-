<template>
    <Preloader />
    <StudentNavbar />
    <slot />
</template>

<script setup>
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
</script>
