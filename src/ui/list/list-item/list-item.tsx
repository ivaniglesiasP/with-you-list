'use client'
import { ListItem as ListItemType } from '@/domain/list'
import en from '../../../../locales/en.json'
import { motion, useAnimation } from 'framer-motion'
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  useTheme,
} from '@mui/material'
import { useCallback, useRef, useState } from 'react'

type ListItemProps = {
  listItem: ListItemType
}
const SWIPE_THRESHOLD = 100

const ListItem = ({ listItem }: ListItemProps) => {
  const controls = useAnimation()
  const theme = useTheme()
  const [done, setDone] = useState<boolean>(listItem.done)
  const lastUpdatedDoneValue = useRef<boolean>(listItem.done)
  const debouncer = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const handleToggle = useCallback(
    (itemId: string, newDoneValue: boolean) => {
      setDone(newDoneValue)

      const existingTimer = debouncer.current[itemId]
      if (existingTimer) {
        clearTimeout(existingTimer)
      }
      const timer = setTimeout(async () => {
        try {
          if (lastUpdatedDoneValue.current === newDoneValue) return
          console.log(
            `Ejecutando accion de ${newDoneValue} para el item ${itemId}`,
          )
          lastUpdatedDoneValue.current = newDoneValue
        } finally {
          delete debouncer.current[itemId]
        }
      }, 3000)
      debouncer.current[itemId] = timer
    },
    [lastUpdatedDoneValue],
  )

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD && !done) {
          handleToggle(listItem.id, true)
        } else if (info.offset.x > SWIPE_THRESHOLD && done) {
          handleToggle(listItem.id, false)
        } else {
          controls.start({ x: 0 })
        }
      }}
      animate={controls}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card
        key={listItem.id}
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
            {listItem.toDoHelpText}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 500,
            }}
          >
            {listItem.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignlistItems: 'center',
              justifyContent: 'flex-start',
              mt: 1,
            }}
          >
            <Avatar
              src={listItem.user.pictureUrl ?? ''}
              alt={listItem.user.name}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
            >
              {`${en.list.addedBy} ${listItem.user.name}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ListItem
