'use client'
import { ListItem as ListItemType } from '@/domain/list'
import { motion, PanInfo, useAnimation } from 'framer-motion'
import { Typography, Card, CardContent, useTheme } from '@mui/material'
import ListItemFooter from './list-item-footer'
import { isDateOlderThanOneHour } from '@/utils/utils'
import ListItemConfirmModal from './list-item-confirm-modal'
import { useListItem } from './use-list-item'
import { Toast } from '@/ui/toast'

type ListItemProps = {
  listItem: ListItemType
}
const SWIPE_THRESHOLD = 100

const ListItem = ({ listItem }: ListItemProps) => {
  const controls = useAnimation()
  const theme = useTheme()
  const {
    item,
    error,
    cleanError,
    showConfirmModal,
    cancelDoneRevert,
    confirmDoneRevert,
    handleDoneToggle,
    setShowConfirmModal,
  } = useListItem({ listItem })

  const { createdAt, description, done, doneAt, id, toDoHelpText, user } = item

  const handleOnDragEng = (info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && !done) {
      handleDoneToggle(id, true)
    } else if (info.offset.x > SWIPE_THRESHOLD && done) {
      if (isDateOlderThanOneHour(doneAt)) {
        return setShowConfirmModal(true)
      }
      handleDoneToggle(id, false)
    } else {
      controls.start({ x: 0 })
    }
  }

  return (
    <>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => handleOnDragEng(info)}
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card
          key={id}
          elevation={2}
          sx={{
            borderRadius: 3,
            position: 'relative',
            overflow: 'visible',
            background: done
              ? theme.palette.success.main
              : theme.palette.background.paper,
          }}
        >
          <CardContent sx={{ pb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: 8,
                left: 16,
                opacity: 0.7,
                fontWeight: 500,
              }}
            >
              {toDoHelpText}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 3,
                mb: 2,
                fontWeight: 500,
              }}
            >
              {description}
            </Typography>
            <ListItemFooter
              createdAT={createdAt}
              doneAt={doneAt}
              listItemDone={done}
              user={user}
            />
          </CardContent>
        </Card>
      </motion.div>
      <ListItemConfirmModal
        onCancel={cancelDoneRevert}
        onConfirm={confirmDoneRevert}
        open={showConfirmModal}
      />
      {error && <Toast feedbackMessage={error} onToastClose={cleanError} />}
    </>
  )
}

export default ListItem
