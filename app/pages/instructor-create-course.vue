<template>

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
        <div class="container-fluid px-0">
            <div class="ht-200"></div>
        </div>
    </section>

    <section class="pt-4 pb-5">
        <div class="container">
            <div class="row gx-xl-5">
                <div class="col-lg-3">
                    <AdminSidebar v-if="isAdmin" activeTab="courses" />
                    <Sidebar v-else-if="isInstructor" />
                    <StudentAdminSidebar v-else />
                </div>

                <div class="col-lg-9 col-md-12">

                    <div class="row mb-3">
                        <div class="col-lg-12">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><NuxtLink :to="localePath('/')">{{ $t('home') }}</NuxtLink></li>
                                    <li class="breadcrumb-item">
                                        <NuxtLink :to="isAdmin ? localePath('/admin-dashboard?tab=courses') : localePath('/instructor-dashboard')">
                                            {{ isAdmin ? $t('platform_administration') : $t('dashboard') }}
                                        </NuxtLink>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ isEditMode ? $t('edit') : $t('create_course') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div class="card shadow-sm border">
                        <div class="card-body p-4 p-lg-5">

                            <div class="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
                                <div>
                                    <h4 class="fw-bold mb-1 text-dark">
                                        <i class="bi bi-mortarboard-fill text-main me-2"></i>
                                        {{ isEditMode ? 'Modifier la formation' : 'Créer une nouvelle formation' }}
                                    </h4>
                                    <p class="text-muted small mb-0">Renseignez les informations du cours, ajoutez ses modules d'apprentissage et choisissez de publier ou d'enregistrer en brouillon.</p>
                                </div>
                                <span v-if="isEditMode" class="badge bg-warning text-dark px-3 py-2 rounded-pill">
                                    <i class="bi bi-pencil-square me-1"></i>Mode Édition (ID: {{ route.query.id }})
                                </span>
                            </div>

                            <div class="step-indicator mb-4">
                                <div :class="{ active: activeTab >= 1 }" @click="activeTab = 1" style="cursor: pointer;">
                                    <span>1</span><p>Informations</p>
                                </div>
                                <div :class="{ active: activeTab >= 2 }" @click="activeTab = 2" style="cursor: pointer;">
                                    <span>2</span><p>Modules & Programme</p>
                                </div>
                                <div :class="{ active: activeTab >= 3 }" @click="activeTab = 3" style="cursor: pointer;">
                                    <span>3</span><p>Finalisation & Statut</p>
                                </div>
                            </div>

                            <form @submit.prevent id="multiStepForm">

                                <!-- ÉTAPE 1 : Informations de base -->
                                <div v-show="activeTab === 1" class="step active">

                                    <div class="mb-4">
                                        <h5 class="text-darks mb-0 lh-base fw-bold">1. Informations générales</h5>
                                        <p class="text-muted small">Remplissez les informations de base relatives à votre cours.</p>
                                    </div>

                                    <!-- Assignation de l'instituteur par l'administrateur -->
                                    <div class="mb-4" v-if="isAdmin">
                                        <div class="card border border-primary bg-light-primary p-3 rounded-3 shadow-xs">
                                            <label class="form-label fw-bold text-dark d-flex align-items-center gap-2 mb-1">
                                                <i class="bi bi-person-badge-fill text-primary fs-5"></i>
                                                Instituteur Principal du Cours (Assignation Administrateur)
                                            </label>
                                            <select v-model="course.instructor_id" class="form-select form-control">
                                                <option value="">-- Sélectionner l'instituteur principal --</option>
                                                <option v-for="inst in availableInstructors" :key="inst.id" :value="inst.id">
                                                    {{ inst.user?.name || inst.name || ('Formateur #' + inst.id) }} ({{ inst.title || 'Instituteur' }}) {{ (inst.user?.email || inst.email) ? ' - ' + (inst.user?.email || inst.email) : '' }}
                                                </option>
                                            </select>
                                            <small class="text-muted d-block mt-2">
                                                <i class="bi bi-envelope-fill text-primary me-1"></i>
                                                Dès la sauvegarde, un e-mail automatique d'assignation sera transmis à l'instituteur sélectionné.
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group mb-3">
                                        <label class="form-label fw-bold">Titre du cours <span class="text-danger">*</span></label>
                                        <input v-model="course.title" type="text" class="form-control" placeholder="Entrez le titre du cours" required>
                                        <small class="text-muted d-block mt-1">Exemple : TULDA 2026 : Commerce Numérique, Justice Fiscale et Travail Décent en Afrique</small>
                                    </div>

                                    <div class="row g-3 mb-3">
                                        <div class="col-md-4">
                                            <label class="form-label fw-bold">Catégorie du cours</label>
                                            <select v-model="course.category_id" class="form-control form-select" id="c-category">
                                                <option value="">Sélectionner une catégorie</option>
                                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                            </select>
                                        </div>

                                        <div class="col-md-4">
                                            <label class="form-label fw-bold">Niveau du cours</label>
                                            <select v-model="course.level" class="form-control form-select" id="level">
                                                <option value="beginner">Débutant</option>
                                                <option value="intermediate">Intermédiaire</option>
                                                <option value="advanced">Avancé</option>
                                                <option value="all">Tous niveaux</option>
                                            </select>
                                        </div>

                                        <div class="col-md-4">
                                            <label class="form-label fw-bold">Langue principale</label>
                                            <select v-model="course.language" class="form-control form-select" id="language">
                                                <option value="fr">🇫🇷 Français</option>
                                                <option value="en">🇬🇧 English</option>
                                                <option value="pt">🇵🇹 Português</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Type de contenu & Multilingue -->
                                    <div class="mb-4 mt-4">
                                        <div class="d-flex align-items-center gap-2 mb-3">
                                            <div class="square--40 circle bg-light-primary">
                                                <i class="bi bi-collection-play text-primary"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-0 fw-bold">Format principal du support de cours</h6>
                                                <small class="text-muted">Choisissez le type de support pédagogique initial.</small>
                                            </div>
                                        </div>

                                        <div class="d-flex gap-3 flex-wrap mb-4">
                                            <label
                                                v-for="ct in contentTypes"
                                                :key="ct.value"
                                                class="content-type-option"
                                                style="cursor:pointer;"
                                            >
                                                <input type="radio" v-model="contentType" :value="ct.value" class="d-none">
                                                <div
                                                    :class="['d-flex flex-column align-items-center justify-content-center gap-2 p-3 rounded-3 border-2 border', contentType === ct.value ? 'border-primary bg-light-primary shadow-sm' : 'border-light bg-white']"
                                                    style="min-width:120px; transition: all .2s;"
                                                >
                                                    <i :class="[ct.icon, 'fs-2', contentType === ct.value ? ct.activeColor : 'text-muted']"></i>
                                                    <span :class="['fw-semibold small', contentType === ct.value ? 'text-primary' : 'text-muted']">{{ ct.label }}</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div v-if="contentType !== 'youtube'">
                                            <div class="d-flex align-items-center justify-content-between mb-2">
                                                <label class="form-label fw-semibold mb-0">
                                                    Documents ou supports par langue
                                                    <span class="badge bg-primary rounded-pill ms-1">{{ languageVersions.length }}</span>
                                                </label>
                                                <button
                                                    v-if="languageVersions.length < 3"
                                                    @click="addVersion"
                                                    type="button"
                                                    class="btn btn-outline-primary btn-sm rounded-pill"
                                                >
                                                    <i class="bi bi-plus-circle me-1"></i>Ajouter une langue
                                                </button>
                                            </div>

                                            <div class="d-flex flex-column gap-2">
                                                <div
                                                    v-for="(version, idx) in languageVersions"
                                                    :key="idx"
                                                    class="border rounded-3 p-3"
                                                    :style="{ borderLeft: '4px solid ' + (version.file ? '#198754' : '#dee2e6') + ' !important', background: version.file ? '#f0fdf4' : '#f8f9fa' }"
                                                >
                                                    <div class="row g-2 align-items-center">
                                                        <div class="col-md-3">
                                                            <label class="form-label small text-muted mb-1">Langue</label>
                                                            <select v-model="version.lang" class="form-select form-select-sm">
                                                                <option value="fr">🇫🇷 Français</option>
                                                                <option value="en">🇬🇧 English</option>
                                                                <option value="pt">🇵🇹 Português</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-8">
                                                            <label class="form-label small text-muted mb-1">
                                                                {{ contentType === 'document' ? 'Fichier (PDF, DOC, PPT…)' : 'Fichier vidéo (MP4, MOV…)' }}
                                                            </label>
                                                            <div class="d-flex align-items-center gap-2">
                                                                <input
                                                                    @change="e => handleVersionFile(e, idx)"
                                                                    type="file"
                                                                    class="form-control form-control-sm"
                                                                    :accept="contentType === 'document' ? '.pdf,.doc,.docx,.ppt,.pptx,.xlsx,.csv' : 'video/*'"
                                                                >
                                                                <span v-if="version.file" class="badge bg-success text-nowrap py-2">
                                                                    <i class="bi bi-check-circle me-1"></i>Chargé
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-1 text-end">
                                                            <button
                                                                v-if="languageVersions.length > 1"
                                                                @click="removeVersion(idx)"
                                                                type="button"
                                                                class="btn btn-outline-danger btn-sm rounded-circle"
                                                                style="width:32px;height:32px;padding:0;"
                                                                title="Supprimer"
                                                            >
                                                                <i class="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="contentType === 'youtube'">
                                            <label class="form-label fw-semibold">Lien YouTube d'aperçu / teaser</label>
                                            <div class="input-group">
                                                <span class="input-group-text text-white" style="background:#ff0000; border-color:#ff0000;">
                                                    <i class="bi bi-youtube fs-5"></i>
                                                </span>
                                                <input
                                                    v-model="youtubeUrl"
                                                    type="url"
                                                    class="form-control"
                                                    placeholder="https://www.youtube.com/watch?v=..."
                                                >
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group mb-3">
                                        <label class="form-label fw-bold">Description complète du cours</label>
                                        <textarea v-model="course.description" class="form-control" rows="3" placeholder="Présentation synthétique des objectifs pédagogiques..."></textarea>
                                    </div>

                                    <div class="form-group mb-4">
                                        <label class="form-label fw-bold">Prérequis & Modalités d'accès</label>
                                        <textarea v-model="course.prerequisites" class="form-control" rows="2" placeholder="Ex: Adhésion syndicale ou désignation par l'organisation membre"></textarea>
                                    </div>

                                    <!-- Modalités d'accès, Inscription & Tarification -->
                                    <div class="card border rounded-3 p-3.5 mb-4 bg-light shadow-xs">
                                        <h6 class="fw-bold mb-2 text-dark">
                                            <i class="bi bi-tag-fill text-main me-2"></i>Modalités d'accès, Inscription & Tarification
                                        </h6>
                                        <p class="text-muted small mb-3">Cochez les modalités d'inscription et de tarification applicables à ce cours.</p>

                                        <div class="row g-3">
                                            <div class="col-md-4">
                                                <div class="form-check card p-3 border rounded-3 h-100 bg-white shadow-xs">
                                                    <input 
                                                        class="form-check-input ms-0 me-2" 
                                                        type="checkbox" 
                                                        id="isFreeCheck" 
                                                        v-model="course.is_free"
                                                        @change="course.is_free ? course.price = 0 : null"
                                                    >
                                                    <label class="form-check-label fw-semibold text-dark cursor-pointer ms-2" for="isFreeCheck">
                                                        <i class="bi bi-gift-fill text-success me-1"></i> Cours Gratuit
                                                    </label>
                                                    <small class="text-muted d-block mt-1 ps-4" style="font-size: 0.8rem;">
                                                        Accessible sans frais aux participants.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-check card p-3 border rounded-3 h-100 bg-white shadow-xs">
                                                    <input 
                                                        class="form-check-input ms-0 me-2" 
                                                        type="checkbox" 
                                                        id="isNominationCheck" 
                                                        v-model="course.is_nomination_only"
                                                    >
                                                    <label class="form-check-label fw-semibold text-dark cursor-pointer ms-2" for="isNominationCheck">
                                                        <i class="bi bi-file-earmark-person-fill text-primary me-1"></i> Sur Nomination
                                                    </label>
                                                    <small class="text-muted d-block mt-1 ps-4" style="font-size: 0.8rem;">
                                                        Désignation / lettre de nomination syndicale requise.
                                                    </small>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-check card p-3 border rounded-3 h-100 bg-white shadow-xs">
                                                    <input 
                                                        class="form-check-input ms-0 me-2" 
                                                        type="checkbox" 
                                                        id="requiresApprovalCheck" 
                                                        v-model="course.requires_approval"
                                                    >
                                                    <label class="form-check-label fw-semibold text-dark cursor-pointer ms-2" for="requiresApprovalCheck">
                                                        <i class="bi bi-shield-check text-warning me-1"></i> Validation de Dossier
                                                    </label>
                                                    <small class="text-muted d-block mt-1 ps-4" style="font-size: 0.8rem;">
                                                        Validation de la candidature obligatoire.
                                                    </small>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!course.is_free" class="mt-3">
                                            <label class="form-label fw-semibold">Prix de la formation <span class="text-danger">*</span></label>
                                            <div class="input-group" style="max-width: 300px;">
                                                <input v-model.number="course.price" type="number" min="0" class="form-control" placeholder="Ex: 50000">
                                                <span class="input-group-text fw-bold">FCFA</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-4">
                                        <h5 class="text-darks mb-0 lh-base fw-bold">Image / Miniature du cours</h5>
                                        <p class="text-muted small">Téléversez une image miniature représentative du cours.</p>
                                        <div class="border rounded d-flex align-items-center justify-content-between p-3 bg-light">
                                            <div class="d-flex align-items-center flex-grow-1">
                                                <i class="bi bi-image fs-4 text-primary me-3"></i>
                                                <input @change="handleThumbnailChange" type="file" id="thumbnailInput" class="form-control" accept="image/*">
                                            </div>
                                            <img v-if="preview" :src="preview" id="thumbnailPreview" class="img-thumbnail ms-3 rounded-3" style="width: 110px; height: 75px; object-fit: cover;" alt="Aperçu miniature">
                                        </div>
                                        <small class="text-muted d-block mt-2">Format recommandé : JPG / PNG (800x500px)</small>
                                    </div>
                                </div>

                                <!-- ÉTAPE 2 : Création des Modules du cours -->
                                <div v-show="activeTab === 2" class="step active">
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <h5 class="lh-base m-0 text-dark fw-bold">2. Modules d'apprentissage & Programme</h5>
                                            <p class="text-muted small mb-0">Découpez le cours en modules thématiques et renseignez leurs leçons.</p>
                                        </div>
                                        <button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3" @click="addModule">
                                            <i class="bi bi-plus-lg me-1"></i> Ajouter un module
                                        </button>
                                    </div>

                                    <div v-if="modules.length === 0" class="text-center py-5 border rounded-3 bg-light mb-4">
                                        <div class="square--60 circle bg-light-primary text-primary mx-auto mb-3 fs-3">
                                            <i class="bi bi-collection-play"></i>
                                        </div>
                                        <h6 class="fw-bold mb-1">Aucun module pour le moment</h6>
                                        <p class="text-muted small max-w-400 mx-auto mb-3">
                                            Les formations sont composées d'un ou plusieurs modules pour structurer le parcours des travailleurs.
                                        </p>
                                        <button type="button" class="btn btn-primary btn-sm rounded-pill px-4" @click="addModule">
                                            <i class="bi bi-plus-lg me-1"></i> Créer le premier module
                                        </button>
                                    </div>

                                    <div v-else class="d-flex flex-column gap-3 mb-4">
                                        <div
                                            v-for="(mod, mIdx) in modules"
                                            :key="mIdx"
                                            class="card border shadow-xs rounded-3 overflow-hidden"
                                        >
                                            <div class="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center gap-2 flex-grow-1 me-3">
                                                    <span class="badge bg-main text-white rounded-pill px-3 py-1.5">Module {{ mIdx + 1 }}</span>
                                                    <input
                                                        type="text"
                                                        class="form-control form-control-sm fw-bold border-0 bg-light"
                                                        v-model="mod.title"
                                                        placeholder="Titre du module (ex: Module 1 : Cadre juridique et syndical)"
                                                        required
                                                    >
                                                </div>
                                                <div class="d-flex align-items-center gap-2">
                                                    <button
                                                        type="button"
                                                        class="btn btn-sm btn-outline-danger border-0 p-1"
                                                        @click="removeModule(mIdx)"
                                                        title="Supprimer ce module"
                                                    >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="card-body p-3">
                                                <div class="row g-2 mb-3">
                                                    <div :class="isAdmin ? 'col-md-7' : 'col-md-12'">
                                                        <label class="form-label small text-muted mb-1">Objectifs / Thèmes du module (optionnel)</label>
                                                        <textarea
                                                            class="form-control form-control-sm"
                                                            v-model="mod.description"
                                                            rows="2"
                                                            placeholder="Ce que les participants analyseront dans ce module..."
                                                        ></textarea>
                                                    </div>
                                                    <div class="col-md-5" v-if="isAdmin">
                                                        <label class="form-label small text-muted mb-1 fw-semibold">
                                                            <i class="bi bi-person-badge text-primary me-1"></i>Instituteur assigné (optionnel)
                                                        </label>
                                                        <select class="form-select form-select-sm" v-model="mod.instructor_id">
                                                            <option value="">-- Non assigné (Formateur principal) --</option>
                                                            <option v-for="inst in availableInstructors" :key="inst.id" :value="inst.id">
                                                                {{ inst.user?.name || inst.name || ('Formateur #' + inst.id) }} ({{ inst.title || 'Instituteur' }})
                                                            </option>
                                                        </select>
                                                        <small class="text-muted d-block mt-1" style="font-size: 11px;">
                                                            <i class="bi bi-envelope me-1 text-primary"></i>Reçoit un email dès l'assignation.
                                                        </small>
                                                    </div>
                                                </div>

                                                <!-- Leçons du module -->
                                                <div class="bg-light p-3 rounded-3 border">
                                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                                        <span class="small fw-bold text-dark">
                                                            <i class="bi bi-list-task me-1 text-main"></i>Leçons du module ({{ mod.lessons.length }})
                                                        </span>
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm btn-link text-decoration-none text-main p-0 fw-semibold"
                                                            @click="addLessonToModule(mIdx)"
                                                        >
                                                            <i class="bi bi-plus-circle me-1"></i>Ajouter une leçon
                                                        </button>
                                                    </div>

                                                    <div v-if="mod.lessons.length === 0" class="text-center py-2 text-muted small">
                                                        Aucune leçon pour ce module. Cliquez sur "Ajouter une leçon" ci-dessus.
                                                    </div>

                                                    <div v-else class="d-flex flex-column gap-2 mt-2">
                                                        <div
                                                            v-for="(les, lIdx) in mod.lessons"
                                                            :key="lIdx"
                                                            class="bg-white p-2.5 rounded-2 border d-flex flex-column gap-2"
                                                        >
                                                            <div class="d-flex align-items-center gap-2 flex-wrap">
                                                                <span class="badge bg-light text-secondary border small">{{ lIdx + 1 }}</span>
                                                                <input
                                                                    type="text"
                                                                    class="form-control form-control-sm flex-grow-1"
                                                                    v-model="les.title"
                                                                    placeholder="Titre de la leçon (ex: Transformations du travail)"
                                                                    required
                                                                >
                                                                <select v-model="les.type" class="form-select form-select-sm" style="width: 130px;">
                                                                    <option value="video">Vidéo</option>
                                                                    <option value="document">Document</option>
                                                                    <option value="text">Texte/Article</option>
                                                                    <option value="quiz">Quiz</option>
                                                                </select>
                                                                <div class="input-group input-group-sm" style="width: 105px;">
                                                                    <input type="number" class="form-control" v-model="les.duration" placeholder="15" min="1">
                                                                    <span class="input-group-text">min</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-sm btn-outline-danger border-0 p-1"
                                                                    @click="removeLessonFromModule(mIdx, lIdx)"
                                                                    title="Supprimer cette leçon"
                                                                >
                                                                    <i class="bi bi-x-lg"></i>
                                                                </button>
                                                            </div>

                                                            <div v-if="les.type === 'video'" class="row g-2 px-1">
                                                                <div class="col-12">
                                                                    <input
                                                                        type="url"
                                                                        class="form-control form-control-sm"
                                                                        v-model="les.video_url"
                                                                        placeholder="URL de la vidéo (ex: https://youtube.com/... ou URL vidéo)"
                                                                    >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- ÉTAPE 3 : Validation & Choix Brouillon / Publier -->
                                <div v-show="activeTab === 3" class="step active">
                                    <div class="mb-4 text-center">
                                        <div class="square--60 circle bg-light-primary text-primary mx-auto mb-3 fs-3">
                                            <i class="bi bi-shield-check"></i>
                                        </div>
                                        <h4 class="fw-bold">3. Finalisation & Statut du cours</h4>
                                        <p class="text-muted small">Vous pouvez choisir d'enregistrer le cours en <strong>brouillon</strong> pour continuer à le modifier, ou de le <strong>publier</strong> immédiatement.</p>
                                    </div>

                                    <!-- Carte de résumé -->
                                    <div class="card border rounded-3 p-4 mb-4 bg-light shadow-xs">
                                        <div class="row g-3 align-items-center">
                                            <div class="col-md-3 text-center" v-if="preview">
                                                <img :src="preview" class="img-fluid rounded-3 border" style="max-height: 120px; object-fit: cover;" alt="Miniature">
                                            </div>
                                            <div :class="preview ? 'col-md-9' : 'col-md-12'">
                                                <h5 class="fw-bold text-dark mb-1">{{ course.title || 'Titre non renseigné' }}</h5>
                                                <p class="text-muted small mb-2 text-truncate" style="max-height: 40px;">{{ course.description || 'Aucune description rédigée.' }}</p>
                                                <div class="d-flex flex-wrap gap-2 small">
                                                    <span class="badge bg-white text-primary border">
                                                        <i class="bi bi-collection me-1"></i>{{ modules.length }} module(s) configuré(s)
                                                    </span>
                                                    <span class="badge bg-white text-dark border">
                                                        <i class="bi bi-translate me-1"></i>{{ course.language.toUpperCase() }}
                                                    </span>
                                                    <span class="badge bg-white text-dark border">
                                                        <i class="bi bi-bar-chart me-1"></i>{{ course.level }}
                                                    </span>
                                                    <span v-if="course.is_free" class="badge bg-white text-success border fw-bold">
                                                        <i class="bi bi-gift me-1"></i>Accès gratuit
                                                    </span>
                                                    <span v-else class="badge bg-white text-dark border fw-bold">
                                                        <i class="bi bi-tag me-1"></i>Tarifé : {{ course.price }} FCFA
                                                    </span>
                                                    <span v-if="course.is_nomination_only" class="badge bg-white text-primary border fw-bold">
                                                        <i class="bi bi-file-earmark-person me-1"></i>Sur Nomination
                                                    </span>
                                                    <span v-if="course.requires_approval" class="badge bg-white text-warning border fw-bold">
                                                        <i class="bi bi-shield-check me-1"></i>Validation requise
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Options d'enregistrement -->
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="card h-100 border rounded-3 p-4 text-center shadow-xs" style="background-color: #fafbfc;">
                                                <div class="square--50 circle bg-light-secondary text-secondary mx-auto mb-3 fs-3">
                                                    <i class="bi bi-file-earmark-text"></i>
                                                </div>
                                                <h5 class="fw-bold mb-2">Enregistrer comme brouillon</h5>
                                                <p class="text-muted small mb-4">
                                                    Votre cours est sauvegardé avec tous ses modules en mode <strong>Brouillon</strong>. Il n'est pas encore visible publiquement et vous pourrez le modifier à tout moment depuis la liste de vos cours.
                                                </p>
                                                <button
                                                    :disabled="submitting"
                                                    type="button"
                                                    class="btn btn-outline-dark rounded-pill w-100 py-2.5 fw-bold mt-auto"
                                                    @click="handleSubmit('draft')"
                                                >
                                                    <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                                                    <i class="bi bi-save me-1"></i> Enregistrer comme brouillon
                                                </button>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="card h-100 border border-success rounded-3 p-4 text-center shadow-xs" style="background-color: #f6fdf8;">
                                                <div class="square--50 circle bg-success bg-opacity-10 text-success mx-auto mb-3 fs-3">
                                                    <i class="bi bi-rocket-takeoff"></i>
                                                </div>
                                                <h5 class="fw-bold mb-2 text-success">Publier le cours</h5>
                                                <p class="text-muted small mb-4">
                                                    Votre cours et ses modules seront directement mis en ligne et accessibles aux apprenants sur la plateforme ALREI.
                                                </p>
                                                <button
                                                    :disabled="submitting"
                                                    type="button"
                                                    class="btn btn-main rounded-pill w-100 py-2.5 fw-bold mt-auto"
                                                    @click="handleSubmit('published')"
                                                >
                                                    <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                                                    <i class="bi bi-check-circle me-1"></i> Publier immédiatement
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Barre de navigation permanente -->
                                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 pt-3 border-top">
                                    <div>
                                        <button v-if="activeTab > 1" type="button" class="btn btn-outline-secondary px-4 rounded-pill" @click="prevTab">
                                            <i class="bi bi-arrow-left me-1"></i> Précédent
                                        </button>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <button
                                            :disabled="submitting"
                                            type="button"
                                            class="btn btn-outline-dark px-4 rounded-pill fw-semibold"
                                            @click="handleSubmit('draft')"
                                            title="Sauvegarder en brouillon pour pouvoir modifier plus tard"
                                        >
                                            <i class="bi bi-save me-1"></i>
                                            {{ submitting ? 'Enregistrement...' : 'Enregistrer brouillon' }}
                                        </button>
                                        <button
                                            v-if="activeTab < 3"
                                            type="button"
                                            class="btn btn-main px-4 rounded-pill fw-semibold"
                                            @click="nextTab"
                                        >
                                            Suivant <i class="bi bi-arrow-right ms-1"></i>
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
import AdminSidebar from '@/components/Accounts/admin-dashboard/AdminSidebar.vue';
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';

