export const useCourseTheme = () => {
    const config = useRuntimeConfig()

    const getThemeImage = (c, idx = 0, ignoreUploaded = false) => {
        const thumb = typeof c === 'string' ? c : (c?.thumbnail || c?.image)
        
        // Check if there is a valid uploaded image from backend DB and not forcing fallback
        if (!ignoreUploaded && thumb && typeof thumb === 'string' && thumb.trim() !== '' && 
            !thumb.includes('courses-1.jpg') && !thumb.includes('course-placeholder.jpg') && 
            !thumb.includes('blog-1.jpg') && !thumb.includes('blog-2.jpg')) {
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
        const desc = (typeof c === 'object' && (c?.subtitle || c?.description || c?.desc || c?.summary)) ? (c.subtitle || c.description || c.desc || c.summary) : ''
        const text = `${title} ${desc}`.toLowerCase()

        if (text.includes('climat') || text.includes('écolog') || text.includes('vert') || text.includes('environnement') || text.includes('durab') || text.includes('transition')) {
            return '/img/theme-climate.jpg'
        }
        if (text.includes('numérique') || text.includes('technolog') || text.includes('digit') || text.includes('ia') || text.includes('donnée') || text.includes('cyber') || text.includes('innova') || text.includes('commerce')) {
            return '/img/theme-digital.jpg'
        }
        if (text.includes('négociation') || text.includes('droit du travail') || text.includes('convention') || text.includes('accord')) {
            return '/img/co-7.jpg'
        }
        if (text.includes('informel') || text.includes('protection sociale') || text.includes('santé') || text.includes('sécurité')) {
            return '/img/co-2.jpg'
        }
        if (text.includes('leadership') || text.includes('gouvern') || text.includes('syndic') || text.includes('cadre') || text.includes('dirigeant') || text.includes('tulda')) {
            return '/img/theme-leadership.jpg'
        }

        const thematicPool = [
            '/img/theme-digital.jpg',
            '/img/theme-leadership.jpg',
            '/img/theme-climate.jpg',
            '/img/co-1.jpg',
            '/img/co-2.jpg',
            '/img/co-7.jpg'
        ]
        const idVal = (typeof c === 'object' && c?.id) ? c.id : idx
        const fallbackIdx = Math.abs(Number(idVal) || 0) % thematicPool.length
        return thematicPool[fallbackIdx]
    }

    const getBlogThemeImage = (b, idx = 0, ignoreUploaded = false) => {
        const thumb = typeof b === 'string' ? b : (b?.image || b?.thumbnail)
        
        // If not forcing fallback and valid uploaded image exists
        if (!ignoreUploaded && thumb && typeof thumb === 'string' && thumb.trim() !== '' && 
            !thumb.includes('blog-1.jpg') && !thumb.includes('blog-2.jpg') && !thumb.includes('placeholder')) {
            if (thumb.startsWith('http://') || thumb.startsWith('https://') || thumb.startsWith('data:')) {
                return thumb
            }
            if (thumb.startsWith('/img/') && !thumb.includes('blog-1.jpg') && !thumb.includes('blog-2.jpg')) {
                return thumb
            }
            const apiBase = config.public.apiBase || 'http://localhost:8000/api'
            const backendUrl = apiBase.replace(/\/api\/?$/, '')
            const cleanPath = thumb.startsWith('/') ? thumb.slice(1) : thumb
            return cleanPath.startsWith('storage/') ? `${backendUrl}/${cleanPath}` : `${backendUrl}/storage/${cleanPath}`
        }

        const title = (typeof b === 'object' && b?.title) ? b.title : ''
        const desc = (typeof b === 'object' && (b?.summary || b?.description || b?.content)) ? (b.summary || b.description || b.content) : ''
        const text = `${title} ${desc}`.toLowerCase()

        if (text.includes('climat') || text.includes('cop') || text.includes('transition') || text.includes('écolog') || text.includes('environnement')) {
            return '/img/theme-climate.jpg'
        }
        if (text.includes('informel') || text.includes('protection sociale') || text.includes('santé') || text.includes('sécurité')) {
            return '/img/co-2.jpg'
        }
        if (text.includes('numérique') || text.includes('digital') || text.includes('ia') || text.includes('technolog')) {
            return '/img/theme-digital.jpg'
        }
        if (text.includes('tulda') || text.includes('leadership') || text.includes('syndic') || text.includes('candidature') || text.includes('académie')) {
            return '/img/theme-leadership.jpg'
        }

        const blogPool = [
            '/img/theme-leadership.jpg',
            '/img/co-2.jpg',
            '/img/theme-climate.jpg',
            '/img/theme-digital.jpg'
        ]
        const idVal = (typeof b === 'object' && b?.id) ? b.id : idx
        const fallbackIdx = Math.abs(Number(idVal) || 0) % blogPool.length
        return blogPool[fallbackIdx]
    }

    return {
        getThemeImage,
        getBlogThemeImage
    }
}
