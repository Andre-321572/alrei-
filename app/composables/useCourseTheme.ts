export const useCourseTheme = () => {
    const config = useRuntimeConfig()

    const fallbackImages = [
        '/img/co-1.jpg',
        '/img/co-2.jpg',
        '/img/co-3.jpg',
        '/img/co-4.jpg',
        '/img/co-5.jpg',
        '/img/co-6.jpg',
        '/img/co-7.jpg',
        '/img/co-8.jpg'
    ]

    const getThemeImage = (c, idx = 0) => {
        const thumb = typeof c === 'string' ? c : (c?.thumbnail || c?.image)
        
        // If there's a valid uploaded image from backend DB
        if (thumb && typeof thumb === 'string' && thumb.trim() !== '' && !thumb.includes('courses-1.jpg') && !thumb.includes('course-placeholder.jpg')) {
            if (thumb.startsWith('http://') || thumb.startsWith('https://') || thumb.startsWith('data:') || thumb.startsWith('/img/')) {
                return thumb
            }
            const apiBase = config.public.apiBase || 'http://localhost:8000/api'
            const backendUrl = apiBase.replace(/\/api\/?$/, '')
            const cleanPath = thumb.startsWith('/') ? thumb.slice(1) : thumb
            if (cleanPath.startsWith('storage/')) {
                return `${backendUrl}/${cleanPath}`
            }
            return `${backendUrl}/storage/${cleanPath}`
        }

        // Smart Theme Matching based on title and description keywords
        const title = (typeof c === 'object' && c?.title) ? c.title : ''
        const desc = (typeof c === 'object' && (c?.subtitle || c?.description || c?.desc)) ? (c.subtitle || c.description || c.desc) : ''
        const text = `${title} ${desc}`.toLowerCase()

        if (text.includes('climat') || text.includes('écolog') || text.includes('vert') || text.includes('environnement') || text.includes('durab') || text.includes('transition')) {
            return '/img/theme-climate.jpg'
        }
        if (text.includes('numérique') || text.includes('technolog') || text.includes('digit') || text.includes('ia') || text.includes('donnée') || text.includes('cyber') || text.includes('innova')) {
            return '/img/theme-digital.jpg'
        }
        if (text.includes('leadership') || text.includes('gouvern') || text.includes('syndic') || text.includes('négoc') || text.includes('droit') || text.includes('travail') || text.includes('dialogue') || text.includes('organis')) {
            return '/img/theme-leadership.jpg'
        }

        // Fallback to distinct thematic images co-1 to co-8
        const idVal = (typeof c === 'object' && c?.id) ? c.id : idx
        const fallbackIdx = Math.abs(Number(idVal) || 0) % fallbackImages.length
        return fallbackImages[fallbackIdx]
    }

    return {
        getThemeImage
    }
}
