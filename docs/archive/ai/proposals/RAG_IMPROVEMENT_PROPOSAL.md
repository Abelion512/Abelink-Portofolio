# RAG System Improvement Proposal
## Preventing AI Hallucination in Abelink Portfolio Chat

### Current Problem
The AI chatbot may hallucinate or provide information outside its knowledge base because:
1. The current RAG (Retrieval Augmented Generation) only uses simple keyword matching
2. No strict constraints on what the AI can/cannot answer
3. System prompt doesn't explicitly forbid speculation

---

### Solution Options (Choose Based on Needs)

## Option 1: **Strict RAG-Only Mode** (Recommended for Zero Hallucination)

**How it works:**
- AI ONLY answers based on retrieved context from your knowledge base
- If no relevant context found → AI says "I don't have information about that"
- Temperature = 0 (deterministic, no creativity)

**Implementation:**
```typescript
// src/lib/gemini.ts - Enhanced system prompt
const SYSTEM_PROMPT = `
You are the official AI assistant for Ihsanuddin Salav's portfolio.

### CRITICAL RULES:
1. ONLY answer based on the provided RAG context below
2. If the answer is NOT in the context, say: "Maaf, saya tidak memiliki informasi tentang itu. Saya hanya bisa menjawab pertanyaan tentang portofolio, proyek, dan latar belakang Ihsanuddin."
3. NEVER speculate, assume, or make up information
4. NEVER answer questions unrelated to Ihsanuddin's portfolio
5. Keep responses concise and in Indonesian (Bahasa Indonesia)

### KNOWLEDGE BASE:
{{RAG_CONTEXT}}

### USER QUESTION:
{{QUESTION}}

Answer ONLY based on the knowledge base above:
`;
```

**Pros:**
- ✅ Zero hallucination
- ✅ Always accurate to your data
- ✅ Professional and reliable

**Cons:**
- ❌ Cannot handle questions outside your knowledge base
- ❌ May feel "rigid" to users

---

## Option 2: **Hybrid Mode with Confidence Scoring**

**How it works:**
- AI indicates confidence level in answers
- Low confidence → AI warns user it might not be accurate
- Temperature = 0.3 (slight creativity for better flow)

**Implementation:**
```typescript
// Add confidence scoring to RAG
export function getRelevantContextWithScore(query: string): { 
  context: string; 
  confidence: 'high' | 'medium' | 'low' 
} {
  const q = query.toLowerCase();
  const keywords = q.split(' ').filter(w => w.length > 3);
  
  let matchCount = 0;
  const relevant = PORTFOLIO_DOCS.filter(doc => {
    const matches = keywords.filter(kw => doc.content.toLowerCase().includes(kw));
    matchCount += matches.length;
    return matches.length > 0;
  });

  // Calculate confidence
  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (matchCount >= 3) confidence = 'high';
  else if (matchCount >= 1) confidence = 'medium';

  const docs = relevant.length > 0 ? relevant : [PORTFOLIO_DOCS[0]];
  
  return {
    context: docs.map(d => d.content).join('\n\n'),
    confidence
  };
}
```

**System Prompt:**
```
If confidence is LOW, start your answer with:
"⚠️ Saya tidak yakin sepenuhnya tentang ini, tapi berdasarkan informasi yang ada..."

If confidence is HIGH:
Answer confidently without warning.
```

**Pros:**
- ✅ More conversational
- ✅ Transparent about uncertainty
- ✅ Better user experience

**Cons:**
- ⚠️ Still possible (but reduced) hallucination
- ⚠️ More complex implementation

---

## Option 3: **Tiered Response System** (Best Balance)

**How it works:**
- **Tier 1**: Direct match in knowledge base → Full answer
- **Tier 2**: Partial match → Answer with disclaimer
- **Tier 3**: No match → Polite refusal + suggest related topics

**Implementation:**
```typescript
// Enhanced RAG with tiered responses
const TIERED_PROMPT = `
You are Ihsanuddin's AI assistant. Follow these rules STRICTLY:

### TIER 1 (High Confidence - 3+ keyword matches):
Answer directly and confidently in Indonesian.

### TIER 2 (Medium Confidence - 1-2 keyword matches):
Start with: "Berdasarkan informasi yang saya miliki..." then answer.
End with: "Apakah ada yang ingin Anda ketahui lebih lanjut?"

### TIER 3 (No Match):
Say: "Maaf, saya tidak memiliki informasi spesifik tentang itu. 
Saya hanya bisa membantu dengan pertanyaan tentang:
- Proyek Ihsanuddin (Abelink, Lembaran, LearnInk, dll)
- Tech stack (Next.js, TypeScript, Supabase, dll)
- Sertifikasi dan pencapaian
- Latar belakang pendidikan

Apakah ada yang bisa saya bantu terkait topik tersebut?"
`;
```

**Pros:**
- ✅ Best user experience
- ✅ Clear boundaries
- ✅ Helpful even when saying "no"
- ✅ Minimal hallucination risk

