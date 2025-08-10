# Quick Reference - Blog Post Management

## 🚀 Common Tasks

### Add New Post
```bash
# 1. Create post in upcoming folder
touch posts/upcoming/my-new-post.md

# 2. Add content with frontmatter
---
title: "My New Post"
date: "2025-01-15"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
readTime: 5
---

# My New Post
Content here...

# 3. Add to posts.js when ready to publish
```

### Publish Post
```bash
# 1. Add post object to src/utils/posts.js
{
  slug: 'my-new-post',
  title: 'My New Post',
  date: '2025-01-15',
  excerpt: 'Brief description',
  content: `# My New Post\nContent here...`,
  tags: ['tag1', 'tag2'],
  readTime: 5,
  image: null
}

# 2. Move file (optional)
mv posts/upcoming/my-new-post.md posts/
```

### Hide Post
```bash
# 1. Remove from posts array in src/utils/posts.js
# 2. Move file back (optional)
mv posts/my-new-post.md posts/upcoming/
```

### Archive Files
```bash
# Run cleanup script
./cleanup.sh

# Or manually archive
mkdir -p archive/old-components
mv src/components/UnusedComponent.jsx archive/old-components/
```

## 📁 File Structure
```
posts/
├── upcoming/           # Draft posts (hidden)
│   └── draft-post.md
└── published-post.md   # Live posts (visible)

archive/
├── old-components/     # Unused React components
├── old-styles/         # Unused CSS
├── old-posts/          # Old post versions
└── deprecated/         # Other unused files
```

## 🔧 Troubleshooting

### Post Not Showing
- ✅ Check posts array in `src/utils/posts.js`
- ✅ Verify slug matches URL
- ✅ Check for syntax errors

### Site Not Updating
- ✅ Restart dev server: `npm run dev`
- ✅ Clear browser cache
- ✅ Check console for errors

### Content Not Loading
- ✅ Verify markdown is properly escaped
- ✅ Check for missing backticks in code blocks
- ✅ Ensure content is valid string

## 📝 Frontmatter Template
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description (max 160 chars)"
tags: ["tag1", "tag2", "tag3"]
readTime: 5
---
```

## 🎯 Quick Commands
```bash
# Create new post
touch posts/upcoming/new-post.md

# Publish post
mv posts/upcoming/post.md posts/

# Hide post
mv posts/post.md posts/upcoming/

# Run cleanup
./cleanup.sh

# Restart dev server
npm run dev
```
