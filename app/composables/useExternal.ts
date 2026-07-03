export const useExternal = () => {
    const api = useApi()
    const loading = ref(false)

    const fetchLiveClasses = async (courseId?: number) => {
        try {
            const response = await api('/live-sessions', {
                params: { course_id: courseId }
            })
            return (response as any).data || response
        } catch (error) {
            console.error('Failed to fetch live classes:', error)
            return []
        }
    }

    const getMoodleLogin = async (courseId: number) => {
        loading.value = true
        try {
            const response: any = await api(`/courses/${courseId}/moodle-login`, {
                method: 'POST'
            })
            if (response && response.url) {
                window.open(response.url, '_blank')
            }
            return response
        } catch (error: any) {
            console.error('Moodle login error:', error.response?._data || error.message)
            throw error
        } finally {
            loading.value = false
        }
    }

    const createLiveClass = async (data: any) => {
        loading.value = true
        try {
            const response = await api('/live-sessions', {
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
