const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware for verifying Firebase token
// const { verifyToken } = require('../middleware/auth');

// GitHub API route
router.get('/github/repos/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language
    }));
    
    res.json(repos);
  } catch (error) {
    console.error('Error fetching from GitHub API:', error.message);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Add more API routes here...

module.exports = router;