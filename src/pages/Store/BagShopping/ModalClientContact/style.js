import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const ModalContainer = styled('div')({
  background: 'rgba(113,113,113,.4)',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  minHeight: '100%',
  zIndex: 2,
});

export const ModalContent = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 4,
  boxShadow: 24,
  padding: 4,
  height: 'auto',
  width: '90%',
  padding: '1rem',
  overflowX: 'hidden',
  overflowY: 'auto',
  background: '#fff',
  '@media (min-width: 768px)': {
    maxHeight: '800px',
    maxWidth: '600px',
  },
});

export const TitleModal = styled('h4')({
  margin: 0,
  textTransform: 'uppercase',
  textAlign: 'center',
  fontSize: '1.1rem'
});

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '2rem',
  height: '100%'
});

export const ButtonDefault = styled(Button)({
  fontSize: '1rem',
  gap: '16px',
  height: '48px',
  textTransform: 'capitalize',
  width: '100%',
  margin: 'auto',
  marginTop: '16px'
});