<template>
    <div :class="['header header-light', { 'header-fixed': isSticky }]">
        <div class="container">
            <nav id="navigation" :class="isMobile ? 'navigation navigation-portrait' : 'navigation navigation-landscape'">
                <div class="nav-header">
                    <NuxtLink class="nav-brand" to="/">
                        <img :src="logo" class="logo" alt="" style="height:45px;width:auto;" />
                    </NuxtLink>
                    <div class="nav-toggle" @click="toggle = !toggle"></div>
                    <div class="mobile_nav">
                        <ul>
                            <li>
                                <div class="btn-group account-drop">
                                    <button type="button" class="btn btn-order-by-filt border-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img :src="avatar3" class="avater-img" alt="">
                                    </button>
                                    <div class="dropdown-menu pull-right animated flipInX box-shadow-sm">
                                <div class="dropdown-header py-3 border-bottom">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="avatar-flex">
                                            <div class="square--50 circle"><img :src="userAvatar" class="img-fluid circle" alt=""></div>
                                        </div>
                                        <div class="caps d-flex flex-column gap-1">
                                            <h6 class="fw-semibold m-0">{{ userName }}</h6>
                                            <span class="text-mid text-muted-2 text-capitalize">{{ userRole }}</span>
                                        </div>
                                    </div>
                                </div>
                                        <div class="dropdown-body">
                                            <ul>
                                                <li><NuxtLink to="/student-dashboard" :class="current === '/student-dashboard' ? 'active' : ''"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                                <li><NuxtLink to="/student-all-courses" :class="current === '/student-all-courses' ? 'active' : ''"><i class="bi bi-play-circle me-2"></i>{{ $t('all_courses') }}</NuxtLink></li>
                                                <li><NuxtLink to="/student-subscription" :class="current === '/student-subscription' ? 'active' : ''"><i class="bi bi-basket2 me-2"></i>{{ $t('my_subscription') }}</NuxtLink></li>
                                                <li><NuxtLink to="/student-course-resume" :class="current === '/student-course-resume' ? 'active' : ''"><i class="bi bi-patch-plus me-2"></i>{{ $t('course_resume') }}</NuxtLink></li>
                                                <li><NuxtLink to="/student-wishlist" :class="current === '/student-wishlist' ? 'active' : ''"><i class="bi bi-wallet2 me-2"></i>{{ $t('wishlist') }}</NuxtLink></li>
                                                <li><NuxtLink to="/student-payment-info" :class="current === '/student-payment-info' ? 'active' : ''"><i class="bi bi-star-half me-2"></i>{{ $t('payment_info') }}</NuxtLink></li>
                                                <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div :class="['nav-menus-wrapper', { 'nav-menus-wrapper-open': toggle }]">
                    <span class="nav-menus-wrapper-close-button" @click="toggle = !toggle">
                        ✕
                    </span>
                    <ul class="nav-menu">
                    
                       <li :class="['/'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('home') }}
                            </a>
                           
                        </li>
                        
                        <li v-if="!isStudent" :class="['/grid-with-sidebar','/detail','/find-instructor','/instructor-detail'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('courses') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu">
                                <li :class="['/grid-with-sidebar'].includes(current) ? 'active' : ''"><a href="#">{{ $t('courses_grid_sidebar') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/grid-with-sidebar' ? 'active' : ''"><NuxtLink to="/grid-with-sidebar">{{ $t('sidebar_grid') }}</NuxtLink></li>
                                 </ul>
                                </li>
                                <li :class="current === '/list-with-sidebar' ? 'active' : ''"><NuxtLink to="/list-with-sidebar">{{ $t('list_layout_sidebar') }}</NuxtLink></li>
                                <li :class="['/full-width-course'].includes(current) ? 'active' : ''"><a href="#">{{ $t('courses_grid_full') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/full-width-course' ? 'active' : ''"><NuxtLink to="/full-width-course">{{ $t('courses_grid') }}</NuxtLink></li>
                             </ul>
                                </li>
                                <li :class="['/detail'].includes(current) ? 'active' : ''"><a href="#">{{ $t('courses_detail') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/detail' ? 'active' : ''"><NuxtLink to="/detail">{{ $t('course_detail') }}</NuxtLink></li>
                                    </ul>
                                </li>
                                <li :class="current === '/find-instructor' ? 'active' : ''"><NuxtLink to="/find-instructor">{{ $t('find_instructor') }}</NuxtLink></li>
                                <li :class="current === '/instructor-detail' ? 'active' : ''"><NuxtLink to="/instructor-detail">{{ $t('instructor_detail') }}</NuxtLink></li>
                            </ul>
                        </li>
                        
                        <li v-if="!isStudent" :class="['/about-us','/blog','/blog-detail','/pricing','/register','/component','/contact','/privacy','/faq','/shop-full-width','/shop-left-sidebar','/shop-right-sidebar','/product-detail','/add-to-cart','/product-wishlist','/checkout','/shop-order'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('pages') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu">
                                <li :class="['/shop-full-width','/shop-left-sidebar','/shop-right-sidebar','/product-detail','/add-to-cart','/product-wishlist','/checkout','/shop-order'].includes(current) ? 'active' : ''"><a href="#">{{ $t('shop_pages') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/shop-full-width' ? 'active' : ''"><NuxtLink to="/shop-full-width">{{ $t('shop_full_width') }}</NuxtLink></li>
                                        <li :class="current === '/shop-left-sidebar' ? 'active' : ''"><NuxtLink to="/shop-left-sidebar">{{ $t('shop_sidebar_left') }}</NuxtLink></li>
                                        <li :class="current === '/shop-right-sidebar' ? 'active' : ''"><NuxtLink to="/shop-right-sidebar">{{ $t('shop_sidebar_right') }}</NuxtLink></li>
                                        <li :class="current === '/product-detail' ? 'active' : ''"><NuxtLink to="/product-detail">{{ $t('shop_detail') }}</NuxtLink></li>
                                        <li :class="current === '/add-to-cart' ? 'active' : ''"><NuxtLink to="/add-to-cart">{{ $t('add_to_cart') }}</NuxtLink></li>
                                        <li :class="current === '/product-wishlist' ? 'active' : ''"><NuxtLink to="/product-wishlist">{{ $t('wishlist') }}</NuxtLink></li>
                                        <li :class="current === '/checkout' ? 'active' : ''"><NuxtLink to="/checkout">{{ $t('checkout') }}</NuxtLink></li>
                                        <li :class="current === '/shop-order' ? 'active' : ''"><NuxtLink to="/shop-order">{{ $t('order') }}</NuxtLink></li>
                                    </ul>
                                </li>
                                <li :class="current === '/about-us' ? 'active' : ''"><NuxtLink to="/about-us">{{ $t('about_us') }}</NuxtLink></li>
                                <li :class="current === '/blog' ? 'active' : ''"><NuxtLink to="/blog">{{ $t('blog_style') }}</NuxtLink></li>
                                <li :class="current === '/blog-detail' ? 'active' : ''"><NuxtLink to="/blog-detail">{{ $t('blog_detail') }}</NuxtLink></li>
                                <li :class="current === '/pricing' ? 'active' : ''"><NuxtLink to="/pricing">{{ $t('pricing') }}</NuxtLink></li>
                                <li :class="current === '/register' ? 'active' : ''"><NuxtLink to="/register">{{ $t('register') }}</NuxtLink></li>
                                <li :class="current === '/component' ? 'active' : ''"><NuxtLink to="/component">{{ $t('elements') }}</NuxtLink></li>
                                <li :class="current === '/contact' ? 'active' : ''"><NuxtLink to="/contact">{{ $t('contact_us') }}</NuxtLink></li>
                                <li :class="current === '/privacy' ? 'active' : ''"><NuxtLink to="/privacy">{{ $t('privacy_policy') }}</NuxtLink></li>
                                <li :class="current === '/faq' ? 'active' : ''"><NuxtLink to="/faq">{{ $t('faqs') }}</NuxtLink></li>
                            </ul>
                        </li>
                        
                        <li :class="['/instructor-dashboard','/instructor-courses','/instructor-create-course','/instructor-course-added','/instructor-earning','/instructor-students','/instructor-orders','/instructor-reviews','/instructor-payout','/student-dashboard','/student-all-courses','/student-subscription','/student-course-resume','/student-wishlist','/student-payment-info','/profile-edit','/settings','/delete-account'].includes(current) ? 'active' : ''">
                            <a href="#">
                                {{ $t('accounts') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span>
                            </a>
                            <ul class="nav-dropdown nav-submenu">
                                <li v-if="isInstructor || isAdmin" :class="['/instructor-dashboard','/instructor-courses','/instructor-create-course','/instructor-course-added','/instructor-earning','/instructor-students','/instructor-orders','/instructor-reviews','/instructor-payout'].includes(current) ? 'active' : ''"><a href="#"><i class="bi bi-person-check me-2"></i>{{ $t('instructor_dashboard') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/instructor-dashboard' ? 'active' : ''"><NuxtLink to="/instructor-dashboard" class="active"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-courses' ? 'active' : ''"><NuxtLink to="/instructor-courses"><i class="bi bi-basket2 me-2"></i>{{ $t('courses') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-create-course' ? 'active' : ''"><NuxtLink to="/instructor-create-course"><i class="bi bi-patch-plus me-2"></i>{{ $t('create_course') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-earning' ? 'active' : ''"><NuxtLink to="/instructor-earning"><i class="bi bi-coin me-2"></i>{{ $t('earning') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-students' ? 'active' : ''"><NuxtLink to="/instructor-students"><i class="bi bi-people me-2"></i>{{ $t('students') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-orders' ? 'active' : ''"><NuxtLink to="/instructor-orders"><i class="bi bi-bag-check me-2"></i>{{ $t('my_orders') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-reviews' ? 'active' : ''"><NuxtLink to="/instructor-reviews"><i class="bi bi-star-half me-2"></i>{{ $t('reviews') }}</NuxtLink></li>
                                        <li :class="current === '/instructor-payout' ? 'active' : ''"><NuxtLink to="/instructor-payout"><i class="bi bi-wallet2 me-2"></i>{{ $t('payout') }}</NuxtLink></li>
                                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                    </ul>
                                </li>
                                <li v-if="isStudent || isAdmin" :class="['/student-dashboard','/student-all-courses','/student-subscription','/student-course-resume','/student-wishlist','/student-payment-info'].includes(current) ? 'active' : ''"><a href="#"><i class="bi bi-mortarboard me-2"></i>{{ $t('student_dashboard') }}<span class="submenu-indicator"><span class='submenu-indicator-chevron'></span></span></a>
                                    <ul class="nav-dropdown nav-submenu">
                                        <li :class="current === '/student-dashboard' ? 'active' : ''"><NuxtLink to="/student-dashboard"><i class="bi bi-ui-radios-grid me-2"></i>{{ $t('dashboard') }}</NuxtLink></li>
                                        <li :class="current === '/student-all-courses' ? 'active' : ''"><NuxtLink to="/student-all-courses"><i class="bi bi-play-circle me-2"></i>{{ $t('all_courses') }}</NuxtLink></li>
                                        <li :class="current === '/student-subscription' ? 'active' : ''"><NuxtLink to="/student-subscription"><i class="bi bi-basket2 me-2"></i>{{ $t('my_subscription') }}</NuxtLink></li>
                                        <li :class="current === '/student-course-resume' ? 'active' : ''"><NuxtLink to="/student-course-resume"><i class="bi bi-patch-plus me-2"></i>{{ $t('course_resume') }}</NuxtLink></li>
                                        <li :class="current === '/student-wishlist' ? 'active' : ''"><NuxtLink to="/student-wishlist"><i class="bi bi-wallet2 me-2"></i>{{ $t('wishlist') }}</NuxtLink></li>
                                        <li :class="current === '/student-payment-info' ? 'active' : ''"><NuxtLink to="/student-payment-info"><i class="bi bi-star-half me-2"></i>{{ $t('payment_info') }}</NuxtLink></li>
                                        <li><a href="#"><i class="bi bi-question-octagon me-2"></i>{{ $t('help_support') }}</a></li>
                                    </ul>
                                </li>
                                <li v-if="isAdmin" :class="current === '/admin-dashboard' ? 'active' : ''"><NuxtLink to="/admin-dashboard"><i class="bi bi-shield-lock me-2"></i>{{ $t('administration') }}</NuxtLink></li>
                                <li :class="current === '/profile-edit' ? 'active' : ''"><NuxtLink to="/profile-edit"><i class="bi bi-person-bounding-box me-2"></i>{{ $t('my_profile') }}</NuxtLink></li>
                                <li :class="current === '/settings' ? 'active' : ''"><NuxtLink to="/settings"><i class="bi bi-gear me-2"></i>{{ $t('settings') }}</NuxtLink></li>
                                <li :class="current === '/delete-account' ? 'active' : ''"><NuxtLink to="/delete-account"><i class="bi bi-trash3 me-2"></i>{{ $t('delete_accounts') }}</NuxtLink></li>
                                <li><a href="#" @click.prevent="logout"><i class="bi bi-box-arrow-right me-2"></i>{{ $t('logout') }}</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                    
                    <ul class="nav-menu nav-menu-social align-to-right">
                        <LocaleSwitcher />
								
                        <li class="become-tutor">
                            <NuxtLink to="/student-all-courses"><i class="bi bi-play-circle"></i>{{ $t('my_courses') }}</NuxtLink>
                        </li>
                        <li>
                            <div class="btn-group account-drop">
                                <button type="button" class="btn btn-order-by-filt border-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img :src="avatar3" class="avater-img" alt="">
                                </button>
                                <div class="dropdown-menu pull-right animated flipInX box-shadow-sm">
                                    <div class="dropdown-header py-3 border-bottom">
                                        <div class="d-flex align-items-center gap-2">
                                            <div class="avatar-flex">
                                                <div class="square--50 circle"><img :src="userAvatar" class="img-fluid circle" alt=""></div>
                                            </div>
                                            <div class="caps d-flex flex-column gap-1">
                                                <h6 class="fw-semibold m-0">{{ userName }}</h6>
                                                <span class="text-mid text-muted-2 text-capitalize">{{ userRole }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-body">
                                        <ul>
                                            <li><NuxtLink to="/student-dashboard" :class="current === '/student-dashboard' ? 'active' : ''"><i class="bi bi-ui-radios-grid me-2"></i>Dashboard</NuxtLink></li>
                                            <li><NuxtLink to="/student-all-courses" :class="current === '/student-all-courses' ? 'active' : ''"><i class="bi bi-play-circle me-2"></i>All Courses</NuxtLink></li>
                                            <li><NuxtLink to="/student-subscription" :class="current === '/student-subscription' ? 'active' : ''"><i class="bi bi-basket2 me-2"></i>My Subscription</NuxtLink></li>
                                            <li><NuxtLink to="/student-course-resume" :class="current === '/student-course-resume' ? 'active' : ''"><i class="bi bi-patch-plus me-2"></i>Course Resume</NuxtLink></li>
                                            <li><NuxtLink to="/student-wishlist" :class="current === '/student-wishlist' ? 'active' : ''"><i class="bi bi-wallet2 me-2"></i>Wishlist</NuxtLink></li>
                                            <li><NuxtLink to="/student-payment-info" :class="current === '/student-payment-info' ? 'active' : ''"><i class="bi bi-star-half me-2"></i>Payment Info</NuxtLink></li>
                                            <li><a href="#"><i class="bi bi-question-octagon me-2"></i>Help & Support</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <div class="clearfix"></div>

    <!-- Log In Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="registermodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div class="modal-content" id="registermodal">
                <div class="position-absolute end-0 top-0 mt-3 me-3 z-1">
                    <span class="square--30 circle bg-light z-2" data-bs-dismiss="modal" aria-hidden="true"><i class="bi bi-x"></i></span>
                </div>
                <div class="modal-body p-4">
                    <div class="login-card">
                        
                        <div class="web-logo d-flex align-items-center justify-content-center mb-3">
                            <div class="logo"><img :src="logoIcon" class="img-fluid" width="60" alt="Logo"></div>
                        </div>
                        
                        <div class="login-caps mb-3">
                            <div class="text-center">
                                <h3 class="fw-semibold m-0">Welcome back</h3>
                                <span>Please enter your details to sign in carefully.</span>
                            </div>
                        </div>
                        
                        <div class="social-login-wrap mb-4">
                            <div class=" d-flex align-items-center justify-content-between gap-4">
                                <a href="#" class="btn btn-outline-gray rounded-3 flex-fill"><i class="bi bi-apple"></i></a>
                                <a href="#" @click.prevent="loginWithGoogle" class="btn btn-outline-gray rounded-3 flex-fill"><i class="bi bi-google text-red"></i></a>
                                <a href="#" class="btn btn-outline-gray rounded-3 flex-fill"><i class="bi bi-twitter text-info"></i></a>
                            </div>
                        </div>
                        
                        <div class="deider-wrap w-100 mt-3 mb-5">
                            <div class="d-block border-top position-relative">
                                <span class="position-absolute top-50 start-50 translate-middle square--40 circle bg-white text-muted z-1">OR</span>
                            </div>
                        </div>
                        
                        <div class="login-form">
                            <form @submit.prevent="handleLogin">
                                <div v-if="loginError" class="alert alert-danger py-2 text-sm mb-3">{{ loginError }}</div>

                                <div class="form-group mb-4">
                                    <input
                                        v-model="loginForm.email"
                                        type="email"
                                        class="form-control"
                                        :placeholder="$t('your_email')"
                                        required
                                    >
                                </div>

                                <div class="form-group mb-4">
                                    <div class="position-relative">
                                        <input
                                            v-model="loginForm.password"
                                            :type="showLoginPassword ? 'text' : 'password'"
                                            class="form-control"
                                            placeholder="********"
                                            required
                                        >
                                        <span
                                            class="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                            @click="showLoginPassword = !showLoginPassword"
                                        >
                                            <i :class="showLoginPassword ? 'bi bi-eye-slash text-muted' : 'bi bi-eye text-muted'"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="form-group mb-4">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="form-check">
                                            <input id="saveinfo" class="form-check-input" name="saveinfo" type="checkbox">
                                            <label for="saveinfo" class="form-check-label">{{ $t('remember_me') }}</label>
                                        </div>
                                        <div class="forget-password"><a href="#" class="text-decoration-underline">{{ $t('forgot_password') }}</a></div>
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <button type="submit" class="btn btn-main w-100" :disabled="loginLoading">
                                        <span v-if="loginLoading" class="spinner-border spinner-border-sm me-2"></span>
                                        {{ loginLoading ? $t('signing_in') : $t('sign_in') }}
                                    </button>
                                </div>

                                <div class="form-group">
                                    <div class="text-center text-muted">
                                        {{ $t('no_account') }}
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#signup" data-bs-dismiss="modal" class="fw-semibold">{{ $t('sign_up') }}</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->
    
    <!-- Sign Up Modal -->
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="sign-up" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div class="modal-content" id="sign-up">
                <div class="position-absolute end-0 top-0 mt-3 me-3 z-1">
                    <span class="square--30 circle bg-light z-2" data-bs-dismiss="modal" aria-hidden="true"><i class="bi bi-x"></i></span>
                </div>
                <div class="modal-body p-4">
                    <div class="login-card">
                        
                        <div class="web-logo d-flex align-items-center justify-content-center mb-3">
                            <div class="logo"><img :src="logoIcon" class="img-fluid" width="60" alt="Logo"></div>
                        </div>
                        
                        <div class="login-caps mb-4">
                            <div class="text-center">
                                <h2 class="fw-semibold m-0">Hi! Welcome to</h2>
                                <h3 class="fw-semibold m-0">LearnUp Online Study Center</h3>
                            </div>
                        </div>
                        
                        <div class="login-form">
                            <form @submit.prevent="handleRegister">
                                <div v-if="registerError" class="alert alert-danger py-2 text-sm mb-3">{{ registerError }}</div>

                                <div class="form-group mb-3">
                                    <input
                                        v-model="registerForm.name"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('full_name')"
                                        required
                                    >
                                </div>

                                <div class="form-group mb-3">
                                    <input
                                        v-model="registerForm.email"
                                        type="email"
                                        class="form-control"
                                        :placeholder="$t('your_email')"
                                        required
                                    >
                                </div>

                                <div class="form-group mb-3">
                                    <div class="position-relative">
                                        <input
                                            v-model="registerForm.password"
                                            :type="showRegisterPassword ? 'text' : 'password'"
                                            class="form-control"
                                            placeholder="********"
                                            required
                                        >
                                        <span
                                            class="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                            @click="showRegisterPassword = !showRegisterPassword"
                                        >
                                            <i :class="showRegisterPassword ? 'bi bi-eye-slash text-muted' : 'bi bi-eye text-muted'"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <input
                                        v-model="registerForm.password_confirmation"
                                        type="password"
                                        class="form-control"
                                        :placeholder="$t('confirm_password')"
                                        required
                                    >
                                </div>

                                <div class="form-group mb-3">
                                    <select v-model="registerForm.role" class="form-control form-select">
                                        <option value="student">{{ $t('i_am_student') }}</option>
                                        <option value="instructor">{{ $t('i_am_instructor') }}</option>
                                    </select>
                                </div>

                                <div class="form-group mb-3">
                                    <button type="submit" class="btn btn-main w-100" :disabled="registerLoading">
                                        <span v-if="registerLoading" class="spinner-border spinner-border-sm me-2"></span>
                                        {{ registerLoading ? $t('signing_up') : $t('sign_up') }}
                                    </button>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="text-center text-muted">
                                        {{ $t('already_have_account') }}
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#login" data-bs-dismiss="modal" class="fw-semibold">{{ $t('log_in') }}</a>
                                    </div>
                                </div>
<div class="deider-wrap w-100 mt-4 mb-4">
                                    <div class="d-block border-top position-relative">
                                        <span class="position-absolute top-50 start-50 translate-middle square--40 circle bg-white text-muted z-1">OR</span>
                                    </div>
                                </div>
                                
                                <div class="social-login-wrap">
                                    <div class=" d-flex align-items-center justify-content-between gap-4">
                                        <a href="#" class="btn btn-md btn-gray rounded-3 border-2 flex-fill">SignUp with<i class="bi bi-apple ms-2"></i></a>
                                        <a href="#" @click.prevent="loginWithGoogle" class="btn btn-md btn-gray rounded-3 border-2 flex-fill">SignUp with<i class="bi bi-google text-red ms-2"></i></a>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->
</template>

<script setup lang="ts">
const logo = '/Logo alrei.png'
const logoIcon = '/Logo alrei.png'
import avatar3 from "@/assets/img/avatar-3.jpg";

import LocaleSwitcher from './LocaleSwitcher.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const isMobile = ref(false)
const toggle = ref(false)
const isSticky = ref(false)

const route = useRoute()
const current = computed(() => route.path)
const config = useRuntimeConfig()

const loginWithGoogle = () => {
  const apiBase = config.public.apiBase.replace('/api', '')
  window.location.href = `${apiBase}/api/auth/google/redirect`
}

// --- Auth ---
const { user, login, register, logout, fetchUser, isAuthenticated, isInstructor, isStudent, isAdmin } = useAuth()

// Hydrate l'utilisateur au montage si le token existe
onMounted(async () => {
  window.scrollTo(0, 0)
  checkIsMobile()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)

  if (isAuthenticated.value && !user.value) {
    await fetchUser()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})

const userAvatar = computed(() => user.value?.avatar || avatar3)
const userName   = computed(() => user.value?.name  || 'Invité')
const userRole   = computed(() => user.value?.role  || '')

// --- Login form ---
const loginForm  = ref({ email: '', password: '' })
const loginError = ref<string | null>(null)
const loginLoading = ref(false)
const showLoginPassword = ref(false)

const handleLogin = async () => {
  loginError.value = null
  loginLoading.value = true
  try {
    await login(loginForm.value)
    // La redirection est gérée par useAuth.redirectAfterLogin
  } catch (err) {
    loginError.value =
      err?.data?.errors?.email?.[0] ||
      err?.data?.message ||
      'Identifiants invalides. Veuillez réessayer.'
  } finally {
    loginLoading.value = false
  }
}

// --- Register form ---
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'student',
})
const registerError   = ref<string | null>(null)
const registerLoading = ref(false)
const showRegisterPassword = ref(false)

const handleRegister = async () => {
  registerError.value = null
  registerLoading.value = true
  try {
    await register(registerForm.value)
  } catch (err) {
    const errors = err?.data?.errors
    registerError.value = errors
      ? Object.values(errors).flat().join(' ')
      : err?.data?.message || 'Erreur lors de l\'inscription.'
  } finally {
    registerLoading.value = false
  }
}

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 992
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 992
}

const handleScroll = () => {
  isSticky.value = window.scrollY > 100
}
</script>