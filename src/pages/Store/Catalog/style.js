import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const headerNavHeight = '60px';

export const Container = styled('div')({
  margin: 'auto',
  maxWidth: '1170px'
});

export const Nav = styled('nav')({
  background: '#564aa3',
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: headerNavHeight,
  zIndex: 999,
  display: 'flex',
  alignItems: 'center'
});

export const ButtonCart = styled('button')({
  
});

export const Intro = styled(Box)({
  height: '340px',
  background: 'url(https://files.menudino.com/cardapios/9621/capa.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: '50%',
  backgroundColor: '#f4f8f9',
  backgroundRepeat: 'no-repeat',
  marginTop: headerNavHeight
});

export const WrapperTabs = styled('div')(({ theme, top }) => ({
  position: 'sticky',
  top: top,
  background: '#fff',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  zIndex: 998,
}));

export const Logo = styled('img')(({ theme, top }) => ({
  height: 42,
  width: 'auto'
}));
