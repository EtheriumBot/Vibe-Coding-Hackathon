import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid prompt' },
        { status: 400 }
      );
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = response?.text ?? '';
    return NextResponse.json({ text });
  } catch (err) {
    console.error('Gemini API error:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Failed to get response from Gemini' },
      { status: 500 }
    );
  }
}
