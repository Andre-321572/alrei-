<template>
    <div class="international-phone-input position-relative" ref="wrapperRef">
        <div class="input-group">
            <!-- Country Selector Dropdown Toggle -->
            <button
                type="button"
                class="btn btn-light border dropdown-toggle d-flex align-items-center gap-2 px-2 bg-white"
                @click="toggleDropdown"
                aria-expanded="isOpen"
            >
                <img
                    v-if="activeCountry"
                    :src="`https://flagcdn.com/w40/${activeCountry.iso2}.png`"
                    :alt="activeCountry.name"
                    class="flag-img rounded-1 border shadow-xs"
                    width="22"
                    height="15"
                />
                <span class="fw-bold text-dark small">{{ activeCountry?.dialCode || '+228' }}</span>
            </button>

            <!-- Phone Number Input -->
            <input
                v-model="phoneNumber"
                type="tel"
                class="form-control"
                :placeholder="placeholder || '90 00 00 00'"
                :required="required"
                @input="emitValue"
            />
        </div>

        <!-- Custom Dropdown Menu for ALL 240+ WORLD COUNTRIES -->
        <div
            v-if="isOpen"
            class="dropdown-menu show shadow-lg border-0 rounded-3 p-2 position-absolute start-0 w-100 z-3"
            style="max-height: 320px; overflow-y: auto; min-width: 290px; top: 100%; margin-top: 4px;"
        >
            <div class="sticky-top bg-white pt-1 pb-2 border-bottom mb-2">
                <input
                    ref="searchInputRef"
                    v-model="searchQuery"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="🔍 Rechercher un pays ou indicatif (+228, Togo, France...)"
                    @click.stop
                />
            </div>

            <div v-if="filteredCountries.length === 0" class="text-center text-muted small py-3">
                Aucun pays trouvé
            </div>

            <button
                v-for="country in filteredCountries"
                :key="country.iso2 + country.dialCode"
                type="button"
                class="dropdown-item d-flex align-items-center justify-content-between py-2 px-2 rounded-2 small"
                :class="{ active: activeCountry?.iso2 === country.iso2 }"
                @click="selectCountry(country)"
            >
                <div class="d-flex align-items-center gap-2 overflow-hidden me-2">
                    <img
                        :src="`https://flagcdn.com/w40/${country.iso2}.png`"
                        :alt="country.name"
                        class="flag-img rounded-1 border flex-shrink-0"
                        width="22"
                        height="15"
                        loading="lazy"
                    />
                    <span class="text-truncate text-dark">{{ country.name }}</span>
                </div>
                <span class="fw-semibold text-primary font-monospace fs-7">{{ country.dialCode }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: { type: String, default: '' },
    residenceCountry: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchQuery = ref('');
const wrapperRef = ref(null);
const searchInputRef = ref(null);

const phoneNumber = ref('');
const activeCountry = ref(null);

// COMPLETE WORLD COUNTRIES DATABASE (ISO2, French Name, International Dial Code)
const allCountries = [
    { iso2: 'tg', name: 'Togo', dialCode: '+228' },
    { iso2: 'ne', name: 'Niger', dialCode: '+227' },
    { iso2: 'sn', name: 'Sénégal', dialCode: '+221' },
    { iso2: 'bf', name: 'Burkina Faso', dialCode: '+226' },
    { iso2: 'bj', name: 'Bénin', dialCode: '+229' },
    { iso2: 'ci', name: 'Côte d\'Ivoire', dialCode: '+225' },
    { iso2: 'ml', name: 'Mali', dialCode: '+223' },
    { iso2: 'gn', name: 'Guinée', dialCode: '+224' },
    { iso2: 'mr', name: 'Mauritanie', dialCode: '+222' },
    { iso2: 'km', name: 'Comores', dialCode: '+269' },
    { iso2: 'td', name: 'Tchad', dialCode: '+235' },
    { iso2: 'tn', name: 'Tunisie', dialCode: '+216' },
    { iso2: 'mw', name: 'Malawi', dialCode: '+265' },
    { iso2: 'ng', name: 'Nigeria', dialCode: '+234' },
    { iso2: 'cg', name: 'Congo-Brazzaville', dialCode: '+242' },
    { iso2: 'cd', name: 'Congo-Kinshasa (RDC)', dialCode: '+243' },
    { iso2: 'cm', name: 'Cameroun', dialCode: '+237' },
    { iso2: 'ga', name: 'Gabon', dialCode: '+241' },
    { iso2: 'na', name: 'Namibie', dialCode: '+264' },
    { iso2: 'dz', name: 'Algérie', dialCode: '+213' },
    { iso2: 'ma', name: 'Maroc', dialCode: '+212' },
    { iso2: 'eg', name: 'Égypte', dialCode: '+20' },
    { iso2: 'za', name: 'Afrique du Sud', dialCode: '+27' },
    { iso2: 'gh', name: 'Ghana', dialCode: '+233' },
    { iso2: 'ke', name: 'Kenya', dialCode: '+254' },
    { iso2: 'et', name: 'Éthiopie', dialCode: '+251' },
    { iso2: 'mg', name: 'Madagascar', dialCode: '+261' },
    { iso2: 'rw', name: 'Rwanda', dialCode: '+250' },
    { iso2: 'bi', name: 'Burundi', dialCode: '+257' },
    { iso2: 'dj', name: 'Djibouti', dialCode: '+253' },
    { iso2: 'er', name: 'Érythrée', dialCode: '+291' },
    { iso2: 'gq', name: 'Guinée équatoriale', dialCode: '+240' },
    { iso2: 'gw', name: 'Guinée-Bissau', dialCode: '+245' },
    { iso2: 'ls', name: 'Lesotho', dialCode: '+266' },
    { iso2: 'lr', name: 'Libéria', dialCode: '+231' },
    { iso2: 'ly', name: 'Libye', dialCode: '+218' },
    { iso2: 'mu', name: 'Maurice', dialCode: '+230' },
    { iso2: 'mz', name: 'Mozambique', dialCode: '+258' },
    { iso2: 'cf', name: 'Rép. Centrafricaine', dialCode: '+236' },
    { iso2: 'st', name: 'Sao Tomé-et-Principe', dialCode: '+239' },
    { iso2: 'sc', name: 'Seychelles', dialCode: '+248' },
    { iso2: 'sl', name: 'Sierra Leone', dialCode: '+232' },
    { iso2: 'so', name: 'Somalie', dialCode: '+252' },
    { iso2: 'sd', name: 'Soudan', dialCode: '+249' },
    { iso2: 'ss', name: 'Soudan du Sud', dialCode: '+211' },
    { iso2: 'sz', name: 'Eswatini', dialCode: '+268' },
    { iso2: 'tz', name: 'Tanzanie', dialCode: '+255' },
    { iso2: 'ug', name: 'Ouganda', dialCode: '+256' },
    { iso2: 'zm', name: 'Zambie', dialCode: '+260' },
    { iso2: 'zw', name: 'Zimbabwe', dialCode: '+263' },
    { iso2: 'af', name: 'Afghanistan', dialCode: '+93' },
    { iso2: 'al', name: 'Albanie', dialCode: '+355' },
    { iso2: 'de', name: 'Allemagne', dialCode: '+49' },
    { iso2: 'ad', name: 'Andorre', dialCode: '+376' },
    { iso2: 'ao', name: 'Angola', dialCode: '+244' },
    { iso2: 'ai', name: 'Anguilla', dialCode: '+1264' },
    { iso2: 'ag', name: 'Antigua-et-Barbuda', dialCode: '+1268' },
    { iso2: 'sa', name: 'Arabie saoudite', dialCode: '+966' },
    { iso2: 'ar', name: 'Argentine', dialCode: '+54' },
    { iso2: 'am', name: 'Arménie', dialCode: '+374' },
    { iso2: 'aw', name: 'Aruba', dialCode: '+297' },
    { iso2: 'au', name: 'Australie', dialCode: '+61' },
    { iso2: 'at', name: 'Autriche', dialCode: '+43' },
    { iso2: 'az', name: 'Azerbaïdjan', dialCode: '+994' },
    { iso2: 'bs', name: 'Bahamas', dialCode: '+1242' },
    { iso2: 'bh', name: 'Bahreïn', dialCode: '+973' },
    { iso2: 'bd', name: 'Bangladesh', dialCode: '+880' },
    { iso2: 'bb', name: 'Barbade', dialCode: '+1246' },
    { iso2: 'be', name: 'Belgique', dialCode: '+32' },
    { iso2: 'bz', name: 'Belize', dialCode: '+501' },
    { iso2: 'bm', name: 'Bermudes', dialCode: '+1441' },
    { iso2: 'bt', name: 'Boutan', dialCode: '+975' },
    { iso2: 'by', name: 'Bélarus', dialCode: '+375' },
    { iso2: 'bo', name: 'Bolivie', dialCode: '+591' },
    { iso2: 'ba', name: 'Bosnie-Herzégovine', dialCode: '+387' },
    { iso2: 'bw', name: 'Botswana', dialCode: '+267' },
    { iso2: 'br', name: 'Brésil', dialCode: '+55' },
    { iso2: 'bn', name: 'Brunéi Darussalam', dialCode: '+673' },
    { iso2: 'bg', name: 'Bulgarie', dialCode: '+359' },
    { iso2: 'kh', name: 'Cambodge', dialCode: '+855' },
    { iso2: 'ca', name: 'Canada', dialCode: '+1' },
    { iso2: 'cv', name: 'Cap-Vert', dialCode: '+238' },
    { iso2: 'cl', name: 'Chili', dialCode: '+56' },
    { iso2: 'cn', name: 'Chine', dialCode: '+86' },
    { iso2: 'cy', name: 'Chypre', dialCode: '+357' },
    { iso2: 'co', name: 'Colombie', dialCode: '+57' },
    { iso2: 'kr', name: 'Corée du Sud', dialCode: '+82' },
    { iso2: 'cr', name: 'Costa Rica', dialCode: '+506' },
    { iso2: 'hr', name: 'Croatie', dialCode: '+385' },
    { iso2: 'cu', name: 'Cuba', dialCode: '+53' },
    { iso2: 'cw', name: 'Curaçao', dialCode: '+599' },
    { iso2: 'dk', name: 'Danemark', dialCode: '+45' },
    { iso2: 'dm', name: 'Dominique', dialCode: '+1767' },
    { iso2: 'ae', name: 'Émirats arabes unis', dialCode: '+971' },
    { iso2: 'ec', name: 'Équateur', dialCode: '+593' },
    { iso2: 'es', name: 'Espagne', dialCode: '+34' },
    { iso2: 'ee', name: 'Estonie', dialCode: '+372' },
    { iso2: 'us', name: 'États-Unis', dialCode: '+1' },
    { iso2: 'fj', name: 'Fidji', dialCode: '+679' },
    { iso2: 'fi', name: 'Finlande', dialCode: '+358' },
    { iso2: 'fr', name: 'France', dialCode: '+33' },
    { iso2: 'gm', name: 'Gambie', dialCode: '+220' },
    { iso2: 'ge', name: 'Géorgie', dialCode: '+995' },
    { iso2: 'gi', name: 'Gibraltar', dialCode: '+350' },
    { iso2: 'gr', name: 'Grèce', dialCode: '+30' },
    { iso2: 'gd', name: 'Grenade', dialCode: '+1473' },
    { iso2: 'gl', name: 'Groenland', dialCode: '+299' },
    { iso2: 'gp', name: 'Guadeloupe', dialCode: '+590' },
    { iso2: 'gu', name: 'Guam', dialCode: '+1671' },
    { iso2: 'gt', name: 'Guatemala', dialCode: '+502' },
    { iso2: 'gy', name: 'Guyana', dialCode: '+592' },
    { iso2: 'gf', name: 'Guyane française', dialCode: '+594' },
    { iso2: 'ht', name: 'Haïti', dialCode: '+509' },
    { iso2: 'hn', name: 'Honduras', dialCode: '+504' },
    { iso2: 'hk', name: 'Hong Kong', dialCode: '+852' },
    { iso2: 'hu', name: 'Hongrie', dialCode: '+36' },
    { iso2: 'in', name: 'Inde', dialCode: '+91' },
    { iso2: 'id', name: 'Indonésie', dialCode: '+62' },
    { iso2: 'iq', name: 'Iraq', dialCode: '+964' },
    { iso2: 'ir', name: 'Iran', dialCode: '+98' },
    { iso2: 'ie', name: 'Irlande', dialCode: '+353' },
    { iso2: 'is', name: 'Islande', dialCode: '+354' },
    { iso2: 'il', name: 'Israël', dialCode: '+972' },
    { iso2: 'it', name: 'Italie', dialCode: '+39' },
    { iso2: 'jm', name: 'Jamaïque', dialCode: '+1876' },
    { iso2: 'jp', name: 'Japon', dialCode: '+81' },
    { iso2: 'jo', name: 'Jordanie', dialCode: '+962' },
    { iso2: 'kz', name: 'Kazakhstan', dialCode: '+7' },
    { iso2: 'kg', name: 'Kirghizistan', dialCode: '+996' },
    { iso2: 'ki', name: 'Kiribati', dialCode: '+686' },
    { iso2: 'kw', name: 'Koweït', dialCode: '+965' },
    { iso2: 'la', name: 'Laos', dialCode: '+856' },
    { iso2: 'lv', name: 'Lettonie', dialCode: '+371' },
    { iso2: 'lb', name: 'Liban', dialCode: '+961' },
    { iso2: 'li', name: 'Liechtenstein', dialCode: '+423' },
    { iso2: 'lt', name: 'Lituanie', dialCode: '+370' },
    { iso2: 'lu', name: 'Luxembourg', dialCode: '+352' },
    { iso2: 'mo', name: 'Macao', dialCode: '+853' },
    { iso2: 'mk', name: 'Macédoine du Nord', dialCode: '+389' },
    { iso2: 'my', name: 'Malaisie', dialCode: '+60' },
    { iso2: 'mv', name: 'Maldives', dialCode: '+960' },
    { iso2: 'mt', name: 'Malte', dialCode: '+356' },
    { iso2: 'mq', name: 'Martinique', dialCode: '+596' },
    { iso2: 'yt', name: 'Mayotte', dialCode: '+262' },
    { iso2: 'mx', name: 'Mexique', dialCode: '+52' },
    { iso2: 'md', name: 'Moldavie', dialCode: '+373' },
    { iso2: 'mc', name: 'Monaco', dialCode: '+377' },
    { iso2: 'mn', name: 'Mongolie', dialCode: '+976' },
    { iso2: 'me', name: 'Monténégro', dialCode: '+382' },
    { iso2: 'ms', name: 'Montserrat', dialCode: '+1664' },
    { iso2: 'mm', name: 'Myanmar', dialCode: '+95' },
    { iso2: 'nr', name: 'Nauru', dialCode: '+674' },
    { iso2: 'np', name: 'Népal', dialCode: '+977' },
    { iso2: 'ni', name: 'Nicaragua', dialCode: '+505' },
    { iso2: 'no', name: 'Norvège', dialCode: '+47' },
    { iso2: 'nc', name: 'Nouvelle-Calédonie', dialCode: '+687' },
    { iso2: 'nz', name: 'Nouvelle-Zélande', dialCode: '+64' },
    { iso2: 'om', name: 'Oman', dialCode: '+968' },
    { iso2: 'uz', name: 'Ouzbékistan', dialCode: '+998' },
    { iso2: 'pk', name: 'Pakistan', dialCode: '+92' },
    { iso2: 'pw', name: 'Palaos', dialCode: '+680' },
    { iso2: 'ps', name: 'Palestine', dialCode: '+970' },
    { iso2: 'pa', name: 'Panama', dialCode: '+507' },
    { iso2: 'pg', name: 'Papouasie-Nouvelle-Guinée', dialCode: '+675' },
    { iso2: 'py', name: 'Paraguay', dialCode: '+595' },
    { iso2: 'nl', name: 'Pays-Bas', dialCode: '+31' },
    { iso2: 'pe', name: 'Pérou', dialCode: '+51' },
    { iso2: 'ph', name: 'Philippines', dialCode: '+63' },
    { iso2: 'pl', name: 'Pologne', dialCode: '+48' },
    { iso2: 'pf', name: 'Polynésie française', dialCode: '+689' },
    { iso2: 'pr', name: 'Porto Rico', dialCode: '+1787' },
    { iso2: 'pt', name: 'Portugal', dialCode: '+351' },
    { iso2: 'qa', name: 'Qatar', dialCode: '+974' },
    { iso2: 'do', name: 'Rép. Dominicaine', dialCode: '+1809' },
    { iso2: 're', name: 'Réunion', dialCode: '+262' },
    { iso2: 'ro', name: 'Roumanie', dialCode: '+40' },
    { iso2: 'gb', name: 'Royaume-Uni', dialCode: '+44' },
    { iso2: 'ru', name: 'Russie', dialCode: '+7' },
    { iso2: 'lc', name: 'Sainte-Lucie', dialCode: '+1758' },
    { iso2: 'kn', name: 'Saint-Kitts-et-Nevis', dialCode: '+1869' },
    { iso2: 'sm', name: 'Saint-Marin', dialCode: '+378' },
    { iso2: 'vc', name: 'Saint-Vincent-et-les-Grenadines', dialCode: '+1784' },
    { iso2: 'sv', name: 'El Salvador', dialCode: '+503' },
    { iso2: 'ws', name: 'Samoa', dialCode: '+685' },
    { iso2: 'rs', name: 'Serbie', dialCode: '+381' },
    { iso2: 'sg', name: 'Singapour', dialCode: '+65' },
    { iso2: 'sk', name: 'Slovaquie', dialCode: '+421' },
    { iso2: 'si', name: 'Slovénie', dialCode: '+386' },
    { iso2: 'lk', name: 'Sri Lanka', dialCode: '+94' },
    { iso2: 'se', name: 'Suède', dialCode: '+46' },
    { iso2: 'ch', name: 'Suisse', dialCode: '+41' },
    { iso2: 'sr', name: 'Suriname', dialCode: '+597' },
    { iso2: 'sy', name: 'Syrie', dialCode: '+963' },
    { iso2: 'tj', name: 'Tadjikistan', dialCode: '+992' },
    { iso2: 'tw', name: 'Taïwan', dialCode: '+886' },
    { iso2: 'cz', name: 'Tchéquie', dialCode: '+420' },
    { iso2: 'th', name: 'Thaïlande', dialCode: '+66' },
    { iso2: 'tl', name: 'Timor-Leste', dialCode: '+670' },
    { iso2: 'to', name: 'Tonga', dialCode: '+676' },
    { iso2: 'tt', name: 'Trinité-et-Tobago', dialCode: '+1868' },
    { iso2: 'tm', name: 'Turkménistan', dialCode: '+993' },
    { iso2: 'tr', name: 'Turquie', dialCode: '+90' },
    { iso2: 'tv', name: 'Tuvalu', dialCode: '+688' },
    { iso2: 'ua', name: 'Ukraine', dialCode: '+380' },
    { iso2: 'uy', name: 'Uruguay', dialCode: '+598' },
    { iso2: 'vu', name: 'Vanuatu', dialCode: '+678' },
    { iso2: 've', name: 'Venezuela', dialCode: '+58' },
    { iso2: 'vn', name: 'Viêt Nam', dialCode: '+84' },
    { iso2: 'ye', name: 'Yémen', dialCode: '+967' }
];

activeCountry.value = allCountries[0]; // Default Togo (+228)

const filteredCountries = computed(() => {
    if (!searchQuery.value) return allCountries;
    const q = searchQuery.value.toLowerCase().trim();
    return allCountries.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso2.toLowerCase().includes(q)
    );
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
        setTimeout(() => {
            searchInputRef.value?.focus();
        }, 100);
    }
};

const selectCountry = (country) => {
    activeCountry.value = country;
    isOpen.value = false;
    searchQuery.value = '';
    emitValue();
};

const emitValue = () => {
    const fullVal = activeCountry.value
        ? `${activeCountry.value.dialCode} ${phoneNumber.value.trim()}`
        : phoneNumber.value;
    emit('update:modelValue', fullVal);
};

// Sync active country if user selects residence country in form
watch(() => props.residenceCountry, (newResidence) => {
    if (!newResidence) return;
    const matched = allCountries.find(c =>
        c.name.toLowerCase() === newResidence.toLowerCase() ||
        newResidence.toLowerCase().includes(c.name.toLowerCase())
    );
    if (matched) {
        activeCountry.value = matched;
        emitValue();
    }
}, { immediate: true });

// Close dropdown on outside click
const handleOutsideClick = (e) => {
    if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.international-phone-input .flag-img {
    object-fit: cover;
    display: inline-block;
    vertical-align: middle;
}
.dropdown-item.active {
    background-color: #e9ecef !important;
    color: #0d6efd !important;
}
</style>
