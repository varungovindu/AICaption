
# Social Media AI Image Caption Generator

Generate catchy, social-media-ready captions and hashtags for your images using Generative AI! Perfect for content creators, marketers, and anyone looking to boost their social presence.

---

## 🚀 Features
- **Upload any image** and get a creative caption tailored for social media
- **Automatic hashtag suggestions** for better reach
- **Modern, intuitive UI**
- **Full stack:** React frontend, Node.js backend, Python AI microservice (Hugging Face BLIP)

---

## 🛠️ Tech Stack
- **Frontend:** React
- **Backend:** Node.js + Express
- **AI Service:** Python (Hugging Face Transformers, BLIP)

---

## 📁 Project Structure

```
AI-Image-Caption-Generator/
│
├── backend/
│   ├── server.js           # Node.js Express API
│   └── ai_service/
│        ├── app.py         # Python AI microservice
│        └── requirements.txt
│
├── frontend/
│   ├── package.json
│   └── src/
│        ├── App.js
│        └── ...
│
├── README.md
└── .gitignore
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/varungovindu/AICaption.git
cd AICaption
```

### 2. Install & Run the Python AI Service
```bash
cd backend/ai_service
pip install -r requirements.txt
python app.py
# Service runs on http://localhost:5000
```

### 3. Install & Run the Node.js Backend
```bash
cd ../../backend
npm install
npm start
# Server runs on http://localhost:4000
```

### 4. Install & Run the React Frontend
```bash
cd ../frontend
npm install
# To avoid browser cache issues, you can run on a different port:
set PORT=3001 && npm start
# App runs on http://localhost:3000 (or 3001)
```

---

## 💡 Usage
1. Open the app in your browser (`http://localhost:3000` or `http://localhost:3001`).
2. Upload an image.
3. Instantly get a catchy caption and suggested hashtags for your next post!

---

## 📝 Example Output

> **Caption:**
> Living my best life in the sunshine! 😎 #LifeIsGood

> **Suggested Hashtags:**
> #sunshine #happy #outdoors #smile #vibes

---

## 🧑‍💻 For Recruiters
- Demonstrates full stack skills (React, Node.js, Python, AI integration)
- Uses trending Generative AI (Hugging Face BLIP)
- Clean, modern UI and codebase
- Lightweight, easy to run and review

---

## 🛠️ Troubleshooting
- If you see old content, try a hard refresh (Ctrl+F5) or use a different port (see above).
- Make sure all three services (AI, backend, frontend) are running in separate terminals.
- If you get errors about ports, make sure nothing else is running on 3000/4000/5000.

---

## 📄 License
MIT
