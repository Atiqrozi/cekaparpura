import type { AparAsset, ChecklistItem } from '../types'

export const mockAssets: AparAsset[] = [
  { id: 'apar-001', code: 'APAR-FP-001', type: 'Dry Chemical Powder', locationId: 'floor-1', capacity: '6 kg', locationName: 'Gedung Produksi · Lantai 1', condition: 'good', lastInspectionAt: '2026-10-02', lastInspectorName: 'Pemeriksa', nextInspectionAt: '2026-11-02' },
  { id: 'apar-002', code: 'APAR-FP-002', type: 'CO₂', locationId: 'floor-2', capacity: '5 kg', locationName: 'Gedung Produksi · Lantai 2', condition: 'needs_repair', lastInspectionAt: '2026-09-28', lastInspectorName: 'Pemeriksa', nextInspectionAt: '2026-10-28' },
  { id: 'apar-003', code: 'APAR-FP-003', type: 'Dry Chemical Powder', locationId: 'floor-1', capacity: '6 kg', locationName: 'Gedung Kantor · Lantai 1', condition: 'damaged', lastInspectionAt: '2026-09-15', lastInspectorName: 'Pemeriksa', nextInspectionAt: '2026-10-15' },
  { id: 'apar-004', code: 'APAR-FP-004', type: 'Foam', locationId: 'loading-area', capacity: '9 L', locationName: 'Gudang Utama · Area Loading', condition: 'not_inspected', lastInspectionAt: null, lastInspectorName: null, nextInspectionAt: '2026-10-20' },
]

export const checklistItems: ChecklistItem[] = [
  { id: 'seal', category: 'Komponen', question: 'Segel APAR', answer: null, notes: '' },
  { id: 'hose', category: 'Komponen', question: 'Selang APAR', answer: null, notes: '' },
  { id: 'nozzle', category: 'Komponen', question: 'Nozel APAR', answer: null, notes: '' },
  { id: 'pressure_gauge', category: 'Indikator', question: 'Pressure gauge APAR', answer: null, notes: '' },
]

export const conditionLabels: Record<string, string> = {
  good: 'Baik',
  bad: 'Jelek',
  needs_repair: 'Perlu perbaikan',
  damaged: 'Rusak',
  active: 'Aktif',
  inactive: 'Tidak aktif',
  out_of_service: 'Dalam perbaikan',
  not_inspected: 'Belum diperiksa',
}

export const conditionClass: Record<string, string> = {
  good: 'status-good',
  active: 'status-good',
  inactive: 'status-neutral',
  out_of_service: 'status-danger',
  needs_repair: 'status-warning',
  damaged: 'status-danger',
  not_inspected: 'status-neutral',
}
