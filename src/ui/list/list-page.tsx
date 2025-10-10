import { ListItem } from '@/domain/list'
import { User } from '@/domain/log-in'
import { Box, Typography, Avatar, Stack } from '@mui/material'
import List from './list'

type WithYouListPageProps = {
  listItems: ListItem[]
  loggedUser: User
}

const WithYouListPage = ({ listItems, loggedUser }: WithYouListPageProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: 2,
          mb: 2,
          p: 2,
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
          {loggedUser?.name}
        </Typography>
        <Avatar
          src={loggedUser?.pictureUrl ?? ''}
          alt={loggedUser?.name}
          sx={{ width: 36, height: 36 }}
        />
      </Box>
      <Stack spacing={2} sx={{ px: 2, flex: 1, overflowY: 'auto' }}>
        <List listItems={listItems} />
      </Stack>
    </Box>
  )
}

export default WithYouListPage
