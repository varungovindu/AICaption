// Express server for image upload and captioning API
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// POST /api/caption - receives image, sends to Python AI service
app.post('/api/caption', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const aiServiceUrl = 'http://localhost:5000/caption';
    const image = fs.readFileSync(imagePath);
    const response = await axios.post(aiServiceUrl, image, {
      headers: { 'Content-Type': 'application/octet-stream' },
      responseType: 'json',
    });
    fs.unlinkSync(imagePath);
  res.json({ caption: response.data.caption, hashtags: response.data.hashtags });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate caption' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
