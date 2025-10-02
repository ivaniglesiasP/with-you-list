import { Box, Typography } from '@mui/material'

export default function WithYouList() {
  return (
    <Box>
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: 'text.primary',
          fontWeight: 'medium',
        }}
      >
        Here you will see the list of to-do&apos;s with bbsito 😘
      </Typography>
    </Box>
  )
}