const { isAdmin, isInstructor } = useAuth()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()
const api = useApi()

const isEditMode = computed(() => !!route.query.id)
const activeTab = ref(1)
const preview = ref('')
const submitting = ref(false)
const categories = ref<any[]>([])

// ===== Modules & Curriculum =====
interface LessonItem {
    id?: number | null
    title: string
    type: 'video' | 'document' | 'text' | 'quiz'
    duration: number | string
    video_url?: string
    content?: string
    file?: File | null
}

interface ModuleItem {
    id?: number | null
    title: string
    description?: string
    instructor_id?: number | string | null
    lessons: LessonItem[]
}

const availableInstructors = ref<any[]>([])

const modules = ref<ModuleItem[]>([
    {
        id: null,
        title: 'Module 1 : Introduction et objectifs du programme',
        description: '',
        instructor_id: '',
        lessons: [
            { id: null, title: 'Présentation générale et cadre du cours', type: 'video', duration: 15, video_url: '' }
        ]
    }
])

const addModule = () => {
    const nextNum = modules.value.length + 1
    modules.value.push({
        id: null,
        title: `Module ${nextNum} : Nouvel axe d'apprentissage`,
        description: '',
        instructor_id: '',
        lessons: []
    })
}

const removeModule = (idx: number) => {
    if (confirm('Voulez-vous supprimer ce module ?')) {
        modules.value.splice(idx, 1)
    }
}

