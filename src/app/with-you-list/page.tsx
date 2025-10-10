import { handleWithYouListData } from '@/wiring/handle-with-you-list-data'
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Stack,
} from '@mui/material'

export default async function WithYouList() {
  const { listItems, loggedUser } = await handleWithYouListData()

  //TODO: CONTROL errors

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
        {listItems.map((item) => (
          <Card
            key={item.id}
            elevation={2}
            sx={{
              borderRadius: 3,
              position: 'relative',
              overflow: 'visible',
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
                {item.toDoHelpText}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {item.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  mt: 1,
                }}
              >
                <Avatar
                  src={item.user.pictureUrl ?? ''}
                  alt={item.user.name}
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem' }}
                >
                  Added by {item.user.name}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
