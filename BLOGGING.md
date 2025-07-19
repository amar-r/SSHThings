# Blogging Guide for SSHthings

This guide explains how to create and manage blog posts for the SSHthings website.

## Quick Start

To create a new blog post, you need to:
1. Write your content in markdown format
2. Add a new post object to `src/utils/posts.js`
3. Include title, date, excerpt, content, tags, and readTime
4. Save the file

The system will automatically process your new post.

## File Structure

```
SSHThings/
└── src/
    └── utils/
        └── posts.js           # Contains all blog post data
```

## Creating a New Blog Post

### Step 1: Add a New Post Object

Add a new post object to the `posts` array in `src/utils/posts.js`:

```javascript
export const posts = [
  {
    slug: 'first-post',
    title: 'Welcome to SSHthings - My First Blog Post',
    date: '2025-07-17',
    excerpt: 'An introduction to SSHthings...',
    content: `# Your markdown content here...`,
    tags: ['welcome', 'introduction', 'self-hosting'],
    readTime: 5,
    image: null
  },
  {
    slug: 'my-docker-setup',
    title: 'Setting Up a Home Server with Docker',
    date: '2025-07-19',
    excerpt: 'A complete guide to setting up your own home server using Docker containers.',
    content: `# Setting Up a Home Server with Docker

Your markdown content here...`,
    tags: ['docker', 'self-hosting', 'tutorial'],
    readTime: 8,
    image: null
  }
]
```

### Step 2: Add Frontmatter

Every blog post must start with frontmatter (metadata between `---` markers):

```yaml
---
title: "Your Post Title"
date: "2025-07-19"
excerpt: "A brief description of your post that appears in previews"
tags: ["docker", "self-hosting", "tutorial"]
readTime: 5
---
```

#### Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ | The post title | `"Setting Up Docker on Ubuntu"` |
| `date` | ✅ | Publication date (YYYY-MM-DD) | `"2025-07-19"` |
| `excerpt` | ✅ | Brief description for previews | `"Learn how to install and configure Docker..."` |
| `tags` | ❌ | Array of tags for categorization | `["docker", "tutorial", "ubuntu"]` |
| `readTime` | ❌ | Estimated reading time in minutes | `5` |
| `image` | ❌ | Featured image URL | `"/images/docker-setup.jpg"` |

### Step 3: Write Your Content

Write your blog post content in markdown format after the frontmatter:

```markdown
# Your Post Title

Your introduction paragraph goes here.

## Section 1

Content for your first section.

### Subsection

More detailed content.

## Section 2

Another section with content.

- Bullet point 1
- Bullet point 2
- Bullet point 3

## Code Examples

```bash
# Example command
docker run -d nginx
```

```javascript
// Example JavaScript code
const container = await docker.createContainer({
  Image: 'nginx:latest'
});
```

## Conclusion

Wrap up your post here.
```

## Complete Example

Here's a complete example of a blog post:

```markdown
---
title: "Setting Up a Home Server with Docker"
date: "2025-07-19"
excerpt: "A complete guide to setting up your own home server using Docker containers for self-hosting applications."
tags: ["docker", "self-hosting", "home-server", "tutorial"]
readTime: 8
---

# Setting Up a Home Server with Docker

In this guide, I'll walk you through setting up a home server using Docker containers. This approach makes it easy to deploy and manage multiple applications on a single machine.

## Prerequisites

Before we begin, you'll need:
- A computer or server running Ubuntu 20.04+
- Basic command line knowledge
- A router with port forwarding capabilities

## Installing Docker

First, let's install Docker on your Ubuntu system:

```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose

# Start and enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group
sudo usermod -aG docker $USER
```

## Creating Your First Container

Let's start with a simple nginx container:

```bash
# Pull the nginx image
docker pull nginx:latest

# Run nginx container
docker run -d \
  --name my-nginx \
  -p 80:80 \
  nginx:latest
```

## Managing Containers

Here are some useful Docker commands:

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop my-nginx

# Start a container
docker start my-nginx

# Remove a container
docker rm my-nginx
```

## Using Docker Compose

For more complex setups, use Docker Compose:

```yaml
# docker-compose.yml
version: '3.8'
services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    restart: unless-stopped
  
  wordpress:
    image: wordpress:latest
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: password
    depends_on:
      - db
    restart: unless-stopped
  
  db:
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db_data:
```

## Security Considerations

When running a home server, consider these security measures:

1. **Firewall Configuration**: Only open necessary ports
2. **Regular Updates**: Keep Docker and images updated
3. **Network Isolation**: Use Docker networks for container communication
4. **Backup Strategy**: Regularly backup your data volumes

## Conclusion

Setting up a home server with Docker is a great way to learn about containerization while creating a useful self-hosted environment. Start simple and gradually add more complex applications as you become comfortable with the setup.

Happy self-hosting! 🚀
```

## Best Practices

### File Naming
- Use lowercase letters, numbers, and hyphens only
- Make it descriptive but concise
- Avoid spaces and special characters

**Good:** `docker-home-server-setup.md`
**Bad:** `Docker Home Server Setup!.md`

### Content Structure
- Start with a clear introduction
- Use headings to organize content (H1, H2, H3)
- Include code examples when relevant
- End with a conclusion or next steps
- Keep paragraphs short and readable

### Images and Media
- Store images in `/public/images/`
- Use descriptive alt text
- Optimize images for web (compress, resize)
- Reference images with relative paths: `![Alt text](/images/filename.jpg)`

### Tags
- Use consistent, descriptive tags
- Don't over-tag (3-5 tags per post is usually sufficient)
- Consider creating a tag taxonomy for consistency

## Testing Your Post

### Local Development
1. Start the development server: `npm run dev`
2. Visit `http://localhost:5173/blog`
3. Check that your post appears in the list
4. Click on your post to verify it renders correctly
5. Test the URL: `http://localhost:5173/blog/your-post-slug`

### Common Issues
- **Post not appearing**: Check that the markdown file is in `/posts/`
- **Frontmatter errors**: Ensure YAML syntax is correct
- **Images not loading**: Verify image paths are correct
- **Code not formatting**: Use proper markdown code blocks

## Publishing

1. **Save your markdown file** in `/posts/`
2. **Test locally** using `npm run dev`
3. **Commit your changes**:
   ```bash
   git add posts/your-new-post.md
   git commit -m "Add new blog post: Your Post Title"
   git push
   ```
4. **GitHub Actions** automatically builds and deploys to https://sshthings.com

## Maintenance

### Updating Posts
- Edit the markdown file directly
- Update the `date` field if it's a significant revision
- Consider adding a "Last updated" note in the content

### Deleting Posts
- Remove the markdown file from `/posts/`
- The post will automatically disappear from the site
- Consider redirecting old URLs if needed

### Archive Management
- Keep all markdown files in version control
- Use tags to organize content by topic
- Consider creating category pages for major topics

## Troubleshooting

### Post Not Showing Up
1. Check file is in `/posts/` directory
2. Verify frontmatter syntax is correct
3. Restart development server: `npm run dev`
4. Check browser console for errors

### Build Errors
1. Check YAML syntax in frontmatter
2. Verify all required fields are present
3. Check for special characters in filenames
4. Review GitHub Actions logs

### Image Issues
1. Verify image exists in `/public/images/`
2. Check image path in markdown
3. Ensure image format is supported (jpg, png, gif, svg)
4. Optimize image size for web

## Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Syntax](https://yaml.org/spec/1.2/spec.html)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Pages](https://pages.github.com/)

---

**Need help?** Check the GitHub repository issues or create a new one for bugs or feature requests. 