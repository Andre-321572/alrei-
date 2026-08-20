<template>
    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-80"></div>
        </div>
    </section>

    <section class="pt-4">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                    <AdminSidebar
                        v-model:activeTab="activeTab"
                        :pending-certificates="pendingCertificatesCount"
                        :pending-scholarships="pendingScholarshipsCount"
                    />
                </div>
                <div class="col-lg-9 col-md-12">
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

                    <div class="card border rounded-3" :style="{ minHeight: activeTab === 'country_summary' ? 'auto' : '550px' }">
                        <div class="card-body">
                            <!-- Actions Rapides -->
                            <div class="d-flex justify-content-end mb-3 gap-2">
                                <button v-if="activeTab==='categories'" class="btn btn-primary btn-sm" @click="openCategoryModal()"><i class="bi bi-plus-lg me-1"></i> Ajouter Catégorie</button>
                                <button v-else-if="activeTab==='instructors'" class="btn btn-primary btn-sm" @click="openUserModal('instructor')"><i class="bi bi-plus-lg me-1"></i> Ajouter Instructeur</button>
                                <button v-else-if="activeTab==='students'" class="btn btn-primary btn-sm" @click="openUserModal('student')"><i class="bi bi-plus-lg me-1"></i> Ajouter Étudiant</button>
                                <button v-else-if="activeTab==='courses'" class="btn btn-primary btn-sm" @click="openCourseModal()"><i class="bi bi-plus-lg me-1"></i> Ajouter Cours</button>
                                <button v-else-if="activeTab==='groups'" class="btn btn-primary btn-sm" @click="openGroupModal()"><i class="bi bi-plus-lg me-1"></i> Ajouter Groupe</button>
                                <button v-else-if="activeTab==='blogs'" class="btn btn-primary btn-sm" @click="openBlogModal()"><i class="bi bi-plus-lg me-1"></i> Ajouter Blog</button>
                                <button v-else-if="activeTab==='scholarships'" class="btn btn-primary btn-sm" @click="openScholarshipModal()"><i class="bi bi-plus-lg me-1"></i> Ajouter Bourse</button>
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
                            <div v-if="activeTab === 'students'">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="m-0">{{ $t('students_list') }}</h5>
                                    <div class="d-flex gap-2">
                                        <button @click="exportStudentsCsv" class="btn btn-success btn-sm rounded-pill">
                                            <i class="bi bi-filetype-csv me-1"></i> {{ $t('export_csv') }}
                                        </button>
                                        <button @click="exportStudentsPdf" class="btn btn-danger btn-sm rounded-pill">
                                            <i class="bi bi-filetype-pdf me-1"></i> {{ $t('export_pdf') }}
                                        </button>
                                    </div>
                                </div>
                                <div class="table-responsive">
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
                                            <td>{{ course.price }} €</td>
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
                                        @click="openGroupModal()"
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
                                                        <button 
                                                            @click="previewCert(cert.id, cert.certificate_number)" 
                                                            class="btn btn-sm btn-light rounded-circle"
                                                            title="Aperçu"
                                                        >
                                                            <i class="bi bi-eye"></i>
                                                        </button>
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
                            <!-- Scholarships Tab -->
                            <div v-if="activeTab === 'scholarships'">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="m-0">Bourses d'études</h5>
                                    <button 
                                        class="btn btn-warning btn-sm" 
                                        @click="openScholarshipModal()"
                                    >
                                        <i class="bi bi-plus-circle me-1"></i> Créer une Bourse
                                    </button>
                                </div>
                                
                                <div class="row">
                                    <!-- Scholarships List -->
                                    <div class="col-md-6 mb-4">
                                        <h6>Bourses disponibles</h6>
                                        <div class="table-responsive">
                                            <table class="table table-hover align-middle">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>Nom</th>
                                                        <th>Cours</th>
                                                        <th>Valeur</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="sch in scholarships" :key="sch.id">
                                                        <td class="fw-bold">{{ sch.name }}</td>
                                                        <td>{{ sch.course?.title || 'N/A' }}</td>
                                                        <td>{{ sch.value }} €</td>
                                                        <td>
                                                            <div class="d-flex gap-2">
                                                                <button @click="openScholarshipModal(sch)" class="btn btn-sm btn-outline-secondary" title="Modifier">
                                                                    <i class="bi bi-pencil"></i>
                                                                </button>
                                                                <button @click="deleteScholarship(sch.id)" class="btn btn-sm btn-outline-danger" title="Supprimer">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    
                                    <!-- Scholarship Applications -->
                                    <div class="col-md-6">
                                        <h6>Demandes de bourses</h6>
                                        <div class="table-responsive">
                                            <table class="table table-hover align-middle">
                                                <thead class="table-light">
                                                    <tr>
                                                        <th>Étudiant</th>
                                                        <th>Bourse</th>
                                                        <th>Documents</th>
                                                        <th>Statut</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="app in scholarshipApplications" :key="app.id">
                                                        <td>{{ app.user?.name }}</td>
                                                        <td>{{ app.scholarship?.name }}</td>
                                                        <td>
                                                            <div class="d-flex flex-column gap-1">
                                                                <button @click="viewMotivation(app)" class="btn btn-xs btn-outline-info py-0 px-2 text-info" style="font-size: 0.75rem;">
                                                                    <i class="bi bi-file-text me-1"></i>Motivation
                                                                </button>
                                                                <a 
                                                                    v-if="app.supporting_document"
                                                                    :href="storageUrl(app.supporting_document)"
                                                                    target="_blank"
                                                                    class="btn btn-xs btn-outline-primary py-0 px-2"
                                                                    style="font-size: 0.75rem;"
                                                                >
                                                                    <i class="bi bi-file-earmark-arrow-down me-1"></i>Justificatif
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span :class="['badge rounded-pill', app.status === 'approved' ? 'bg-success' : app.status === 'rejected' ? 'bg-danger' : 'bg-warning']">
                                                                {{ app.status === 'approved' ? 'Validé' : app.status === 'rejected' ? 'Rejeté' : 'En attente' }}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div class="d-flex gap-2" v-if="app.status === 'pending'">
                                                                <button @click="updateScholarshipStatus(app.id, 'approved')" class="btn btn-sm btn-success" title="Approuver">
                                                                    <i class="bi bi-check-lg"></i>
                                                                </button>
                                                                <button @click="updateScholarshipStatus(app.id, 'rejected')" class="btn btn-sm btn-danger" title="Rejeter">
                                                                    <i class="bi bi-x-lg"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!-- Categories Tab -->
                                <div v-if="activeTab === 'categories'">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5 class="m-0">Catégories</h5>
                                        <button class="btn btn-primary btn-sm" @click="openCategoryModal()">
                                            <i class="bi bi-plus-lg me-1"></i> Ajouter Categorie
                                        </button>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-hover align-middle">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Slug</th>
                                                    <th>Icone</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="cat in categories" :key="cat.id">
                                                    <td>{{ cat.name }}</td>
                                                    <td>{{ cat.slug }}</td>
                                                    <td><i :class="cat.icon"></i> {{ cat.icon }}</td>
                                                    <td>
                                                        <div class="d-flex gap-2">
                                                            <button @click="openCategoryModal(cat)" class="btn btn-sm btn-primary"><i class="bi bi-pencil"></i></button>
                                                            <button @click="deleteCategory(cat.id)" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="categories.length === 0">
                                                    <td colspan="4" class="text-center text-muted py-3">Aucune catégorie trouvée.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <!-- Section: Étudiants boursiers (ancien système - inscription) -->
                                <div class="mt-4">
                                    <h6 class="border-bottom pb-2 mb-3"><i class="bi bi-file-earmark-text me-2 text-warning"></i>Documents soumis à l'inscription</h6>
                                    <div class="table-responsive">
                                        <table class="table table-hover align-middle">
                                            <thead class="table-warning">
                                                <tr>
                                                    <th>Étudiant</th>
                                                    <th>Email</th>
                                                    <th>Inscrit le</th>
                                                    <th>Lettre de bourse</th>
                                                    <th>Statut</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="stu in scholarshipStudents" :key="stu.id">
                                                    <td class="fw-bold">{{ stu.name }}</td>
                                                    <td>{{ stu.email }}</td>
                                                    <td>{{ new Date(stu.created_at).toLocaleDateString() }}</td>
                                                    <td>
                                                        <a 
                                                            v-if="stu.scholarship_letter"
                                                            :href="`${storageUrl(stu.scholarship_letter)}`" 
                                                            target="_blank" 
                                                            class="btn btn-sm btn-outline-primary rounded-pill"
                                                        >
                                                            <i class="bi bi-file-earmark-arrow-down me-1"></i>Voir lettre
                                                        </a>
                                                        <span v-else class="text-muted small">Aucun document</span>
                                                    </td>
                                                    <td>
                                                        <span :class="['badge rounded-pill px-3 py-2', stu.document_status === 'approved' ? 'bg-success' : stu.document_status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark']">
                                                            <i :class="['bi me-1', stu.document_status === 'approved' ? 'bi-check-circle' : stu.document_status === 'rejected' ? 'bi-x-circle' : 'bi-clock']"></i>
                                                            {{ stu.document_status === 'approved' ? 'Validé' : stu.document_status === 'rejected' ? 'Rejeté' : 'En attente' }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex gap-1" v-if="!stu.document_status || stu.document_status === 'pending'">
                                                            <button
                                                                @click="validateStudentDocument(stu.id)"
                                                                class="btn btn-sm btn-success rounded-pill px-3"
                                                                :disabled="validatingDoc === stu.id"
                                                                title="Valider les documents"
                                                            >
                                                                <span v-if="validatingDoc === stu.id" class="spinner-border spinner-border-sm me-1"></span>
                                                                <i v-else class="bi bi-check-lg me-1"></i>Valider
                                                            </button>
                                                            <button
                                                                @click="rejectStudentDocument(stu.id)"
                                                                class="btn btn-sm btn-outline-danger rounded-pill px-2"
                                                                title="Rejeter les documents"
                                                            >
                                                                <i class="bi bi-x-lg"></i>
                                                            </button>
                                                        </div>
                                                        <span v-else class="text-muted small">—</span>
                                                    </td>
                                                </tr>
                                                <tr v-if="scholarshipStudents.length === 0">
                                                    <td colspan="6" class="text-center text-muted py-3">Aucun étudiant boursier inscrit.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            <!-- Résumé par Pays Tab (TULDA 2026) -->
                            <div v-if="activeTab === 'country_summary'">
                                <div class="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                                    <div>
                                        <h4 class="fw-bold mb-1"><i class="bi bi-globe-americas text-primary me-2"></i>Résumé par Pays</h4>
                                        <p class="text-muted small m-0">Vue synthétique des délégations nationales, des organisations syndicales et des délégués nommés.</p>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <button @click="exportCountrySummaryCsv" class="btn btn-sm btn-success rounded-pill px-3">
                                            <i class="bi bi-filetype-csv me-1"></i> Export CSV
                                        </button>
                                        <button @click="exportCountrySummaryPdf" class="btn btn-sm btn-danger rounded-pill px-3">
                                            <i class="bi bi-filetype-pdf me-1"></i> Export PDF
                                        </button>
                                        <button @click="fetchAll" class="btn btn-sm btn-outline-secondary rounded-pill">
                                            <i class="bi bi-arrow-clockwise me-1"></i> Actualiser
                                        </button>
                                    </div>
                                </div>

                                <!-- Key Metrics Cards -->
                                <div class="row g-3 mb-4">
                                    <div class="col-md-3">
                                        <div class="card border-0 bg-primary bg-gradient text-white rounded-3 p-3 shadow-sm">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <span class="small text-white-50 text-uppercase fw-bold">Délégués Inscrits</span>
                                                    <h2 class="fw-bold m-0 text-white">{{ countrySummaryData?.summary?.total_participants || filteredDelegates.length || 0 }}</h2>
                                                </div>
                                                <div class="fs-1 opacity-50"><i class="bi bi-people-fill"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card border-0 bg-success bg-gradient text-white rounded-3 p-3 shadow-sm">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <span class="small text-white-50 text-uppercase fw-bold">Pays Représentés</span>
                                                    <h2 class="fw-bold m-0 text-white">{{ countrySummaryData?.summary?.total_countries || countrySummaryData?.countries?.length || 0 }}</h2>
                                                </div>
                                                <div class="fs-1 opacity-50"><i class="bi bi-flag-fill"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card border-0 bg-dark bg-gradient text-white rounded-3 p-3 shadow-sm">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <span class="small text-white-50 text-uppercase fw-bold">Parité Genre</span>
                                                    <div class="fs-6 fw-bold m-0 text-white">
                                                        <span><i class="bi bi-gender-male text-info me-1"></i>{{ countrySummaryData?.summary?.total_male || 0 }} H</span>
                                                        <span class="mx-1">/</span>
                                                        <span><i class="bi bi-gender-female text-danger me-1"></i>{{ countrySummaryData?.summary?.total_female || 0 }} F</span>
                                                    </div>
                                                </div>
                                                <div class="fs-1 opacity-50"><i class="bi bi-person-fill-gear"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="card border-0 bg-info bg-gradient text-white rounded-3 p-3 shadow-sm">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <span class="small text-white-50 text-uppercase fw-bold">Langues</span>
                                                    <div class="fs-6 fw-bold m-0 text-white">
                                                        <span>🇫🇷 {{ countrySummaryData?.summary?.language_stats?.fr || 0 }}</span>
                                                        <span class="mx-2">🇬🇧 {{ countrySummaryData?.summary?.language_stats?.en || 0 }}</span>
                                                    </div>
                                                </div>
                                                <div class="fs-1 opacity-50"><i class="bi bi-translate"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Country Cards Grid (Ultra Compact & Aesthetic) -->
                                <div class="d-flex align-items-center justify-content-between mb-3">
                                    <h5 class="fw-bold m-0"><i class="bi bi-grid-3x3-gap me-2 text-primary"></i>Aperçu des Délégations par Pays</h5>
                                    <span class="badge bg-light text-secondary border px-3 py-1.5 rounded-pill small fw-normal">
                                        {{ countrySummaryData?.countries?.length || 0 }} Pays au total
                                    </span>
                                </div>

                                <div class="row g-4 gy-4 mb-4">
                                    <div class="col-lg-4 col-md-6" v-for="c in (countrySummaryData?.countries || [])" :key="c.country">
                                        <div class="card border rounded-3 shadow-xs hover-shadow transition overflow-hidden bg-white">
                                            <div class="bg-primary" style="height: 3px;"></div>
                                            <div class="p-3">
                                                <!-- Header: Flag + Country + Badge Count -->
                                                <div class="d-flex align-items-center justify-content-between mb-2.5">
                                                    <div class="d-flex align-items-center gap-2 me-2">
                                                        <img 
                                                            :src="`https://flagcdn.com/w40/${getCountryIso(c.country)}.png`" 
                                                            :alt="c.country"
                                                            class="rounded-1 border flex-shrink-0"
                                                            width="24"
                                                            height="16"
                                                        />
                                                        <h6 class="fw-bold m-0 text-dark" style="font-size: 14.5px;">{{ c.country }}</h6>
                                                    </div>
                                                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1.5 flex-shrink-0" style="font-size: 11.5px;">
                                                        {{ c.count }} délégué{{ c.count > 1 ? 's' : '' }}
                                                    </span>
                                                </div>

                                                <!-- Organisations -->
                                                <div class="mb-3">
                                                    <div class="d-flex flex-wrap gap-1.5">
                                                        <span v-for="org in c.organisations" :key="org" class="badge bg-light text-dark border font-monospace py-1.5 px-2.5" style="font-size: 11.5px;">
                                                            <i class="bi bi-building me-1 text-muted"></i>{{ org }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <!-- Footer Strip -->
                                                <div class="d-flex align-items-center justify-content-between pt-2 border-top text-muted" style="font-size: 11.5px;">
                                                    <div class="d-flex gap-2">
                                                        <span class="badge bg-info-subtle text-info border px-2.5 py-1"><i class="bi bi-gender-male me-1"></i>{{ c.male }} M</span>
                                                        <span class="badge bg-danger-subtle text-danger border px-2.5 py-1"><i class="bi bi-gender-female me-1"></i>{{ c.female }} F</span>
                                                    </div>
                                                    <div class="d-flex gap-1.5">
                                                        <span v-for="l in c.languages" :key="l" class="badge bg-secondary-subtle text-dark border uppercase px-2 py-1">
                                                            {{ l }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Filterable Delegates Table -->
                                <div class="card border rounded-3 shadow-sm mb-4">
                                    <div class="card-header bg-light py-3">
                                        <div class="row g-2 align-items-center">
                                            <div class="col-md-3">
                                                <h6 class="fw-bold mb-0"><i class="bi bi-table me-2 text-primary"></i>Liste des Délégués</h6>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="row g-2">
                                                    <div class="col-md-3">
                                                        <select v-model="countryFilter" class="form-select form-select-sm">
                                                            <option value="">Tous les pays</option>
                                                            <option v-for="c in (countrySummaryData?.countries || [])" :key="c.country" :value="c.country">
                                                                {{ c.country }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <select v-model="genderFilter" class="form-select form-select-sm">
                                                            <option value="">Tous les genres</option>
                                                            <option value="M">Masculin (M)</option>
                                                            <option value="F">Féminin (F)</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <select v-model="languageFilter" class="form-select form-select-sm">
                                                            <option value="">Toutes les langues</option>
                                                            <option value="fr">Français</option>
                                                            <option value="en">English</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input v-model="searchQuery" type="text" class="form-control form-control-sm" placeholder="Rechercher nom, syndicat...">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table table-hover align-middle mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>Délégué</th>
                                                    <th>Pays</th>
                                                    <th>Organisation / Syndicat</th>
                                                    <th>Genre / Âge</th>
                                                    <th>Contact WhatsApp</th>
                                                    <th>Langue</th>
                                                    <th>Lettres & Docs</th>
                                                    <th>Statut</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="del in filteredDelegates" :key="del.id">
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2">
                                                            <div class="square--35 circle bg-primary-subtle text-primary fw-bold fs-7">
                                                                {{ (del.name || 'D').substring(0,2).toUpperCase() }}
                                                            </div>
                                                            <div>
                                                                <span class="fw-bold d-block text-dark">{{ del.name }}</span>
                                                                <span class="small text-muted">{{ del.email }}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="fw-semibold">
                                                            {{ getCountryFlag(del.country_name || del.country) }} {{ del.country_name || del.country || 'N/A' }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-light text-dark border">
                                                            <i class="bi bi-building me-1 text-muted"></i>{{ del.organisation || 'N/A' }}
                                                        </span>
                                                        <span v-if="del.organisation_email" class="d-block small text-muted">{{ del.organisation_email }}</span>
                                                    </td>
                                                    <td>
                                                        <span :class="['badge me-1', del.gender === 'F' ? 'bg-danger-subtle text-danger border' : 'bg-info-subtle text-info border']">
                                                            {{ del.gender || 'M' }}
                                                        </span>
                                                        <span class="small text-muted" v-if="del.age">{{ del.age }} ans</span>
                                                    </td>
                                                    <td>
                                                        <a v-if="del.whatsapp_number" :href="`https://wa.me/${(del.whatsapp_number || '').replace(/[^0-9]/g, '')}`" target="_blank" class="btn btn-xs btn-outline-success rounded-pill px-2">
                                                            <i class="bi bi-whatsapp me-1"></i>{{ del.whatsapp_number }}
                                                        </a>
                                                        <span v-else class="text-muted small">—</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-secondary-subtle text-dark border uppercase">
                                                            {{ (del.preferred_language || 'fr') === 'en' ? '🇬🇧 English' : '🇫🇷 Français' }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex flex-column gap-1">
                                                            <a v-if="del.nomination_letter" :href="del.nomination_letter" target="_blank" class="badge bg-primary text-decoration-none">
                                                                <i class="bi bi-file-earmark-text me-1"></i>Nomination
                                                            </a>
                                                            <a v-if="del.motivation_letter" :href="del.motivation_letter" target="_blank" class="badge bg-info text-decoration-none">
                                                                <i class="bi bi-file-earmark-code me-1"></i>Motivation
                                                            </a>
                                                            <span v-if="!del.nomination_letter && !del.motivation_letter" class="text-muted small">—</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span :class="['badge rounded-pill px-2 py-1', del.document_status === 'approved' ? 'bg-success-subtle text-success border' : 'bg-warning-subtle text-warning-emphasis border']">
                                                            <i :class="['bi me-1', del.document_status === 'approved' ? 'bi-check-circle-fill' : 'bi-clock-history']"></i>
                                                            {{ del.document_status === 'approved' ? 'Validé' : 'En attente' }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex gap-1">
                                                            <button v-if="del.document_status !== 'approved'" @click="validateDelegate(del)" class="btn btn-sm btn-success rounded-pill px-2" :disabled="validatingDelegateId === del.id" title="Valider candidature & notifier par email">
                                                                <span v-if="validatingDelegateId === del.id" class="spinner-border spinner-border-sm me-1"></span>
                                                                <i v-else class="bi bi-check-lg me-1"></i>Valider
                                                            </button>
                                                            <button @click="openDelegateModal(del)" class="btn btn-sm btn-outline-primary rounded-circle" title="Voir profil">
                                                                <i class="bi bi-eye"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr v-if="filteredDelegates.length === 0">
                                                    <td colspan="9" class="text-center text-muted py-4">Aucun délégué ne correspond aux critères de recherche.</td>
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
        </div>

        <!-- Modal Fiche Délégué TULDA -->
        <div class="modal fade" id="delegateModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 shadow-lg rounded-4">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title fw-bold text-white"><i class="bi bi-person-badge me-2"></i>Fiche Délégué</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4" v-if="selectedDelegate">
                        <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                            <div class="square--70 circle bg-primary text-white fw-bold fs-3 d-flex align-items-center justify-content-center">
                                {{ (selectedDelegate.name || 'D').substring(0,2).toUpperCase() }}
                            </div>
                            <div>
                                <h4 class="fw-bold mb-1">{{ selectedDelegate.name }}</h4>
                                <div class="d-flex gap-2 align-items-center">
                                    <span class="badge bg-primary fs-6">{{ getCountryFlag(selectedDelegate.country_name || selectedDelegate.country) }} {{ selectedDelegate.country_name || selectedDelegate.country }}</span>
                                    <span class="badge bg-secondary fs-6">{{ selectedDelegate.organisation }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="p-3 bg-light rounded-3">
                                    <h6 class="fw-bold border-bottom pb-2 mb-2 text-primary"><i class="bi bi-person me-2"></i>Informations Personnelles</h6>
                                    <p class="mb-1"><strong>Nom & Prénom:</strong> {{ selectedDelegate.name }}</p>
                                    <p class="mb-1"><strong>Genre:</strong> {{ selectedDelegate.gender === 'F' ? 'Féminin' : 'Masculin' }}</p>
                                    <p class="mb-1"><strong>Âge:</strong> {{ selectedDelegate.age ? selectedDelegate.age + ' ans' : 'N/A' }}</p>
                                    <p class="mb-1"><strong>Langue de travail:</strong> {{ selectedDelegate.preferred_language === 'en' ? 'Anglais' : 'Français' }}</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="p-3 bg-light rounded-3">
                                    <h6 class="fw-bold border-bottom pb-2 mb-2 text-primary"><i class="bi bi-briefcase me-2"></i>Affiliation Syndicale</h6>
                                    <p class="mb-1"><strong>Organisation:</strong> {{ selectedDelegate.organisation }}</p>
                                    <p class="mb-1"><strong>Email Organisation:</strong> {{ selectedDelegate.organisation_email || 'N/A' }}</p>
                                    <p class="mb-1"><strong>Expérience Syndicale:</strong> {{ selectedDelegate.experience_years ? selectedDelegate.experience_years + ' ans' : 'N/A' }}</p>
                                    <p class="mb-1"><strong>Email Personnel:</strong> {{ selectedDelegate.email }}</p>
                                    <p class="mb-0 d-flex align-items-center justify-content-between">
                                        <span><strong>WhatsApp:</strong> {{ selectedDelegate.whatsapp_number || 'N/A' }}</span>
                                        <a v-if="selectedDelegate.whatsapp_number" :href="getWhatsappUrl(selectedDelegate)" target="_blank" class="btn btn-sm btn-outline-success rounded-pill px-2 py-1 ms-2 d-inline-flex align-items-center gap-1">
                                            <i class="bi bi-whatsapp"></i>Contacter
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-light border-top d-flex justify-content-between">
                        <div>
                            <span :class="['badge rounded-pill px-3 py-2', selectedDelegate?.document_status === 'approved' ? 'bg-success' : 'bg-warning text-dark']">
                                <i :class="['bi me-1', selectedDelegate?.document_status === 'approved' ? 'bi-check-circle-fill' : 'bi-clock-history']"></i>
                                {{ selectedDelegate?.document_status === 'approved' ? 'Candidature Validée' : 'Candidature En attente' }}
                            </span>
                        </div>
                        <div class="d-flex gap-2">
                            <a v-if="selectedDelegate?.whatsapp_number" 
                               :href="getWhatsappUrl(selectedDelegate)" 
                               target="_blank" 
                               class="btn rounded-pill px-3 d-inline-flex align-items-center gap-1 text-white shadow-sm"
                               style="background-color: #25D366; border-color: #25D366;">
                                <i class="bi bi-whatsapp"></i>Message WhatsApp
                            </a>
                            <button v-if="selectedDelegate?.document_status !== 'approved'" @click="validateDelegate(selectedDelegate)" class="btn btn-success rounded-pill px-3" :disabled="validatingDelegateId === selectedDelegate?.id">
                                <span v-if="validatingDelegateId === selectedDelegate?.id" class="spinner-border spinner-border-sm me-1"></span>
                                <i v-else class="bi bi-send-check me-1"></i>Valider & Notifier par Email
                            </button>
                            <button type="button" class="btn btn-secondary rounded-pill px-3" data-bs-dismiss="modal">Fermer</button>
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

    <!-- Modal Bourse -->
    <div class="modal fade" id="scholarshipModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ scholarshipForm.value.id ? 'Modifier la Bourse' : 'Créer une Bourse' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitScholarship">
                        <div class="mb-3">
                            <label class="form-label">Nom de la bourse</label>
                            <input type="text" class="form-control" v-model="scholarshipForm.name" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Description (optionnel)</label>
                            <textarea class="form-control" v-model="scholarshipForm.description" rows="2"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Valeur (€)</label>
                            <input type="number" class="form-control" v-model="scholarshipForm.value" required>
                            <small class="text-muted">Cette valeur sera déduite du prix du cours.</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Sélectionner le Cours</label>
                            <select class="form-select" v-model="scholarshipForm.course_id" required>
                                <option v-for="course in courses" :key="course.id" :value="course.id">
                                    {{ course.title }} (Prix: {{ course.price }} €)
                                </option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" :disabled="submitting">
                            {{ scholarshipForm.value.id ? 'Modifier' : 'Créer' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal Motivation -->
    <div class="modal fade" id="motivationModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Lettre de Motivation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <p style="white-space: pre-wrap;" v-if="selectedMotivation">{{ selectedMotivation }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Category Modal -->
    <div class="modal fade" id="categoryModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ categoryForm.id ? 'Modifier' : 'Ajouter' }} une Catégorie</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Nom de la catégorie</label>
                        <input type="text" class="form-control" v-model="categoryForm.name" @input="categoryForm.slug = categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Slug</label>
                        <input type="text" class="form-control" v-model="categoryForm.slug">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Icone (Classe Bootstrap / FontAwesome, ex: bi bi-code)</label>
                        <input type="text" class="form-control" v-model="categoryForm.icon">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" v-model="categoryForm.description" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-primary" @click="submitCategory" :disabled="submitting">
                        <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Course Modal -->
    <div class="modal fade" id="courseModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ courseForm.id ? 'Modifier' : 'Ajouter' }} un Cours</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Nom du cours</label>
                        <input type="text" class="form-control" v-model="courseForm.title" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" v-model="courseForm.description" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Prix (€)</label>
                        <input type="number" class="form-control" v-model="courseForm.price" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Sélectionner l'Instructeur</label>
                        <select class="form-select" v-model="courseForm.instructor_id" required>
                            <option value="">-- Sélectionner --</option>
                            <option v-for="inst in instructors" :key="inst.id" :value="inst.id">
                                {{ inst.user?.name || 'N/A' }} ({{ inst.title }})
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Sélectionner la Catégorie</label>
                        <select class="form-select" v-model="courseForm.category_id">
                            <option value="">-- Sélectionner (Optionnel) --</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                {{ cat.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Statut</label>
                        <select class="form-select" v-model="courseForm.status">
                            <option value="published">Publié</option>
                            <option value="draft">Brouillon</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-primary" @click="submitCourse" :disabled="submitting">
                        <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import AdminSidebar from '@/components/Accounts/admin-dashboard/AdminSidebar.vue';

// Protège la route — seul un admin peut accéder
definePageMeta({
    layout: 'instructor',
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
const scholarships = ref<any[]>([])
const scholarshipApplications = ref<any[]>([])
const scholarshipStudents = ref<any[]>([])
const loading = ref(true)
const submitting = ref(false)
const validatingDoc = ref<number | null>(null)
const activeTab = ref('instructors')
const selectedInstructor = ref<any>(null)

const categories = ref([])
const categoryForm = ref({ id: null, name: '', slug: '', icon: '', description: '' })
let categoryModalInstance: any = null

const exportStudentsCsv = () => {
    if (students.value.length === 0) return
    
    const headers = ['Name', 'Email', 'Joined At', 'Status']
    const csvContent = [
        headers.join(','),
        ...students.value.map(s => [
            `"${s.name || 'N/A'}"`,
            `"${s.email}"`,
            `"${new Date(s.created_at).toLocaleDateString()}"`,
            `"${s.is_active ? 'Active' : 'Inactive'}"`
        ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'students_list.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

import logoIcon from "@/assets/img/Logo alrei.png";

const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });
};

const exportStudentsPdf = async () => {
    if (students.value.length === 0) return

    if (process.client) {
        try {
            const { jsPDF } = await import('jspdf');
            const autoTable = (await import('jspdf-autotable')).default;

            const doc = new jsPDF()
            
            try {
                const img = await loadImage(logoIcon);
                // Adjust dimensions as needed for the logo
                doc.addImage(img, 'PNG', 14, 10, 30, 15);
            } catch (imgError) {
                console.warn("Could not load logo for PDF", imgError);
            }

            doc.setFontSize(16)
            doc.setTextColor(41, 128, 185)
            doc.text('ALREI', 48, 16)
            
            doc.setFontSize(10)
            doc.setTextColor(100)
            doc.text('African Labour Research and Education Institute', 48, 22)
            
            doc.setFontSize(14)
            doc.setTextColor(0)
            doc.text('Liste des étudiants inscrits', 14, 35)
            
            const tableColumn = ["Name", "Email", "Joined At", "Status"]
            const tableRows = students.value.map(s => [
                s.name || 'N/A',
                s.email,
                new Date(s.created_at).toLocaleDateString(),
                s.is_active ? 'Active' : 'Inactive'
            ])

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 42,
                theme: 'striped',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [41, 128, 185] },
            })

            doc.save('students_list.pdf')
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Erreur lors de la génération du PDF.');
        }
    }
}

// Forms
const userForm = ref({ name: '', email: '', password: '', role: 'student' })
const groupForm = ref({ name: '', description: '', user_ids: [] })
const assignForm = ref({ course_id: '', target_type: 'user', target_id: '' })
const blogForm = ref({ id: null, title: '', category: '', description: '', content: '', author_name: '', read_time: '', status: 'published', image: null as any })
const scholarshipForm = ref({ id: null as number | null, name: '', description: '', value: 0, course_id: '' })
const courseForm = ref({ id: null as number | null, title: '', description: '', price: 0, instructor_id: '', category_id: '', status: 'draft' })
const selectedMotivation = ref('')

let userModalInstance: any = null
let groupModalInstance: any = null
let assignModalInstance: any = null
let blogModalInstance: any = null
let scholarshipModalInstance: any = null
let courseModalInstance: any = null
let motivationModalInstance: any = null

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

const countrySummaryData = ref<any>({ summary: {}, countries: [] })
const countryFilter = ref('')
const genderFilter = ref('')
const languageFilter = ref('')
const searchQuery = ref('')
const selectedDelegate = ref<any>(null)
const validatingDelegateId = ref<number | null>(null)

const validateDelegate = async (del: any) => {
    if (!del || !del.id) return
    validatingDelegateId.value = del.id
    try {
        const res: any = await api(`/admin/delegates/${del.id}/validate`, { method: 'POST' })
        del.document_status = 'approved'
        if (selectedDelegate.value && selectedDelegate.value.id === del.id) {
            selectedDelegate.value.document_status = 'approved'
        }
        alert(`✅ ${res?.message || 'Candidature validée !'}\nE-mails de confirmation envoyés à ${del.email}${del.organisation_email ? ' et ' + del.organisation_email : ''}.`)
        await fetchAll()
    } catch (err: any) {
        console.error('Error validating delegate:', err)
        alert(err.data?.message || 'Erreur lors de la validation du délégué.')
    } finally {
        validatingDelegateId.value = null
    }
}

const exportCountrySummaryCsv = () => {
    if (filteredDelegates.value.length === 0) {
        alert('Aucune donnée à exporter.')
        return
    }
    
    const headers = [
        'Nom & Prénom',
        'Email Personnel',
        'Pays',
        'Organisation / Syndicat',
        'Email Organisation',
        'WhatsApp',
        'Genre',
        'Âge',
        'Expérience (Ans)',
        'Langue',
        'Statut Candidature'
    ]

    const csvRows = [
        headers.join(';'),
        ...filteredDelegates.value.map((d: any) => [
            `"${d.name || ''}"`,
            `"${d.email || ''}"`,
            `"${d.country_name || d.country || ''}"`,
            `"${d.organisation || ''}"`,
            `"${d.organisation_email || ''}"`,
            `"${d.whatsapp_number || ''}"`,
            `"${d.gender === 'F' ? 'Féminin' : 'Masculin'}"`,
            `"${d.age || ''}"`,
            `"${d.experience_years || ''}"`,
            `"${(d.preferred_language || 'fr') === 'en' ? 'Anglais' : 'Français'}"`,
            `"${d.document_status === 'approved' ? 'Validé' : 'En attente'}"`
        ].join(';'))
    ]

    const csvContent = '\uFEFF' + csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `delegues_par_pays_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const cleanText = (str: any) => {
    if (!str) return 'N/A';
    return String(str)
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .trim();
};

const exportCountrySummaryPdf = async () => {
    if (filteredDelegates.value.length === 0) {
        alert('Aucune donnée à exporter.')
        return
    }

    if (!process.client) return

    try {
        const { jsPDF } = await import('jspdf')
        const autoTableModule = await import('jspdf-autotable')
        const autoTable = autoTableModule.default || (autoTableModule as any)

        const doc = new jsPDF('landscape', 'mm', 'a4')

        // Title Header
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(16)
        doc.setTextColor(13, 110, 253)
        doc.text('ALREI — TULDA 2026', 14, 15)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        doc.text('African Labour Research and Education Institute — Rapport des Délégués Officiels par Pays', 14, 21)

        // Metadata Strip
        doc.setFontSize(9)
        doc.setTextColor(50, 50, 50)
        const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        const countryFilterText = countryFilter.value ? ` | Pays: ${countryFilter.value}` : ''
        doc.text(`Généré le: ${dateStr} | Total: ${filteredDelegates.value.length} délégué(s)${countryFilterText}`, 14, 27)

        const tableColumn = ['N°', 'Délégué', 'Email', 'Pays', 'Organisation / Syndicat', 'Email Org.', 'WhatsApp', 'Genre', 'Langue', 'Statut']

        const tableRows = filteredDelegates.value.map((d: any, index: number) => [
            index + 1,
            cleanText(d.name),
            cleanText(d.email),
            cleanText(d.country_name || d.country),
            cleanText(d.organisation),
            cleanText(d.organisation_email),
            cleanText(d.whatsapp_number),
            d.gender === 'F' ? 'Féminin' : 'Masculin',
            (d.preferred_language || 'fr') === 'en' ? 'Anglais' : 'Français',
            d.document_status === 'approved' ? 'Validé' : 'En attente'
        ])

        const autoTableOptions = {
            head: [tableColumn],
            body: tableRows,
            startY: 32,
            theme: 'striped',
            styles: { fontSize: 8, cellPadding: 2.5, font: 'helvetica', overflow: 'linebreak' },
            headStyles: { fillColor: [13, 110, 253], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [248, 249, 250] },
            columnStyles: {
                0: { cellWidth: 10 },  // N°
                1: { cellWidth: 35 },  // Délégué
                2: { cellWidth: 42 },  // Email
                3: { cellWidth: 25 },  // Pays
                4: { cellWidth: 35 },  // Org
                5: { cellWidth: 38 },  // Email Org
                6: { cellWidth: 28 },  // WhatsApp
                7: { cellWidth: 18 },  // Genre
                8: { cellWidth: 18 },  // Langue
                9: { cellWidth: 20 }   // Statut
            }
        }

        if (typeof autoTable === 'function') {
            autoTable(doc, autoTableOptions)
        } else if (typeof (doc as any).autoTable === 'function') {
            (doc as any).autoTable(autoTableOptions)
        }

        doc.save(`rapport_delegues_par_pays_${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (error) {
        console.error('Failed to generate PDF:', error)
        alert('Erreur lors de la génération du PDF: ' + (error as any)?.message)
    }
}

const getCountryIso = (countryName: string) => {
    if (!countryName) return 'un';
    const c = countryName.toLowerCase().trim();
    if (c.includes('togo')) return 'tg';
    if (c.includes('niger')) return 'ne';
    if (c.includes('sénégal') || c.includes('senegal')) return 'sn';
    if (c.includes('burkina')) return 'bf';
    if (c.includes('bénin') || c.includes('benin')) return 'bj';
    if (c.includes('côte') || c.includes('cote') || c.includes('ivoire')) return 'ci';
    if (c.includes('mali')) return 'ml';
    if (c.includes('mauritanie')) return 'mr';
    if (c.includes('comore')) return 'km';
    if (c.includes('tchad')) return 'td';
    if (c.includes('tunisie')) return 'tn';
    if (c.includes('malawi')) return 'mw';
    if (c.includes('nigeria')) return 'ng';
    if (c.includes('congo')) return 'cg';
    if (c.includes('cameroun')) return 'cm';
    if (c.includes('gabon')) return 'ga';
    if (c.includes('namibie')) return 'na';
    if (c.includes('france')) return 'fr';
    if (c.includes('belgique')) return 'be';
    if (c.includes('suisse')) return 'ch';
    if (c.includes('canada')) return 'ca';
    if (c.includes('états-unis') || c.includes('etats-unis') || c.includes('usa')) return 'us';
    return 'un';
};

const flagMap: Record<string, string> = {
    'Niger': '🇳🇪',
    'Sénégal': '🇸🇳',
    'Burkina Faso': '🇧🇫',
    'Mauritanie': '🇲🇷',
    'Comores': '🇰🇲',
    'Tchad': '🇹🇩',
    'Tunisie': '🇹🇳',
    'Malawi': '🇲🇼',
    'Nigeria': '🇳🇬',
    'Congo': '🇨🇬',
    'Côte d\'Ivoire': '🇨🇮',
    'Namibie': '🇳🇦',
    'Bénin': '🇧🇯',
    'Cameroun': '🇨🇲',
    'Gabon': '🇬🇦',
    'Guinée': '🇬🇳',
    'Mali': '🇲🇱',
    'Togo': '🇹🇬'
}

const getCountryFlag = (countryName: string) => {
    if (!countryName) return '🌍'
    return flagMap[countryName] || '🌍'
}

const openDelegateModal = (del: any) => {
    selectedDelegate.value = del
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        const modal = new ($bootstrap as any).Modal(document.getElementById('delegateModal'))
        modal.show()
    }
}

const filteredDelegates = computed(() => {
    let allUsers: any[] = []
    if (countrySummaryData.value?.countries && countrySummaryData.value.countries.length > 0) {
        countrySummaryData.value.countries.forEach((c: any) => {
            if (c.users) {
                c.users.forEach((u: any) => {
                    allUsers.push({ ...u, country_name: c.country })
                })
            }
        })
    } else if (students.value && students.value.length > 0) {
        allUsers = students.value.map((s: any) => ({
            ...s,
            country_name: s.country || 'Autre',
            organisation: s.organisation || 'N/A',
            gender: s.gender || 'M',
            whatsapp_number: s.whatsapp_number || s.phone
        }))
    }

    return allUsers.filter((u: any) => {
        if (countryFilter.value && u.country_name !== countryFilter.value) return false
        if (genderFilter.value && (u.gender || '').toUpperCase() !== genderFilter.value) return false
        if (languageFilter.value) {
            const lang = (u.preferred_language || 'fr').toLowerCase()
            if (languageFilter.value === 'fr' && !lang.includes('fr')) return false
            if (languageFilter.value === 'en' && !lang.includes('en')) return false
        }
        if (searchQuery.value) {
            const q = searchQuery.value.toLowerCase()
            const matchName = (u.name || '').toLowerCase().includes(q)
            const matchOrg = (u.organisation || '').toLowerCase().includes(q)
            const matchEmail = (u.email || '').toLowerCase().includes(q)
            if (!matchName && !matchOrg && !matchEmail) return false
        }
        return true
    })
})

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
            fetchItem('/admin/country-summary', countrySummaryData),
            fetchItem('/admin/instructors', instructors),
            fetchItem('/admin/students', students),
            fetchItem('/admin/courses', courses),
            fetchItem('/admin/groups', groups),
            fetchItem('/admin/blogs', blogs),
            fetchItem('/admin/certificates', certificates),
            fetchItem('/admin/scholarships', scholarships),
            fetchItem('/admin/scholarship-applications', scholarshipApplications),
            fetchItem('/admin/scholarship-students', scholarshipStudents),
            fetchItem('/categories', categories)
        ])
    } catch (err) {
        console.error('General Admin Fetch Error:', err)
    } finally {
        loading.value = false
    }
}

const adminStats = computed(() => [
    { label: 'Revenue', value: `${stats.value?.total_revenue || 0} €`, icon: 'bi bi-cash-stack' },
    { label: 'Students', value: stats.value?.total_students || 0, icon: 'bi bi-people' },
    { label: 'Instructors', value: stats.value?.total_instructors || 0, icon: 'bi bi-person-badge' },
    { label: 'Courses', value: stats.value?.total_courses || 0, icon: 'bi bi-book' },
])

const pendingCertificatesCount = computed(() => {
    return certificates.value.filter(c => c.status === 'pending').length
})

const pendingScholarshipsCount = computed(() => {
    return scholarshipApplications.value.filter(a => a.status === 'pending').length
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

const getWhatsappUrl = (delegate: any) => {
    if (!delegate?.whatsapp_number) return '#'
    const cleanNum = delegate.whatsapp_number.replace(/[^0-9]/g, '')
    const name = delegate.name || ''
    const text = encodeURIComponent(`Bonjour ${name}, concernant votre candidature sur la plateforme ALREI...`)
    return `https://wa.me/${cleanNum}?text=${text}`
}

const previewCert = async (id: number, certNumber: string) => {
    try {
        const response = await api(`/certificates/${id}/download`, {
            method: 'GET',
            responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }))
        window.open(url, '_blank')
    } catch (error) {
        console.error('Preview error:', error)
    }
}

const validateStudentDocument = async (id: number) => {
    if (!confirm('Valider les documents de cet étudiant ?')) return
    validatingDoc.value = id
    try {
        await api(`/admin/students/${id}/validate-document`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Document validation failed:', err)
        alert('Erreur lors de la validation des documents.')
    } finally {
        validatingDoc.value = null
    }
}

const rejectStudentDocument = async (id: number) => {
    if (!confirm('Rejeter les documents de cet étudiant ?')) return
    try {
        await api(`/admin/students/${id}/reject-document`, { method: 'POST' })
        await fetchAll()
    } catch (err) {
        console.error('Document rejection failed:', err)
        alert('Erreur lors du rejet des documents.')
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
const openUserModal = (role = 'student') => {
    userForm.value = { name: '', email: '', password: '', role }
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

// Scholarships
const openScholarshipModal = (scholarship: any = null) => {
    if (scholarship) {
        scholarshipForm.value = {
            id: scholarship.id,
            name: scholarship.name || '',
            description: scholarship.description || '',
            value: scholarship.value || 0,
            course_id: scholarship.course_id || ''
        }
    } else {
        scholarshipForm.value = { id: null, name: '', description: '', value: 0, course_id: '' }
    }

    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        if (!scholarshipModalInstance) {
            scholarshipModalInstance = new ($bootstrap as any).Modal(document.getElementById('scholarshipModal'))
        }
        scholarshipModalInstance.show()
    }
}

const submitScholarship = async () => {
    submitting.value = true
    try {
        const url = scholarshipForm.value.id ? `/admin/scholarships/${scholarshipForm.value.id}` : '/admin/scholarships'
        await api(url, { method: 'POST', body: scholarshipForm.value })

        if (process.client) {
            const { $bootstrap } = useNuxtApp()
            const modalElement = document.getElementById('scholarshipModal')
            if (modalElement) {
                const modal = ($bootstrap as any).Modal.getInstance(modalElement) || new ($bootstrap as any).Modal(modalElement)
                modal.hide()
            }
        }
        await fetchAll()
    } catch (err) {
        console.error('Save scholarship failed:', err)
        alert('Erreur lors de l\'enregistrement de la bourse')
    } finally {
        submitting.value = false
    }
}

const deleteScholarship = async (id: number) => {
    if (!confirm('Supprimer cette bourse ?')) return
    try {
        await api(`/admin/scholarships/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete scholarship failed:', err)
    }
}

const updateScholarshipStatus = async (id: number, status: string) => {
    const actionLabel = status === 'approved' ? 'approbation' : 'refus'
    const note = prompt(`Veuillez saisir une note/justificatif optionnel pour cette ${actionLabel} :`)
    if (note === null) return // Admin canceled the action
    
    try {
        await api(`/admin/scholarship-applications/${id}/status`, { 
            method: 'POST', 
            body: { status, admin_note: note } 
        })
        await fetchAll()
    } catch (err) {
        console.error('Update scholarship status failed:', err)
    }
}

const viewMotivation = (app: any) => {
    selectedMotivation.value = app.motivation_letter || 'Aucune lettre fournie.'
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        const modal = new ($bootstrap as any).Modal(document.getElementById('motivationModal'))
        modal.show()
    }
}

// Category Actions
const openCategoryModal = (category: any = null) => {
    if (category) {
        categoryForm.value = { ...category }
    } else {
        categoryForm.value = { id: null, name: '', slug: '', icon: '', description: '' }
    }
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        if (!categoryModalInstance) {
            categoryModalInstance = new ($bootstrap as any).Modal(document.getElementById('categoryModal'))
        }
        categoryModalInstance.show()
    }
}

const submitCategory = async () => {
    submitting.value = true
    try {
        const method = categoryForm.value.id ? 'PUT' : 'POST'
        const url = categoryForm.value.id ? `/admin/categories/${categoryForm.value.id}` : '/admin/categories'
        await api(url, { method, body: categoryForm.value })
        categoryModalInstance?.hide()
        await fetchAll()
    } catch (err) {
        console.error('Save category failed:', err)
        alert('Erreur lors de l\'enregistrement de la catégorie')
    } finally {
        submitting.value = false
    }
}

const deleteCategory = async (id: number) => {
    if (!confirm('Supprimer cette catégorie ?')) return
    try {
        await api(`/admin/categories/${id}`, { method: 'DELETE' })
        await fetchAll()
    } catch (err) {
        console.error('Delete category failed:', err)
    }
}

// Course Actions
const openCourseModal = (course: any = null) => {
    if (course) {
        courseForm.value = {
            id: course.id,
            title: course.title || '',
            description: course.description || '',
            price: course.price || 0,
            instructor_id: course.instructor_id || '',
            category_id: course.category_id || '',
            status: course.status || 'draft'
        }
    } else {
        courseForm.value = {
            id: null,
            title: '',
            description: '',
            price: 0,
            instructor_id: '',
            category_id: '',
            status: 'draft'
        }
    }
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        if (!courseModalInstance) {
            courseModalInstance = new ($bootstrap as any).Modal(document.getElementById('courseModal'))
        }
        courseModalInstance.show()
    }
}

const submitCourse = async () => {
    submitting.value = true
    try {
        const method = courseForm.value.id ? 'PUT' : 'POST'
        const url = courseForm.value.id ? `/admin/courses/${courseForm.value.id}` : '/admin/courses'
        await api(url, { method, body: courseForm.value })
        courseModalInstance?.hide()
        await fetchAll()
    } catch (err) {
        console.error('Save course failed:', err)
        alert('Erreur lors de l\'enregistrement du cours')
    } finally {
        submitting.value = false
    }
}
// Note: Removed onMounted(fetchAll) as it's now handled in the new onMounted block above.
</script>
