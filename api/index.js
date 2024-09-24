import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import axios from 'axios';
import notificationRoutes from './routes/notification.route.js';


dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => console.log('MongoDB is Connected!'))
.catch(err => console.log(err));


const __dirname = path.resolve();

const app = express()
app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
    console.log("Server is running on port 3000");   
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Prepare payload with the new prompt
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
        role: 'user'
      }
    ]
  };

  console.log('Sending payload to Gemini API:', JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Gemini API response:', JSON.stringify(response.data, null, 2));

    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts[0] &&
      response.data.candidates[0].content.parts[0].text
    ) {
      const message = response.data.candidates[0].content.parts[0].text;

      res.json({ message });
    } else {
      res.status(500).json({ error: 'Unexpected API response structure', details: response.data });
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    if (error.response) {
      console.error('API Error Response Data:', JSON.stringify(error.response.data, null, 2));
      console.error('API Error Response Status:', error.response.status);
      console.error('API Error Response Headers:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      console.error('API Error Request Data:', JSON.stringify(error.request, null, 2));
    } else {
      console.error('API Error Message:', error.message);
    }
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });    
});