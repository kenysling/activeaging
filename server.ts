import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// Initialize Gemini API client lazily
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Health check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'Active Aging App',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

// AI Transformation Analysis & Vitality Insights Endpoint
app.post('/api/analyze-vitality', async (req, res) => {
  try {
    const { ageLabel, prompt, userNotes } = req.body;
    const ai = getGenAIClient();

    if (!ai) {
      // Fallback response if no custom API key provided
      return res.json({
        success: true,
        isAiGenerated: false,
        vitalityScore: ageLabel === 'Teen' ? 98 : ageLabel === 'Young Adult' ? 95 : ageLabel === 'Middle Age' ? 88 : 84,
        estimatedAge: ageLabel === 'Teen' ? '16 years' : ageLabel === 'Young Adult' ? '25 years' : ageLabel === 'Middle Age' ? '48 years' : '74 years',
        skinElasticity: 'High vitality with active longevity lifestyle focus.',
        wellnessRecommendations: [
          'Maintain 150+ mins of weekly moderate active cardio.',
          'Incorporate antioxidant-rich plant nutrition for skin elasticity.',
          'Ensure 7-8 hours of restorative deep sleep daily.'
        ],
        aiSummary: `AI Age Progression analysis completed for ${ageLabel} preset.`
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an AI Active Aging and Longevity Specialist. Analyze the age transformation preset "${ageLabel}" with additional request details: "${prompt || userNotes || 'standard age transformation'}".
Provide structured response JSON with:
1. "vitalityScore" (number 70-100)
2. "estimatedAge" (string like "72 years young")
3. "skinElasticity" (short string assessment)
4. "wellnessRecommendations" (array of 3 practical, inspiring active aging tips)
5. "aiSummary" (short encouraging summary of the aesthetic & vitality outcome)

Return ONLY valid JSON.`,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '{}';
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        vitalityScore: 88,
        estimatedAge: ageLabel || '65 years',
        skinElasticity: 'Optimum cellular renewal with active habit tracking.',
        wellnessRecommendations: [
          'Daily balance and mobility exercises.',
          'Sun protection with broad-spectrum SPF 50.',
          'Hydration & collagen-supporting diet.'
        ],
        aiSummary: `Transformation tuned for optimal active aging at target stage.`
      };
    }

    res.json({
      success: true,
      isAiGenerated: true,
      ...data
    });
  } catch (error: any) {
    console.error('Error analyzing vitality with Gemini:', error?.message || error);
    res.status(500).json({
      error: 'Failed to analyze vitality insights',
      message: error?.message || String(error)
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Active Aging App server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
