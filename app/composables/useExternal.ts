import { ref } from 'vue'

export const useExternal = () => {
    const api = useApi()
    const loading = ref(false)

    const fetchLiveClasses = async (courseId?: number) => {
        try {
            const response = await api('/live-classes', {
                params: { course_id: courseId }
            })
            return response.data
        } catch (error) {
            console.error('Failed to fetch live classes:', error)
            return []
        }
    }

    const getMoodleLogin = async (courseId: number) => {
        loading.value = true
        console.log(`Tentative de connexion Moodle pour le cours ID: ${courseId}`);
        try {
            const response: any = await api(`/courses/${courseId}/moodle-login`, {
                method: 'POST'
            })
            console.log('Réponse Moodle reçue:', response);
            if (response && response.url) {
                window.open(response.url, '_blank')
            } else {
                console.warn('La réponse ne contient pas d\'URL:', response);
            }
            return response
        } catch (error: any) {
            console.error('Erreur détaillée Moodle Login:', error.response?._data || error.message);
            throw error
        } finally {
            loading.value = false
        }
    }

    const createLiveClass = async (data: any) => {
        loading.value = true
        try {
            const response = await api('/instructor/live-classes', {
                method: 'POST',
                body: data
            })
            return response
        } catch (error) {
            console.error('Failed to create live class:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        fetchLiveClasses,
        getMoodleLogin,
        createLiveClass
    }
}
