export const useAvatar = () => {
  const config = useRuntimeConfig()

  const getAvatarUrl = (avatarPath?: string | null, name?: string) => {
    if (avatarPath && typeof avatarPath === 'string' && avatarPath.trim() !== '') {
      if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://') || avatarPath.startsWith('data:')) {
        return avatarPath
      }
      const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api'
      const baseUrl = apiBase.replace(/\/api\/?$/, '')
      const cleanPath = avatarPath.replace(/^\/?storage\//, '').replace(/^\//, '')
      return `${baseUrl}/storage/${cleanPath}`
    }

    const initials = getInitials(name || '?')
    const bgColor = getAvatarBgColor(name || '?')
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="54%" font-size="40" font-family="sans-serif" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>`

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  const getInitials = (name?: string) => {
    if (!name || typeof name !== 'string') return '?'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const getAvatarBgColor = (name?: string) => {
    const colors = [
      '#2e4c21', '#f2a900', '#2563eb', '#059669', 
      '#7c3aed', '#db2777', '#ea580c', '#0891b2'
    ]
    const str = name || 'User'
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  return {
    getAvatarUrl,
    getInitials,
    getAvatarBgColor
  }
}
