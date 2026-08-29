/**
 * PDF Merger - i18n System
 * Languages: EN (default), FR, DE, ES, PT, NL, IT
 *
 * API:
 *   initI18n()              - Initialize language on startup
 *   setLanguage(lang, cb)   - Change language
 *   getCurrentLanguage()    - Get current language code
 *   t(key, params)          - Get translated string with param substitution
 */

export const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Español', flag: '🇪🇸' },
  pt: { name: 'Português', flag: '🇵🇹' },
  nl: { name: 'Nederlands', flag: '🇳🇱' },
  it: { name: 'Italiano', flag: '🇮🇹' },
};

const STORAGE_KEY = 'pdfmerger_lang';
let currentLang = 'en';

export const TRANSLATIONS = {
  en: {
    'app.title': 'PDF Merger — Merge your PDF files',
    'header.tagline': 'Merge PDF files in your browser',
    'header.badge': '🔒 100% local — your files never leave your browser',
    'privacy.link': 'View on GitHub',
    'footer.bmc': 'Buy me a coffee',
    'dropzone.title': 'Drop your PDFs here',
    'dropzone.subtitle': 'or click to select files (1–10 PDFs)',
    'workspace.files': 'Uploaded files',
    'controls.merge': 'Merge',
    'controls.files': 'Files',
    'controls.totalPages': 'Total pages:',
    'controls.fileCount': 'Files:',
    'btn.merge': 'Merge PDFs',
    'btn.resetAll': 'Reset',
    'btn.addMore': 'Add more files',
    'btn.download': 'Download merged PDF',
    'alerts.maxFiles': 'Maximum 10 files allowed.',
    'alerts.invalidType': 'Only PDF files are supported.',
    'alerts.duplicate': 'This file is already added.',
    'alerts.mergeError': 'Merge error: {msg}',
    'alerts.noFiles': 'Please add at least one PDF file.',
    'alerts.success': 'PDFs merged successfully!',
    'progress.merging': 'Merging PDFs...',
    'progress.generating': 'Generating merged PDF...',
    'lang.label': 'Language',
    'merge.resultName': 'merged_{timestamp}',
    'file.pages': 'pages',
    'file.moveUp': 'Move up',
    'file.moveDown': 'Move down',
    'file.remove': 'Remove file',
  },

  fr: {
    'app.title': 'PDF Merger — Fusionnez vos fichiers PDF',
    'header.tagline': 'Fusionnez vos fichiers PDF dans votre navigateur',
    'header.badge': '🔒 100% local — vos fichiers ne quittent jamais votre navigateur',
    'privacy.link': 'Voir sur GitHub',
    'footer.bmc': 'Offrir un café',
    'dropzone.title': 'Déposez vos PDFs ici',
    'dropzone.subtitle': 'ou cliquez pour sélectionner des fichiers (1–10 PDFs)',
    'workspace.files': 'Fichiers chargés',
    'controls.merge': 'Fusionner',
    'controls.files': 'Fichiers',
    'controls.totalPages': 'Pages totales :',
    'controls.fileCount': 'Fichiers :',
    'btn.merge': 'Fusionner les PDFs',
    'btn.resetAll': 'Réinitialiser',
    'btn.addMore': 'Ajouter des fichiers',
    'btn.download': 'Télécharger le PDF fusionné',
    'alerts.maxFiles': 'Maximum 10 fichiers autorisés.',
    'alerts.invalidType': 'Seuls les fichiers PDF sont pris en charge.',
    'alerts.duplicate': 'Ce fichier est déjà ajouté.',
    'alerts.mergeError': 'Erreur de fusion : {msg}',
    'alerts.noFiles': 'Veuillez ajouter au moins un fichier PDF.',
    'alerts.success': 'PDFs fusionnés avec succès !',
    'progress.merging': 'Fusion des PDFs...',
    'progress.generating': 'Génération du PDF fusionné...',
    'lang.label': 'Langue',
    'merge.resultName': 'fusionne_{timestamp}',
    'file.pages': 'pages',
    'file.moveUp': 'Monter',
    'file.moveDown': 'Descendre',
    'file.remove': 'Supprimer le fichier',
  },

  de: {
    'app.title': 'PDF Merger — PDFs zusammenführen',
    'header.tagline': 'Führen Sie Ihre PDF-Dateien im Browser zusammen',
    'header.badge': '🔒 100% lokal — Ihre Dateien verlassen nie den Browser',
    'privacy.link': 'Auf GitHub ansehen',
    'footer.bmc': 'Kaffee ausgeben',
    'dropzone.title': 'Legen Sie Ihre PDFs hier ab',
    'dropzone.subtitle': 'oder klicken Sie, um Dateien auszuwählen (1–10 PDFs)',
    'workspace.files': 'Hochgeladene Dateien',
    'controls.merge': 'Zusammenführen',
    'controls.files': 'Dateien',
    'controls.totalPages': 'Seiten gesamt:',
    'controls.fileCount': 'Dateien:',
    'btn.merge': 'PDFs zusammenführen',
    'btn.resetAll': 'Zurücksetzen',
    'btn.addMore': 'Weitere Dateien hinzufügen',
    'btn.download': 'Zusammengeführtes PDF herunterladen',
    'alerts.maxFiles': 'Maximal 10 Dateien erlaubt.',
    'alerts.invalidType': 'Nur PDF-Dateien werden unterstützt.',
    'alerts.duplicate': 'Diese Datei wurde bereits hinzugefügt.',
    'alerts.mergeError': 'Fehler beim Zusammenführen: {msg}',
    'alerts.noFiles': 'Bitte fügen Sie mindestens eine PDF-Datei hinzu.',
    'alerts.success': 'PDFs erfolgreich zusammengeführt!',
    'progress.merging': 'PDFs werden zusammengeführt...',
    'progress.generating': 'Zusammengeführtes PDF wird erstellt...',
    'lang.label': 'Sprache',
    'merge.resultName': 'zusammengefuhrt_{timestamp}',
    'file.pages': 'Seiten',
    'file.moveUp': 'Nach oben',
    'file.moveDown': 'Nach unten',
    'file.remove': 'Datei entfernen',
  },

  es: {
    'app.title': 'PDF Merger — Combina tus archivos PDF',
    'header.tagline': 'Combina tus archivos PDF en el navegador',
    'header.badge': '🔒 100% local — tus archivos nunca salen del navegador',
    'privacy.link': 'Ver en GitHub',
    'footer.bmc': 'Invítame un café',
    'dropzone.title': 'Deja tus PDFs aquí',
    'dropzone.subtitle': 'o haz clic para seleccionar archivos (1–10 PDFs)',
    'workspace.files': 'Archivos cargados',
    'controls.merge': 'Combinar',
    'controls.files': 'Archivos',
    'controls.totalPages': 'Páginas totales:',
    'controls.fileCount': 'Archivos:',
    'btn.merge': 'Combinar PDFs',
    'btn.resetAll': 'Reiniciar',
    'btn.addMore': 'Añadir más archivos',
    'btn.download': 'Descargar PDF combinado',
    'alerts.maxFiles': 'Máximo 10 archivos permitidos.',
    'alerts.invalidType': 'Solo se admiten archivos PDF.',
    'alerts.duplicate': 'Este archivo ya está añadido.',
    'alerts.mergeError': 'Error al combinar: {msg}',
    'alerts.noFiles': 'Por favor, añade al menos un archivo PDF.',
    'alerts.success': '¡PDFs combinados con éxito!',
    'progress.merging': 'Combinando PDFs...',
    'progress.generating': 'Generando PDF combinado...',
    'lang.label': 'Idioma',
    'merge.resultName': 'combinado_{timestamp}',
    'file.pages': 'páginas',
    'file.moveUp': 'Subir',
    'file.moveDown': 'Bajar',
    'file.remove': 'Eliminar archivo',
  },

  pt: {
    'app.title': 'PDF Merger — Junte seus arquivos PDF',
    'header.tagline': 'Junte seus arquivos PDF no navegador',
    'header.badge': '🔒 100% local — seus arquivos nunca saem do navegador',
    'privacy.link': 'Ver no GitHub',
    'footer.bmc': 'Pague um café',
    'dropzone.title': 'Solte seus PDFs aqui',
    'dropzone.subtitle': 'ou clique para selecionar arquivos (1–10 PDFs)',
    'workspace.files': 'Arquivos carregados',
    'controls.merge': 'Juntar',
    'controls.files': 'Arquivos',
    'controls.totalPages': 'Páginas totais:',
    'controls.fileCount': 'Arquivos:',
    'btn.merge': 'Juntar PDFs',
    'btn.resetAll': 'Redefinir',
    'btn.addMore': 'Adicionar mais arquivos',
    'btn.download': 'Baixar PDF combinado',
    'alerts.maxFiles': 'Máximo de 10 arquivos permitidos.',
    'alerts.invalidType': 'Apenas arquivos PDF são suportados.',
    'alerts.duplicate': 'Este arquivo já foi adicionado.',
    'alerts.mergeError': 'Erro ao juntar: {msg}',
    'alerts.noFiles': 'Por favor, adicione pelo menos um arquivo PDF.',
    'alerts.success': 'PDFs juntados com sucesso!',
    'progress.merging': 'Juntando PDFs...',
    'progress.generating': 'Gerando PDF combinado...',
    'lang.label': 'Idioma',
    'merge.resultName': 'combinado_{timestamp}',
    'file.pages': 'páginas',
    'file.moveUp': 'Mover para cima',
    'file.moveDown': 'Mover para baixo',
    'file.remove': 'Remover arquivo',
  },

  nl: {
    'app.title': 'PDF Merger — Voeg uw PDF-bestanden samen',
    'header.tagline': 'Voeg uw PDF-bestanden samen in uw browser',
    'header.badge': '🔒 100% lokaal — uw bestanden verlaten nooit uw browser',
    'privacy.link': 'Bekijk op GitHub',
    'footer.bmc': 'Koffie aanbieden',
    'dropzone.title': 'Sleep uw PDFs hierheen',
    'dropzone.subtitle': 'of klik om bestanden te selecteren (1–10 PDFs)',
    'workspace.files': 'Geüploade bestanden',
    'controls.merge': 'Samenvoegen',
    'controls.files': 'Bestanden',
    'controls.totalPages': "Pagina's totaal:",
    'controls.fileCount': 'Bestanden:',
    'btn.merge': 'PDFs samenvoegen',
    'btn.resetAll': 'Opnieuw',
    'btn.addMore': 'Meer bestanden toevoegen',
    'btn.download': 'Samengevoegde PDF downloaden',
    'alerts.maxFiles': 'Maximaal 10 bestanden toegestaan.',
    'alerts.invalidType': 'Alleen PDF-bestanden worden ondersteund.',
    'alerts.duplicate': 'Dit bestand is al toegevoegd.',
    'alerts.mergeError': 'Fout bij samenvoegen: {msg}',
    'alerts.noFiles': 'Voeg ten minste één PDF-bestand toe.',
    'alerts.success': 'PDFs succesvol samengevoegd!',
    'progress.merging': 'PDFs samenvoegen...',
    'progress.generating': 'Samengevoegde PDF genereren...',
    'lang.label': 'Taal',
    'merge.resultName': 'samengevoegd_{timestamp}',
    'file.pages': "pagina's",
    'file.moveUp': 'Omhoog',
    'file.moveDown': 'Omlaag',
    'file.remove': 'Bestand verwijderen',
  },

  it: {
    'app.title': 'PDF Merger — Unisci i tuoi file PDF',
    'header.tagline': 'Unisci i tuoi file PDF nel browser',
    'header.badge': '🔒 100% locale — i tuoi file non lasciano mai il browser',
    'privacy.link': 'Vedi su GitHub',
    'footer.bmc': 'Offri un caffè',
    'dropzone.title': 'Trascina qui i tuoi PDF',
    'dropzone.subtitle': 'o clicca per selezionare file (1–10 PDF)',
    'workspace.files': 'File caricati',
    'controls.merge': 'Unisci',
    'controls.files': 'File',
    'controls.totalPages': 'Pagine totali:',
    'controls.fileCount': 'File:',
    'btn.merge': 'Unisci PDF',
    'btn.resetAll': 'Ripristina',
    'btn.addMore': 'Aggiungi altri file',
    'btn.download': 'Scarica PDF unito',
    'alerts.maxFiles': 'Massimo 10 file consentiti.',
    'alerts.invalidType': 'Solo i file PDF sono supportati.',
    'alerts.duplicate': 'Questo file è già stato aggiunto.',
    'alerts.mergeError': "Errore durante l'unione: {msg}",
    'alerts.noFiles': 'Aggiungi almeno un file PDF.',
    'alerts.success': 'PDF uniti con successo!',
    'progress.merging': 'Unione dei PDF...',
    'progress.generating': 'Generazione del PDF unito...',
    'lang.label': 'Lingua',
    'merge.resultName': 'unito_{timestamp}',
    'file.pages': 'pagine',
    'file.moveUp': 'Sposta su',
    'file.moveDown': 'Sposta giù',
    'file.remove': 'Rimuovi file',
  },
};

