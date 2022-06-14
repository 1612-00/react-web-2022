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
    Button,
} from '@mui/material';

const ResetPassword = () => {
    // Email and password state
    const [email, setEmail] = useState('');

    // Handle show password
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    // Auth Context
    const {
        state: { isLoading, isAuthenticated },
    } = useContext(AuthContext);

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        console.log(email);

        // try {
        //     const loginData = loginUser(user);
        //     if (!loginData) {
        //         // handleOpenErrModal();
        //         console.log('login failure');
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
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
                <div className='auth__wrapper'>
                    <div className='auth__content'>
                        <div className='auth__content__top'>
                            <div className='auth__content__top__title'>
                                Reset Password
                            </div>
                            <div className='auth__content__top__sub'>
                                Sign into your pages account
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
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </FormControl>
                            <Button
                                variant='contained'
                                size='large'
                                type='submit'
                            >
                                Resend Password
                            </Button>
                        </form>
                        <div className='auth__content__bottom'>
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

export default ResetPassword;
