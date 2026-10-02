<template>
    <div>
        <div class="bg-cover py-5 border-bottom text-white" style="background: linear-gradient(to right, rgba(15, 35, 20, 0.65) 0%, rgba(15, 35, 20, 0.25) 100%), url('/img/student-banner.png'); background-position: center; background-size: cover;">
            <div class="container py-3">
                <div class="row align-items-center">
                    <div class="col-lg-10 mx-auto text-center">
                        <span class="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold mb-3 d-inline-block">{{ blogPost.category }}</span>
                        <h1 class="display-6 fw-bold text-white mb-3">{{ blogPost.title }}</h1>
                        <div class="d-flex align-items-center justify-content-center gap-4 text-white opacity-75 small">
                            <span><i class="bi bi-person me-1"></i>{{ blogPost.author }}</span>
                            <span><i class="bi bi-calendar me-1"></i>{{ blogPost.date }}</span>
                            <span><i class="bi bi-tag me-1"></i>{{ blogPost.readTime }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="py-5 bg-white">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                            <img :src="blogPost.image" class="card-img-top object-fit-cover" style="max-height: 400px;" :alt="blogPost.title" @error="(e) => { e.target.src = '/img/blog-1.jpg' }">
                            <div class="card-body p-4 p-md-5">
                                <div class="lead fw-normal text-dark mb-4 p-3 bg-light rounded-3 border-start border-main border-4">
                                    {{ blogPost.desc }}
                                </div>

                                <div class="article-content lh-lg text-dark" style="font-size: 1.05rem;">
                                    <p v-for="(paragraph, idx) in blogPost.fullParagraphs" :key="idx" class="mb-4">
                                        {{ paragraph }}
                                    </p>
                                </div>

                                <div class="p-4 bg-light rounded-4 mt-5 border">
                                    <h5 class="fw-bold mb-3 text-main"><i class="bi bi-info-circle me-2"></i>{{ $t('additional_info') }}</h5>
                                    <p class="small text-muted mb-3">{{ $t('blog_info_desc') }}</p>
                                    <div class="d-flex flex-wrap gap-2">
                                        <NuxtLink :to="localePath('/courses')" class="btn btn-main rounded-pill px-4 btn-sm fw-bold">{{ $t('view_courses') }}</NuxtLink>
                                        <NuxtLink :to="localePath('/courses')" class="btn btn-outline-main rounded-pill px-4 btn-sm fw-bold">{{ $t('apply_for_course') }}</NuxtLink>
                                        <a href="https://wa.me/22890943434" target="_blank" rel="noopener" class="btn btn-outline-success rounded-pill px-4 btn-sm fw-bold">
                                            <i class="bi bi-whatsapp me-1"></i>{{ $t('whatsapp_assistance') }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const props = defineProps({ blog: Object })
const localePath = useLocalePath()

const blogPost = computed(() => {
    const base = props.blog || {}
    return {
        ...base,
        fullParagraphs: base.fullParagraphs || [base.desc || '']
    }
})
</script>