/**
 * Translate a key with optional parameter substitution.
 * @param {string} key - Translation key (e.g. 'alerts.mergeError')
 * @param {Object} params - Parameters to substitute (e.g. { msg: 'error' })
 * @returns {string} Translated string
 */
export function t(key, params = {}) {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  let str = lang[key] || TRANSLATIONS.en[key] || key;

  for (const [k, v] of Object.entries(params)) {
    str = str.replace(`{${k}}`, String(v));
  }

  return str;
}

/**
 * Get the current language code.
 * @returns {string} Current language code (e.g. 'en', 'fr')
 */
export function getCurrentLanguage() {
  return currentLang;
}

/**
 * Apply translations to all data-i18n elements in the DOM.
 */
function applyTranslations() {
  // data-i18n: textContent
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // data-i18n-title: title attribute
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });

  // data-i18n-aria-label: aria-label attribute
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (key) {
      el.setAttribute('aria-label', t(key));
    }
  });

  // Update document title and lang attribute
  document.title = t('app.title');
  document.documentElement.lang = currentLang;
}

/**
 * Set the current language, persist to localStorage, and apply translations.
 * @param {string} lang - Language code (e.g. 'fr', 'de')
 * @param {Function} [callback] - Optional callback after language change
 */
export function setLanguage(lang, callback) {
  if (!LANGUAGES[lang]) {
    console.warn(`Unknown language: ${lang}, falling back to 'en'`);
    lang = 'en';
  }

  currentLang = lang;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // localStorage might be unavailable (private browsing)
  }

  applyTranslations();

  if (typeof callback === 'function') {
    callback(lang);
  }
}

