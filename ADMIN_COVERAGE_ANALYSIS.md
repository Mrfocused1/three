# Admin Panel Coverage Analysis

## Executive Summary

The admin panel currently provides excellent coverage for **portfolio content** (images, team members, work pages), but lacks control over **site-wide settings**, **contact information**, and **form content**.

---

## ✅ What IS Editable (Well Covered)

### Homepage Content
- Hero image and tagline
- Hero cards (titles and images)
- Team member profiles (6 members)
- Two featured cards (Harry, JJ)
- YouTube video embed
- Social media URLs (hero section)

### Work Pages
- Page titles and subtitles (4 pages)
- Portfolio items (unlimited, with CRUD operations)
- Images and descriptions

### Gallery
- Explore Work section title/subtitle
- 9 gallery images

### Navigation
- Menu item titles (7 items)
- Submenu items (4 items)

**Admin Coverage: ~60%** of user-facing content

---

## ❌ Critical Gaps - What CANNOT Be Changed

### 1. **Contact Information** 🔴 HIGH PRIORITY

All contact details are hardcoded:

| Item | Current Value | Location |
|------|---------------|----------|
| Email | `hello@thethreebuttons.co.uk` | Hero.jsx:80, Footer.jsx:89 |
| Address Line 1 | "128 City Road" | Hero.jsx:85, Footer.jsx:95 |
| Address Line 2 | "London, United Kingdom" | Hero.jsx:85, Footer.jsx:96 |
| Postal Code | "EC1V 2NX" | Hero.jsx:85, Footer.jsx:97 |
| Instagram URL | `https://instagram.com/thethreebuttons` | Footer.jsx:64 |

**Impact:** Cannot update contact info without code changes

---

### 2. **Logo Images** 🔴 HIGH PRIORITY

| Location | Current URL | File |
|----------|-------------|------|
| Header | GitHub raw URL | Header.jsx:66 |
| Footer | GitHub raw URL | Footer.jsx:47 |

**Impact:** Logo changes require code modification

---

### 3. **Form Content** 🟡 MEDIUM PRIORITY

Three contact forms exist with hardcoded content:

**Form Titles (Cannot Edit):**
- "Work With Us"
- "Get In Touch"
- "Book Our Studio"

**Form Descriptions (Cannot Edit):**
- 3 different descriptions (one per form type)
- Field labels (Name, Email, Phone, Message, etc.)
- Dropdown options (project types, duration, etc.)

**Files Affected:**
- `FormModal.jsx` - Main form content
- `ContactForm.jsx` - Duplicate form content

**Impact:** Form customization requires developer

---

### 4. **Call-to-Action Text** 🟡 MEDIUM PRIORITY

Footer CTA is hardcoded:
- "Got a Project in mind?"
- "Let's Talk."

**Location:** `Footer.jsx:51, 53`

**Impact:** Cannot A/B test or customize CTA messaging

---

### 5. **Work Category Buttons** 🟡 MEDIUM PRIORITY

The 4 buttons in "Explore Our Work" section are hardcoded:

```javascript
// ExpandOnHover.jsx lines 6-22
const workCategories = [
  { title: "Production", path: "/work/production" },
  { title: "Taking Headshots", path: "/work/headshots" },
  { title: "Content Creation", path: "/work/content-creation" },
  { title: "Events", path: "/work/events" }
]
```

**Impact:** Cannot change button text or paths without code

---

### 6. **Page Messages** 🟢 LOW PRIORITY

Static text on various pages:

| Message | Location | Files |
|---------|----------|-------|
| "← Back to Home" | Work pages | All 4 work page files |
| "Loading portfolio..." | Work pages | All 4 work page files |
| "No portfolio items yet..." | Work pages | All 4 work page files |
| "Photography" (title) | Photography page | PhotographyPage.jsx:43 |

**Impact:** Minor - mostly fallback messages

---

### 7. **🚨 SECURITY ISSUE** 🔴 CRITICAL

**Exposed API Key:**

```javascript
// PhotographyPage.jsx:14
const PEXELS_API_KEY = '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp'
```

**Impact:** API key is visible in client-side code!

**Required Action:** Move to environment variable immediately

---

## 📊 Coverage Statistics

| Category | Editable | Not Editable | Coverage |
|----------|----------|--------------|----------|
| Portfolio Content | ✅ 100% | - | Excellent |
| Team/Members | ✅ 100% | - | Excellent |
| Menu Items | ✅ 100% | - | Excellent |
| Contact Info | - | ❌ 100% | None |
| Logos | - | ❌ 100% | None |
| Forms | ✅ 10% | ❌ 90% | Poor |
| CTA Text | - | ❌ 100% | None |
| Page Routes | - | ❌ 100% | None |
| Styling | - | ❌ 100% | None |

**Overall Coverage: ~60%** of content, ~85%+ of frequently-changed content

---

## 🎯 Recommended Priorities

### Phase 1: Essential (Do Now)
1. ✅ **Fix Security Issue** - Move Pexels API key to .env
2. 🔧 **Add Site Settings Tab** with:
   - Email address
   - Physical address (3 fields)
   - Instagram URL
   - Header logo
   - Footer logo

### Phase 2: Important (Do Soon)
3. 🔧 **Add CTA Text Editor** for footer
4. 🔧 **Add Form Content Editor** for:
   - Form titles
   - Form descriptions
   - Field labels

### Phase 3: Nice-to-Have (Future)
5. 🔧 **Add Work Categories Manager** to edit button titles/paths
6. 🔧 **Add Page Messages** to edit back links, loading text, etc.

---

## 💡 Quick Wins

The following could be added to admin with minimal effort:

1. **Contact Info Section** (~30 min)
   - 4 text inputs (email, address lines, postal code)
   - 1 URL input (Instagram)

2. **Logo Manager** (~20 min)
   - 2 image upload fields using existing ImageUpload component

3. **CTA Text Editor** (~15 min)
   - 2 text inputs for footer CTA

**Total time investment: ~65 minutes for major improvement**

---

## 🔒 Security Recommendations

1. **Immediate:** Remove hardcoded Pexels API key
2. **Immediate:** Add to `.env` file as `VITE_PEXELS_API_KEY`
3. **Consider:** Rate limiting or server-side API proxy
4. **Consider:** Rotating API keys regularly

---

## 📝 Notes

- The admin panel is well-designed and covers most content editing needs
- The main gaps are in "settings" type content rather than "content" type content
- Most hardcoded items are one-time setup values that rarely change
- Portfolio and team management is excellent - no changes needed there
- Form management would be nice-to-have but forms rarely change
- The architecture supports easy extension of admin features

---

## Files That Need Updates for Full Coverage

1. `Hero.jsx` - Email, location hardcoded
2. `Footer.jsx` - Email, address, Instagram, CTA text, logo hardcoded
3. `Header.jsx` - Logo hardcoded
4. `FormModal.jsx` - All form content hardcoded
5. `ContactForm.jsx` - Duplicate form content
6. `ExpandOnHover.jsx` - Work category buttons hardcoded
7. `PhotographyPage.jsx` - API key exposed, title hardcoded
8. All work pages - Back link, loading messages hardcoded

---

**Last Updated:** 2025-11-29
**Analysis Depth:** Comprehensive (all files reviewed)
**Confidence Level:** High
