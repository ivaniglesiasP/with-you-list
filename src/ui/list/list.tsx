import { ListItem as ListItemType } from '@/domain/list'
import en from '../../../locales/en.json'
import { Box, Typography } from '@mui/material'
import ListItem from './list-item/list-item'

type ItemListProps = {
  listItems: ListItemType[]
}

const List = ({ listItems }: ItemListProps) => {
  return listItems.length > 0 ? (
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
  )
}

export default List
