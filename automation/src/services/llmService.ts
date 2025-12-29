// src/services/llmService.ts
import { GoogleGenAI } from '@google/genai';

let genAI: GoogleGenAI | null = null;

function initializeGenAI() {
  if (!genAI) {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set');
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export async function enhanceArticleWithLLM(
  originalContent: string,
  referenceContents: string[]
): Promise<{ enhancedContent: string; references: string[] }> {
  const genAIInstance = initializeGenAI();

  const prompt = `
You are an expert content editor. 
Your job is to improve the article below while keeping its meaning accurate.
Use the reference articles ONLY to learn the **writing style, tone, structure, and formatting**. 
Do NOT copy sentences or wording from the references.

---

## Original Article
${originalContent}

---

## Reference Articles (style & formatting only – do NOT copy)
${referenceContents.join('\n\n---\n\n')}

---

## Rewrite Rules
1. Keep the same core meaning, facts, and intent.
2. Rewrite fully in your own words (no plagiarism).
3. Improve clarity, flow, and readability.
4. Use a neutral, professional, informative tone. 
5. Use Markdown formatting with:  
   - A clear title
   - Meaningful section headings (##)
   - Short paragraphs
   - Bullet points where useful
6. Do NOT add new facts unless stated in the original.
7. If unsure, keep the original meaning.
8. Avoid filler or unnecessary wording.

---

## Output Format (VERY IMPORTANT)

Return ONLY the improved article in **Markdown** ending with:

## References
- <reference link 1>
- <reference link 2>

Use these reference URLs from the sources above.
`;

  try {
    const response = await genAIInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return {
      enhancedContent: response.text || '',
      references: referenceContents,
    };
  } catch (error: any) {
    console.error('Error calling Gemini API:', {
      message: error.message,
      status: error.status,
      details: error.errorDetails,
    });
    throw new Error(`Gemini API failed: ${error.message}`);
  }
}
