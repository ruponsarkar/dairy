import React, { useState } from 'react'
import api from '../../API/api';
import AuthUser from '../../API/token';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Card } from '@mui/material';
import { Paper } from '@mui/material';

const Login = () => {
    const { setToken } = AuthUser();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const submit = () => {
        setLoading(true);

        api.login(email, password)
            .then((res) => {
                console.log("Login success==>", res);
                setToken(res.data.user, res.data.access_token)
                setLoading(false);
            })
            .catch((err) => {
                console.log("login error==>", err);
                setLoading(false);
                setError(true);
            })
    }

    const Loading = () => {
        return (
            <Stack sx={{ color: 'grey.500' }} style={{ 'alignItems': 'center' }}>
                <CircularProgress color="inherit" />
            </Stack>
        );
    }

    return (
        <>
            <Paper>
                <section className='bg-light'>
                    <div class="container">
                        <div>
                            <div class="row ">
                                <div class="col-lg-7">
                                    <div class="card1 pb-5">
                                        <div class="row px-3 justify-content-center mt-5 mb-5">
                                            <img src="https://media.istockphoto.com/id/1390481905/photo/multi-factor-authentication-user-login-cybersecurity-privacy-protect-data-internet-network.jpg?s=612x612&w=0&k=20&c=Hqaa0_JZ9j4isOgS3-SKUlDDBnFCgXMeAOykWATzF9I=" class="img-fluid" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-5">
                                    <Card>
                                        <div className='box-form p-5 my-3'>
                                            <div className="right">
                                                

                                                {/* <form> */}

                                                <div className="inputs">
                                                    <label>Email Address</label>
                                                    <input type="email" className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder="enter a valid email address" />
                                                    <br />
                                                    <label>Password</label>
                                                    <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password" />
                                                </div>

                                                <br />

                                                <div className="remember-me--forget-password d-flex">
                                                    <label>
                                                        <input type="checkbox" name="item" checked /> &nbsp;
                                                        <span className="text-checkbox">Remember me</span>
                                                    </label>
                                                    <p className='px-5'><a href='#'>forget password?</a></p>
                                                </div>

                                                <br />
                                                {error && <Alert severity="error">Something went wrong !</Alert>
                                                }


                                                {loading ? <Loading /> :
                                                    <div className='text-center'>
                                                        <button className='px-5 py-2 submitBtn' onClick={submit}>Login</button>
                                                    </div>
                                                }


                                                <br /><br />

                                                <div class="row mb-4 px-3">
                                                    <label class="font-weight-bold">Don't have an account ?
                                                        &nbsp;<a class="text-danger" href='/register'>Register</a></label>
                                                </div>
                                                {/* </form> */}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Paper>
        </>
    )
}


export default Login;