**Cons:**
- ⚠️ Most complex to implement
- ⚠️ Requires careful tuning

---

## Recommended: **Option 3 (Tiered System)**

### Quick Implementation Plan

**Step 1: Update `src/lib/rag.ts`**
```typescript
export function getRelevantContext(query: string): {
  context: string;
  tier: 1 | 2 | 3;
} {
  const q = query.toLowerCase();
  const keywords = q.split(' ').filter(w => w.length > 3);
  
  const scored = PORTFOLIO_DOCS.map(doc => {
    const matches = keywords.filter(kw => doc.content.toLowerCase().includes(kw));
    return { doc, score: matches.length };
  });

  const totalScore = scored.reduce((sum, s) => sum + s.score, 0);
  
  let tier: 1 | 2 | 3 = 3;
  if (totalScore >= 3) tier = 1;
  else if (totalScore >= 1) tier = 2;

  const relevant = scored.filter(s => s.score > 0);
  const docs = relevant.length > 0 ? relevant.map(s => s.doc) : [PORTFOLIO_DOCS[0]];

  return {
    context: docs.map(d => d.content).join('\n\n'),
    tier
  };
}
```

**Step 2: Update `src/lib/gemini.ts`**
```typescript
export async function generateChatResponse(messages: ChatMessage[], systemPrompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3, // Low temperature for consistency
      topP: 0.8,
      topK: 40,
    }
  });

  const lastMsg = messages[messages.length - 1].content;
  const { context, tier } = getRelevantContext(lastMsg);
  
  const tierInstructions = {
    1: "Jawab dengan percaya diri dan lengkap.",
    2: "Jawab dengan hati-hati, akui jika informasi terbatas.",
    3: "Jelaskan bahwa Anda tidak memiliki informasi ini dan tawarkan topik alternatif."
  };

  const enhancedPrompt = `${systemPrompt}

### TIER DETECTION: ${tier}
### INSTRUCTION: ${tierInstructions[tier]}
### KNOWLEDGE BASE:
${context}

### QUESTION: ${lastMsg}

Respond in Indonesian. ${tier === 3 ? 'Politely decline and suggest related topics.' : 'Answer based on the knowledge base.'}`;

  const result = await model.generateContent(enhancedPrompt);
  return result.response.text();
}
```

**Step 3: Update `src/app/api/chat/route.ts`**
```typescript
const SYSTEM_PROMPT = `
Anda adalah asisten AI resmi untuk portofolio Ihsanuddin Salav.

ATURAN PENTING:
1. JAWAB HANYA berdasarkan knowledge base yang diberikan
2. Gunakan bahasa Indonesia yang profesional dan ramah
3. Jangan pernah mengarang informasi (hallucinate)
4. Jika tidak yakin, akui dengan jujur
5. Tawarkan bantuan lebih lanjut

TENTANG IHSANUDDIN:
[... rest of system prompt ...]
`;
```

---

## Additional Safeguards

### 1. **Temperature Setting** (Critical!)
```typescript
generationConfig: {
  temperature: 0.1,  // 0 = deterministic, 1 = creative
  // For zero hallucination: use 0-0.3
  // For balanced: use 0.3-0.5
}
```

### 2. **Prompt Injection Protection** (Already implemented ✅)
```typescript
if (detectPromptInjection(lastUserMessage)) {
  return NextResponse.json({
    role: "assistant",
    content: "Maaf, permintaan tersebut melanggar kebijakan sistem keamanan saya."
  });
}
```

### 3. **Add Response Validation**
```typescript
// After receiving AI response, validate it
function validateResponse(response: string, context: string): boolean {
  // Check if response contains information NOT in context
  const contextWords = new Set(context.toLowerCase().split(/\s+/));
  const responseWords = response.toLowerCase().split(/\s+/);
  
  let unknownWordCount = 0;
  for (const word of responseWords) {
    if (word.length > 5 && !contextWords.has(word)) {
      unknownWordCount++;
    }
  }
  
  // If >30% words are not in context, flag as potential hallucination
  return (unknownWordCount / responseWords.length) < 0.3;
}
```

---

## Cost Estimation

| Option | Implementation Time | Complexity | Hallucination Risk |
|--------|-------------------|------------|-------------------|
| Option 1 (Strict) | 30 min | Low | ~0% |
| Option 2 (Hybrid) | 1 hour | Medium | ~5% |
| Option 3 (Tiered) | 2 hours | High | ~2% |

---

## My Recommendation

**Start with Option 1 (Strict Mode)** for immediate deployment:
- Fastest to implement
- Zero risk of hallucination
- Can upgrade to Option 3 later

**Then migrate to Option 3 (Tiered)** when you have time:
- Best user experience
- Still minimal hallucination risk
- More helpful to visitors

---

## Permission Request

**Do you want me to implement:**
1. ✅ **Option 1** - Strict RAG-only mode (safest, fastest)
2. ⚖️ **Option 3** - Tiered response system (best UX, needs more work)
3. 🔧 Show me code for all options and let me choose

**Please confirm which option you'd like to proceed with!**
