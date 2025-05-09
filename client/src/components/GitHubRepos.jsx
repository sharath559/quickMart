import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress,
  TextField,
  Button,
  Link,
  Container 
} from '@mui/material'

function GitHubRepos() {
  const [username, setUsername] = useState('facebook')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRepos = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get(`/api/github/repos/${username}`)
      setRepos(response.data)
    } catch (err) {
      setError('Error fetching repositories. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GitHub Repository Viewer
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            label="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mr: 2 }}
          />
          <Button 
            variant="contained" 
            onClick={fetchRepos}
            disabled={loading}
          >
            Search
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List>
            {repos.map(repo => (
              <ListItem key={repo.id} disablePadding sx={{ mb: 2 }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      <Link href={repo.html_url} target="_blank" rel="noopener">
                        {repo.name}
                      </Link>
                    </Typography>
                    <Typography color="textSecondary" sx={{ mb: 1 }}>
                      ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                    </Typography>
                    <Typography variant="body2">
                      {repo.description || 'No description available'}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  )
}

export default GitHubRepos