# Dynamic Knowledge Base - Auto-Update dari Supabase

## ❌ Current Problem:

**Hardcoded in `src/lib/rag.ts`:**
```typescript
PORTFOLIO_DOCS = [
  { id: "about", content: "..." },  // Manual update!
  { id: "projects", content: "..." }, // Manual update!
]
```

**Issue:**
- ❌ Harus edit code setiap ada update
- ❌ Harus redeploy setiap kali ada data baru
- ❌ Tidak real-time

---

## ✅ Solution: Supabase Realtime Database

### Step 1: Create Supabase Tables

```sql
-- Knowledge base documents
CREATE TABLE knowledge_docs (
  id SERIAL PRIMARY KEY,
  doc_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  security_level TEXT DEFAULT 'public', -- public, sensitive, private
  category TEXT, -- about, projects, achievements, etc
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects (auto-sync to knowledge base)
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Certificates (auto-sync to knowledge base)
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date_issued DATE,
  credential_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trigger: Auto-update knowledge_docs when projects change
CREATE OR REPLACE FUNCTION update_knowledge_from_projects()
RETURNS TRIGGER AS $$
BEGIN
  -- Update knowledge_docs with latest projects
  UPDATE knowledge_docs 
  SET content = (
    SELECT string_agg(
      name || ': ' || COALESCE(description, '') || E'\n',
      E'\n'
    )
    FROM projects WHERE is_active = true
  ),
  updated_at = NOW()
  WHERE doc_id = 'projects';
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger on projects table
CREATE TRIGGER projects_knowledge_sync
AFTER INSERT OR UPDATE OR DELETE ON projects
FOR EACH STATEMENT
EXECUTE FUNCTION update_knowledge_from_projects();
```

---

### Step 2: Update RAG to Fetch from Supabase

**File: `src/lib/rag.ts`**

```typescript
import { supabase } from './supabase';

// Cache for performance (5 minutes)
let cachedDocs: PortfolioDoc[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getKnowledgeDocs(): Promise<PortfolioDoc[]> {
  // Check cache first
  const now = Date.now();
  if (cachedDocs.length > 0 && (now - lastFetch) < CACHE_DURATION) {
    return cachedDocs;
  }

  // Fetch from Supabase
  const { data, error } = await supabase
    .from('knowledge_docs')
    .select('doc_id, content, security_level')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching knowledge docs:', error);
    return PORTFOLIO_DOCS_STATIC; // Fallback to static
  }

  // Convert to PortfolioDoc format
  cachedDocs = data.map(doc => ({
    id: doc.doc_id,
    content: doc.content,
    securityLevel: doc.security_level as 'public' | 'sensitive' | 'private',
  }));

  lastFetch = now;
  return cachedDocs;
}

// Static fallback (if Supabase down)
export const PORTFOLIO_DOCS_STATIC: PortfolioDoc[] = [
  // ... your current hardcoded data
];
```

---

### Step 3: Add Admin Dashboard (Optional)

**Route: `/admin/knowledge`**

```tsx
// Simple admin UI to update knowledge base
export default function AdminKnowledge() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // Fetch from Supabase
    supabase
      .from('knowledge_docs')
      .select('*')
      .then(({ data }) => setDocs(data));
  }, []);

  const updateDoc = async (id: number, content: string) => {
    await supabase
      .from('knowledge_docs')
      .update({ content, updated_at: new Date() })
      .eq('id', id);
  };

  return (
    <div>
      {docs.map(doc => (
        <textarea
          key={doc.id}
          value={doc.content}
          onChange={(e) => updateDoc(doc.id, e.target.value)}
        />
      ))}
    </div>
  );
}
```

---

### Step 4: Real-time Updates (Optional)

```typescript
// Subscribe to real-time changes
supabase
  .channel('knowledge-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'knowledge_docs',
    },
    (payload) => {
      // Clear cache when data changes
      cachedDocs = [];
      console.log('Knowledge base updated:', payload);
    }
  )
  .subscribe();
```

---

## 🎯 Workflow After Setup:

### Add New Certificate:

**Option A: Via Supabase Dashboard**
1. Open https://app.supabase.com
2. Go to Table Editor → `certificates`
3. Click "Insert Row"
4. Fill: title, issuer, date, credential_url
5. Save → **Auto-syncs to AI knowledge!**

**Option B: Via Admin Dashboard**
1. Open `/admin/knowledge`
2. Click "Add Certificate"
3. Fill form
4. Save → **Auto-syncs!**

### Add New Project:

**Option A: Supabase Dashboard**
1. Table Editor → `projects`
2. Insert: name, description, tech_stack, urls
3. Save → **Auto-syncs to AI!**

**Option B: Admin Dashboard**
1. `/admin/projects`
2. Add new project
3. Save → **Auto-syncs!**

---

## 📊 Comparison:

| Feature | Hardcoded | Supabase Dynamic |
|---------|-----------|------------------|
| **Update Speed** | Edit code + redeploy | Dashboard instant |
| **Downtime** | Yes (during deploy) | No (real-time) |
| **Non-dev Update** | ❌ No | ✅ Yes (via dashboard) |
| **Version Control** | ✅ Git history | ⚠️ Database history |
| **Complexity** | ✅ Simple | ⚠️ More complex |
| **Cost** | Free | Free (Supabase free tier) |

---

## 🚀 Implementation Priority:

### Phase 1: Basic Dynamic (Recommended)
- [ ] Create Supabase tables
- [ ] Update RAG to fetch from Supabase
- [ ] Add cache for performance
- [ ] Test with new certificate

### Phase 2: Admin Dashboard
- [ ] Create `/admin/knowledge` page
- [ ] Add authentication (optional)
- [ ] CRUD UI for documents

### Phase 3: Auto-Sync Triggers
- [ ] Add database triggers
- [ ] Real-time subscriptions
- [ ] Cache invalidation

---

## 💡 My Recommendation:

**Start with Phase 1 only!**

**Why:**
1. ✅ Simple to implement (1-2 hours)
2. ✅ No need for admin dashboard yet
3. ✅ Can update via Supabase dashboard (mobile-friendly!)
4. ✅ Real-time updates
5. ✅ Free (Supabase free tier: 500MB database, plenty!)

**Later:** Add admin dashboard if needed.

---

## 🔧 Want Me to Implement?

**I can:**
1. Create Supabase migration SQL
2. Update `src/lib/rag.ts` to fetch dynamically
3. Add cache system
4. Test with your existing data

**Just say: "Implement dynamic RAG"** and I'll do it! 🚀

---

**Last Updated:** 2026-03-30
**Status:** ⏳ Ready to implement
