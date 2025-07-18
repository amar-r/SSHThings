# sshthings Blog Setup Guide

## 🎉 Congratulations! Your blog is ready.

I've successfully created a modern, feature-rich personal blog for you. Here's what you need to do to get it running:

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Your blog will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## 📝 What's Included

### ✅ Complete Blog Features
- **Modern React + Vite setup** with hot reloading
- **Tailwind CSS** for beautiful, responsive design
- **Dark/Light mode toggle** with system preference detection
- **Markdown blog posts** with syntax highlighting
- **SEO optimization** with React Helmet and Open Graph tags
- **Search and filtering** by tags and content
- **Responsive design** for mobile and desktop
- **Smooth animations** with Framer Motion
- **404 page** with helpful navigation
- **RSS feed** for subscribers

### ✅ Pages Created
- **Home** (`/`) - Landing page with hero section and features
- **Blog** (`/blog`) - Blog index with search and filtering
- **Blog Post** (`/blog/:slug`) - Individual post pages with markdown rendering
- **About** (`/about`) - Personal information and skills
- **Contact** (`/contact`) - Contact form and social links
- **404** - Custom not found page

### ✅ Components Built
- `Header` - Navigation with dark mode toggle
- `Footer` - Social links and site information
- `BlogCard` - Post preview cards
- `MarkdownRenderer` - Markdown with syntax highlighting

## 🎨 Customization

### Replace Placeholder Content
1. **Profile Image**: Replace `public/profile.jpg`
2. **Favicon**: Replace `public/favicon.ico`
3. **Resume**: Replace `public/resume.pdf`
4. **About Page**: Update `src/pages/About.jsx`
5. **Contact Info**: Update `src/pages/Contact.jsx`

### Add Your Blog Posts
1. Create new `.md` files in the `posts/` directory
2. Add frontmatter at the top:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-15"
   excerpt: "Brief description"
   tags: ["tag1", "tag2"]
   readTime: 5
   ---
   ```
3. Write your content in Markdown

### Update Site Information
- **Site Title**: Update `index.html` and page titles
- **Domain**: Update URLs in `index.html` and components
- **Social Links**: Update GitHub, LinkedIn, Twitter URLs in Footer and Contact pages

## 🌐 Deployment to GitHub Pages

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial blog setup"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as source
4. The workflow will automatically deploy on push

### 3. Custom Domain (Optional)
1. In repository settings → Pages
2. Add your custom domain: `sshthings.com`
3. Update DNS records as instructed

## 🔧 Development Workflow

### Adding New Posts
1. Create `.md` file in `posts/` directory
2. Add frontmatter metadata
3. Write content in Markdown
4. Commit and push → auto-deploy

### Local Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

## 📁 Project Structure
```
sshthings/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app
│   └── main.jsx       # Entry point
├── posts/             # Markdown blog posts
├── public/            # Static assets
├── .github/           # GitHub Actions
└── package.json       # Dependencies
```

## 🎯 Next Steps

1. **Customize Content**: Update About, Contact, and personal information
2. **Add Your Posts**: Start writing blog posts in the `posts/` directory
3. **Replace Assets**: Add your profile picture, favicon, and resume
4. **Deploy**: Push to GitHub and enable Pages
5. **Share**: Start sharing your blog with the world!

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review the code comments for implementation details
- The blog is fully functional and ready to use!

---

**Your sshthings blog is ready to go! 🚀** 