/**
 * Create the language selector buttons and append to header.
 */
function createLanguageSelector() {
  const header = document.querySelector('.header');
  if (!header) return;

  // Remove existing selector if any
  const existing = header.querySelector('.lang-selector');
  if (existing) existing.remove();

  const selector = document.createElement('div');
  selector.className = 'lang-selector';
  selector.setAttribute('role', 'group');
  selector.setAttribute('aria-label', t('lang.label'));

  for (const [code, info] of Object.entries(LANGUAGES)) {
    const btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.textContent = info.flag;
    btn.title = info.name;
    btn.setAttribute('aria-label', info.name);
    btn.setAttribute('data-lang', code);
    if (code === currentLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.setAttribute('aria-pressed', 'false');
    }

    btn.addEventListener('click', () => {
      // Update active states
      selector.querySelectorAll('.lang-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      setLanguage(code);
    });

    selector.appendChild(btn);
  }

  header.appendChild(selector);
}

/**
 * Initialize i18n on app startup.
 * Loads saved language from localStorage, defaults to 'en'.
 */
export function initI18n() {
  let savedLang = 'en';

  try {
    savedLang = localStorage.getItem(STORAGE_KEY) || 'en';
  } catch (e) {
    // localStorage unavailable
  }

  if (!LANGUAGES[savedLang]) {
    savedLang = 'en';
  }

  currentLang = savedLang;
  applyTranslations();
  createLanguageSelector();
}
