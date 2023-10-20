import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { removeToken } from "../../auth/TokenManeger";
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";
import './Navbar.scss'

function Navbar() {
    const user = useContext(userContext)
    const [disName, setDisName] = useState('')
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        if (user?.user?.firstName && user?.user?.lastName) {
            setDisName(user?.user?.firstName?.charAt(0) + user?.user?.lastName?.charAt(0))
        } else {
            setDisName('U')
        }
    }, [user?.user])

    function onLogOut() {
        user?.setUser(undefined)
        setAnchorElUser(null)
        setDisName('')
        removeToken()
    }

    return (
        <AppBar position="static" className="navbar" style={{ background: 'black' }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <NavLink to='/'>
                            <Logo
                                layout="horizontal"
                                height="50px"
                            />
                        </NavLink>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <i
                                style={{ color: '#D9AE89' }}
                                className={`bi bi-${!anchorElNav ? 'list' : 'x-lg'}`}></i>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                padding: 0,
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink
                                        className="navbar__nav-link"
                                        to='/about'>
                                        About
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink
                                        className="navbar__nav-link"
                                        to='/blog'>
                                        Blog
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink
                                        className="navbar__nav-link"
                                        to='/cocktails'>
                                        Cocktails
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink
                                        className="navbar__nav-link"
                                        to='/bars'>
                                        Bars
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                            {
                                user.user?.isAdmin &&
                                <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink
                                            className="navbar__nav-link"
                                            to='/admin'>
                                            Admin
                                        </NavLink>
                                    </Typography>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to='/' >
                            <Logo
                                layout="horizontal"
                                height="50px"
                            />
                        </NavLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem sx={{ marginTop: '20px', paddingBottom: 0 }} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <NavLink
                                    className="navbar__nav-link"
                                    to='/about'>
                                    About
                                </NavLink>
                            </Typography>
                        </MenuItem>
                        <MenuItem sx={{ marginTop: '20px', paddingBottom: 0 }} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <NavLink
                                    className="navbar__nav-link"
                                    to='/blog'>
                                    Blog
                                </NavLink>
                            </Typography>
                        </MenuItem>
                        <MenuItem sx={{ marginTop: '20px', paddingBottom: 0 }} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <NavLink
                                    className="navbar__nav-link"
                                    to='/cocktails'>
                                    Cocktails
                                </NavLink>
                            </Typography>
                        </MenuItem>
                        <MenuItem sx={{ marginTop: '20px', paddingBottom: 0 }} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <NavLink
                                    className="navbar__nav-link"
                                    to='/bars'>
                                    Bars
                                </NavLink>
                            </Typography>
                        </MenuItem>

                        {
                            user.user?.isAdmin &&
                            <MenuItem sx={{ marginTop: '20px', paddingBottom: 0 }} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink
                                        className="navbar__nav-link"
                                        to='/admin'>
                                        Admin
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <div className="d-flex">
                            {
                                !user?.user &&
                                <>
                                    <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <NavLink
                                                className='navbar__user-button'
                                                to='/log-in'>
                                                Log In
                                            </NavLink>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <NavLink
                                                className='navbar__user-button'
                                                to='/sign-up'>
                                                Sign Up
                                            </NavLink>
                                        </Typography>
                                    </MenuItem>
                                </>
                            }
                            {
                                user?.user &&
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            className="navbar__avatar"
                                        >
                                            {disName.toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            }
                        </div>
                        <Menu
                            sx={{ mt: '45px', display: 'flex' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                user?.user &&
                                <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <button onClick={onLogOut} className='navbar__user-button'>
                                            Log Out
                                        </button>
                                    </Typography>
                                </MenuItem>
                            }
                            <MenuItem sx={{ paddingBottom: 0, background: 'black' }} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <NavLink
                                        className='navbar__user-button'
                                        to='/sign-up'>
                                        Sign Up
                                    </NavLink>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar