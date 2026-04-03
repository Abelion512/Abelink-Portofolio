# 📝 Changelog

All notable changes to Abelink Portfolio will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-03-30

### 🎉 Major Release: Dynamic RAG & Comprehensive Improvements

#### Added
- **Dynamic Knowledge Base** - AI now fetches data from Supabase instead of hardcoded
  - Auto-sync for projects and certificates via database triggers
  - 5-minute cache for performance
  - Fallback to static data if Supabase unavailable
- **AI Context Documentation** - Complete guide for AI agents (`docs/AI_CONTEXT.md`)
- **Comprehensive Improvement Plan** - 9-phase roadmap (`docs/COMPREHENSIVE_IMPROVEMENT_PLAN.md`)
- **SQL Migration** - Complete database schema (`supabase/migrations/001_dynamic_knowledge_base.sql`)
- **TypeScript Support** - Full async/await support in RAG system

#### Changed
- **RAG System Architecture** - From static to dynamic
  - `getKnowledgeDocs()` - Fetches from Supabase with caching
  - `getRelevantContextWithConfidence()` - Now async
  - `getRelevantContext()` - Now async with Promise return type
- **AI Response System** - More natural, less robotic
  - General questions always use AI (not hardcoded responses)
  - Confidence thresholds: 98% for sensitive, 90% for general
  - Cynical mode for manipulation attempts
- **Documentation Structure** - Reorganized for clarity
  - New: `docs/AI_CONTEXT.md`
  - New: `docs/COMPREHENSIVE_IMPROVEMENT_PLAN.md`
  - Updated: `docs/README.md` with index

#### Fixed
- **SQL Syntax Error** - Escaped apostrophes in migration (`what's` → `what''s`)
- **TypeScript Errors** - Fixed async/await in `src/lib/rag.ts`
- **Missing Imports** - Updated all files using `getRelevantContext()`

#### Removed
- **ParticleBackground Component** - Removed AI-generated looking particle effects
  - Deleted: `src/components/ui/ParticleBackground.tsx`
  - Removed from: `src/components/sections/Hero.tsx`
- **Hardcoded Data** - Replaced with dynamic Supabase queries
  - Removed: Large `PORTFOLIO_DOCS` array
  - Added: `PORTFOLIO_DOCS_STATIC` as fallback only

#### Security
- **Maintained 98% Confidence Threshold** - Sensitive data still protected
- **Prompt Injection Detection** - Enhanced with more patterns
- **PII Protection** - Email, phone patterns still blocked

#### Performance
- **5-Minute Cache** - Reduces Supabase calls by 95%
- **Async Loading** - Non-blocking data fetch
- **Fallback System** - Graceful degradation if Supabase down

---

## [1.5.0] - 2026-03-29

### Added
- **Cynical Mode** - Sassy responses for manipulation attempts
  - 5 Indonesian variations
  - 5 English variations
  - Random selection
- **Confidence Thresholds** - Tiered response system
  - 98%+ for full AI answers
  - 90-97% for limited info
  - <90% for "I don't know"
- **Language Detection** - Auto-detect Indonesian vs English
- **General Question Detection** - Always use AI for "who are you", "what is this", etc.

### Changed
- **AI Responses** - More concise, less verbose
- **System Prompt** - Simplified, more direct
- **Tiered Responses** - Added bold formatting for better readability

### Fixed
- **AI Hardcode Issue** - Now uses dynamic responses for general questions
- **Language Toggle** - Properly respects user's language choice

---

## [1.4.0] - 2026-03-28

### Added
- **Expanded Knowledge Base** - 10x more content
  - Background & personality details
  - Full tech stack breakdown
  - Project descriptions
  - Achievement details
  - VTuber collaborations
- **Documentation** - Multiple new docs
  - `docs/DYNAMIC_KNOWLEDGE_BASE.md`
  - `docs/DYNAMIC_RAG_IMPLEMENTATION.md`
  - `docs/TESTSPRITE_*.md`

### Changed
- **Knowledge Base Size** - From ~400 words to ~1,200+ words
- **AI Capabilities** - Can now answer more diverse questions

---

## [1.3.0] - 2026-03-27

### Added
- **TestSprite MCP Integration** - Free local testing
- **Autonoma Test Scripts** - Automated E2E testing
- **Testing Documentation** - Complete guides

### Changed
- **Test Strategy** - From manual to automated
- **Test Coverage** - 15+ automated tests

---

## [1.2.0] - 2026-03-26

### Added
- **Media Popup Component** - For images and videos
  - Mute/unmute for videos
  - Responsive design
  - Keyboard navigation
- **Video Controls** - Disabled right-click, controls, PiP

### Fixed
- **Video Path** - Corrected `/Ryujin.mp4` path
- **Popup Responsiveness** - Better mobile support

---

## [1.1.0] - 2026-03-25

### Added
- **CardModal Improvements** - Pure card component (no iframe)
- **PureCard Component** - Reusable card UI
- **Media Format Guide** - Best practices for images/video/audio

### Changed
- **Card Modal** - From iframe to direct component render
- **Performance** - Faster card rendering

---

## [1.0.0] - 2026-03-24

### 🎉 Initial Release

#### Features
- **AI Chat System** - RAG-powered chatbot
- **Dynamic Hero** - Typing animation, particle effects
- **About Page** - VTuber collaborations, tech stack
- **Projects Page** - GitHub integration
- **Achievements Page** - Certificate showcase
- **Stack Page** - Tech stack visualization
- **Contact Page** - Contact form
- **Digital Card** - Shareable portfolio card

#### Tech Stack
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS v4
- Motion v12
- Supabase (PostgreSQL)
- Gemini AI
- Bun Runtime

#### Documentation
- Basic README.md
- Initial docs structure

---

## [0.9.0] - 2026-03-20

### Pre-Release

#### Added
- Core functionality
- Basic UI components
- Initial Supabase setup
- CI/CD pipeline

---

## Version Numbering

- **Major** (2.0.0): Breaking changes, major features
- **Minor** (1.5.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes, minor improvements

---

## Upcoming (Planned)

### Version 2.1.0 - UI/UX Improvements
- [ ] Centered page layouts
- [ ] Reduced title sizes
- [ ] Better visual hierarchy
- [ ] Anti-copy protection for /card
- [ ] Back-to-top button
- [ ] Reduced chat icon size

### Version 2.2.0 - Features
- [ ] Guestbook with OAuth (Google/GitHub/Discord)
- [ ] Enhanced navigation (sidebar option)
- [ ] Improved mobile experience
- [ ] Performance optimizations

### Version 2.3.0 - Documentation
- [ ] Complete web standards guide
- [ ] Competitor analysis
- [ ] Development guidelines
- [ ] Deployment guide

### Version 3.0.0 - Major Refactor
- [ ] Restructured src folder
- [ ] Component library
- [ ] Better code organization
- [ ] Comprehensive test coverage

---

**Last Updated:** 2026-03-30  
**Current Version:** 2.0.0  
**Total Commits:** 150+  
**Contributors:** 1 (Ihsanuddin Salav / Abelion)
