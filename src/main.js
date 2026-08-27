/**
 * PDF Merger — Main Application Logic
 * 100% client-side, privacy-first. PDFs never leave the browser.
 *
 * Stack: pdf-lib (merge), pdfjs-dist (thumbnails/page count)
 */

import '../styles/main.css';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { initI18n, setLanguage, getCurrentLanguage, t } from './i18n.js';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// ===== State =====
const state = {
  files: [],         // Array of { id, file, name, size, pageCount, thumbnailUrl }
  maxFiles: 10,
  isProcessing: false,
  nextId: 1,
};

// ===== DOM refs =====
let dropzone, fileInput, workspace, fileList, progressContainer,
    progressFill, progressLabel, btnMerge, btnAddMore, btnResetAll, btnReset,
    totalPagesCount, fileCountDisplay, srLive;

// ===== Init =====
function init() {
  // Cache DOM elements
  dropzone = document.getElementById('dropzone');
  fileInput = document.getElementById('file-input');
  workspace = document.getElementById('workspace');
  fileList = document.getElementById('file-list');
  progressContainer = document.getElementById('progress-container');
  progressFill = document.getElementById('progress-fill');
  progressLabel = document.getElementById('progress-label');
  btnMerge = document.getElementById('btn-merge');
  btnAddMore = document.getElementById('btn-add-more');
  btnResetAll = document.getElementById('btn-reset-all');
  btnReset = document.getElementById('btn-reset');
  totalPagesCount = document.getElementById('total-pages-count');
  fileCountDisplay = document.getElementById('file-count-display');
  srLive = document.getElementById('sr-live');

  // Initialize i18n
  initI18n();

  // Dropzone events
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    fileInput.value = ''; // Reset so same file can be re-selected
  });

  // Button events
  btnMerge.addEventListener('click', mergePDFs);
  btnAddMore.addEventListener('click', () => fileInput.click());
  btnResetAll.addEventListener('click', resetAll);
  if (btnReset) btnReset.addEventListener('click', resetAll);
}

// ===== File Handling =====

/**
 * Validate and add files to state.
 * @param {FileList} fileListInput - Files from input or drop
 */
async function handleFiles(fileListInput) {
  const files = Array.from(fileListInput);

  for (const file of files) {
    // Validate type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showError(t('alerts.invalidType'));
      continue;
    }

    // Validate count
    if (state.files.length >= state.maxFiles) {
      showError(t('alerts.maxFiles'));
      break;
    }

    // Check duplicate (by name + size)
    const isDuplicate = state.files.some(
      (f) => f.name === file.name && f.size === file.size
    );
    if (isDuplicate) {
      showError(t('alerts.duplicate'));
      continue;
    }

    // Add file to state
    const id = state.nextId++;
    const entry = {
      id,
      file,
      name: file.name,
      size: file.size,
      pageCount: 0,
      thumbnailUrl: null,
    };

    state.files.push(entry);
    renderFileList();

    // Async: get page count and thumbnail
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      entry.pageCount = pdfDoc.numPages;

      // Generate thumbnail from page 1
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 0.4 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      entry.thumbnailUrl = canvas.toDataURL('image/png');
    } catch (err) {
      console.warn('Failed to process PDF thumbnail:', err);
      // Continue without thumbnail
    }

    renderFileList();
    updateTotals();
  }

  // Show workspace if we have files
  if (state.files.length > 0) {
    showWorkspace();
  }
}

/**
 * Render the file list in the DOM.
 */
function renderFileList() {
  fileList.innerHTML = '';

  state.files.forEach((entry, index) => {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-id', String(entry.id));
    card.setAttribute('draggable', 'true');

    // Order number
    const order = document.createElement('div');
    order.className = 'file-card__order';
    order.textContent = String(index + 1);

    // Thumbnail
    const thumb = document.createElement('div');
    thumb.className = 'file-card__thumb';
    if (entry.thumbnailUrl) {
      const img = document.createElement('img');
      img.src = entry.thumbnailUrl;
      img.alt = '';
      thumb.appendChild(img);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'file-card__thumb-placeholder';
      placeholder.textContent = '📄';
      thumb.appendChild(placeholder);
    }

    // Info (name + pages)
    const info = document.createElement('div');
    info.className = 'file-card__info';
    const name = document.createElement('div');
    name.className = 'file-card__name';
    name.textContent = entry.name;
    const pages = document.createElement('div');
    pages.className = 'file-card__pages';
    pages.textContent = entry.pageCount > 0
      ? `${entry.pageCount} ${getCurrentLanguage() === 'fr' ? 'page(s)' : 'page(s)'}`
      : '...';
    info.appendChild(name);
    info.appendChild(pages);

    // Actions (move up, move down, remove)
    const actions = document.createElement('div');
    actions.className = 'file-card__actions';

    // Drag handle
    const handle = document.createElement('span');
    handle.className = 'file-card__drag-handle';
    handle.textContent = '⣿';
    handle.setAttribute('aria-hidden', 'true');
    actions.appendChild(handle);

    // Move up button
    const upBtn = document.createElement('button');
    upBtn.className = 'file-card__btn';
    upBtn.setAttribute('aria-label', t('file.moveUp') || 'Move up');
    upBtn.title = t('file.moveUp') || 'Move up';
    upBtn.disabled = index === 0;
    upBtn.innerHTML = '↑';
    upBtn.addEventListener('click', () => moveUp(entry.id));
    actions.appendChild(upBtn);

    // Move down button
    const downBtn = document.createElement('button');
    downBtn.className = 'file-card__btn';
    downBtn.setAttribute('aria-label', t('file.moveDown') || 'Move down');
    downBtn.title = t('file.moveDown') || 'Move down';
    downBtn.disabled = index === state.files.length - 1;
    downBtn.innerHTML = '↓';
    downBtn.addEventListener('click', () => moveDown(entry.id));
    actions.appendChild(downBtn);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'file-card__btn file-card__btn--remove';
    removeBtn.setAttribute('aria-label', t('file.remove') || 'Remove file');
    removeBtn.title = t('file.remove') || 'Remove file';
    removeBtn.innerHTML = '✕';
    removeBtn.addEventListener('click', () => removeFile(entry.id));
    actions.appendChild(removeBtn);

    // Assemble card
    card.appendChild(order);
    card.appendChild(thumb);
    card.appendChild(info);
    card.appendChild(actions);

    // Drag & drop reordering
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(entry.id));
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      // Clean up any lingering drag-over classes
      fileList.querySelectorAll('.file-card.drag-over').forEach((c) =>
        c.classList.remove('drag-over')
      );
    });

    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      card.classList.add('drag-over');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-over');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const draggedId = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const targetId = entry.id;
      if (draggedId !== targetId) {
        reorderFiles(draggedId, targetId);
      }
    });

    fileList.appendChild(card);
  });

  updateTotals();
}

/**
 * Reorder files: move dragged file before or after target.
 */
function reorderFiles(draggedId, targetId) {
  const draggedIndex = state.files.findIndex((f) => f.id === draggedId);
  const targetIndex = state.files.findIndex((f) => f.id === targetId);
  if (draggedIndex === -1 || targetIndex === -1) return;

  const [moved] = state.files.splice(draggedIndex, 1);
  state.files.splice(targetIndex, 0, moved);

  renderFileList();
}

/**
 * Move a file up by one position.
 */
function moveUp(id) {
  const index = state.files.findIndex((f) => f.id === id);
  if (index <= 0) return;
  [state.files[index - 1], state.files[index]] = [state.files[index], state.files[index - 1]];
  renderFileList();
}

/**
 * Move a file down by one position.
 */
function moveDown(id) {
  const index = state.files.findIndex((f) => f.id === id);
  if (index === -1 || index >= state.files.length - 1) return;
  [state.files[index + 1], state.files[index]] = [state.files[index], state.files[index + 1]];
  renderFileList();
}

