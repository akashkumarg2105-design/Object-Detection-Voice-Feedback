const express = require('express');
const axios = require('axios');

const router = express.Router();

// Python backend URL
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

// Object detection endpoint
router.post('/detect', async (req, res) => {
  try {
    const { image } = req.body;

    // Send image to Python backend for processing
    const response = await axios.post(`${PYTHON_BACKEND_URL}/detect`, {
      image: image
    });

    res.status(200).json({
      status: 'success',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Error processing image'
    });
  }
});

module.exports = router;