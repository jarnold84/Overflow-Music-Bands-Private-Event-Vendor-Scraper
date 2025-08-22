// File: src/utils/gptClassifier.ts

import { OpenAI } from 'openai';
import { LeadMatch } from '../parsers/leadClassifier.js';

/**
 * Uses OpenAI to classify the leadType from page text
 */
export async function callOpenAIClassifier(text: string): Promise<LeadMatch> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('❌ Missing OpenAI API key. Set OPENAI_API_KEY as an environment variable.');
    return {
      leadType: 'Unknown',
      confidence: 0,
    };
  }

  const openai = new OpenAI({ apiKey });

  const prompt = `You're a business classifier. Based on this web page text, what type of business is this?

Only respond with one of the following lead types:
- EventVenue
- EventPlanner
- Festival
- Podcast
- RetreatCenter
- MediaHost
- Studio
- Teacher
- CreativeService

Text:
"""
${text.slice(0, 4000)}
"""

Respond in JSON format:
{
  "leadType": string,
  "confidence": number (between 0 and 1)
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 200,
    });

    const raw = response.choices?.[0]?.message?.content;
    if (!raw) throw new Error('No response content');
    const parsed = JSON.parse(raw);

    return {
      leadType: parsed.leadType ?? 'Unknown',
      confidence: parsed.confidence ?? 0.5,
    };
  } catch (err) {
    console.error('❌ GPT fallback classification failed:', err);
    return {
      leadType: 'Unknown',
      confidence: 0.4,
    };
  }
}

