import React, { useContext, useState } from 'react';
import './login.scss';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
    Box,
    CircularProgress,
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from './../../components/alert/Alert';

const Login = () => {
    // Email and password state
    const [value, setValue] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    // Handle show password
    const handleChangeValue = (prop) => (event) => {
        setValue({ ...value, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValue({
            ...value,
            showPassword: !value.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Auth Context
    const {
        state: { isLoading, isAuthenticated },
        loginUser,
    } = useContext(AuthContext);

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        const user = {
            email: value.email,
            password: value.password,
        };

        try {
            const loginData = await loginUser(user);
            if (!loginData) {
                // handleOpenErrModal();
                console.log('login failure');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return (
            <Box className='spinner'>
                <CircularProgress />
            </Box>
        );
    } else if (isAuthenticated) {
        return <Navigate to='/' />;
    } else
        return (
            <div className='auth'>
                <Alert active="active" success='failure' message='Login successfully' />
                <div className='auth__wrapper'>
                    <div className='auth__content'>
                        <div className='auth__content__top'>
                            <div className='auth__content__top__title'>
                                Log In
                            </div>
                            <div className='auth__content__top__sub'>
                                Welcome Back! Please sign in to your Account
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmitForm}
                            className='auth__content__form'
                        >
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <OutlinedInput
                                    id='email'
                                    type='email'
                                    label='Email'
                                    placeholder='Your email here...'
                                    value={value.email}
                                    onChange={handleChangeValue('email')}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor='password'>
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id='password'
                                    type={
                                        value.showPassword ? 'text' : 'password'
                                    }
                                    value={value.password}
                                    onChange={handleChangeValue('password')}
                                    label='Password'
                                    placeholder='Your password here...'
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                            >
                                                {value.showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <div className='auth__content__form__action'>
                                <div className='auth__content__form__action__remember'>
                                    <FormControlLabel
                                        label='Remember Me'
                                        control={
                                            <Checkbox
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: '#d81b60',
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                </div>
                                <Link
                                    to='/auth/reset-password'
                                    className='auth__content__form__action__forgot'
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <Button
                                variant='contained'
                                size='large'
                                type='submit'
                            >
                                Login
                            </Button>
                        </form>
                        <div className='or'>
                            <span>OR</span>
                        </div>
                        <div className='auth__content__bottom'>
                            <div className='auth__content__bottom__social-btns'>
                                <button className='facebook'>
                                    <i class='bx bxl-facebook'></i>
                                </button>
                                <button className='twitter'>
                                    <i class='bx bxl-twitter'></i>
                                </button>
                                <button className='linkedin'>
                                    <i class='bx bxl-linkedin'></i>
                                </button>
                            </div>
                            <div className='auth__content__bottom__register'>
                                <div className='login__content__bottom__register__text'>
                                    Don't have an account?
                                </div>
                                <Link
                                    to='/auth/register'
                                    className='auth__content__bottom__register__link'
                                >
                                    Create free account
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='auth__background-img'></div>
                </div>
            </div>
        );
};

export default Login;
