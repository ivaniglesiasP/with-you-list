'use client'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material'
import en from '../../../locales/en.json'
import { useLogin } from './use-login'
import { LoginOutlined } from '@mui/icons-material'

const LoginPage = () => {
  const { setPassword, setEmail, handleSubmit, email, password, loading } =
    useLogin()

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        width: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 360,
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'text.primary' }}
        >
          {en.login.welcome}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          {en.login.helpText}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={en.login.emailLabel}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={en.login.passwordLabel}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <LoginOutlined />
              )
            }
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: 'primary.main',
              ':hover': { bgcolor: 'primary.dark' },
            }}
          >
            {en.login.logInButton}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
