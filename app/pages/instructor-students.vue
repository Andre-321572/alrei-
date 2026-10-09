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
                                    <li class="breadcrumb-item"><a href="#">{{ $t('instructor_dashboard') }}</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">{{ $t('students') }}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    
                    <div class="row mb-5">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card border rounded-3 shadow-sm">
                                <div class="card-header bg-white border-bottom py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
                                    <h4 class="mb-0 fw-bold">{{ $t('students_list') }}</h4>
                                    
                                    <div class="d-flex align-items-center gap-2">
                                        <!-- Export CSV -->
                                        <button @click="exportGlobalCsv" :disabled="filteredStudents.length === 0" class="btn btn-outline-success btn-sm rounded-pill fw-semibold">
                                            <i class="bi bi-file-earmark-spreadsheet me-1"></i> Exporter CSV
                                        </button>
                                        <!-- Export PDF -->
                                        <button @click="exportPdf" :disabled="filteredStudents.length === 0 || exportingPdf" class="btn btn-danger btn-sm rounded-pill fw-semibold shadow-sm">
                                            <span v-if="exportingPdf" class="spinner-border spinner-border-sm me-1" role="status"></span>
                                            <i v-else class="bi bi-file-earmark-pdf me-1"></i> Exporter PDF
                                        </button>
                                    </div>
                                </div>

                                <!-- Filter & Search Toolbar -->
                                <div class="card-body border-bottom bg-light py-3">
                                    <div class="row g-2 align-items-center">
                                        <div class="col-md-6 col-12">
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text bg-white border-end-0 text-muted">
                                                    <i class="bi bi-search"></i>
                                                </span>
                                                <input 
                                                    v-model="searchQuery" 
                                                    type="text" 
                                                    class="form-control border-start-0 ps-0" 
                                                    placeholder="Rechercher par nom, email ou cours..."
                                                >
                                                <button v-if="searchQuery" @click="searchQuery = ''" class="btn btn-outline-secondary border-start-0" type="button">
                                                    <i class="bi bi-x"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-12 d-flex justify-content-md-end align-items-center gap-2">
                                            <label class="small text-muted mb-0 fw-semibold">Afficher :</label>
                                            <select v-model="itemsPerPage" class="form-select form-select-sm style-select" style="width: auto;">
                                                <option :value="5">5 par page</option>
                                                <option :value="10">10 par page</option>
                                                <option :value="25">25 par page</option>
                                                <option :value="50">50 par page</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body p-0">
                                    <div class="table-responsive">
                                        <table class="table table-hover align-middle mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>{{ $t('student') }}</th>
                                                    <th>{{ $t('course_title') }}</th>
                                                    <th>{{ $t('progress') }}</th>
                                                    <th>{{ $t('joined_at') }}</th>
                                                    <th>{{ $t('action') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="loading">
                                                    <td colspan="5" class="text-center py-5">
                                                        <div class="spinner-border text-primary" role="status"></div>
                                                    </td>
                                                </tr>
                                                <tr v-else-if="filteredStudents.length === 0">
                                                    <td colspan="5" class="text-center py-5">
                                                        <p class="text-muted mb-0">{{ searchQuery ? 'Aucun étudiant ne correspond à votre recherche.' : $t('no_students_enrolled') }}</p>
                                                    </td>
                                                </tr>
                                                <tr v-for="student in paginatedStudents" :key="student.id + '-' + (student.course_title || '')">
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2">
                                                            <div class="square--40 circle overflow-hidden border">
                                                                <img :src="getAvatarUrl(student.avatar, student.name)" class="img-fluid circle w-100 h-100" style="object-fit: cover;" alt="Avatar">
                                                            </div>
                                                            <div>
                                                                <div class="fw-bold text-dark">{{ student.name }}</div>
                                                                <div class="text-muted small">{{ student.email }}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-light text-dark border font-normal">{{ student.course_title || 'N/A' }}</span>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex align-items-center gap-2" style="min-width: 120px;">
                                                            <div class="progress w-100" style="height: 6px;">
                                                                <div class="progress-bar bg-success" role="progressbar" :style="{ width: (student.progress || 0) + '%' }" :aria-valuenow="student.progress" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <span class="small fw-bold">{{ student.progress || 0 }}%</span>
                                                        </div>
                                                    </td>
                                                    <td>{{ student.joined_at ? new Date(student.joined_at).toLocaleDateString() : 'N/A' }}</td>
                                                    <td>
                                                        <button @click="openMessageModal(student)" class="btn btn-outline-primary btn-sm rounded-pill">
                                                            <i class="bi bi-chat-dots me-1"></i> {{ $t('message') }}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <!-- Horizontal Pagination Footer -->
                                <div v-if="filteredStudents.length > 0" class="card-footer bg-white border-top py-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
                                    <div class="small text-muted">
                                        Affichage de <span class="fw-bold">{{ startIndex + 1 }}</span> à <span class="fw-bold">{{ endIndex }}</span> sur <span class="fw-bold">{{ filteredStudents.length }}</span> étudiants
                                    </div>
                                    <div v-if="totalPages > 1" class="d-flex align-items-center gap-1 flex-nowrap">
                                        <button 
                                            class="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                                            :disabled="currentPage === 1" 
                                            @click="goToPage(currentPage - 1)"
                                        >
                                            <i class="bi bi-chevron-left me-1"></i> Précédent
                                        </button>
                                        
                                        <button 
                                            v-for="page in visiblePages" 
                                            :key="page" 
                                            class="btn btn-sm rounded-3 fw-bold px-3 py-1" 
                                            :class="page === currentPage ? 'btn-primary text-white shadow-sm' : 'btn-light text-dark border'"
                                            @click="goToPage(page)"
                                        >
                                            {{ page }}
                                        </button>
                                        
                                        <button 
                                            class="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                                            :disabled="currentPage === totalPages" 
                                            @click="goToPage(currentPage + 1)"
                                        >
                                            Suivant <i class="bi bi-chevron-right ms-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Message Modal -->
    <div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow rounded-4">
                <div class="modal-header border-bottom py-3">
                    <h5 class="modal-title fw-bold">{{ $t('send_message_to') }} {{ selectedStudent?.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label class="form-label fw-semibold">{{ $t('your_message') }}</label>
                        <textarea v-model="messageContent" class="form-control rounded-3" rows="4" :placeholder="$t('write_your_message_here')"></textarea>
                    </div>
                </div>
                <div class="modal-footer bg-light border-top py-3 d-flex justify-content-between">
                    <NuxtLink v-if="selectedStudent" :to="`/messages?user_id=${selectedStudent.id}`" class="btn btn-outline-info btn-sm rounded-pill" data-bs-dismiss="modal">
                        <i class="bi bi-box-arrow-up-right me-1"></i> Discussion complète
                    </NuxtLink>
                    <div class="d-flex gap-2 ms-auto">
                        <button type="button" class="btn btn-light btn-sm rounded-pill px-3" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                        <button @click="sendMessage" class="btn btn-primary btn-sm rounded-pill px-4" :disabled="sending || !messageContent.trim()">
                            <span v-if="sending" class="spinner-border spinner-border-sm me-1" role="status"></span>
                            {{ $t('send') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';

const api = useApi()
const { getAvatarUrl } = useAvatar()
const { notifySuccess, notifyError } = useSwal()

const students = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const exportingPdf = ref(false)

const selectedStudent = ref<any>(null)
const messageContent = ref('')
const sending = ref(false)
let messageModalInstance: any = null

const fetchStudents = async () => {
    loading.value = true
    try {
        const response = await api('/instructor/students')
        students.value = response.data || []
    } catch (err) {
        console.error('Fetch students error:', err)
        notifyError('Erreur lors de la récupération de la liste des étudiants.')
    } finally {
        loading.value = false
    }
}

// Filtering
const filteredStudents = computed(() => {
    if (!searchQuery.value.trim()) return students.value
    const q = searchQuery.value.toLowerCase().trim()
    return students.value.filter(s =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.course_title && s.course_title.toLowerCase().includes(q))
    )
})

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage.value) || 1)
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredStudents.value.length))

const paginatedStudents = computed(() => {
    return filteredStudents.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
})

const visiblePages = computed(() => {
    const pages: number[] = []
    const total = totalPages.value
    const current = currentPage.value
    const maxVisible = 5
    
    let start = Math.max(1, current - Math.floor(maxVisible / 2))
    let end = Math.min(total, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i)
    }
    return pages
})

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

