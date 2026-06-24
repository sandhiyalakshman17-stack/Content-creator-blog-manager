import React, { useState } from 'react';

// Sample initial data to populate the manager
const initialPosts = [
  { id: 1, title: 'Getting Started with React in 2026', category: 'Tech', status: 'Published', date: '2026-06-20' },
  { id: 2, title: '10 Content Marketing Strategies', category: 'Marketing', status: 'Draft', date: '2026-06-18' },
  { id: 3, title: 'The Future of AI in Copywriting', category: 'AI', status: 'Published', date: '2026-06-15' },
];

export default function BlogManager() {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [status, setStatus] = useState('Draft');
  const [editingId, setEditingId] = useState(null);

  // Form submit control (Add or Update post)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title entry mandatory!');

    if (editingId) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingId ? { ...post, title, category, status } : post
      ));
      setEditingId(null);
    } else {
      // Create new post
      const newPost = {
        id: Date.now(),
        title,
        category,
        status,
        date: new Date().toISOString().split('T')[0]
      };
      setPosts([newPost, ...posts]);
    }

    // Reset fields
    setTitle('');
    setCategory('Tech');
    setStatus('Draft');
  };

  // Populate form for editing
  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setStatus(post.status);
  };

  // Delete post function
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Content Blog Manager</h1>
        <p>Manage, edit, and create your blog posts effortlessly.</p>
      </header>

      {/* Form Section */}
      <div style={styles.card}>
        <h2>{editingId ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Post Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter your blog title..."
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                <option value="Tech">Tech</option>
                <option value="Marketing">Marketing</option>
                <option value="AI">AI</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>

          <button type="submit" style={styles.button}>
            {editingId ? 'Update Post' : 'Publish / Save Post'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setTitle(''); }} 
              style={{ ...styles.button, backgroundColor: '#6c757d', marginLeft: '10px' }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Posts List Section */}
      <div style={styles.card}>
        <h2>All Blog Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#666' }}>No blog posts available. Start by creating one!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={styles.tr}>
                  <td style={styles.td}><strong>{post.title}</strong></td>
                  <td style={styles.td}><span style={styles.badge}>{post.category}</span></td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge, 
                      backgroundColor: post.status === 'Published' ? '#d4edda' : '#fff3cd',
                      color: post.status === 'Published' ? '#155724' : '#856404'
                    }}>
                      {post.status}
                    </span>
                  </td>
                  <td style={styles.td}>{post.date}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(post)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Simple Inline CSS Styles
const styles = {
  container: { maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif', color: '#333' },
  header: { textAlign: 'center', marginBottom: '30px' },
  card: { background: '#f8f9fa', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', flex: 1, gap: '5px' },
  row: { display: 'flex', gap: '15px' },
  label: { fontWeight: '600', fontSize: '14px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' },
  select: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', background: '#fff' },
  button: { padding: '12px 20px', border: 'none', borderRadius: '6px', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
  thRow: { borderBottom: '2px solid #dee2e6', textAlign: 'left' },
  th: { padding: '12px 8px', fontWeight: '600' },
  tr: { borderBottom: '1px solid #dee2e6' },
  td: { padding: '12px 8px', verticalAlign: 'middle' },
  badge: { background: '#e2e3e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  statusBadge: { padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' },
  editBtn: { marginRight: '8px', padding: '6px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#ffc107', color: '#000', cursor: 'pointer' },
  deleteBtn: { padding: '6px 12px', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }
};