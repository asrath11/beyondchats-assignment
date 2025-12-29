// src/services/llmService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as string);

export async function enhanceArticleWithLLM(
  originalContent: string,
  referenceContents: string[]
): Promise<{ enhancedContent: string; references: string[] }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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

Use these reference URLs:
${referenceContents.join('\n')}
`;

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
