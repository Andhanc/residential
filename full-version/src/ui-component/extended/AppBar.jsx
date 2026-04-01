'use client';
import PropTypes from 'prop-types';

import { cloneElement, useState } from 'react';
import RouterLink from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import { ThemeMode } from 'config';
import Logo from 'ui-component/Logo';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons-react';
import MenuIcon from '@mui/icons-material/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
    style: {
      backgroundColor: theme.palette.mode === ThemeMode.DARK && trigger ? theme.palette.dark[800] : theme.palette.background.default,
      color: theme.palette.text.dark
    }
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

export default function AppBar({ ...others }) {
  const [drawerToggle, setDrawerToggle] = useState(false);

  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    
    <ElevationScroll {...others}>
      
      <MuiAppBar>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              py: 2.5,
              px: { xs: 2, lg: '10vw' }
            }}
          >
            <Typography component={RouterLink} href="/" variant="h6" sx={{ textAlign: 'left', cursor: 'pointer' }}>
              <Logo />
            </Typography>
            <Stack
              direction="row"
              sx={{ display: { xs: 'none', sm: 'block' }, ml: 'auto' }}
              spacing={{ xs: 1.5, md: 2.5 }}
            >
              <Button color="inherit" component={RouterLink} href="/">
                Главная
              </Button>
              <Button color="inherit" component={RouterLink} href="/login" target="_blank">
                Контакты
              </Button>
              <Button color="inherit" component={Link} href="https://codedthemes.gitbook.io/berry" target="_blank">
                Инфраструктура
              </Button>
              <Button component={RouterLink} href="/apartments" disableElevation variant="contained" color="secondary">
                Выбрать квартиру
              </Button>
              <IconButton color="inherit" size="large">
                <FontAwesomeIcon icon={faPhone} style={{ fontSize: '20px' }} />
              </IconButton>
              <IconButton color="inherit" size="large">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '20px' }} />
              </IconButton>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' }, ml: 'auto' }}>
              <IconButton color="inherit" onClick={drawerToggler(true)} size="large">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                {drawerToggle && (
                  <Box sx={{ width: 'auto' }} role="presentation" onClick={drawerToggler(false)} onKeyDown={drawerToggler(false)}>
                    <List>
                      <Link component={RouterLink} sx={{ textDecoration: 'none' }} href="/">
                        <ListItemButton>
                          <ListItemIcon>
                            <IconHome2 />
                          </ListItemIcon>
                          <ListItemText primary="Главная" />
                        </ListItemButton>
                      </Link>
                      <Link sx={{ textDecoration: 'none' }} href="/login" target="_blank">
                        <ListItemButton>
                          <ListItemIcon>
                            <IconDashboard />
                          </ListItemIcon>
                          <ListItemText primary="Dashboard" />
                        </ListItemButton>
                      </Link>
                      <Link sx={{ textDecoration: 'none' }} href="https://codedthemes.gitbook.io/berry" target="_blank">
                        <ListItemButton>
                          <ListItemIcon>
                            <IconBook />
                          </ListItemIcon>
                          <ListItemText primary="Documentation" />
                        </ListItemButton>
                      </Link>
                      <Link component={RouterLink} sx={{ textDecoration: 'none' }} href="/apartments">
                        <ListItemButton>
                          <ListItemIcon>
                            <IconCreditCard />
                          </ListItemIcon>
                          <ListItemText primary="Выбрать квартиру" />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
}

ElevationScroll.propTypes = { children: PropTypes.node, window: PropTypes.any };
