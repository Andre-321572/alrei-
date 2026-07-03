<template>

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                
                    <Sidebar />
                    
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12">
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">{{ $t('home') }}</a></li>
                                    <li class="breadcrumb-item"><a href="#">{{ $t('dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('settings') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            
                            <div class="card border">
                            
                                <div class="card-header bg-transparent border-bottom">
                                    <h3 class="card-header-title">{{ $t('settings') }}</h3>
                                </div>

                                <div class="card-body">

                                    <h5 class="card-header-title">{{ $t('notification_settings') }}</h5>
                                    <p class="mb-2 mt-3">{{ $t('choose_notification_type') }}</p>
                                    <div class="form-check form-switch form-check-md mb-3">
                                        <input class="form-check-input" type="checkbox" id="notificaton1" checked="">
                                        <label class="form-check-label" for="notificaton1">{{ $t('notify_email_login') }}</label>
                                    </div>
                                    <div class="form-check form-switch form-check-md mb-3">
                                        <input class="form-check-input" type="checkbox" id="notificaton2">
                                        <label class="form-check-label" for="notificaton2">{{ $t('send_sms_payment') }}</label>
                                    </div>
                                    <div class="form-check form-switch form-check-md mb-3">
                                        <input class="form-check-input" type="checkbox" id="notificaton3" checked="">
                                        <label class="form-check-label" for="notificaton3">{{ $t('check_devices') }}</label>
                                    </div>
                                    <div class="form-check form-switch form-check-md mb-3">
                                        <input class="form-check-input" type="checkbox" id="notificaton4">
                                        <label class="form-check-label" for="notificaton4">{{ $t('show_profile_publicly') }}</label>
                                    </div>

                                    <div class="d-sm-flex justify-content-end gap-2">
                                        <button type="button" class="btn btn-md btn-main">{{ $t('save_changes') }}</button>
                                        <a href="#" class="btn btn-md btn-outline-dark">{{ $t('cancel') }}</a>
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

import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';


definePageMeta({
    layout: 'instructor',
});
</script>