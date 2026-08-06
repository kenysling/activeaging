import { AgePreset, AIModelOption, AITool, TransformationResult } from './types';

export const AGE_PRESETS: AgePreset[] = [
  {
    id: 'teen',
    label: 'Teen',
    ageRange: '13-18 yrs',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu-tCnR1aFvl5yy3uio_MpT0H53vlhlXyOtRuURoNSOcCvPEDyXSSPDsOeY8q12qRBzjrg2Y_6HhHbJIsVeAz3VjzB9osBOMRuIqUQg3Za0fYvL6m5Gmkn80dCml5wrA4gzgft8AnvSBDVHcWphBoeK_IuwgefUjXtQA_RYIp99zjWzbwUlp_mNl3Kfyut-KIIF4WlSi57s9exQVuiUNjozdsM9XkauwxV4uwnCDKOxeYGYa0685RlWYQs',
    description: 'Fresh youth, smooth skin, full hair, vibrant energy.',
    vitalityScore: 98,
  },
  {
    id: 'young-adult',
    label: 'Young Adult',
    ageRange: '20-28 yrs',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtuRRX0D3trWGkv4JmlpzmvoCKcX66ir6nxgjBGnj_Y5Zyb9yx0_hqaCryCFgvvWCDhdNTOAyS1vSxZrcaNBqFeQtqvPwz8Jtnwe0HdcmXK2xmTK8gryBZlSvH7rdohgl3sSqaFAQ3psbWc2uoURLxXQJoJzxlkiDgi2zY9M9HrjQnqD0JxR7dprjv5eUZCQUn9qEAAzLV70ve6CV5XkIsuHn1Z0yPowiFZse89PqxFdhFv2HwCBVsvnQ',
    description: 'Peak physical form, defined features, confident look.',
    vitalityScore: 95,
  },
  {
    id: 'middle-age',
    label: 'Middle Age',
    ageRange: '42-52 yrs',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvdzpqYgDbwwn73Qpp7moX_FiF2dF9z4V0rix_yQqgTCCsij4EPVfQv2CMaMaIW0auHFakow_YZiJCNE1dOJQxIARdthFc8rFcVDU1xThrfyJYBMhT7tPzzpwQZurep-GAE5-Nek_OsSyWWx_sHmSpKBe_rInnvlg3EdhdAcOQPU-zxdjA8sB8jgL6NPMsoj5sOpoa6OVUlTCqwSK7Fr4L9gIDDjo3OuYBdWWjk8gtPIh2TIp3Z1eoWUeU',
    description: 'Distinguished maturity, subtle laughter lines, refined posture.',
    vitalityScore: 88,
  },
  {
    id: 'senior',
    label: 'Senior',
    ageRange: '68-78 yrs',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLumx5Fwq3bLyKi1IZYfcpBAlCk07i7Y98Uu2cOGgkEM6P53WnSmeuixhcfdiOPIFzZ2lG43lRMrdY0elp7YgD2IaTQ5m3GVkQFaUDlQC7Oqii7ZNcA9UnuVVJFuU0yIxttD3IQ217keP-pls1kcDdyTIld5DzWNkSix7USBys1CgQ3qq-kkyLoOLZ8s-ds3YzSJCuc8gl28baWLUXyU6bMNvRVYGAg1uhfZ9dZLeDWJvbIm8aS2k5XH-5w',
    description: 'Radiant wisdom, elegant silver hair, warm expressive eyes.',
    vitalityScore: 82,
  },
];

export const AI_MODELS: AIModelOption[] = [
  {
    id: 'aura-v2-pro',
    name: 'Aura V2 Pro (Highest Quality)',
    badge: 'Pro 4K',
    speed: '2.8s',
    quality: 'Hyper-Realistic',
  },
  {
    id: 'aura-nano',
    name: 'Aura Nano (Fastest)',
    badge: 'Ultra Fast',
    speed: '0.8s',
    quality: 'HD Balance',
  },
  {
    id: 'active-vitality-engine',
    name: 'Active Vitality Engine (Health-Focused)',
    badge: 'Longevity AI',
    speed: '1.9s',
    quality: 'Active Aging Mode',
  },
];

