import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  useTheme,
  TextField,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useAddTodoItem } from './use-add-todo-item'
import { ListItem } from '@/domain/list'
import en from '../../../../locales/en.json'
import AddIcon from '@mui/icons-material/Add'

type MobileConfirmModalProps = {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  userId: string
  updateListItems: (item: ListItem) => void
}

const AddItemModal = ({
  open,
  onConfirm,
  onCancel,
  updateListItems,
  userId,
}: MobileConfirmModalProps) => {
  const theme = useTheme()
  const {
    error,
    description,
    toDoHelpText,
    handleAddItemSubmit,
    handleDescriptionChange,
    handleToDoHelpTextChange,
    loading,
  } = useAddTodoItem({ userId, updateListItems, onAddedItem: onConfirm })

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      //TODO: NOT USER PAPER PROPS
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
          m: 2,
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(2px)',
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}
      >
        {en.list.addItem.modal.title}
      </DialogTitle>
      <DialogContent
        sx={{
          minWidth: 320,
          minHeight: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleAddItemSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label={en.list.addItem.descriptionLabel}
              name="description"
              type="text"
              error={Boolean(description.error)}
              helperText={description.error}
              autoFocus
              value={description.value}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="toDoHelpText"
              label={en.list.addItem.toDoHelpTextLabel}
              type="text"
              id="toDoHelpText"
              error={Boolean(toDoHelpText.error)}
              helperText={toDoHelpText.error}
              value={toDoHelpText.value}
              onChange={(e) => handleToDoHelpTextChange(e.target.value)}
            />

            <DialogActions
              sx={{
                justifyContent: 'center',
                gap: 2,
                p: 2,
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
                {en.list.addItem.modal.cancelButton}
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={loading}
                sx={{
                  textTransform: 'none',
                  bgcolor: 'primary.main',
                  ':hover': { bgcolor: 'primary.dark' },
                }}
              >
                {en.list.addItem.modal.addButton}
              </Button>
            </DialogActions>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddItemModal
