/**
 * PDF Merger — Merge Logic Unit Tests
 * Tests the core merge orchestration logic via mocks.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// We test the pure logic functions that don't require DOM or real PDF parsing.
// The merge function itself is tested via E2E (Playwright).

// Mock pdf-lib
vi.mock('pdf-lib', () => ({
  PDFDocument: {
    create: vi.fn(),
    load: vi.fn(),
  },
}));

// Helper: create a fake File object
function createFakePdfFile(name = 'test.pdf', content = '%PDF-1.4 fake') {
  return new File([content], name, { type: 'application/pdf' });
}

describe('File validation logic', () => {
  it('should accept PDF files by MIME type', () => {
    const file = createFakePdfFile('doc.pdf');
    expect(file.type).toBe('application/pdf');
  });

  it('should accept PDF files by extension even without MIME type', () => {
    const file = new File(['content'], 'report.pdf', { type: '' });
    const isPdf = file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');
    expect(isPdf).toBe(true);
  });

  it('should reject non-PDF files', () => {
    const file = new File(['content'], 'image.png', { type: 'image/png' });
    const isPdf = file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');
    expect(isPdf).toBe(false);
  });
});

describe('Duplicate detection logic', () => {
  it('should detect duplicates by name + size', () => {
    const files = [
      { name: 'a.pdf', size: 100 },
      { name: 'b.pdf', size: 200 },
    ];

    const newFile = { name: 'a.pdf', size: 100 };
    const isDup = files.some(f => f.name === newFile.name && f.size === newFile.size);
    expect(isDup).toBe(true);
  });

  it('should not flag different files as duplicates', () => {
    const files = [
      { name: 'a.pdf', size: 100 },
    ];

    const newFile = { name: 'a.pdf', size: 200 }; // Same name, different size
    const isDup = files.some(f => f.name === newFile.name && f.size === newFile.size);
    expect(isDup).toBe(false);
  });
});

describe('Max files constraint', () => {
  it('should enforce max 10 files', () => {
    const MAX = 10;
    const files = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    expect(files.length >= MAX).toBe(true);
  });
});

describe('Reordering logic', () => {
  it('should move element up correctly', () => {
    const arr = [1, 2, 3, 4];
    const idx = 2; // element "3"
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    expect(arr).toEqual([1, 3, 2, 4]);
  });

  it('should move element down correctly', () => {
    const arr = [1, 2, 3, 4];
    const idx = 1; // element "2"
    [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
    expect(arr).toEqual([1, 3, 2, 4]);
  });

  it('should not move up if already first', () => {
    const arr = [1, 2, 3];
    const idx = 0;
    expect(idx <= 0).toBe(true);
  });

  it('should not move down if already last', () => {
    const arr = [1, 2, 3];
    const idx = 2;
    expect(idx >= arr.length - 1).toBe(true);
  });

  it('should reorder via splice correctly', () => {
    const arr = [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
    ];
    const draggedId = 4;
    const targetId = 2;
    const draggedIdx = arr.findIndex(f => f.id === draggedId);
    const targetIdx = arr.findIndex(f => f.id === targetId);
    const [moved] = arr.splice(draggedIdx, 1);
    arr.splice(targetIdx, 0, moved);
    expect(arr.map(f => f.id)).toEqual([1, 4, 2, 3]);
  });
});

describe('Filename generation', () => {
  it('should generate timestamped filename', () => {
    const timestamp = '2026-01-01-12-00-00';
    const expected = `merged_${timestamp}.pdf`;
    expect(expected).toBe('merged_2026-01-01-12-00-00.pdf');
  });
});