const addLessonToModule = (mIdx: number) => {
    modules.value[mIdx].lessons.push({
        id: null,
        title: '',
        type: 'video',
        duration: 15,
        video_url: ''
    })
}

const removeLessonFromModule = (mIdx: number, lIdx: number) => {
    modules.value[mIdx].lessons.splice(lIdx, 1)
}

// ===== Contenu multilingue =====
const contentType = ref<'document' | 'video' | 'youtube'>('document')
const languageVersions = ref([{ lang: 'fr', file: null as File | null }])
const youtubeUrl = ref('')

const contentTypes = [
    { value: 'document', label: 'Document',  icon: 'bi bi-file-earmark-richtext', activeColor: 'text-primary' },
    { value: 'video',    label: 'Vidéo',      icon: 'bi bi-camera-video-fill',     activeColor: 'text-danger'  },
    { value: 'youtube',  label: 'YouTube',    icon: 'bi bi-youtube',               activeColor: 'text-danger'  },
]

const addVersion = () => {
    const usedLangs = languageVersions.value.map(v => v.lang)
    const next = ['fr', 'en', 'pt'].find(l => !usedLangs.includes(l))
    if (next) languageVersions.value.push({ lang: next, file: null })
}

const removeVersion = (idx: number) => {
    languageVersions.value.splice(idx, 1)
}

