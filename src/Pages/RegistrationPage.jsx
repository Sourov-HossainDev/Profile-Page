import React, { useState } from 'react'
import registrationIamage from '../assets/Registration Image.jpg'
import { BsFillChatFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const RegistrationPage = () => {
    const auth = getAuth();
    const naviget =useNavigate();

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState()
    const [fullNameError, setFullNameError] = useState();
    const [passwordError, setPasswordError] = useState();

    const [success, setSuccess] =useState();





    const inputEmailData = (e) => {
        setEmail(e.target.value)
        setEmailError('')
    }
    const inputFullNameData = (f) => {
        setFullName(f.target.value)
        setFullNameError('')
    }
    const inputPasswordData = (p) => {
        setPassword(p.target.value)
        setPasswordError('')
    }

    const registrationNowBNT = () => {
        if (!email) {
            setEmailError('Enter your Email')
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError('Enter your valid email')
        }
        if (!fullName) {
            setFullNameError('Enter your full name')
        }
        if (!password) {
            setPasswordError('Enter your password ')
        }
        if (email && fullName && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            createUserWithEmailAndPassword(auth, email, password).then(() => {
                
                toast.success('Registration done Plase verify your Email');
                setEmail('');
                setFullName('');
                setPassword('')
                sendEmailVerification(auth.currentUser)
                    setTimeout(() => {
                        naviget('/login')
                    }, 2000)
                    .then(() => {
                        console.log('verify your email')
                    });


            }).catch((error) => {
                console.log(error.code);
                if (error.code.includes('auth/email-already-in-use')) {
                    setEmailError('This email already used')

                }
            })
        }
    }

    return (
        <>
            <div>
                <div className='flex'>
                    <div className='w-2/4'>
                        <img className='w-full h-screen object-cover bg-no-repeat' src={registrationIamage} />
                    </div>
                    <div className='w-2/4'>
                        <div>
                            <ToastContainer position="top-center" autoClose={1000} theme="dark"/>
                            
                            <div className='bg-[#1dd1a1] w-full py-[25px]  '>
                                <BsFillChatFill className='text-6xl text-white m-auto ' />
                                <h1 className='text-white text-6xl font-milongo text-center mt-[30px] '>!WeChat</h1>
                            </div>
                            <div className='bg-regBg py-[40px] px-[70px] font-nunito flex justify-center '>

                                <div>
                                    <div className='relative border rounded-[8.6px]   bg-white w-[427px] py-[16px] px-[20px] mb-[40px] mt-[45px]'>
                                        <input onChange={inputEmailData} value={email} type="text" placeholder='Email Address' className='  outline-none  w-[350px] ' />
                                        {
                                            emailError &&
                                            <p className=' absolute top-[61px] left-[20px] py-[5px] px-[10px] bg-[#ff6348] inline-block rounded text-white font-semibold '>{emailError} </p>
                                        }

                                    </div>


                                    <div className='relative border rounded-[8.6px]   bg-white w-[427px] py-[16px] px-[20px] mb-[40px] '>
                                        <input onChange={inputFullNameData} value={fullName} type="text" placeholder='Full Name' className='  outline-none  w-[350px] ' />
                                        {
                                            fullNameError &&
                                            <p className=' absolute top-[61px] left-[20px] py-[5px] px-[10px] bg-[#ff6348] inline-block rounded text-white font-semibold '>{fullNameError} </p>
                                        }
                                    </div>


                                    <div className='relative border rounded-[8.6px]   bg-white w-[427px] py-[16px] px-[20px] mb-[40px] '>
                                        <input onChange={inputPasswordData} value={password} type="text" placeholder='Password' className='  outline-none  w-[350px] ' />
                                        {
                                            passwordError &&

                                            <p className=' absolute top-[61px] left-[20px] py-[5px] px-[10px] bg-[#ff6348] inline-block rounded text-white font-semibold '>{passwordError} </p>
                                        }

                                    </div>

                                    <div className='text-center pt-[20px] '>
                                        <p onClick={registrationNowBNT} className=' bg-PurpleBlue inline-block py-[10px] px-[68px] text-white rounded-[8.6px] text-[18px] font-semibold cursor-pointer '>Registration Now</p>

                                        <p className='pt-[10px] font-semibold '>Already  have an account ? <Link to='/login' className='font-semibold text-[#d35400] ' >Sign In</Link></p>
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

export default RegistrationPage