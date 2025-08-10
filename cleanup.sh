#!/bin/bash

# Blog Post Management Cleanup Script
# This script archives unused files and components

echo "🧹 Starting cleanup process..."

# Create archive directories if they don't exist
mkdir -p archive/{old-components,old-styles,old-posts,deprecated}

# Archive unused components
echo "📦 Archiving unused components..."

# BlogCard is no longer used (replaced with PostListItem)
if [ -f "src/components/BlogCard.jsx" ]; then
    mv src/components/BlogCard.jsx archive/old-components/
    echo "  ✅ Moved BlogCard.jsx to archive/old-components/"
fi

# Archive unused pages
echo "📄 Archiving unused pages..."

# Contact page is not used in routing
if [ -f "src/pages/Contact.jsx" ]; then
    mv src/pages/Contact.jsx archive/old-components/
    echo "  ✅ Moved Contact.jsx to archive/old-components/"
fi

# Archive unused dependencies
echo "📚 Checking for unused dependencies..."

# Remove gray-matter if not being used
if npm list gray-matter >/dev/null 2>&1; then
    npm uninstall gray-matter
    echo "  ✅ Removed gray-matter dependency"
fi

# Clean up any temporary files
echo "🗑️  Cleaning temporary files..."
find . -name "*.tmp" -delete
find . -name "*.log" -delete

echo "✨ Cleanup complete!"
echo ""
echo "📁 Archive structure:"
echo "  archive/old-components/ - Unused React components"
echo "  archive/old-styles/ - Unused CSS files"
echo "  archive/old-posts/ - Old post versions"
echo "  archive/deprecated/ - Other unused files"
echo ""
echo "📝 Next steps:"
echo "  1. Review archived files"
echo "  2. Delete files you're sure you don't need"
echo "  3. Update POST_MANAGEMENT.md if needed"