watch([searchQuery, itemsPerPage], () => {
    currentPage.value = 1
})

const openMessageModal = (student: any) => {
    selectedStudent.value = student
    messageContent.value = ''
    if (process.client) {
        const { $bootstrap } = useNuxtApp()
        const modalEl = document.getElementById('messageModal')
        if (modalEl) {
            messageModalInstance = ($bootstrap as any).Modal.getInstance(modalEl) || new ($bootstrap as any).Modal(modalEl)
            messageModalInstance.show()
        }
    }
}

const sendMessage = async () => {
    if (!selectedStudent.value || !messageContent.value.trim()) return
    
    sending.value = true
    try {
        await api('/messages', {
            method: 'POST',
            body: {
                recipient_id: selectedStudent.value.id,
                content: messageContent.value
            }
        })
        if (messageModalInstance) {
            messageModalInstance.hide()
        } else if (process.client) {
            const { $bootstrap } = useNuxtApp()
            const modalEl = document.getElementById('messageModal')
            if (modalEl) {
                const modal = ($bootstrap as any).Modal.getInstance(modalEl)
                modal?.hide()
            }
        }
        notifySuccess('Message envoyé avec succès')
    } catch (err) {
        console.error('Send message error:', err)
        notifyError('Erreur lors de l\'envoi du message')
    } finally {
        sending.value = false
    }
}

