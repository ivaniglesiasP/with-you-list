'use client'
import { ListItem as ListItemType } from '@/domain/list'
import en from '../../../locales/en.json'
import { Box, Stack, Typography } from '@mui/material'
import ListItem from './list-item/list-item'
import ListAddItemButton from './add-item/add-item-button'
import { useState } from 'react'

type ItemListProps = {
  listItems: ListItemType[]
  userId: string
}

const List = ({ listItems: listItemFromApi, userId }: ItemListProps) => {
  const [listItems, setListItems] = useState<ListItemType[]>(listItemFromApi)

  const handleUpdateListItems = (newItem: ListItemType) =>
    setListItems((prev) => [newItem, ...prev])
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          pb: 2,
        }}
      >
        <ListAddItemButton
          updateListItems={handleUpdateListItems}
          userId={userId}
        />
      </Stack>
      <Stack spacing={2} sx={{ px: 2, flex: 1, overflowY: 'auto' }}>
        {listItems.length > 0 ? (
          listItems.map((item) => <ListItem key={item.id} listItem={item} />)
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              py: 4,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              {en.list.empty}
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  )
}

export default List
