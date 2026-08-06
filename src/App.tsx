/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { HomeTab } from './components/HomeTab';
import { GenerateTab } from './components/GenerateTab';
import { ShowcaseTab } from './components/ShowcaseTab';
import { ExploreTab } from './components/ExploreTab';
import { ShareModal } from './components/ShareModal';
import { TabType, AgePreset, AIModelOption, TransformationResult, AITool } from './types';
import { AGE_PRESETS, AI_MODELS, INITIAL_TRANSFORMATION } from './data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [hasCustomApiKey, setHasCustomApiKey] = useState<boolean>(false);
  
  // Generator & state
  const [selectedPreset, setSelectedPreset] = useState<AgePreset>(AGE_PRESETS[3]); // Senior default
  const [selectedModel, setSelectedModel] = useState<AIModelOption>(AI_MODELS[0]);
  const [uploadedImage, setUploadedImage] = useState<string>(INITIAL_TRANSFORMATION.originalImage);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  // Current active transformation result
  const [transformation, setTransformation] = useState<TransformationResult>(INITIAL_TRANSFORMATION);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Check health endpoint for Gemini API key status
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasGeminiKey) {
          setHasCustomApiKey(true);
        }
      })
      .catch(() => {
        // Fallback silently if offline or running static
      });
  }, []);

  const handleGenerateTransformation = async () => {
    setIsGenerating(true);

    try {
      // Call backend vitality analysis API
      const response = await fetch('/api/analyze-vitality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ageLabel: selectedPreset.label,
          prompt: customPrompt,
        }),
      });

      const data = await response.json();

      // Pick transformed image according to preset
      const targetTransformedImage = selectedPreset.image;

      const newTransformation: TransformationResult = {
        originalImage: uploadedImage || INITIAL_TRANSFORMATION.originalImage,
        transformedImage: targetTransformedImage,
        preset: selectedPreset,
        model: selectedModel,
        customPrompt: customPrompt || undefined,
        timestamp: Date.now(),
        vitalityInsights: {
          estimatedAge: data.estimatedAge || `${selectedPreset.ageRange} milestone`,
          skinElasticity: data.skinElasticity || selectedPreset.description,
          vitalityScore: data.vitalityScore || selectedPreset.vitalityScore,
          wellnessRecommendations: data.wellnessRecommendations || [
            'Maintain daily active cardiovascular exercise.',
            'Stay well hydrated and prioritize antioxidant nutrition.',
            'Practice mindfulness and mobility stretches daily.'
          ],
        },
        adjustments: {
          skinSmoothing: 80,
          wrinkleDepth: selectedPreset.id === 'senior' ? 65 : 30,
          vitalityGlow: 85,
          hairDensity: 75,
        }
      };

      // Simulated network/GPU processing delay for high-tech AI feel
      setTimeout(() => {
        setTransformation(newTransformation);
        setIsGenerating(false);
        setCurrentTab('showcase');
      }, 1200);

    } catch (err) {
      console.error('Error in generation:', err);
      setIsGenerating(false);
      setCurrentTab('showcase');
    }
  };

  const handleSelectToolFromExplore = (tool: AITool) => {
    // If user picks a tool in Explore tab, map it to generator preset or model
    if (tool.id === 'colorize-photo') {
      setSelectedPreset(AGE_PRESETS[1]); // Young adult
    } else if (tool.id === 'active-vitality-predictor') {
      setSelectedPreset(AGE_PRESETS[3]); // Senior
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#e8dfee] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        hasCustomApiKey={hasCustomApiKey}
      />

      {/* Desktop Navigation Sidebar */}
      <DesktopSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Main App Content View Canvas */}
      <main className="flex-1 pt-20 pb-24 px-4 sm:px-6 md:pl-72 max-w-7xl mx-auto w-full transition-all duration-300">
        {currentTab === 'home' && (
          <HomeTab
            onSelectTab={setCurrentTab}
            onUploadClick={() => setCurrentTab('generate')}
            transformation={transformation}
          />
        )}

        {currentTab === 'generate' && (
          <GenerateTab
            selectedPreset={selectedPreset}
            onSelectPreset={setSelectedPreset}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            uploadedImage={uploadedImage}
            onImageChange={setUploadedImage}
            customPrompt={customPrompt}
            onPromptChange={setCustomPrompt}
            onGenerate={handleGenerateTransformation}
            isGenerating={isGenerating}
          />
        )}

        {currentTab === 'showcase' && (
          <ShowcaseTab
            transformation={transformation}
            onUpdateTransformation={setTransformation}
            onShare={() => setIsShareModalOpen(true)}
            onStartOver={() => setCurrentTab('generate')}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreTab
            onSelectTool={handleSelectToolFromExplore}
            onNavigateToGenerate={() => setCurrentTab('generate')}
          />
        )}
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        transformation={transformation}
      />
    </div>
  );
}
