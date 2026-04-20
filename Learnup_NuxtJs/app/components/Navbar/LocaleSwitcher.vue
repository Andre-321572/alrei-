<template>
  <li class="nav-item dropdown lang-selector">
    <a class="nav-link dropdown-toggle" href="#" id="langDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-globe me-1"></i> {{ currentLocaleName }}
    </a>
    <ul class="nav-dropdown nav-submenu dropdown-menu" aria-labelledby="langDropdown">
      <li v-for="locale in availableLocales" :key="locale.code">
        <a class="dropdown-item" href="#" @click.prevent="setLocale(locale.code)">
          {{ locale.name }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const currentLocaleName = computed(() => {
  return locales.value.find(i => i.code === locale.value)?.name
})
</script>

<style scoped>
.lang-selector {
    cursor: pointer;
}
.lang-selector .nav-link {
    display: flex;
    align-items: center;
    padding: 10px 15px;
}
</style>
