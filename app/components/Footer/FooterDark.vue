<template>
    <footer class="dark-footer bg-dark text-light py-5 border-top border-secondary">
        <div>
            <div class="container">
                <div class="row g-4">
                    
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-widget">
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <img :src="logoLight" class="img-footer" style="max-height: 55px; width: auto;" alt="Logo ALREI" />
                                <img src="/logo-ituc.png" class="img-footer" style="max-height: 55px; width: auto;" alt="Logo CSI-Afrique" />
                            </div>
                            <p class="footer-text mb-3">
                                Le Centre ALREI de formation des travailleurs est la plateforme en ligne d'ALREI consacrée à l'éducation ouvrière et aux connaissances sur le travail.
                            </p>
                            <div class="footer-add">
                                <address class="footer-text mb-3 lh-sm"><i class="bi bi-geo-alt text-warning me-2"></i>Route Internationale d'Atakpamé, Centre FOPADESC, Agoè-Nyivé, BP 4401, Lomé, Togo</address>
                                <div class="d-flex align-items-center call-now gap-2 mb-2">
                                    <div class="square--30 circle bg-secondary text-light"><i class="bi bi-telephone"></i></div>
                                    <a href="tel:+22890943434" class="footer-link text-decoration-none">+228 90 94 34 34</a>
                                </div>
                                <div class="d-flex align-items-center call-now gap-2">
                                    <div class="square--30 circle bg-secondary text-light"><i class="bi bi-envelope"></i></div>
                                    <a href="mailto:alrei@ituc-africa.org" class="footer-link text-decoration-none">alrei@ituc-africa.org</a>
                                </div>
                            </div>
                        </div>
                    </div>		

                    <div class="col-lg-2 col-md-6">
                        <div class="footer-widget">
                            <h5 class="widget-title">Navigation</h5>
                            <ul class="footer-menu">
                                <li v-for="(item, index) in footerLink1" :key="index">
                                    <NuxtLink :to="localePath(item.link)" class="footer-link">{{ item.name }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                            
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h5 class="widget-title">Domaines de formation</h5>
                            <ul class="footer-menu">
                                <li v-for="(item, index) in footerCat" :key="index">
                                    <NuxtLink :to="localePath(item.link)" class="footer-link">{{ item.name }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h5 class="widget-title">Aide & Assistance</h5>
                            <ul class="footer-menu mb-4">
                                <li v-for="(item, index) in footerHelp" :key="index">
                                    <a v-if="item.external" :href="item.link" target="_blank" rel="noopener" class="footer-link">{{ item.name }}</a>
                                    <NuxtLink v-else :to="localePath(item.link)" class="footer-link">{{ item.name }}</NuxtLink>
                                </li>
                            </ul>
                            
                            <h5 class="widget-title mb-2">Suivez ALREI</h5>
                            <div class="d-flex gap-2">
                                <a href="https://x.com/ALREI_Africa" target="_blank" rel="noopener" aria-label="Suivre ALREI sur X" class="btn btn-sm btn-outline-light rounded-circle footer-social-btn">
                                    <i class="bi bi-twitter-x"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/alrei" target="_blank" rel="noopener" aria-label="Suivre ALREI sur LinkedIn" class="btn btn-sm btn-outline-light rounded-circle footer-social-btn">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                                <a href="https://www.facebook.com/61552981423170" target="_blank" rel="noopener" aria-label="Suivre ALREI sur Facebook" class="btn btn-sm btn-outline-light rounded-circle footer-social-btn">
                                    <i class="bi bi-facebook"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="footer-bottom mt-4 border-top border-secondary pt-3">
            <div class="container">
                <div class="row align-items-center g-3">
                    <div class="col-md-12 text-center">
                        <p class="mb-0 footer-text">
                            © 2026 Institut africain de recherche et d'éducation ouvrière (ALREI), CSI-Afrique. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const logoLight = '/Logo alrei.png'

const localePath = useLocalePath()
import { footerCat, footerHelp, footerLink1 } from '@/data/data.js'
</script>

<style scoped>
.dark-footer {
    font-size: 0.9rem;
    font-weight: 400;
}
.widget-title {
    font-size: 1rem;
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
}
.footer-text {
    font-size: 0.875rem;
    font-weight: 400;
    color: #9ca3af;
    line-height: 1.6;
}
.footer-link {
    font-size: 0.875rem;
    font-weight: 400;
    color: #9ca3af;
    transition: color 0.2s ease-in-out;
}
.footer-link:hover {
    color: #f59e0b;
}
.footer-menu {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
}
.footer-menu li {
    margin-bottom: 0.5rem;
}
.footer-social-btn {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    border-color: #4b5563;
    font-weight: 400;
}
.footer-social-btn:hover {
    background-color: #f59e0b;
    border-color: #f59e0b;
    color: #111827;
}
</style>