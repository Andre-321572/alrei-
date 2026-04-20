<template>
    <div class="edu_wraper border">
        <h4 class="edu_title">Course Circullum</h4>
        <div id="accordionExample" class="accordion circullum">

            <!-- Part 1 -->
            <div class="card border shadow-0 mb-3">
                <div id="headingOne" class="card-header">
                    <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne"
                            class="d-block position-relative text-dark collapsible-link py-2">Part 01: How To Learn Web
                            Designing Step by Step</a>
                    </h6>
                </div>
                <div id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample"
                    class="collapse show">
                    <div class="card-body">
                        <ul class="lectures_lists">

                            <li v-for="(item, index) in data" :key="index">
                                <div class="lectures_lists_title"><i class="bi bi-camera-video"></i>{{item.title}}</div>
                                <div class="d-inline-block text-truncate w-shrunk">{{item.desc}}</div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Part 2 -->
            <div class="card border shadow-0 mb-3">
                <div id="headingTwo" class="card-header">
                    <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo"
                            class="d-block position-relative collapsed text-dark collapsible-link py-2">Part 02: Learn
                            Web Designing in Basic Level</a>
                    </h6>
                </div>
                <div id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionExample" class="collapse">
                    <div class="card-body">
                        <ul class="lectures_lists">
                            
                            <li v-for="(item, index) in data" :key="index">
                                <div class="lectures_lists_title"><i class="bi bi-camera-video"></i>{{item.title}}</div>
                                <div class="d-inline-block text-truncate w-shrunk">{{item.desc}}</div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <!-- Part 3 -->
            <div class="card border shadow-0 mb-3">
                <div id="headingThree" class="card-header">
                    <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                            class="d-block position-relative collapsed text-dark collapsible-link py-2">Part 03: Learn
                            Web Designing in Advance Level</a>
                    </h6>
                </div>
                <div id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample" class="collapse">
                    <div class="card-body">
                        <ul class="lectures_lists">
                            
                            <li v-for="(item, index) in data" :key="index">
                                <div class="lectures_lists_title"><i class="bi bi-camera-video"></i>{{item.title}}</div>
                                <div class="d-inline-block text-truncate w-shrunk">{{item.desc}}</div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            <!-- Part 4 -->
            <div class="card border shadow-0 mb-3">
                <div id="headingFour" class="card-header">
                    <h6 class="mb-0 accordion_title"><a href="#" data-bs-toggle="collapse"
                            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"
                            class="d-block position-relative collapsed text-dark collapsible-link py-2">Part 04: How To
                            Become Succes in Designing & Development?</a>
                    </h6>
                </div>
                <div id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionExample" class="collapse">
                    <div class="card-body">
                        <ul class="lectures_lists">
                            
                            <li v-for="(item, index) in data" :key="index">
                                <div class="lectures_lists_title"><i class="bi bi-camera-video"></i>{{item.title}}</div>
                                <div class="d-inline-block text-truncate w-shrunk">{{item.desc}}</div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

const data = [
    { title:'Lecture: 01', desc:'Web Designing Beginner' },
    { title:'Lecture: 02', desc:'Startup Designing with HTML5 & CSS3' },
    { title:'Lecture: 03', desc:'How To Call Google Map iFrame' },
    { title:'Lecture: 04', desc:'Create Drop Down Navigation Using CSS3' },
    { title:'Lecture: 05', desc:'How to Create Sticky Navigation Using JS' },
]

</script>