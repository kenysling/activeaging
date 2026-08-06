export type TabType = 'home' | 'generate' | 'showcase' | 'explore';

export interface AgePreset {
  id: string;
  label: string;
  ageRange: string;
  image: string;
  description: string;
  vitalityScore: number;
}

export interface AIModelOption {
  id: string;
  name: string;
  badge: string;
  speed: string;
  quality: string;
}

export interface TransformationResult {
  originalImage: string;
  transformedImage: string;
  preset: AgePreset;
  model: AIModelOption;
  customPrompt?: string;
  timestamp: number;
  vitalityInsights?: {
    estimatedAge: string;
    skinElasticity: string;
    vitalityScore: number;
    wellnessRecommendations: string[];
  };
  adjustments?: {
    skinSmoothing: number;
    wrinkleDepth: number;
    vitalityGlow: number;
    hairDensity: number;
  };
}

export interface AITool {
  id: string;
  title: string;
  description: string;
  category: 'Popular' | 'Enhance' | 'Creative' | 'Active Wellness';
  badge: string;
  badgeColor: string; // CSS color or tailwind class
  image: string;
  icon: string;
  popular?: boolean;
}
