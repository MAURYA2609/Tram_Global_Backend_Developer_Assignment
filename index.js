import express from 'express';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import UrlModel from './models/UrlModel.js'

const app = express();
const port = 8001;

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/url_shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to database');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Shorten URL endpoint
    app.post('/shorten', async (req, res) => {
      const longURL = req.body.longURL;
      if (!longURL) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      const shortCode = nanoid(6);

      const urlDoc = new UrlModel({
        shortCode: shortCode,
        longURL: longURL
      });

      try {
        await urlDoc.save();
        const shortURL = `http://localhost:8001/${shortCode}`;
        res.json({ shortURL });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Redirect to original URL
    app.get('/:shortCode', async (req, res) => {
      const shortCode = req.params.shortCode;

      try {
        const result = await UrlModel.findOne({ shortCode });
        if (result) {
          res.redirect(result.longURL);
        } else {
          res.status(404).json({ error: 'URL not found' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
