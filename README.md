# sshthings

A modern personal blog built with React, Vite, and Tailwind CSS. This blog serves as a platform for sharing self-hosting projects, automation experiments, and infrastructure insights.

## 🚀 Features

- **Modern Design**: Clean, responsive layout with dark/light mode support
- **Markdown Support**: Write blog posts in Markdown with syntax highlighting
- **SEO Optimized**: Built-in SEO with React Helmet and Open Graph tags
- **Fast Performance**: Built with Vite for optimal development and build performance
- **GitHub Pages Ready**: Automated deployment with GitHub Actions
- **Search & Filter**: Find posts by search term or tags
- **RSS Feed**: Subscribe to updates (coming soon)
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Markdown**: React Markdown with syntax highlighting
- **Animations**: Framer Motion
- **SEO**: React Helmet Async
- **Deployment**: GitHub Pages + GitHub Actions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sshthings.git
   cd sshthings
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Adding Blog Posts

1. **Create a new markdown file** in the `posts/` directory
2. **Add frontmatter** at the top of the file:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-15"
   excerpt: "A brief description of your post"
   tags: ["tag1", "tag2", "tag3"]
   readTime: 5
   ---
   ```
3. **Write your content** in Markdown format
4. **Commit and push** - the site will automatically rebuild and deploy

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - GitHub Actions will automatically build and deploy
2. **Enable GitHub Pages** in your repository settings
3. **Set custom domain** (optional) - configure `sshthings.com` in repository settings

## 📁 Project Structure

```
sshthings/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── posts/             # Markdown blog posts
├── public/            # Static assets
├── .github/           # GitHub Actions workflows
└── package.json       # Dependencies and scripts
```

## 🎨 Customization

### Colors & Theme
- Edit `tailwind.config.js` to customize the color scheme
- Modify `src/index.css` for additional custom styles

### Content
- Update `src/pages/About.jsx` with your personal information
- Modify `src/pages/Contact.jsx` with your contact details
- Replace placeholder images in `public/` directory

### SEO
- Update meta tags in `index.html`
- Modify Open Graph settings in individual pages

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me through the [Contact page](https://sshthings.com/contact)

---

Built with ❤️ by Amar 