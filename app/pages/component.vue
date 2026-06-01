<template>

    <Preloader />
    <NavDark />

    <section class="bg-gredient page-title">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="breadcrumb m-0">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb simple light">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">All Elements</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="pageTitle-wrap">
                        <h1 class="text-light">All Elements</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row mb-5">
            
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <h4 class="mb-3">Tabs Style 01</h4>
                    <div class="tab-wraps mb-4">
                        <ul class="nav nav-tabs customize-tab tabs_creative mb-3" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="contact-tab" data-bs-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-wraps">
                        <ul class="nav nav-tabs simple mb-3" id="newTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home1-tab" data-bs-toggle="tab" href="#home1" role="tab" aria-controls="home1" aria-selected="true">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile1-tab" data-bs-toggle="tab" href="#profile1" role="tab" aria-controls="profile1" aria-selected="false">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="contact1-tab" data-bs-toggle="tab" href="#contact1" role="tab" aria-controls="contact1" aria-selected="false">Contact</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="newTabContent">
                            <div class="tab-pane fade show active" id="home1" role="tabpanel" aria-labelledby="home1-tab">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                            <div class="tab-pane fade" id="profile1" role="tabpanel" aria-labelledby="profile1-tab">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                            <div class="tab-pane fade" id="contact1" role="tabpanel" aria-labelledby="contact1-tab">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <h4 class="mb-3">Accordion Examples</h4>
                    <div class="accordion d-flex flex-column gap-3" id="faqSeconda">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive" aria-expanded="true" aria-controls="faqFive">
                                    Is there a discount for yearly billing?
                                </button>
                            </h2>
                            <div id="faqFive" class="accordion-collapse collapse show" data-bs-parent="#faqSeconda">
                                <div class="accordion-body">
                                Each plan provides access to a different level of features such as course materials, downloadable resources, instructor support, and certification. Please refer to the comparison table above for full details.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqSix" aria-expanded="false" aria-controls="faqSix">
                                    Can I use one subscription for multiple users?
                                </button>
                            </h2>
                            <div id="faqSix" class="accordion-collapse collapse" data-bs-parent="#faqSeconda">
                                <div class="accordion-body">
                                Each subscription is valid for a single user. For team or classroom access, please contact us about our group plans.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqSeven" aria-expanded="false" aria-controls="faqSeven">
                                    What payment methods do you accept?
                                </button>
                            </h2>
                            <div id="faqSeven" class="accordion-collapse collapse" data-bs-parent="#faqSeconda">
                                <div class="accordion-body">
                                We accept all major credit/debit cards, PayPal, and UPI. For enterprise customers, invoice billing can also be arranged.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqEight" aria-expanded="false" aria-controls="faqEight">
                                    Do you offer refunds?
                                </button>
                            </h2>
                            <div id="faqEight" class="accordion-collapse collapse" data-bs-parent="#faqSeconda">
                                <div class="accordion-body">
                                Yes, we have a 7-day money-back guarantee. If you're not satisfied, you can request a full refund within the first week of your subscription.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="row mb-5">
            
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <h4>Typography</h4>
                    <h1>Heading One</h1>
                    <h2>Heading Two</h2>
                    <h3>Heading Three</h3>
                    <h4>Heading Four</h4>
                    <h5>Heading Five</h5>
                    <h6>Heading Six</h6>
                </div>
                
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <h4>Buttons</h4>
                    <button type="submit" class="btn btn-main">Simple button</button></br>
                    <button type="submit" class="btn btn-light-main">Simple button</button>
                    <button type="submit" class="btn btn-gray">Simple button</button>
                    <button type="submit" class="btn btn-main btn-md">Midium Button</button></br>
                    <button type="submit" class="btn btn-light-main rounded-pill btn-lg">Large Button</button>
                    <button type="submit" class="btn btn-light-green">Large Button</button>
                    <button type="submit" class="btn btn-green">Large Button</button>
                    <button type="submit" class="btn btn-light-red">Large Button</button>
                    <button type="submit" class="btn btn-red">Large Button</button>
                    <button type="submit" class="btn btn-outline-dark">Outline Button</button></br></br>
                </div>
                
            </div>

            <div class="row mb-5">
            
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <h4>Shadow & Simple Inputbox</h4>
                    
                    <div class="form-group mb-3">
                        <label>Name</label>
                        <input type="text" class="form-control">
                    </div>
                        
                    <div class="form-group mb-3">
                        <label>Name</label>
                        <input type="text" class="form-control simple">
                    </div>
                    
                    <div class="form-group mb-3">
                        <label>Course Search</label>
                        <div class="d-flex position-relative">
                            <input type="text" class="form-control ps-5" placeholder="Search Courses...">
                            <span class="position-absolute top-50 start-0 translate-middle-y ms-3"><i class="bi bi-search text-muted"></i></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Select 2</label>
                        <select class="form-control form-select" id="country">
                            <option value="india">India</option>
                            <option value="usa">United State</option>
                            <option value="uk">United Kingdom</option>
                            <option value="australia">Australia</option>
                            <option value="brazil">Brazil</option>
                            <option value="shrilanka">Shrilanka</option>
                        </select>
                    </div>
                    
                </div>
                
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <h4>Checkbox & Radio buttons</h4>
                    <ul class="no-ul-list">
                        <li>
                            <input id="a-1" class="form-check-input" name="a-1" type="checkbox">
                            <label for="a-1" class="form-check-label">Air Condition</label>
                        </li>
                        <li>
                            <input id="a-2" class="form-check-input" name="a-2" type="checkbox">
                            <label for="a-2" class="form-check-label">Bedding</label>
                        </li>
                        
                    </ul>
                    
                    <ul class="no-ul-list">
                        <li>
                            <input id="a-p" class="form-check-input" name="a-p" type="radio">
                            <label for="a-p" class="form-check-label">Air Condition</label>
                        </li>
                        <li>
                            <input id="a-c" class="form-check-input" name="a-c" type="radio">
                            <label for="a-c" class="form-check-label">Bedding</label>
                        </li>
                        
                    </ul>
                </div>
                
            </div>

            <div class="row mt-3">
                <div class="col-lg-12 col-md-12">
                    <h4>Lists Style</h4>
                </div>
                
                <div class="col-lg-4 col-md-4">
                    <ul class="lists lists-1">
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                    </ul>	
                </div>
                
                <div class="col-lg-4 col-md-4">
                    <ul class="lists lists-2">
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                    </ul>
                </div>
                
                <div class="col-lg-4 col-md-4">
                    <ul class="lists lists-3">
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                        <li>A simple light alert</li>
                    </ul>
                </div>
                
            </div>					
            
        </div>
                
    </section>

    <FooterTop />
    <FooterDark />
    <ScrollToTop />

</template>

<script setup>

import Preloader from '@/components/Preloader.vue';
import NavDark from '@/components/Navbar/NavDark.vue';
import FooterTop from '@/components/Home/index/FooterTop.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

</script>