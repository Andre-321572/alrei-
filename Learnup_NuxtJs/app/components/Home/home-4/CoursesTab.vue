<template>
    <div class="row justify-content-center">
            
        <div class="col-xl-12 col-lg-12 col-12">	
            <ul class="nav customize-tab tabs_creative smalls scroll-tab bg-light align-items-center justify-content-center px-4 py-2 rounded-3 mb-4" id="courseTab" role="tablist">
                <!-- nav item -->
                <li class="nav-item ms-0" role="presentation">
                    <a class="nav-link active" id="pills-development-tab" data-bs-toggle="pill" href="#pills-development" role="tab" aria-controls="pills-development" aria-selected="true">
                        Development
                    </a>
                </li>
                <!-- nav item -->
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="pills-design-tab" data-bs-toggle="pill" href="#pills-design" role="tab" aria-controls="pills-design" aria-selected="false" tabindex="-1">Design</a>
                </li>
                <!-- nav item -->
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="pills-marketing-tab" data-bs-toggle="pill" href="#pills-marketing" role="tab" aria-controls="pills-marketing" aria-selected="false" tabindex="-1">
                        Marketing
                    </a>
                </li>
                <!-- nav item -->
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="pills-business-tab" data-bs-toggle="pill" href="#pills-business" role="tab" aria-controls="pills-business" aria-selected="false" tabindex="-1">
                        Business
                    </a>
                </li>
                <!-- nav item -->
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="pills-accounting-tab" data-bs-toggle="pill" href="#pills-accounting" role="tab" aria-controls="pills-accounting" aria-selected="false" tabindex="-1">Accounting</a>
                </li>
            </ul>	
        </div>
        
        <!-- Tab Content -->
        <div class="col-xl-12 col-lg-12 col-12">
            
            <div class="tab-content" id="courseTabContent">
                
                <!-- Development Content -->
                <div class="tab-pane fade show active" id="pills-development" role="tabpanel" aria-labelledby="pills-development-tab" tabindex="0">
                    <div class="row justify-content-center g-3">
                        
                        <div class="col-xl-3 col-lg-4 col-md-6" v-for="(item, index) in coursesData.slice(0, 4)" :key="index">
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{ item.title }}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                </div>
                
                <!-- Design Content -->
                <div class="tab-pane fade" id="pills-design" role="tabpanel" aria-labelledby="pills-design-tab" tabindex="0">
                    <div class="row justify-content-center g-3">
                        
                        <div class="col-xl-3 col-lg-4 col-md-6" v-for="(item, index) in coursesData.slice(2, 6)" :key="index">
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{ item.title }}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                </div>
                
                <!-- Marketing Content -->
                <div class="tab-pane fade" id="pills-marketing" role="tabpanel" aria-labelledby="pills-marketing-tab" tabindex="0">
                    <div class="row justify-content-center g-3">
                        
                        <div class="col-xl-3 col-lg-4 col-md-6" v-for="(item, index) in coursesData.slice(4, 8)" :key="index">
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{ item.title }}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                </div>
                
                <!-- Business Content -->
                <div class="tab-pane fade" id="pills-business" role="tabpanel" aria-labelledby="pills-business-tab" tabindex="0">
                    <div class="row justify-content-center g-3">
                        
                        <div class="col-xl-3 col-lg-4 col-md-6" v-for="(item, index) in coursesData.slice(6, 10)" :key="index">
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{ item.title }}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                </div>
                
                <!-- Accounting Content -->
                <div class="tab-pane fade" id="pills-accounting" role="tabpanel" aria-labelledby="pills-accounting-tab" tabindex="0">
                    <div class="row justify-content-center g-3">
                        
                        <div class="col-xl-3 col-lg-4 col-md-6" v-for="(item, index) in coursesData.slice(8, 12)" :key="index">
                            <div class="education_block_grid border">
                            
                                <div class="education-thumb position-relative">
                                    <div class="save-course position-absolute top-0 end-0 me-3 mt-3">
                                        <a href="#" class="bookmark-button"><i class="bi bi-suit-heart"></i></a>
                                    </div>
                                    <NuxtLink :to="`/course-detail/${item.id}`"><img :src="item.image" class="img-fluid" alt=""></NuxtLink>
                                </div>
                                
                                <div class="education-body p-3">
                                    <div class="education-title">
                                        <h4 class="fs-6 fw-medium"><NuxtLink :to="`/course-detail/${item.id}`">{{ item.title }}</NuxtLink></h4>
                                    </div>
                                    
                                    <div class="cources-info">
                                        <ul>
                                            <li><i class="bi bi-camera-reels"></i>{{item.lectures}} Lectures</li>
                                            <li><i class="bi bi-bar-chart"></i>{{item.level}}</li>
                                            <li><i class="bi bi-coin"></i>${{item.price}}</li>
                                            <li><i class="bi bi-star-fill text-warning"></i><span class="overall-rates text-dark fw-medium ms-1">{{item.rating}}</span><span class="total-reviews">({{item.review}})</span></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="education-footer p-3">
                                    <div class="education_block_author">
                                        <a href="#" class="d-flex align-items-center justify-content-start gap-2">
                                            <span class="square--30"><img :src="item.autherImg" class="img-fluid circle" alt="Author"></span>
                                            <span class="text-dark fw-medium">{{item.autherName}}</span>
                                        </a>
                                    </div>
                                    <div class="enrolled-link"><a href="#" class="main-link fw-medium">Enrolled Now<i class="bi bi-arrow-right ms-2"></i></a></div>
                                </div>
                            </div>	
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </div>
        
    </div>
</template>

<script setup>
import { coursesData } from '@/data/data'
</script>