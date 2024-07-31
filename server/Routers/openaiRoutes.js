const express = require('express');
const router = express.Router();
const { getCompletion } = require('../services/openaiServices');
const { portfolio } = require('../services/portfolioService');

router.post('/ai', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const gptResponse = await getCompletion(userMessage);
    res.json({ response: gptResponse.trim() });
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).send('Something went wrong!');
  }
});


router.post("/chatbot" , portfolio)

module.exports = router;
