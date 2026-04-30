<template>
    <div class="edu_wraper border">
        <h4 class="edu_title">Course Overview</h4>
        <p>Learn the fundamental principles and practices of modern web design in this comprehensive course. Whether you're a beginner or looking to refresh your skills, you'll dive into HTML5, CSS3, responsive design, and more. Get hands-on experience with industry tools and create stunning websites from scratch.</p>		
        <p>Unlock your creativity and master the art of web design with this all-in-one course. You'll start from the ground up—learning how websites work, how to structure content using HTML, style it with CSS, and make it come alive with JavaScript. This course blends theory with real-world projects to ensure you're job-ready by the end. Perfect for beginners or anyone looking to build beautiful, user-friendly websites from scratch.</p>
        
        <div class="who-enrolled-block mt-4">
            <h5 class="edu_title mb-2">Who Should Enroll?</h5>

            <ul class="features-list">
            
                <li v-for="(item, index) in data" :key="index">
                    <i class="bi bi-check-circle"></i>
                    {{ item }}
                </li>
            
            </ul>
        </div>
    </div>
</template>

<script setup>

const data = [
    "Beginners interested in starting a career in web design",
    "Developers looking to expand their skills into design",
    "Anyone wanting to create their own websites or improve existing ones",
    "Students pursuing careers in tech, design, or media",
    "Freelancers who want to expand their service offerings",
    "Graphic designers looking to transition into UI/UX or web design",
    "Entrepreneurs and business owners who want to build or maintain their own websites"
]

</script>