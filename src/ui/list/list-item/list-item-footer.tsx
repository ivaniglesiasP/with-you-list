import en from '../../../../locales/en.json'
import { Box, Typography, Avatar, Divider } from '@mui/material'
import { User } from '@/domain/log-in'
import { getFormattedDate } from '@/utils/utils'

type ListItemFooterProps = {
  user: User
  listItemDone: boolean
  createdAT: string
  doneAt: string | null
}

const ListItemFooter = ({
  user,
  createdAT,
  doneAt,
  listItemDone,
}: ListItemFooterProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignlistItems: 'center',
        justifyContent: 'space-between',
        mt: 1,
      }}
    >
      <Avatar
        src={user.pictureUrl ?? ''}
        alt={user.name}
        sx={{ width: 24, height: 24, mr: 1 }}
      />
      <Box
        sx={{
          display: 'flex',
          alignlistItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.8rem' }}
          display="flex"
          alignItems="center"
        >
          {`${en.list.createdAt} ${getFormattedDate(createdAT)}`}
        </Typography>
        {listItemDone && doneAt && (
          <>
            <Divider orientation="vertical" flexItem />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.8rem' }}
              display="flex"
              alignItems="center"
            >
              {`${en.list.doneAt} ${getFormattedDate(doneAt)}`}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ListItemFooter
