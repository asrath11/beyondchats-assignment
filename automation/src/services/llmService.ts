// src/services/llmService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function enhanceArticleWithLLM(
  originalContent: string,
  referenceContents: string[]
): Promise<{ enhancedContent: string; references: string[] }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are an expert content editor. Please enhance the following article to match the style and quality of the reference articles provided.
  
  Original Article:
  ${originalContent}

  Reference Articles (for style and quality reference only):
  ${referenceContents.join('\n\n---\n\n')}

  Please:
  1. Improve the formatting and structure
  2. Make the content more engaging and professional
  3. Keep the core information intact
  4. Add proper headings and subheadings
  5. End with a "References" section listing the reference articles

  Return the enhanced article in markdown format.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return {
      enhancedContent: response.text(),
      references: referenceContents,
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
