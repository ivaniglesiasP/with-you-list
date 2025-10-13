import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Button,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'

type MobileConfirmModalProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ListItemConfirmModal = ({
  open,
  onConfirm,
  onCancel,
}: MobileConfirmModalProps) => {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        component: motion.div,
        variants: {
          hidden: { opacity: 0, scale: 0.95, y: 40 },
          visible: { opacity: 1, scale: 1, y: 0 },
        },
        initial: 'hidden',
        animate: open ? 'visible' : 'hidden',
        transition: { duration: 0.25, ease: 'easeOut' },
        sx: {
          m: 2, // margen alrededor de la pantalla (deja ver el fondo)
          borderRadius: 4,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[6],
          p: 1,
          width: 'auto',
          maxWidth: '90%',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // fondo translúcido
          backdropFilter: 'blur(2px)',
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}
      >
        Confirm revert
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: theme.palette.text.secondary, mt: 1 }}
        >
          This task was completed more than an hour ago. Do you really want to
          mark it as not done?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center',
          gap: 2,
          pb: 1,
          mt: 1,
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          color="inherit"
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            minWidth: 100,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="success"
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            minWidth: 100,
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ListItemConfirmModal
