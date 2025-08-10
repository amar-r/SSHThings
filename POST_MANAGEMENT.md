# Blog Post Management Guide

## Adding New Posts

### 1. Create a New Post

1. **Create the markdown file** in `posts/upcoming/`:
   ```bash
   touch posts/upcoming/your-post-title.md
   ```

2. **Add frontmatter and content** to the markdown file:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2025-01-15"
   excerpt: "A brief description of your post that appears in the blog list."
   tags: ["tag1", "tag2", "tag3"]
   readTime: 5
   ---

   # Your Post Title

   Your post content goes here...
   ```

### 2. Publish a Post

1. **Copy the post data** from your markdown file
2. **Add to the posts array** in `src/utils/posts.js`:
   ```javascript
   export const posts = [
     {
       slug: 'your-post-title',
       title: 'Your Post Title',
       date: '2025-01-15',
       excerpt: 'A brief description of your post that appears in the blog list.',
       content: `# Your Post Title

   Your post content goes here...`,
       tags: ['tag1', 'tag2', 'tag3'],
       readTime: 5,
       image: null
     }
   ]
   ```

3. **Move the markdown file** from `posts/upcoming/` to `posts/` (optional, for organization):
   ```bash
   mv posts/upcoming/your-post-title.md posts/
   ```

### 3. Hide/Unpublish a Post

1. **Remove the post object** from the `posts` array in `src/utils/posts.js`
2. **Move the markdown file** back to `posts/upcoming/` (optional):
   ```bash
   mv posts/your-post-title.md posts/upcoming/
   ```

## File Organization

### Current Structure
```
posts/
├── upcoming/           # Draft posts (not visible on site)
│   ├── .gitkeep
│   └── your-draft-post.md
└── (published posts)   # Live posts (visible on site)

src/
├── components/         # React components
├── pages/             # Page components
├── utils/
│   └── posts.js       # Posts configuration
└── index.css          # Styles
```

### Archive Structure (Recommended)
```
archive/
├── old-components/     # Unused React components
├── old-styles/         # Unused CSS files
├── old-posts/          # Old post versions
└── deprecated/         # Other unused files
```

## Cleanup Instructions

### 1. Archive Unused Components

Move unused components to `archive/old-components/`:
```bash
mkdir -p archive/old-components
mv src/components/UnusedComponent.jsx archive/old-components/
```

### 2. Archive Unused Styles

Move unused CSS to `archive/old-styles/`:
```bash
mkdir -p archive/old-styles
mv src/unused-styles.css archive/old-styles/
```

### 3. Archive Old Post Versions

Move old post versions to `archive/old-posts/`:
```bash
mkdir -p archive/old-posts
mv posts/old-version-post.md archive/old-posts/
```

### 4. Clean Up Dependencies

Remove unused npm packages:
```bash
npm uninstall unused-package
```

### 5. Remove Unused Files

Delete completely unused files:
```bash
rm src/unused-file.js
rm public/unused-asset.png
```

## Post Content Guidelines

### Frontmatter Format
```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description (max 160 characters)"
tags: ["tag1", "tag2", "tag3"]
readTime: 5
---
```

### Content Guidelines
- Use clear, descriptive titles
- Keep excerpts under 160 characters
- Use relevant tags (max 5-6 tags)
- Include code examples when relevant
- Use proper markdown formatting

### Image Guidelines
- Store images in `public/images/`
- Use descriptive filenames
- Optimize for web (compress if needed)
- Reference in posts as `/images/filename.jpg`

## Quick Commands

### Add New Post
```bash
# Create new post
touch posts/upcoming/new-post.md
# Edit with your preferred editor
code posts/upcoming/new-post.md
```

### Publish Post
```bash
# Move from upcoming to published
mv posts/upcoming/post-name.md posts/
# Then add to posts.js array
```

### Hide Post
```bash
# Move from published to upcoming
mv posts/post-name.md posts/upcoming/
# Then remove from posts.js array
```

### Archive Old Files
```bash
# Create archive directory
mkdir -p archive/old-components
# Move unused files
mv src/components/OldComponent.jsx archive/old-components/
```

## Maintenance Schedule

### Weekly
- Review upcoming posts
- Check for broken links
- Update post status if needed

### Monthly
- Archive unused components
- Clean up old styles
- Review and update dependencies

### Quarterly
- Review all archived files
- Delete truly unused files
- Update documentation

## Troubleshooting

### Post Not Showing
1. Check if post is in `posts` array in `posts.js`
2. Verify slug matches the URL
3. Check for syntax errors in the post object

### Post Content Not Loading
1. Verify markdown content is properly escaped
2. Check for missing closing backticks in code blocks
3. Ensure content is a valid string

### Site Not Updating
1. Restart the dev server: `npm run dev`
2. Clear browser cache
3. Check for JavaScript errors in console
