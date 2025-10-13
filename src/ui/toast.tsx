import { Alert, Snackbar } from '@mui/material'

type ToastProps = {
  feedbackMessage: string
  onToastClose: () => void
}

export const Toast = ({ feedbackMessage, onToastClose }: ToastProps) => {
  return (
    <Snackbar
      open={Boolean(feedbackMessage)}
      onClose={onToastClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="error" sx={{ width: '100%' }}>
        {feedbackMessage}
      </Alert>
    </Snackbar>
  )
}
