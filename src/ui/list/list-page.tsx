import { ListItem } from '@/domain/list'
import { User } from '@/domain/log-in'
import { Typography, Avatar, Stack } from '@mui/material'
import List from './list'

type WithYouListPageProps = {
  listItems: ListItem[]
  loggedUser: User
}

const WithYouListPage = ({ listItems, loggedUser }: WithYouListPageProps) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: '100%',
        height: '100%',
        py: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          px: 2,
          pb: 1,
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
      </Stack>
      <Stack
        direction={'column'}
        sx={{
          width: '100%',
          height: '100%',
          pb: 2,
        }}
      >
        <List listItems={listItems} userId={loggedUser.id} />
      </Stack>
    </Stack>
  )
}

export default WithYouListPage
