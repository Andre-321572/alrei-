<template>
    <Preloader />
    <InstructorNavbar />
    <slot />
</template>

<script setup>
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
</script>
