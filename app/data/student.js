import courses3 from "@/assets/img/courses-3.jpg";
import courses4 from "@/assets/img/courses-4.jpg";
import courses5 from "@/assets/img/courses-5.jpg";
import courses6 from "@/assets/img/courses-6.jpg";
import courses7 from "@/assets/img/courses-7.jpg";
import courses8 from "@/assets/img/courses-8.jpg";

export const aboutData = [
    {
        icon:'bi bi-laptop text-green',
        value:'05',
        title:'Domaines de Formation ALREI',
        theme:'green'
    },
    {
        icon:'fas fa-user-graduate text-red',
        value:'12',
        title:'Modules Complétés',
        theme:'red'
    },
    {
        icon:'bi bi-shield-lock text-main',
        value:'04',
        title:'Attestations Syndicales',
        theme:'main'
    },
]

export const coursesData = [
    {
        image: courses3,
        time: '15h 30m',
        name: `Leadership syndical & gouvernance démocratique`,
        lesson: '12 de 12 leçons terminées',
        progress: '100%'
    },
    {
        image: courses4,
        time: '20h 10m',
        name: `Syndicalisation & Négociation collective en Afrique`,
        lesson: '7 de 18 leçons terminées',
        progress: '40%'
    },
    {
        image: courses5,
        time: '12h 40m',
        name: `Recherche sur le travail & Politique économique`,
        lesson: '17 de 17 leçons terminées',
        progress: '100%'
    },
    {
        image: courses6,
        time: '18h 15m',
        name: `Changement climatique & Transition juste pour les travailleurs`,
        lesson: '6 de 10 leçons terminées',
        progress: '60%'
    },
    {
        image: courses7,
        time: '14h 20m',
        name: `Numérisation & L'Avenir du travail en Afrique`,
        lesson: '10 de 10 leçons terminées',
        progress: '100%'
    }
]

export const fundingMethodsData = [
    {
        id: 'bourse-alrei',
        title: 'Bourse d\'Études Syndicale ALREI / CSI-Afrique',
        badge: 'Prise en charge à 100%',
        badgeClass: 'bg-success bg-opacity-10 text-success',
        icon: 'bi bi-award-fill text-success fs-4',
        description: 'Couvre l\'intégralité des frais pédagogiques et des accès aux programmes en ligne pour les membres d\'organisations syndicales affiliées à la CSI-Afrique.'
    },
    {
        id: 'prise-en-charge-syndicale',
        title: 'Prise en Charge par Organisation Syndicale Affiliée',
        badge: 'Conventionné',
        badgeClass: 'bg-primary bg-opacity-10 text-primary',
        icon: 'bi bi-building-check text-primary fs-4',
        description: 'Prise en charge directe des attestations certifiantes et séminaires par votre centrale syndicale nationale.'
    },
    {
        id: 'virement-institutionnel',
        title: 'Virement Bancaire Institutionnel (Compte Officiel ALREI)',
        badge: 'Facturation Organisation',
        badgeClass: 'bg-warning bg-opacity-10 text-warning',
        icon: 'bi bi-bank text-warning fs-4',
        description: 'Compte bancaire institutionnel ALREI / ITUC-Africa (Lomé, Togo) réservé aux réglements de groupes et contributions de partenaires.'
    }
]

export const alreiPaymentHistoryData = [
    {
        id: 1,
        date: '15 Fév 2026',
        courseName: 'Leadership syndical & gouvernance démocratique',
        fundingMethod: 'Bourse Ouvrière ALREI / CSI-Afrique',
        status: 'Pris en charge',
        statusClass: 'bg-success bg-opacity-10 text-success',
        amount: '0 CFA (Pris en charge)',
        certificateUrl: '#'
    },
    {
        id: 2,
        date: '10 Jan 2026',
        courseName: 'Syndicalisation & Négociation collective en Afrique',
        fundingMethod: 'Prise en charge Syndicale (CNTS/CSI-Afrique)',
        status: 'Pris en charge',
        statusClass: 'bg-success bg-opacity-10 text-success',
        amount: '0 CFA (Pris en charge)',
        certificateUrl: '#'
    },
    {
        id: 3,
        date: '05 Nov 2025',
        courseName: 'Changement climatique & Transition juste pour les travailleurs',
        fundingMethod: 'Bourse d\'études ALREI',
        status: 'Pris en charge',
        statusClass: 'bg-success bg-opacity-10 text-success',
        amount: '0 CFA (Pris en charge)',
        certificateUrl: '#'
    }
]