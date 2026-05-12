<template>
    <InstructorNavbar /> <!-- We can reuse or create an AdminNavbar later -->

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-80"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="mb-4">{{ $t('platform_administration') }}</h2>
                    
                    <div v-if="loading" class="text-center py-5">
                        <div class="spinner-border text-primary" role="status"></div>
                    </div>

                    <div v-else class="row gy-3 mb-5">
                        <div class="col-xl-3 col-lg-3 col-md-6" v-for="(stat, key) in adminStats" :key="key">
                            <div class="card rounded-3 border px-3 py-4 shadow-sm">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="square--60 circle bg-light-primary fs-3">
                                        <i :class="stat.icon"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <h2 class="fw-bold m-0">{{ stat.value }}</h2>
                                        <span class="text-muted small">{{ stat.label }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border rounded-3">
                        <div class="card-header bg-white border-bottom py-3">
                            <ul class="nav nav-tabs card-header-tabs border-0" id="adminTabs" role="tablist">
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'instructors' ? 'active' : '']" 
                                        @click="activeTab = 'instructors'"
                                    >
                                        {{ $t('instructors') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'students' ? 'active' : '']" 
                                        @click="activeTab = 'students'"
                                    >
                                        {{ $t('students') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'courses' ? 'active' : '']" 
                                        @click="activeTab = 'courses'"
                                    >
                                        {{ $t('courses') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'groups' ? 'active' : '']" 
                                        @click="activeTab = 'groups'"
                                    >
                                        {{ $t('groups') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'blogs' ? 'active' : '']" 
                                        @click="activeTab = 'blogs'"
                                    >
                                        {{ $t('blogs') }}
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button 
                                        :class="['nav-link', activeTab === 'certificates' ? 'active' : '']" 
                                        @click="activeTab = 'certificates'"
                                    >
                                        Certificats ({{ pendingCertificatesCount }})
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <!-- Actions Rapides -->
                            <div class="d-flex justify-content-end mb-3 gap-2">
                                <button 
                                    class="btn btn-primary btn-sm" 
                                    @click="userForm = { name: '', email: '', password: '', role: 'student' }"
                                    data-bs-toggle="modal" 
                                    data-bs-target="#userModal"
                                >
                                    <i class="bi bi-person-plus me-1"></i> {{ $t('add_user') }}
                                </button>
                            </div>
                            <!-- Instructors Tab -->
                            <div v-if="activeTab === 'instructors'" class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>{{ $t('name') }}</th>
                                            <th>{{ $t('title') }}</th>
                                            <th>{{ $t('status') }}</th>
                                            <th>{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="inst in instructors" :key="inst.id">
                                            <td>{{ inst.user?.name || 'N/A' }}</td>
                                            <td>{{ inst.title || 'Instructor' }}</td>
                                            <td>
                                                <span :class="['badge', inst.status === 'approved' ? 'bg-success' : 'bg-warning']">
                                                    {{ inst.status }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button 
                                                        @click="viewDetails(inst)" 
                                                        class="btn btn-sm btn-outline-primary"
                                                        title="View Details"
                                                    >
                                                        <i class="bi bi-eye"></i>
                                                    </button>
                                                    <button 
                                                        v-if="inst.status === 'pending'"
                                                        @click="approve(inst.id)" 
                                                        class="btn btn-sm btn-success"
                                                        title="Approve"
                                                    >
                                                        <i class="bi bi-check-lg"></i>
                                                    </button>
                                                    <button 
                                                        @click="toggleUserStatus(inst.user?.id)" 
                                                        :class="['btn btn-sm', inst.user?.is_active ? 'btn-warning' : 'btn-info']"
                                                        :title="inst.user?.is_active ? 'Deactivate' : 'Activate'"
                                                    >
                                                        <i :class="['bi', inst.user?.is_active ? 'bi-person-x' : 'bi-person-check']"></i>
                                                    </button>
                                                    <button 
                                                        @click="deleteUser(inst.user?.id)" 
                                                        class="btn btn-sm btn-danger"
                                                        title="Delete"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Students Tab -->
                            <div v-if="activeTab === 'students'" class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>{{ $t('name') }}</th>
                                            <th>{{ $t('email') }}</th>
                                            <th>{{ $t('joined_at') }}</th>
                                            <th>{{ $t('status') }}</th>
                                            <th>{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="student in students" :key="student.id">
                                            <td>{{ student?.name || 'N/A' }}</td>
                                            <td>{{ student?.email }}</td>
                                            <td>{{ student?.created_at ? new Date(student.created_at).toLocaleDateString() : 'N/A' }}</td>
                                            <td>
                                                <span :class="['badge', student?.is_active ? 'bg-success' : 'bg-danger']">
                                                    {{ student?.is_active ? 'Active' : 'Inactive' }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button 
                                                        @click="openAssignModal('user', student.id)" 
                                                        class="btn btn-sm btn-primary"
                                                        title="Assigner Cours"
                                                    >
                                                        <i class="bi bi-book"></i>
                                                    </button>
                                                    <button 
                                                        @click="toggleUserStatus(student.id)" 
                                                        :class="['btn btn-sm', student?.is_active ? 'btn-warning' : 'btn-info']"
                                                        :title="student?.is_active ? 'Deactivate' : 'Activate'"
                                                    >
                                                        <i :class="['bi', student?.is_active ? 'bi-person-x' : 'bi-person-check']"></i>
                                                    </button>
                                                    <button 
                                                        @click="deleteUser(student.id)" 
                                                        class="btn btn-sm btn-danger"
                                                        title="Delete"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Courses Tab -->
                            <div v-if="activeTab === 'courses'" class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th>{{ $t('title') }}</th>
                                            <th>{{ $t('instructor') }}</th>
                                            <th>{{ $t('price') }}</th>
                                            <th>{{ $t('status') }}</th>
                                            <th>{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="course in courses" :key="course.id">
                                            <td>{{ course.title }}</td>
                                            <td>{{ course.instructor?.user?.name }}</td>
                                            <td>{{ course.price }} FCFA</td>
                                            <td>
                                                <span :class="['badge', course.status === 'published' ? 'bg-success' : 'bg-secondary']">
                                                    {{ course.status }}
                                                </span>
                                            </td>
                                            <td>
                                                <div class="d-flex gap-2">
                                                    <button 
                                                        @click="toggleCourseStatus(course.id)" 
                                                        :class="['btn btn-sm', course.status === 'published' ? 'btn-warning' : 'btn-info']"
                                                        :title="course.status === 'published' ? 'Unpublish' : 'Publish'"
                                                    >
                                                        <i :class="['bi', course.status === 'published' ? 'bi-eye-slash' : 'bi-eye']"></i>
                                                    </button>
                                                    <button 
                                                        @click="deleteCourse(course.id)" 
                                                        class="btn btn-sm btn-danger"
                                                        title="Delete"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Groups Tab -->
                            <div v-if="activeTab === 'groups'">
                                <div class="d-flex justify-content-end mb-3">
                                    <button 
                                        class="btn btn-warning btn-sm" 
                                        @click="groupForm = { name: '', description: '', user_ids: [] }"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#groupModal"
                                    >
                                        <i class="bi bi-plus-circle me-1"></i> {{ $t('create_group') }}
                                    </button>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>{{ $t('group_name') }}</th>
                                                <th>{{ $t('students') }}</th>
                                                <th>{{ $t('action') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="group in groups" :key="group.id">
                                                <td class="fw-bold">{{ group.name }}</td>
                                                <td>
                                                    <span class="badge bg-light-primary text-primary">
                                                        {{ group.users_count || group.users?.length || 0 }} {{ $t('students') }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="d-flex gap-2">
                                                        <button 
                                                            @click="openAssignModal('group', group.id)" 
                                                            class="btn btn-sm btn-primary"
                                                            :title="$t('assign_course')"
                                                        >
                                                            <i class="bi bi-book"></i>
                                                        </button>
                                                        <button @click="deleteGroup(group.id)" class="btn btn-sm btn-outline-danger">
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!-- Blogs Tab -->
                            <div v-if="activeTab === 'blogs'">
                                <div class="d-flex justify-content-end mb-3">
                                    <button 
                                        class="btn btn-info btn-sm text-white" 
                                        @click="openBlogModal()"
                                    >
                                        <i class="bi bi-plus-circle me-1"></i> {{ $t('add_blog') }}
                                    </button>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>{{ $t('image') }}</th>
                                                <th>{{ $t('title') }}</th>
                                                <th>{{ $t('category') }}</th>
                                                <th>{{ $t('author') }}</th>
                                                <th>{{ $t('status') }}</th>
                                                <th>{{ $t('action') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="blog in blogs" :key="blog.id">
                                                <td>
                                                    <img :src="blog.image ? (blog.image.startsWith('http') ? blog.image : storageUrl(blog.image)) : '/img/blog-placeholder.jpg'" width="50" class="rounded" alt="">
                                                </td>
                                                <td class="fw-bold">{{ blog.title }}</td>
                                                <td><span class="badge bg-light-info text-info">{{ blog.category }}</span></td>
                                                <td>{{ blog.author_name }}</td>
                                                <td>
                                                    <span :class="['badge', blog.status === 'published' ? 'bg-success' : 'bg-warning']">
                                                        {{ blog.status }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="d-flex gap-2">
                                                        <button @click="openBlogModal(blog)" class="btn btn-sm btn-outline-primary">
                                                            <i class="bi bi-pencil"></i>
                                                        </button>
                                                        <button @click="deleteBlog(blog.id)" class="btn btn-sm btn-outline-danger">
                                                            <i class="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Certificates Tab -->
                            <div v-if="activeTab === 'certificates'">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Étudiant</th>
                                                <th>Cours</th>
                                                <th>Date demande</th>
                                                <th>Statut</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="cert in certificates" :key="cert.id">
                                                <td>
                                                    <div class="fw-bold">{{ cert.user?.name }}</div>
                                                    <small class="text-muted">{{ cert.user?.email }}</small>
                                                </td>
                                                <td>{{ cert.course?.title }}</td>
                                                <td>{{ new Date(cert.issued_at).toLocaleDateString() }}</td>
                                                <td>
                                                    <span :class="['badge rounded-pill', cert.status === 'approved' ? 'bg-success' : cert.status === 'rejected' ? 'bg-danger' : 'bg-warning']">
                                                        {{ cert.status === 'approved' ? 'Validé' : cert.status === 'rejected' ? 'Rejeté' : 'En attente' }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="d-flex gap-2">
                                                        <button 
                                                            v-if="cert.status === 'pending'"
                                                            @click="approveCert(cert.id)" 
                                                            class="btn btn-sm btn-success rounded-pill px-3"
                                                        >
                                                            Valider
                                                        </button>
                                                        <button 
                                                            v-if="cert.status === 'pending'"
                                                            @click="rejectCert(cert.id)" 
                                                            class="btn btn-sm btn-outline-danger rounded-pill px-3"
                                                        >
                                                            Rejeter
                                                        </button>
                                                        <a 
                                                            :href="`${useRuntimeConfig().public.apiBase}/certificates/${cert.id}/download`" 
                                                            target="_blank"
                                                            class="btn btn-sm btn-light rounded-circle"
                                                            title="Aperçu"
                                                        >
                                                            <i class="bi bi-eye"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-if="certificates.length === 0">
                                                <td colspan="5" class="text-center py-4 text-muted">Aucune demande de certificat.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal Détails Instructeur -->
    <div class="modal fade" id="instructorModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg rounded-4">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-bold">{{ $t('application_details') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div v-if="selectedInstructor" class="d-flex flex-column gap-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="square--60 circle bg-light-primary text-primary fs-3 fw-bold">
                                {{ selectedInstructor.user.name.charAt(0) }}
                            </div>
                            <div>
                                <h5 class="m-0 fw-bold">{{ selectedInstructor.user.name }}</h5>
                                <p class="m-0 text-muted">{{ selectedInstructor.user.email }}</p>
                            </div>
                        </div>
                        <hr class="my-2">
                        <div>
                            <label class="text-muted small fw-bold text-uppercase">Spécialisation</label>
                            <h6 class="fw-semibold">{{ selectedInstructor.title }}</h6>
                        </div>
                        <div>
                            <label class="text-muted small fw-bold text-uppercase">Biographie</label>
                            <p class="mb-0 text-dark" style="white-space: pre-line;">{{ selectedInstructor.bio }}</p>
                        </div>
                        <div class="mt-3" v-if="selectedInstructor.status === 'pending'">
                            <button @click="approve(selectedInstructor.id)" class="btn btn-success w-100 rounded-pill py-2 fw-bold" data-bs-dismiss="modal">
                                <i class="bi bi-check-circle me-2"></i>{{ $t('approve_application') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Ajouter Utilisateur -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('add_user') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitUser">
                        <div class="mb-3">
                            <label class="form-label">{{ $t('full_name') }}</label>
                            <input type="text" class="form-control" v-model="userForm.name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">{{ $t('email') }}</label>
                            <input type="email" class="form-control" v-model="userForm.email" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">{{ $t('password') }}</label>
                            <input type="password" class="form-control" v-model="userForm.password" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">{{ $t('role') }}</label>
                            <select class="form-select" v-model="userForm.role" required>
                                <option value="student">{{ $t('student') }}</option>
                                <option value="instructor">{{ $t('instructor') }}</option>
                                <option value="admin">{{ $t('admin') }}</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" :disabled="submitting">{{ $t('create') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Créer Groupe -->
    <div class="modal fade" id="groupModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('create_group') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitGroup">
                        <div class="mb-3">
                            <label class="form-label">{{ $t('group_name') }}</label>
                            <input type="text" class="form-control" v-model="groupForm.name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">{{ $t('description') }}</label>
                            <textarea class="form-control" v-model="groupForm.description"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">{{ $t('select_students') }}</label>
                            <select multiple class="form-select" v-model="groupForm.user_ids" style="height: 150px;">
                                <option v-for="student in students" :key="student.id" :value="student.id">
                                    {{ student.name }} ({{ student.email }})
                                </option>
                            </select>
                            <small class="text-muted">{{ $t('hold_ctrl_to_select_multiple') }}</small>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" :disabled="submitting">{{ $t('save') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Assigner Cours -->
    <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('assign_course') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitAssign">
                        <div class="mb-3">
                            <label class="form-label">{{ $t('select_course') }}</label>
                            <select class="form-select" v-model="assignForm.course_id" required>
                                <option v-for="course in courses" :key="course.id" :value="course.id">
                                    {{ course.title }}
                                </option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" :disabled="submitting">{{ $t('assign') }}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Blog -->
    <div class="modal fade" id="blogModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ blogForm.id ? $t('edit_blog') : $t('add_blog') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitBlog">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label class="form-label">{{ $t('title') }}</label>
                                    <input type="text" class="form-control" v-model="blogForm.title" required>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">{{ $t('category') }}</label>
                                    <input type="text" class="form-control" v-model="blogForm.category" required>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">{{ $t('short_description') }}</label>
                            <textarea class="form-control" v-model="blogForm.description" rows="2"></textarea>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">{{ $t('content') }}</label>
                            <textarea class="form-control" v-model="blogForm.content" rows="6"></textarea>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">{{ $t('author_name') }}</label>
                                    <input type="text" class="form-control" v-model="blogForm.author_name" required>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label class="form-label">{{ $t('read_time') }}</label>
                                    <input type="text" class="form-control" v-model="blogForm.read_time" placeholder="05 Min Read">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label class="form-label">{{ $t('status') }}</label>
                                    <select class="form-select" v-model="blogForm.status">
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">{{ $t('blog_image') }}</label>
                            <input type="file" class="form-control" @change="handleBlogImage">
                        </div>

                        <button type="submit" class="btn btn-primary w-100" :disabled="submitting">
                            {{ submitting ? $t('saving') : $t('save') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <FooterDark />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';

// Protège la route — seul un admin peut accéder
definePageMeta({
    middleware: ['admin'],
});

const api = useApi()
const stats = ref<any>(null)
const instructors = ref<any[]>([])
const students = ref<any[]>([])
const courses = ref<any[]>([])
const groups = ref<any[]>([])
const blogs = ref<any[]>([])
const certificates = ref<any[]>([])
const loading = ref(true)
const submitting = ref(false)
const activeTab = ref('instructors')
const selectedInstructor = ref<any>(null)

// Forms
const userForm = ref({ name: '', email: '', password: '', role: 'student' })
const groupForm = ref({ name: '', description: '', user_ids: [] })
const assignForm = ref({ course_id: '', target_type: 'user', target_id: '' })
const blogForm = ref({ id: null, title: '', category: '', description: '', content: '', author_name: '', read_time: '', status: 'published', image: null as any })

let userModalInstance: any = null
let groupModalInstance: any = null
let assignModalInstance: any = null
let blogModalInstance: any = null

onMounted(() => {
    fetchAll()
})

const viewDetails = (inst: any) => {
    selectedInstructor.value = inst
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        const modal = new ($bootstrap as any).Modal(document.getElementById('instructorModal'))
        modal.show()
    }
}

const fetchAll = async () => {
    loading.value = true
    
    const fetchItem = async (url: string, refVar: any) => {
        try {
            const res: any = await api(url)
            refVar.value = res?.data || res || []
        } catch (err) {
            console.error(`Error fetching ${url}:`, err)
            refVar.value = []
        }
    }

    try {
        await Promise.all([
            fetchItem('/admin/stats', stats),
            fetchItem('/admin/instructors', instructors),
            fetchItem('/admin/students', students),
            fetchItem('/admin/courses', courses),
            fetchItem('/admin/groups', groups),
            fetchItem('/admin/blogs', blogs),
            fetchItem('/admin/certificates', certificates)
        ])
    } catch (err) {
        console.error('General Admin Fetch Error:', err)
    } finally {
        loading.value = false
    }
}

const adminStats = computed(() => [
    { label: 'Revenue', value: `${stats.value?.total_revenue || 0} FCFA`, icon: 'bi bi-cash-stack' },
    { label: 'Students', value: stats.value?.total_students || 0, icon: 'bi bi-people' },
    { label: 'Instructors', value: stats.value?.total_instructors || 0, icon: 'bi bi-person-badge' },
    { label: 'Courses', value: stats.value?.total_courses || 0, icon: 'bi bi-book' },
])

const pendingCertificatesCount = computed(() => {
    return certificates.value.filter(c => c.status === 'pending').length
})

const approveCert = async (id: number) => {
    if (!confirm('Valider ce certificat ?')) return
    try {
        await api(`/admin/certificates/${id}/approve`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Approval failed:', err)
    }
}

const rejectCert = async (id: number) => {
    if (!confirm('Rejeter cette demande ?')) return
    try {
        await api(`/admin/certificates/${id}/reject`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Rejection failed:', err)
    }
}

const approve = async (id: number) => {
    try {
        await api(`/admin/instructors/${id}/approve`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Approval failed:', err)
    }
}

const toggleUserStatus = async (id: number) => {
    try {
        await api(`/admin/users/${id}/toggle-status`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Toggle status failed:', err)
    }
}

const deleteUser = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
    try {
        await api(`/admin/users/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete failed:', err)
    }
}

const toggleCourseStatus = async (id: number) => {
    try {
        await api(`/admin/courses/${id}/toggle-status`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Toggle status failed:', err)
    }
}

const deleteCourse = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return
    try {
        await api(`/admin/courses/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete failed:', err)
    }
}

// User Actions
const openUserModal = () => {
    userForm.value = { name: '', email: '', password: '', role: 'student' }
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        if (!userModalInstance) {
            userModalInstance = new ($bootstrap as any).Modal(document.getElementById('userModal'))
        }
        userModalInstance.show()
    }
}

const submitUser = async () => {
    submitting.value = true
    try {
        await api('/admin/users', { method: 'POST', body: userForm.value })
        userModalInstance?.hide()
        await fetchAll()
    } catch (err) {
        console.error('Create user failed:', err)
        alert('Erreur lors de la création')
    } finally {
        submitting.value = false
    }
}

// Group Actions
const openGroupModal = () => {
    groupForm.value = { name: '', description: '', user_ids: [] }
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        if (!groupModalInstance) {
            groupModalInstance = new ($bootstrap as any).Modal(document.getElementById('groupModal'))
        }
        groupModalInstance.show()
    }
}

const submitGroup = async () => {
    submitting.value = true
    try {
        await api('/admin/groups', { method: 'POST', body: groupForm.value })
        groupModalInstance?.hide()
        await fetchAll()
    } catch (err) {
        console.error('Create group failed:', err)
        alert('Erreur lors de la création du groupe')
    } finally {
        submitting.value = false
    }
}

const deleteGroup = async (id: number) => {
    if (!confirm('Supprimer ce groupe ?')) return
    try {
        await api(`/admin/groups/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete group failed:', err)
    }
}

// Assign Course
const openAssignModal = (type: string, id: number) => {
    assignForm.value = { course_id: '', target_type: type, target_id: id.toString() }
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        if (!assignModalInstance) {
            assignModalInstance = new ($bootstrap as any).Modal(document.getElementById('assignModal'))
        }
        assignModalInstance.show()
    }
}

const submitAssign = async () => {
    submitting.value = true
    try {
        await api('/admin/assign-course', { method: 'POST', body: assignForm.value })
        assignModalInstance?.hide()
        alert('Cours assigné avec succès')
        await fetchAll()
    } catch (err) {
        console.error('Assign course failed:', err)
        alert('Erreur lors de l\'assignation')
    } finally {
        submitting.value = false
    }
}

// Blog Actions
const openBlogModal = (blog: any = null) => {
    if (blog) {
        blogForm.value = { ...blog }
    } else {
        blogForm.value = { id: null, title: '', category: '', description: '', content: '', author_name: '', read_time: '', status: 'published', image: null }
    }
    
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        const modalElement = document.getElementById('blogModal')
        if (modalElement) {
            const modal = new ($bootstrap as any).Modal(modalElement)
            modal.show()
        }
    }
}

const handleBlogImage = (event: any) => {
    blogForm.value.image = event.target.files[0]
}

const submitBlog = async () => {
    submitting.value = true
    try {
        const formData = new FormData()
        Object.keys(blogForm.value).forEach(key => {
            if (blogForm.value[key] !== null) {
                formData.append(key, blogForm.value[key])
            }
        })

        const url = blogForm.value.id ? `/admin/blogs/${blogForm.value.id}` : '/admin/blogs'
        await api(url, { method: 'POST', body: formData })
        
        blogModalInstance?.hide()
        await fetchAll()
    } catch (err) {
        console.error('Save blog failed:', err)
        alert('Erreur lors de l\'enregistrement du blog')
    } finally {
        submitting.value = false
    }
}

const deleteBlog = async (id: number) => {
    if (!confirm('Supprimer cet article ?')) return
    try {
        await api(`/admin/blogs/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete blog failed:', err)
    }
}

const storageUrl = (path: string) => {
    const config = useRuntimeConfig()
    return `${config.public.apiBase.replace('/api', '')}/storage/${path}`
}

// Note: Removed onMounted(fetchAll) as it's now handled in the new onMounted block above.
</script>
