

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setCaption('');
    setHashtags([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await axios.post('http://localhost:4000/api/caption', formData);
      setCaption(res.data.caption);
      setHashtags(res.data.hashtags || []);
    } catch (err) {
      setCaption('Error generating caption');
      setHashtags([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf6e3 0%, #e0e7ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 6px 32px rgba(0,0,0,0.10)', padding: 40, maxWidth: 480, width: '100%', textAlign: 'center', border: '2px solid #fbbf24' }}>
        <h1 style={{ color: '#f59e42', marginBottom: 18, fontWeight: 900, letterSpacing: 1, fontSize: 30, fontFamily: 'Segoe UI, sans-serif' }}>Social Media Caption Generator</h1>
        <p style={{ color: '#64748b', marginBottom: 28, fontSize: 16 }}>Upload an image to get a catchy caption and trending hashtags for your next post!</p>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <label htmlFor="image-upload" style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#fbbf24',
            borderRadius: 10,
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            marginBottom: 14,
            border: 'none',
            fontSize: 16,
            boxShadow: '0 2px 8px rgba(251,191,36,0.10)',
            transition: 'background 0.2s',
          }}>
            {image ? 'Change Image' : 'Choose Image'}
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
          <br />
          <button type="submit" disabled={loading || !image} style={{
            marginTop: 10,
            padding: '12px 32px',
            background: loading || !image ? '#f1f5f9' : '#f59e42',
            color: loading || !image ? '#cbd5e1' : '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 18,
            cursor: loading || !image ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(245,158,66,0.10)',
            transition: 'background 0.2s',
          }}>
            {loading ? 'Generating...' : 'Generate Caption'}
          </button>
        </form>
        {preview && (
          <div style={{ marginBottom: 18 }}>
            <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
          </div>
        )}
        {caption && (
          <div style={{
            marginTop: 12,
            padding: '16px 20px',
            background: '#f1f5f9',
            borderRadius: 10,
            color: '#0f172a',
            fontWeight: 700,
            fontSize: 19,
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            marginBottom: 10
          }}>{caption}</div>
        )}
        {hashtags.length > 0 && (
          <div style={{ marginTop: 8, marginBottom: 4 }}>
            <span style={{ color: '#64748b', fontWeight: 600, fontSize: 15 }}>Suggested Hashtags:</span>
            <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
              {hashtags.map((tag, idx) => (
                <span key={idx} style={{
                  background: '#fbbf24',
                  color: '#fff',
                  borderRadius: 8,
                  padding: '6px 14px',
                  fontWeight: 700,
                  fontSize: 15,
                  margin: 2,
                  letterSpacing: 1
                }}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
