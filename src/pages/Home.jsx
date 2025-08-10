import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PostListItem from '../components/PostListItem'
import { getAllPosts } from '../utils/posts'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  
  const allPosts = getAllPosts()
  const allTags = [...new Set(allPosts.flatMap(post => post.tags || []))]
  
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  return (
    <>
      <Helmet>
        <title>SSHTHINGS.COM - Personal Blog</title>
        <meta name="description" content="A personal blog about technology, homelab, and infrastructure experiments." />
      </Helmet>

      <div className="min-h-screen bg-console-bg">
        <div className="page-wrap">
          <section className="intro">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">sshthings</h1>
            <p className="mt-2 text-base sm:text-lg text-zinc-400/90">Short, reproducible notes on homelab, self-hosting, and infrastructure experiments.</p>
          </section>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search posts…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-10 rounded-md bg-zinc-900/40 border border-zinc-800 px-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="h-10 rounded-md bg-zinc-900/40 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                aria-label="Filter by tag"
              >
                <option value="">All tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {filteredPosts.length > 0 ? (
            <div className="list">
              {filteredPosts.map((p) => (
                <PostListItem key={p.slug} post={p} />
              ))}
            </div>
          ) : allPosts.length === 0 ? (
            <div className="mx-auto max-w-screen-sm px-4 py-20 text-center space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight">Coming soon</h1>
              <p className="text-sm text-zinc-400">Shipping posts worth copying. No filler.</p>
              <div className="loading-bar"></div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-console-gray-dim text-lg font-mono">
                No posts found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home 