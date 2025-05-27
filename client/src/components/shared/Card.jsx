import { styled } from '@mui/material'
import MuiCard from '@mui/material/Card'

const Card = styled(MuiCard)({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: '1rem',
  width: '100%',
  maxWidth: '450px',
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.04) 0px 4px 8px 0px, hsla(220, 30%, 5%, 0.04) 0px 4px 8px -4px',
})

export default Card