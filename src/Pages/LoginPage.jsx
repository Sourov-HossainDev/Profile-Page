import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';


const LoginPage = () => {
    const auth = getAuth();
    const naviget = useNavigate();
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState();


    const inputEmailData = (e) => {
        setEmail(e.target.value)
        setEmailError('')
    }

    const inputPasswordData = (p) => {
        setPassword(p.target.value)
        setPasswordError('')
    }


    const loginNowBTN = () => {
        if (!email) {
            setEmailError('Enter your Email')
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError('Enter your valid email')
        }
        if (!password) {
            setPasswordError('Enter your password ')
        }
        if (email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    toast.success('login success');
                    // dispatch(userLoginInfo(user.user));
                    // localStorage.setItem('userLoginInfo', JSON.stringify((user)))
                    setTimeout(() => {
                        naviget('/Profile')
                    }, 1000);
                    setEmail('');
                    setPassword('');

                })
                // .catch((error) => {
                //     if (error.code.includes('auth/invalid-login-credentials')) {

                //         setEmailError('Input data not match');

                //     }
                // });
        }
    }

    return (
        <>
            <div>
                <div className='relative bg-loginImage w-full  h-screen bg-no-repeat '>
                    <ToastContainer position="top-center" autoClose={1000} theme="dark" />

                    <div className=' absolute top-[100px] left-[400px]  bg-loginbg/30 rounded-[12.6px]    ' >
                        <div className=''>
                            <div className=' py-[37px] px-[180px] font-nunito flex justify-center '>

                                <div>
                                    <div className='border-b-4 pb-[20px]    mb-[40px] mt-[45px]'>

                                        <h1 className='font-bold text-white text-center text-3xl '>Login your account !</h1>

                                    </div>

                                    <div className='relative border rounded-[8.6px]   bg-white w-[427px] py-[16px] px-[20px] mb-[50px] mt-[45px]'>
                                        <input onChange={inputEmailData} value={email} type="text" placeholder='Email Address' className='  outline-none  w-[350px] ' />
                                        {
                                            emailError &&
                                            <p className=' absolute top-[61px] left-[20px] py-[5px] px-[10px] bg-[#ff6348] inline-block rounded text-white font-semibold '>{emailError} </p>
                                        }

                                    </div>



                                    <div className='relative border rounded-[8.6px]   bg-white w-[427px] py-[16px] px-[20px] mb-[50px] '>
                                        <input onChange={inputPasswordData} value={password} type="text" placeholder='Password' className='  outline-none  w-[350px] ' />
                                        {
                                            passwordError &&

                                            <p className=' absolute top-[61px] left-[20px] py-[5px] px-[10px] bg-[#ff6348] inline-block rounded text-white font-semibold '>{passwordError} </p>
                                        }

                                    </div>

                                    <div className='text-center '>
                                        <button onClick={loginNowBTN} className='bg-PurpleBlue inline-block py-[10px] px-[68px] text-white rounded-[8.6px] text-[18px] font-semibold '>Login Now</button>

                                        <p className='mt-[20px] font-semibold text-white '>Already  have an account ?<Link to='/registration' className='text-[#d35400] font-semibold pl-[10px] '>Sign Up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage