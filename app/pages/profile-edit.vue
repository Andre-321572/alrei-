<template>

    <Preloader />
    <InstructorNavbar />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                    <Sidebar v-if="isAdmin || isInstructor" />
                    <StudentAdminSidebar v-else />
                </div>	
                
                <div class="col-lg-9 col-md-12 col-sm-12"> 
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pb-4">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><NuxtLink to="/">{{ $t('home') }}</NuxtLink></li>
                                    <li class="breadcrumb-item"><NuxtLink :to="dashboardLink">{{ $t('dashboard') }}</NuxtLink></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('profile_edit') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card border">
                            
                                <div class="card-header">
                                    <h4 class="mb-0">{{ $t('profile_details') }}</h4>
                                </div>
                                
                                <div class="card-body">
                                    <div class="d-lg-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center mb-4 mb-lg-0">
                                            <div class="position-relative">
                                                <img :src="avatarPreview || user?.avatar || avatar1" class="img-fluid circle w-20 shadow-sm" alt="avatar Image">
                                                <input type="file" ref="fileInput" @change="handleFileChange" class="d-none" accept="image/*">
                                            </div>
                                            <div class="ms-3">
                                                <h4 class="mb-0">{{ $t('your_avatar') }}</h4>
                                                <p class="ext-mid text-muted mb-0">{{ $t('avatar_instructions') }}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center gap-2">
                                            <button @click="$refs.fileInput.click()" class="btn btn-light-green btn-sm">{{ $t('update') }}</button>
                                            <button @click="removeAvatar" class="btn btn-light-red btn-sm">{{ $t('delete') }}</button>
                                        </div>
                                    </div>
                                    
                                    <hr class="my-4">
                                    
                                    <div class="form-section">
                                    
                                        <h4 class="mb-0">{{ $t('personal_details') }}</h4>
                                        <p class="text-muted mb-4">{{ $t('personal_details_desc') }}</p>
                                        
                                        <!-- Form -->
                                        <form class="row g-3" @submit.prevent="updateProfile">
                                        
                                            <div class="col-12">
                                                <label class="form-label">{{ $t('full_name') }}</label>
                                                <input v-model="form.name" type="text" class="form-control" :placeholder="$t('full_name')" required>
                                            </div>
                                            
                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('email') }}</label>
                                                <input v-model="form.email" class="form-control" type="email" placeholder="Your eMail" readonly disabled>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label class="form-label">{{ $t('phone') }}</label>
                                                <input v-model="form.phone" type="text" class="form-control" :placeholder="$t('phone')">
                                            </div>
                                            
                                            <template v-if="isInstructor">
                                                <hr class="my-4">
                                                <h4 class="mb-0">Détails Instructeur</h4>
                                                <p class="text-muted mb-4">Informations visibles sur votre profil public.</p>
                                                
                                                <div class="col-12">
                                                    <label class="form-label">Titre / Spécialisation</label>
                                                    <input v-model="form.instructor_data.title" type="text" class="form-control" placeholder="Ex: Senior UX Designer">
                                                </div>

                                                <div class="col-12">
                                                    <label class="form-label">Biographie</label>
                                                    <textarea v-model="form.instructor_data.bio" class="form-control" rows="4" placeholder="Parlez-nous de vous..."></textarea>
                                                </div>
                                            </template>

                                            <div class="col-12 mt-4">
                                                <button class="btn btn-main px-5" type="submit" :disabled="loading">
                                                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                                    {{ $t('update_profile') }}
                                                </button>
                                            </div>
                                        
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            
            </div>
            
        </div>
    </section>

    <FooterDark />
    <ScrollToTop />

</template>

<script setup>
import Preloader from '@/components/Preloader.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import avatar1 from "@/assets/img/avatar-1.jpg";

const { user, isAdmin, isInstructor, isStudent, fetchUser } = useAuth()
const api = useApi()

const loading = ref(false)
const avatarPreview = ref(null)
const selectedFile = ref(null)

const form = ref({
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    instructor_data: {
        title: user.value?.instructor?.title || '',
        bio: user.value?.instructor?.bio || ''
    }
})

const dashboardLink = computed(() => {
    if (isAdmin.value) return '/admin-dashboard'
    if (isInstructor.value) return '/instructor-dashboard'
    return '/student-dashboard'
})

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        selectedFile.value = file
        avatarPreview.value = URL.createObjectURL(file)
    }
}

const removeAvatar = () => {
    selectedFile.value = null
    avatarPreview.value = null
    // Note: On pourrait appeler une API pour supprimer l'avatar, mais ici on attend la soumission
}

const updateProfile = async () => {
    loading.value = true
    try {
        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('phone', form.value.phone)
        
        if (selectedFile.value) {
            formData.append('avatar', selectedFile.value)
        }

        if (isInstructor.value) {
            formData.append('instructor_data[title]', form.value.instructor_data.title)
            formData.append('instructor_data[bio]', form.value.instructor_data.bio)
        }

        await api('/profile/update', {
            method: 'POST',
            body: formData
        })

        await fetchUser() // Refresh local user state
        alert('Profil mis à jour avec succès !')
    } catch (err) {
        console.error('Update profile failed:', err)
        alert('Erreur lors de la mise à jour du profil.')
    } finally {
        loading.value = false
    }
}

// Ensure user data is loaded if not already
onMounted(async () => {
    if (!user.value) {
        await fetchUser()
    }
})
</script>