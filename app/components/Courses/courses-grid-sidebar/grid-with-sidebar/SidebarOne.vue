<template>
    <div class="d-flex flex-row align-items-center justify-content-between mt-2 mb-3">
        <div class="d-flex w-100">
            <a class="d-lg-none btn btn-md btn-outline-dark rounded-pill w-100" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i class="bi bi-sliders me-2"></i>Filter
            </a>
        </div>
    </div>
    <div class="offcanvas offcanvas-start offcanvas-collapse side-filter" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header d-lg-none border-bottom">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body pt-4 pt-lg-0 p-lg-0">
            
            <div class="d-flex flex-column gap-2">
    
                <div class="single-side-box card border shadow-sm rounded-3 p-3">
                    <!-- Search Form -->
                    <div class="d-flex flex-column gap-3">
                        <div class="single-form-group">
                            <div class="position-relative">
                                <input type="text" class="form-control ps-5" placeholder="Search courses or tutor">
                                <span class="position-absolute top-50 start-0 translate-middle ms-4 opacity-50"><i class="bi bi-search fs-5"></i></span>
                            </div>
                        </div>
                        <div class="single-form-group">
                            <div class="position-relative">
                                <select id="c-category" class="form-control form-select">
                                    <option value="1">Web Designing</option>
                                    <option value="2">Business</option>
                                    <option value="3">Accounting</option>
                                    <option value="4">Development</option>
                                    <option value="5">Art & Culture</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="single-side-box card border shadow-sm rounded-3 p-3">
                    <h6 class="fw-medium">Courses Topic</h6>
                    <ul class="list-unstyled mb-1 d-flex flex-column gap-2 mt-3">
                    
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="React" class="form-check-input" name="React" type="checkbox">
                                <label for="React" class="form-check-label text-muted-2">React</label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="java" class="form-check-input" name="java" type="checkbox">
                                <label for="java" class="form-check-label text-muted-2">Java Script</label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="laravel" class="form-check-input" name="laravel" type="checkbox">
                                <label for="laravel" class="form-check-label text-muted-2">Laravel</label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="angular" class="form-check-input" name="angular" type="checkbox">
                                <label for="angular" class="form-check-label text-muted-2">Angular</label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="html" class="form-check-input" name="html" type="checkbox">
                                <label for="html" class="form-check-label text-muted-2">HTML5</label>
                            </div>
                        </li>
                        
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="css" class="form-check-input" name="css" type="checkbox">
                                <label for="css" class="form-check-label text-muted-2">CSS3</label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                
                <div class="single-side-box card border shadow-sm rounded-3 p-3">
                    <h6 class="fw-medium">Top Instructors</h6>
                    <ul class="list-unstyled mb-1 d-flex flex-column gap-2 mt-3">
                    
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="keny" class="form-check-input" name="keny" type="checkbox">
                                <label for="keny" class="form-check-label text-muted-2">Keny White</label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="hinata" class="form-check-input" name="hinata" type="checkbox">
                                <label for="hinata" class="form-check-label text-muted-2">Hinata Hyuga</label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="hussy" class="form-check-input" name="hussy" type="checkbox">
                                <label for="hussy" class="form-check-label text-muted-2">Mike hussy</label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="riky" class="form-check-input" name="riky" type="checkbox">
                                <label for="riky" class="form-check-label text-muted-2">Adam Riky</label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="daniel" class="form-check-input" name="daniel" type="checkbox">
                                <label for="daniel" class="form-check-label text-muted-2">Daniel Duck</label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                
                <div class="single-side-box card border shadow-sm rounded-3 p-3">
                    <h6 class="fw-medium">Price</h6>
                    <ul class="list-unstyled mb-1 d-flex flex-column gap-2 mt-3">
                    
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="all" class="form-check-input" name="all" type="checkbox">
                                <label for="all" class="form-check-label text-muted-2">All</label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="free" class="form-check-input" name="free" type="checkbox">
                                <label for="free" class="form-check-label text-muted-2">Free</label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="premium" class="form-check-input" name="premium" type="checkbox">
                                <label for="premium" class="form-check-label text-muted-2">Premium</label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                
                <div class="single-side-box card border shadow-sm rounded-3 p-3">
                    <h6 class="fw-medium">Rating</h6>
                    <ul class="list-unstyled mb-1 d-flex flex-column gap-2 mt-3">
                    
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="rate-5" class="form-check-input" name="rate-5" type="checkbox">
                                <label for="rate-5" class="form-check-label text-muted-2">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <span class="text-mid d-inline-flex align-items-start text-warning gap-1">
                                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                                        </span>
                                        5.0
                                        <span class="text-muted">(1,785)</span>
                                    </div>
                                </label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="rate-4" class="form-check-input" name="rate-4" type="checkbox">
                                <label for="rate-4" class="form-check-label text-muted-2">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <span class="text-mid d-inline-flex align-items-start text-warning gap-1">
                                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                                        </span>
                                        4.0 &amp; up
                                        <span class="text-muted">(3,650)</span>
                                    </div>
                                </label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="rate-3" class="form-check-input" name="rate-3" type="checkbox">
                                <label for="rate-3" class="form-check-label text-muted-2">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <span class="text-mid d-inline-flex align-items-start text-warning gap-1">
                                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                                        </span>
                                        3.0 &amp; up
                                        <span class="text-muted">(2,784)</span>
                                    </div>
                                </label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="rate-2" class="form-check-input" name="rate-2" type="checkbox">
                                <label for="rate-2" class="form-check-label text-muted-2">
                                    <div class="d-flex flex-row align-items-center gap-2">
                                        <span class="text-mid d-inline-flex align-items-start text-warning gap-1">
                                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                                        </span>
                                        2.5 &amp; up
                                        <span class="text-muted">(875)</span>
                                    </div>
                                </label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                
                <div class="single-side-box card border shadow-sm rounded-3 p-3">
                    <h6 class="fw-medium">Lecture Duration</h6>
                    <ul class="list-unstyled mb-1 d-flex flex-column gap-2 mt-3">
                    
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="video-1" class="form-check-input" name="video-1" type="checkbox">
                                <label for="video-1" class="form-check-label text-muted-2">0 - 1 Hour<span class="text-muted ms-2">(13)</span></label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="video-2" class="form-check-input" name="video-2" type="checkbox">
                                <label for="video-2" class="form-check-label text-muted-2">1 - 2 Hour<span class="text-muted ms-2">(26)</span></label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="video-3" class="form-check-input" name="video-3" type="checkbox">
                                <label for="video-3" class="form-check-label text-muted-2">2 - 3 Hour<span class="text-muted ms-2">(65)</span></label>
                            </div>
                        </li>
                        
                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="video-4" class="form-check-input" name="video-4" type="checkbox">
                                <label for="video-4" class="form-check-label text-muted-2">3 - 4 Hour<span class="text-muted ms-2">(35)</span></label>
                            </div>
                        </li>

                        <li class="d-flex flex-row gap-2">
                            <div class="form-check">
                                <input id="video-5" class="form-check-input" name="video-5" type="checkbox">
                                <label for="video-5" class="form-check-label text-muted-2">4 - 5 Hour<span class="text-muted ms-2">(17)</span></label>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script setup>

</script>