/**
 * Remove a file from state and re-render.
 */
function removeFile(id) {
  state.files = state.files.filter((f) => f.id !== id);
  renderFileList();

  if (state.files.length === 0) {
    hideWorkspace();
  }
}

/**
 * Update total pages and file count displays.
 */
function updateTotals() {
  const totalPages = state.files.reduce((sum, f) => sum + (f.pageCount || 0), 0);
  if (totalPagesCount) totalPagesCount.textContent = String(totalPages);
  if (fileCountDisplay) fileCountDisplay.textContent = String(state.files.length);
}

// ===== Merge =====

/**
 * Merge all PDFs in state.files into a single PDF using pdf-lib.
 */
async function mergePDFs() {
  if (state.isProcessing) return;
  if (state.files.length === 0) {
    showError(t('alerts.noFiles'));
    return;
  }

  state.isProcessing = true;
  showProgress(t('progress.merging'), 0);

  try {
    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < state.files.length; i++) {
      const entry = state.files[i];
      const arrayBuffer = await entry.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));

      // Update progress
      const pct = Math.round(((i + 1) / state.files.length) * 80);
      showProgress(t('progress.merging'), pct);
    }

    // Generate the merged PDF bytes
    showProgress(t('progress.generating'), 90);
    const pdfBytes = await mergedPdf.save();

    showProgress(t('progress.generating'), 100);

    // Download
    downloadMergedPdf(pdfBytes);

    // Announce success
    announce(t('alerts.success'));
    showSuccess(t('alerts.success'));
  } catch (err) {
    console.error('Merge error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    showError(t('alerts.mergeError', { msg }));
    announce(t('alerts.mergeError', { msg }));
  } finally {
    state.isProcessing = false;
    setTimeout(() => hideProgress(), 1500);
  }
}

/**
 * Trigger browser download of the merged PDF.
 * @param {Uint8Array} bytes - PDF file bytes
 */
function downloadMergedPdf(bytes) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const filename = t('merge.resultName', { timestamp }) + '.pdf';

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ===== Reset =====

/**
 * Clear all files and return to initial state.
 */
function resetAll() {
  state.files = [];
  state.isProcessing = false;
  state.nextId = 1;
  renderFileList();
  hideWorkspace();
  hideProgress();
  // Clear any error/success banners
  const banners = document.querySelectorAll('.error-banner.active, .success-banner.active');
  banners.forEach((b) => b.classList.remove('active'));
}

// ===== UI Helpers =====

function showWorkspace() {
  if (workspace) workspace.hidden = false;
}

function hideWorkspace() {
  if (workspace) workspace.hidden = true;
}

function showProgress(label, pct) {
  if (progressContainer) {
    progressContainer.hidden = false;
    progressContainer.classList.add('active');
  }
  if (progressLabel) progressLabel.textContent = label;
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (progressContainer) {
    progressContainer.setAttribute('aria-valuenow', String(pct));
  }
}

function hideProgress() {
  if (progressContainer) {
    progressContainer.hidden = true;
    progressContainer.classList.remove('active');
  }
  if (progressFill) progressFill.style.width = '0%';
}

function showSuccess(msg) {
  let banner = document.querySelector('.success-banner');
  if (!banner) return;
  banner.textContent = msg;
  banner.classList.add('active');
  setTimeout(() => banner.classList.remove('active'), 4000);
}

function showError(msg) {
  let banner = document.querySelector('.error-banner');
  if (!banner) return;
  banner.textContent = msg;
  banner.classList.add('active');
  announce(msg);
  setTimeout(() => banner.classList.remove('active'), 5000);
}

/**
 * Announce a message to screen readers.
 * @param {string} msg
 */
function announce(msg) {
  if (srLive) {
    srLive.textContent = '';
    // Force re-announcement by clearing then setting
    requestAnimationFrame(() => {
      if (srLive) srLive.textContent = msg;
    });
  }
}

// ===== Boot =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
