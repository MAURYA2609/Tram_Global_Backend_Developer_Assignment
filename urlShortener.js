// urlShortener.js

import { nanoid } from 'nanoid';

class URLShortener {
  async shortenURL(longURL) {
    const shortCode = nanoid(6);

    const urlDoc = new UrlModel({
      shortCode: shortCode,
      longURL: longURL
    });

    try {
      await urlDoc.save();
      return shortCode;
    } catch (error) {
      console.error('Error inserting into the database:', error);
      throw error;
    }
  }

  async getOriginalURL(shortCode) {
    try {
      const result = await UrlModel.findOne({ shortCode });
      if (result) {
        return result.longURL;
      }
      return null;
    } catch (error) {
      console.error('Error querying the database:', error);
      throw error;
    }
  }
}

export default URLShortener;