const exportGlobalCsv = () => {
    if (filteredStudents.value.length === 0) return
    
    const headers = ['Name', 'Email', 'Course', 'Progress', 'Joined At']
    const csvContent = [
        headers.join(','),
        ...filteredStudents.value.map(s => [
            `"${s.name || ''}"`,
            `"${s.email || ''}"`,
            `"${s.course_title || ''}"`,
            `"${s.progress || 0}%"`,
            `"${s.joined_at ? new Date(s.joined_at).toLocaleDateString() : ''}"`
        ].join(','))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'liste_etudiants_alrei.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    notifySuccess('Le fichier CSV a été généré.')
}

const exportPdf = async () => {
    if (filteredStudents.value.length === 0 || !process.client) return
    
    exportingPdf.value = true
    try {
        const { jsPDF } = await import('jspdf')
        const autoTableModule = await import('jspdf-autotable')
        const autoTable = autoTableModule.default || (autoTableModule as any)

        const doc = new jsPDF('portrait', 'mm', 'a4')

        // Title Header
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(16)
        doc.setTextColor(25, 135, 84) // #198754 (success theme color)
        doc.text('ALREI - Liste des Étudiants', 14, 15)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(100, 100, 100)
        const dateStr = new Date().toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
        const filterText = searchQuery.value ? ` | Recherche: "${searchQuery.value}"` : ''
        doc.text(`Rapport généré le: ${dateStr} | Total: ${filteredStudents.value.length} étudiant(s)${filterText}`, 14, 22)

        const tableColumn = ['N°', 'Étudiant', 'Email', 'Titre du cours', 'Progression', 'Inscrit le']

        const tableRows = filteredStudents.value.map((s: any, index: number) => [
            index + 1,
            s.name || 'N/A',
            s.email || 'N/A',
            s.course_title || 'N/A',
            `${s.progress || 0}%`,
            s.joined_at ? new Date(s.joined_at).toLocaleDateString('fr-FR') : 'N/A'
        ])

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 27,
            theme: 'striped',
            styles: { fontSize: 8.5, cellPadding: 2.5, font: 'helvetica' },
            headStyles: { fillColor: [25, 135, 84], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [248, 249, 250] },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 40 },
                2: { cellWidth: 50 },
                3: { cellWidth: 45 },
                4: { cellWidth: 20 },
                5: { cellWidth: 20 }
            }
        })

        doc.save('liste_etudiants_alrei.pdf')
        notifySuccess('Le fichier PDF a été généré et téléchargé.')
    } catch (err) {
        console.error('Export PDF error:', err)
        notifyError('Erreur lors de la génération du fichier PDF.')
    } finally {
        exportingPdf.value = false
    }
}

onMounted(() => {
    fetchStudents()
})

definePageMeta({
    layout: 'instructor',
});
</script>