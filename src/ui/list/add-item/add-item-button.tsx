import en from '../../../../locales/en.json'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { ListItem } from '@/domain/list'
import AddItemModal from './add-item-modal'

type AddItemButtonProps = {
  userId: string
  updateListItems: (item: ListItem) => void
}

const ListAddItemButton = ({ userId, updateListItems }: AddItemButtonProps) => {
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false)
  const handleCloseModal = () => setShowAddItemModal(false)
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowAddItemModal(true)}
        sx={{
          borderRadius: 4,
          textTransform: 'none',
          backgroundColor: '#D2B48C',
          color: '#fff',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#c19a6b',
          },
        }}
      >
        {en.list.addItem.addButton}
      </Button>
      {showAddItemModal && (
        <AddItemModal
          onCancel={handleCloseModal}
          open={showAddItemModal}
          userId={userId}
          updateListItems={updateListItems}
          onConfirm={handleCloseModal}
        />
      )}
    </>
  )
}

export default ListAddItemButton