const handleVersionFile = (e: Event, idx: number) => {
    const input = e.target as HTMLInputElement
    if (input.files?.[0]) {
        languageVersions.value[idx].file = input.files[0]
    }
}
// ================================

const course = reactive({
    title: '',
    category_id: '',
    level: 'beginner',
    language: 'fr',
    description: '',
    is_free: true,
    is_nomination_only: false,
    requires_approval: false,
    price: 0,
    thumbnail: null as File | null,
    prerequisites: '',
    status: 'draft',
    instructor_id: '' as string | number
})

onMounted(async () => {
    try {
        const [catRes, instRes]: any = await Promise.all([
            api('/categories').catch(() => []),
            api('/admin/instructors').catch(() => api('/instructors')).catch(() => [])
        ])
        categories.value = catRes?.data || catRes || []
        availableInstructors.value = instRes?.data || instRes || []
    } catch (error) {
        console.error('Failed to fetch initial data:', error)
    }

    // Mode édition : chargement si ?id=...
    const editId = route.query.id
    if (editId) {
        try {
            const courseRes: any = await api(`/courses/by-id/${editId}`).catch(() => api(`/instructor/courses/${editId}`))
            const data = courseRes.data || courseRes
            if (data) {
                course.title = data.title || ''
                course.category_id = data.category_id || ''
                course.level = data.level || 'beginner'
                course.language = data.language || 'fr'
                course.description = data.description || ''
                course.prerequisites = data.prerequisites || ''
                course.is_free = data.is_free !== undefined ? !!data.is_free : true
                course.is_nomination_only = !!data.is_nomination_only
                course.requires_approval = !!data.requires_approval
                course.price = data.price || 0
                course.status = data.status || 'draft'
                course.instructor_id = data.instructor_id || data.instructor?.id || ''
                
                if (data.thumbnail) {
                    preview.value = data.thumbnail.startsWith('http') || data.thumbnail.startsWith('/')
                        ? data.thumbnail
                        : `${config.public.apiBase.replace('/api', '')}/storage/${data.thumbnail}`
                }

                if (data.sections && data.sections.length > 0) {
                    modules.value = data.sections.map((s: any) => ({
                        id: s.id,
                        title: s.title || '',
                        description: s.description || '',
                        instructor_id: s.instructor_id || s.instructor?.id || '',
                        lessons: (s.lessons || []).map((l: any) => ({
                            id: l.id,
                            title: l.title || '',
                            type: l.type || 'video',
                            duration: l.duration || 15,
                            video_url: l.video_url || ''
                        }))
                    }))
                }
            }
        } catch (loadErr) {
            console.error('Could not load course for editing:', loadErr)
        }
    }
})

const handleThumbnailChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
      course.thumbnail = file
      preview.value = URL.createObjectURL(file)
  }
}

const prevTab = () => {
  if (activeTab.value > 1) activeTab.value--
}

const nextTab = () => {
  if (activeTab.value < 3) activeTab.value++
}

const handleSubmit = async (targetStatus: 'draft' | 'published' = 'draft') => {
    if (!course.title.trim()) {
        alert('Veuillez renseigner le titre du cours.')
        activeTab.value = 1
        return
    }

    submitting.value = true
    try {
        const formData = new FormData()
        formData.append('title', course.title)
        if (course.category_id && String(course.category_id).trim() !== '') {
            formData.append('category_id', String(course.category_id))
        }
        formData.append('level', course.level || 'beginner')
        formData.append('language', course.language || 'fr')
        formData.append('description', course.description || '')
        formData.append('prerequisites', course.prerequisites || '')
        formData.append('is_free', course.is_free ? '1' : '0')
        formData.append('is_nomination_only', course.is_nomination_only ? '1' : '0')
        formData.append('requires_approval', course.requires_approval ? '1' : '0')
        formData.append('price', String(course.is_free ? 0 : (course.price || 0)))
        formData.append('status', targetStatus)
        if (course.instructor_id && String(course.instructor_id).trim() !== '') {
            formData.append('instructor_id', String(course.instructor_id))
        }
        if (course.thumbnail) {
            formData.append('thumbnail', course.thumbnail)
        }
        
        // Multilingual content
        formData.append('content_type', contentType.value)
        if (contentType.value === 'youtube') {
            formData.append('youtube_url', youtubeUrl.value || '')
        } else {
            languageVersions.value.forEach((v, i) => {
                formData.append(`versions[${i}][lang]`, v.lang)
                if (v.file) formData.append(`versions[${i}][file]`, v.file)
            })
        }

        let savedCourseId = route.query.id
        if (isEditMode.value && savedCourseId) {
            formData.append('_method', 'PUT')
            const res: any = await api(`/instructor/courses/${savedCourseId}`, {
                method: 'POST',
                body: formData
            })
            savedCourseId = res?.data?.id || res?.id || savedCourseId
        } else {
            const res: any = await api('/instructor/courses', {
                method: 'POST',
                body: formData
            })
            savedCourseId = res?.data?.id || res?.id
        }

        // Synchronisation des modules créés avec assignation de l'instituteur
        if (savedCourseId && modules.value.length > 0) {
            for (const mod of modules.value) {
                if (mod.title && mod.title.trim()) {
                    try {
                        let sectionId = mod.id
                        if (sectionId) {
                            await api(`/instructor/sections/${sectionId}`, {
                                method: 'PUT',
                                body: { 
                                    title: mod.title, 
                                    description: mod.description,
                                    instructor_id: mod.instructor_id || null
                                }
                            })
                        } else {
                            const secRes: any = await api(`/instructor/courses/${savedCourseId}/sections`, {
                                method: 'POST',
                                body: { 
                                    title: mod.title, 
                                    description: mod.description,
                                    instructor_id: mod.instructor_id || null
                                }
                            })
                            sectionId = secRes?.data?.id || secRes?.id
                        }

                        // Synchronisation des leçons si présentes
                        if (sectionId && mod.lessons && mod.lessons.length > 0) {
                            for (const les of mod.lessons) {
                                if (les.title && !les.id) {
                                    const lData = new FormData()
                                    lData.append('title', les.title)
                                    lData.append('type', les.type || 'video')
                                    lData.append('duration', String(les.duration || 15))
                                    if (les.video_url) lData.append('video_url', les.video_url)
                                    if (les.content) lData.append('content', les.content)
                                    if (les.file) lData.append('file_fr', les.file)
                                    await api(`/instructor/sections/${sectionId}/lessons`, {
                                        method: 'POST',
                                        body: lData
                                    }).catch(e => console.warn('Lesson create note:', e))
                                }
                            }
                        }
                    } catch (secErr) {
                        console.warn('Module sync note:', secErr)
                    }
                }
            }
        }

        // Notification e-mail aux instituteurs assignés (si gérée par route optionnelle)
        const assignedInstructorIds = new Set<string | number>()
        if (course.instructor_id) assignedInstructorIds.add(course.instructor_id)
        modules.value.forEach(m => {
            if (m.instructor_id) assignedInstructorIds.add(m.instructor_id)
        })

        if (assignedInstructorIds.size > 0 && isAdmin.value) {
            for (const instId of assignedInstructorIds) {
                try {
                    await api('/admin/notify-instructor-assignment', {
                        method: 'POST',
                        body: {
                            instructor_id: instId,
                            course_id: savedCourseId,
                            course_title: course.title
                        }
                    }).catch(() => null)
                } catch {
                    // Route optionnelle : gérée automatiquement par le backend Laravel
                }
            }
        }

        const msg = targetStatus === 'draft'
            ? '✅ Cours enregistré comme brouillon avec succès !'
            : '🎉 Félicitations ! Votre cours a été publié avec succès.'
        alert(msg)
        const targetRoute = isAdmin.value ? '/admin-dashboard?tab=courses' : '/instructor-courses';
        navigateTo(localePath(targetRoute));
    } catch (error: any) {
        console.error('Failed to save course:', error)
        let errorMsg = 'Erreur lors de l\'enregistrement du cours.'
        if (error?.data?.errors) {
            const details = Object.entries(error.data.errors)
                .map(([field, msgs]: [string, any]) => `• ${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                .join('\n')
            errorMsg = `Erreur de validation (422) :\n${details}`
        } else if (error?.data?.message) {
            errorMsg = `Erreur (422) : ${error.data.message}`
        }
        alert(errorMsg)
    } finally {
        submitting.value = false
    }
}

definePageMeta({
    layout: 'instructor',
});
</script>
