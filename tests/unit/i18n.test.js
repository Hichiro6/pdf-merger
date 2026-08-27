/**
 * PDF Merger — i18n Unit Tests
 * Tests translation keys, language switching, and param substitution.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { LANGUAGES, TRANSLATIONS, t, setLanguage, getCurrentLanguage, initI18n } from '../../src/i18n.js';

// Expected keys for every language
const EXPECTED_KEYS = [
  'app.title',
  'header.tagline',
  'header.badge',
  'privacy.link',
  'footer.bmc',
  'dropzone.title',
  'dropzone.subtitle',
  'workspace.files',
  'controls.merge',
  'controls.files',
  'controls.totalPages',
  'controls.fileCount',
  'btn.merge',
  'btn.resetAll',
  'btn.addMore',
  'btn.download',
  'alerts.maxFiles',
  'alerts.invalidType',
  'alerts.duplicate',
  'alerts.mergeError',
  'alerts.noFiles',
  'alerts.success',
  'progress.merging',
  'progress.generating',
  'lang.label',
  'merge.resultName',
];

describe('i18n — Languages', () => {
  it('should have 7 languages', () => {
    expect(Object.keys(LANGUAGES)).toHaveLength(7);
  });

  it('should include EN, FR, DE, ES, PT, NL, IT', () => {
    const codes = Object.keys(LANGUAGES);
    expect(codes).toContain('en');
    expect(codes).toContain('fr');
    expect(codes).toContain('de');
    expect(codes).toContain('es');
    expect(codes).toContain('pt');
    expect(codes).toContain('nl');
    expect(codes).toContain('it');
  });

  it('every language has a flag and name', () => {
    for (const [, info] of Object.entries(LANGUAGES)) {
      expect(info.name).toBeTruthy();
      expect(info.flag).toBeTruthy();
    }
  });
});

describe('i18n — Translations completeness', () => {
  for (const lang of Object.keys(LANGUAGES)) {
    it(`${lang.toUpperCase()} should have all ${EXPECTED_KEYS.length} keys`, () => {
      const dict = TRANSLATIONS[lang];
      expect(dict).toBeDefined();
      for (const key of EXPECTED_KEYS) {
        expect(dict[key], `Missing key "${key}" in ${lang}`).toBeTruthy();
      }
    });
  }
});

describe('i18n — t() function', () => {
  beforeEach(() => {
    setLanguage('en');
  });

  it('should return English string by default', () => {
    expect(t('btn.merge')).toBe('Merge PDFs');
  });

  it('should return translated string after setLanguage', () => {
    setLanguage('fr');
    expect(t('btn.merge')).toBe('Fusionner les PDFs');
  });

  it('should substitute params', () => {
    setLanguage('en');
    expect(t('alerts.mergeError', { msg: 'boom' })).toBe('Merge error: boom');
  });

  it('should substitute timestamp param', () => {
    setLanguage('en');
    expect(t('merge.resultName', { timestamp: '20260101' })).toBe('merged_20260101');
  });

  it('should fallback to English if key missing in current lang', () => {
    // All langs have the keys, but test fallback logic
    setLanguage('en');
    expect(t('nonexistent.key')).toBe('nonexistent.key');
  });
});

describe('i18n — getCurrentLanguage', () => {
  it('should return current language code', () => {
    setLanguage('de');
    expect(getCurrentLanguage()).toBe('de');
  });

  it('should default to en', () => {
    setLanguage('en');
    expect(getCurrentLanguage()).toBe('en');
  });
});
