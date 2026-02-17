// Signal definitions — the 4 core color statuses for Paw Signal
// Each signal has a color, label, meaning, and guidance text

export interface Signal {
  id: string
  label: string
  hex: string
  meaning: string
  guidance: string
  textColor: string // white or dark text for contrast
}

export const signals: Signal[] = [
  {
    id: 'green',
    label: 'Friendly',
    hex: '#2E7D32',
    meaning: 'Social and generally okay with people and dogs.',
    guidance: 'Ask, then friendly greeting is fine.',
    textColor: '#ffffff',
  },
  {
    id: 'yellow',
    label: 'Caution / Quirks',
    hex: '#F9A825',
    meaning:
      'May react to big dogs, kids, fast movement, or has specific triggers.',
    guidance: 'Ask specifics. Slow intro. Avoid surprises.',
    textColor: '#1a1a2e',
  },
  {
    id: 'blue',
    label: 'Working / In Training',
    hex: '#1565C0',
    meaning: 'Service, police, military, or serious training focus.',
    guidance: 'Do not distract. No interaction.',
    textColor: '#ffffff',
  },
  {
    id: 'red',
    label: 'Do Not Approach',
    hex: '#C62828',
    meaning: 'High arousal, reactive, or unsafe with strangers/dogs.',
    guidance: 'Give space. No petting. No greetings.',
    textColor: '#ffffff',
  },
]
