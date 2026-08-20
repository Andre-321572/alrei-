<template>
    <div></div>
</template>

<script setup>
const localePath = useLocalePath();
const router = useRouter();

onMounted(() => {
    router.replace(localePath('/register?tab=login'));
});

definePageMeta({
    middleware: [
        function () {
            const localePath = useLocalePath();
            return navigateTo(localePath('/register?tab=login'), { replace: true });
        }
    ]
});
</script>