export const INITIAL_TRANSFORMATION: TransformationResult = {
  originalImage: 'https://lh3.googleusercontent.com/aida/AP1WRLuBGvtQcj7pURL_JjIGBp8fjFlUCgY7bOYSdqslVGOLa2hhMkcUAKC_o4GR5HbP-cWKURpAKWAMv75i00IkgcvoMm5Kh7OBdCHMf7DfTtSX-O5CokmzFhPJhFU4Zpnodpt_rezQTbT4XkHAM0gyqNRKbmlUhzbNXgtY5qYvy7E2frVWy69EJm0eT3Hm7UBbEt-toEqhZqvH6oFxMjBsJMTvbXtEE7JOWmYiRoMpR9C4mhR3kT5BWQipNw',
  transformedImage: 'https://lh3.googleusercontent.com/aida/AP1WRLtGjBzK9n7z1KR36fZxybhQWie447dmQgcAr3P5foTP61DQ687rPkw2_QdH9jjyo1YVQLiPxZHZlxJpleAMzbakjjsFaCj-xE6gzmU6fViy9oO1A52f07cAwi_YYF-3vnZWP40Y68Do-OVAEpen12v3ycMhXToPtZXuZS76puSJlWgIyfpTG8ClrDchgyAVGfGQPSA4ZXqV_vauOzS4E9ucZKZXtlCfhJQdwlFGqd_iNEX-Yf6l2H2lzw',
  preset: AGE_PRESETS[3], // Senior
  model: AI_MODELS[0],
  timestamp: Date.now(),
  vitalityInsights: {
    estimatedAge: '72 years young',
    skinElasticity: 'Optimal for active senior lifestyle',
    vitalityScore: 86,
    wellnessRecommendations: [
      'Maintain daily resistance training to preserve bone density.',
      'Incorporate antioxidant-rich foods for skin radiance.',
      'Stay hydrated with 2.5L water daily to support collagen health.'
    ]
  },
  adjustments: {
    skinSmoothing: 75,
    wrinkleDepth: 60,
    vitalityGlow: 85,
    hairDensity: 70
  }
};

export const EXPLORE_TOOLS: AITool[] = [
  {
    id: 'colorize-photo',
    title: 'Colorize Photo',
    description: 'Breathe life into old black and white memories with advanced AI colorization models.',
    category: 'Popular',
    badge: 'Popular',
    badgeColor: 'bg-[#7c3aed]/80 text-[#ede0ff] border-[#d2bbff]/20',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsXThnTge4h0zY-l2oOJeqXF8qIec1l8tU8wRNwQOFvLwue0GyQEwk1r4xY0idIdQcaRxEnYU1IKquavKV-9rC5pq8OX0ksEuK7YN6HeHCR0HiCT0xvSwgbjKiykWEphQ8peugqxU_41y_1rpudNGdLlMZe-NL2GEHdJnGTV38Wv1pCKGlzigL-N-aDAit_2_3zos_Ziz5kf8f8pIZ2P3Fi-Ik2eZViVrvbjknSF_MGOpkyymEAv1tX00Q',
    icon: 'palette',
    popular: true,
  },
  {
    id: 'denoise-image',
    title: 'Denoise Image',
    description: 'Remove grain, artifacts, and noise from low-light photos while preserving crucial details.',
    category: 'Enhance',
    badge: 'Enhance',
    badgeColor: 'bg-[#0566d9]/80 text-[#e6ecff] border-[#adc6ff]/20',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsUQkZLOLlXLpitr7-NACSDgqK8fIESP-8h8YIoEyVTR650Gl6heYyG0ydwCpde2FuB5-zk5jtTEurbO_yShj-h1HjCHZXvNmDoZugidvnKE2nNXU6xQgz4bjMqzCAS7YLLcAvWD8HUHnpCNVroScYqpQhY4Du3EC9_JFp-tVzcWR45v8e98pTx3uMU61sTB1iEb7yaX-050f12EWeKOJ6Q4ELN6_BeT0nZ6Gyx5F0XF_fa7g64o01z6Q',
    icon: 'blur_on',
  },
  {
    id: 'creative-stylize',
    title: 'Creative Stylize',
    description: 'Apply vivid, artistic color grading and pop-art styles to standard portraits and landscapes.',
    category: 'Creative',
    badge: 'Creative',
    badgeColor: 'bg-[#a15100]/80 text-[#ffe0cd] border-[#ffb784]/20',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuWeBJuQ9RU7iCCtFT32oWu811gjP6b9abBigcubfYQE0ZBjGRJY_-ulpzZtFiz1jNjxjHJl9IrQncMFwREqEYFwMmATnAqy0GMU99OJqDQQq07ikJ191BYOrKm3LRU9TgB2i14Mvl50aH7eZJ1IqDU5glTj-SLJyXrZ1px5rbyfMvxwn_h6Y4SeBqFsNa1ijmpSKkpTsY_MqUCwoNVfepm2w2CI1r-9YAxXf8v4oFu_-W8Fa3dDjHqT9E',
    icon: 'brush',
  },
  {
    id: 'active-vitality-predictor',
    title: 'Active Vitality Predictor',
    description: 'Simulate how active nutrition, physical routine, and skin care preserve a youthful glow 20 years into the future.',
    category: 'Active Wellness',
    badge: 'Longevity',
    badgeColor: 'bg-emerald-600/80 text-emerald-100 border-emerald-400/20',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLv7DH58M0s0vS1Cx8KCMNRWnHhDcGZ_46q_7_qIz2M-8tt-jeFbmV9qEtMoc0t_c6q5dyNAzc5PztTYq-ouH6DPgScfhjBH3tcKMiWiydvLcS2zO8_PavFvaWbOZA2LOm9oGFbN9F15j0wSOwjdZo5siUS1OwZ2bN3MSuc1Cp-S0-aYYiVQ0P7O6W8hKfyKwnSebW0FBPImfJPcnFXlTHndgA1s5Gs0ejXwALaLAdfVvvIPIG1XubhY0g',
    icon: 'health_and_safety',
  }
];
