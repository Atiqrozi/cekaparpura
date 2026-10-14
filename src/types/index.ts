export type AparCondition =
  | 'good'
  | 'needs_repair'
  | 'damaged'
  | 'not_inspected'
  | 'active'
  | 'inactive'
  | 'out_of_service'
export type ChecklistAnswer = 'good' | 'bad'

export interface AparAsset {
  id: string
  code: string
  type: string
  locationId: string
  capacity: string
  locationName: string
  condition: AparCondition
  lastInspectionAt: string | null
  lastInspectorName: string | null
  nextInspectionAt: string | null
}

export interface ChecklistItem {
  id: string
  category: string
  question: string
  answer: ChecklistAnswer | null
  notes: string
}
