<template>
    <div class="category-tabs-wrapper">
        <button class="cat-arrow cat-arrow-left" @click="scrollLeft" :disabled="atStart">
            <i class="bi bi-chevron-left"></i>
        </button>

        <div class="cat-tabs-track" ref="track">
            <button
                v-for="(item, index) in categories"
                :key="index"
                :class="['cat-tab', { active: activeIndex === index }]"
                @click="activeIndex = index"
            >
                {{ item.name }}
            </button>
        </div>

        <button class="cat-arrow cat-arrow-right" @click="scrollRight" :disabled="atEnd">
            <i class="bi bi-chevron-right"></i>
        </button>
    </div>
</template>

<script setup>
const api = useApi()
const categories = ref([])
const activeIndex = ref(0)
const track = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

const updateArrows = () => {
    if (!track.value) return
    atStart.value = track.value.scrollLeft <= 0
    atEnd.value = track.value.scrollLeft + track.value.clientWidth >= track.value.scrollWidth - 2
}

const scrollLeft = () => {
    track.value?.scrollBy({ left: -200, behavior: 'smooth' })
    setTimeout(updateArrows, 320)
}

const scrollRight = () => {
    track.value?.scrollBy({ left: 200, behavior: 'smooth' })
    setTimeout(updateArrows, 320)
}

onMounted(async () => {
    try {
        const response = await api('/categories')
        categories.value = response.data
        await nextTick()
        updateArrows()
        track.value?.addEventListener('scroll', updateArrows)
    } catch (error) {
        console.error('Failed to fetch categories:', error)
    }
})

onUnmounted(() => {
    track.value?.removeEventListener('scroll', updateArrows)
})
</script>

<style scoped>
.category-tabs-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f0f9f4;
    border-radius: 14px;
    padding: 14px 16px;
}

.cat-tabs-track {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-behavior: smooth;
    flex: 1;
    scrollbar-width: none;
}
.cat-tabs-track::-webkit-scrollbar { display: none; }

.cat-tab {
    flex-shrink: 0;
    padding: 9px 22px;
    border-radius: 10px;
    border: 1.5px solid #d5e8dd;
    background: #fff;
    color: #444;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.18s, color 0.18s, background 0.18s;
    white-space: nowrap;
}
.cat-tab:hover {
    border-color: #2e7d5b;
    color: #2e7d5b;
}
.cat-tab.active {
    border-color: #2e7d5b;
    color: #2e7d5b;
    background: #fff;
    font-weight: 600;
}

.cat-arrow {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid #cde3d7;
    background: #fff;
    color: #444;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.18s, color 0.18s;
    font-size: 0.85rem;
}
.cat-arrow:hover:not(:disabled) {
    border-color: #2e7d5b;
    color: #2e7d5b;
}
.cat-arrow:disabled {
    opacity: 0.35;
    cursor: default;
}
</style>
