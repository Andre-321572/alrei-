<template>
    <section class="pt-0" ref="counterSection">
        <div class="container">
            
            <div class="row justify-content-center">
                <div class="col-xl-12 col-lg-12">
                    <div class="card rounded-4 bg-light-green p-4">
                        
                        <div class="row justify-content-center g-4">
                        
                            <div class="col-xl-3 col-lg-3 col-md-4">	
                                <div class="card bg-transparent rounded-3 py-4">
                                    <div class="text-center">
                                        <h2 class="text-green display-3 mb-0">{{ counters.students }}<span class="text-green ms-1">k</span></h2>
                                        <p class="fw-semibold text-dark m-0">Total Students</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-xl-3 col-lg-3 col-md-4">	
                                <div class="card bg-transparent rounded-3 py-4">
                                    <div class="text-center">
                                        <h2 class="text-green display-3 mb-0">{{ counters.courses }}<span class="text-green ms-1">k</span></h2>
                                        <p class="fw-semibold text-dark m-0">Active Courses</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-xl-3 col-lg-3 col-md-4">	
                                <div class="card bg-transparent rounded-3 py-4">
                                    <div class="text-center">
                                        <h2 class="text-green display-3 mb-0">{{ counters.instructors }}<span class="text-green ms-1">k</span></h2>
                                        <p class="fw-semibold text-dark m-0">Total Instructors</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-xl-3 col-lg-3 col-md-4">	
                                <div class="card bg-transparent rounded-3 py-4">
                                    <div class="text-center">
                                        <h2 class="text-green display-3 mb-0">{{ counters.languages }}</h2>
                                        <p class="fw-semibold text-dark m-0">Languages</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    </section>
</template>

<script setup>

import { reactive, onMounted, ref } from "vue"

const counterSection = ref(null)

const counters = reactive({
    students: 0,
    courses: 0,
    instructors: 0,
    languages: 0
})

const targets = {
    students: 57,
    courses: 214,
    instructors: 78,
    languages: 25
}

const animateCounter = (key, target, duration = 800) => {
    const startTime = performance.now()

    const updateCounter = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1)
        counters[key] = Math.floor(progress * target)

        if (progress < 1) {
            requestAnimationFrame(updateCounter)
        } else {
            counters[key] = target
        }
    }

    requestAnimationFrame(updateCounter)
}

const startCounters = () => {
    Object.keys(targets).forEach((key) => {
        animateCounter(key, targets[key])
    })
}

onMounted(() => {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                startCounters()

                observer.unobserve(entry.target)
            }

        })

    }, {
        threshold: 0.5
    })

    if (counterSection.value) {
        observer.observe(counterSection.value)
    }

})

</script>