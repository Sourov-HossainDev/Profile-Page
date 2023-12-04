import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../Component/ProfilePage/ProfilePage';
import {userLoginInfo} from '../slice/UserSlice'


const Home = () => {
    const auth = getAuth();
    const naviget = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data);
    const [verify, setVerify] = useState(false);

    const backToLogin = ()=>{
      naviget('/login')
    }
    
      useEffect(() => {
        if (!data) {
          console.log('ok');
          naviget('/login')
    
        }
      })
    
     
    
      onAuthStateChanged(auth, (user)=>{
        console.log(user);
        if(user.emailVerified){
          dispatch(userLoginInfo(user));
          localStorage.setItem('userLoginInfo', JSON.stringify((user)) )
          setVerify(true)
        }
      })

    return (
        <>
            {
                verify

                    ?
                    <div>
                        <ProfilePage></ProfilePage>
                    </div>
                    :
                    <div className='bg-red-50  w-full h-screen pt-[315px] text-center '>
                        <h1 className='text-center text-8xl font-nunito font-bold text-[#eb2f06] '>Please verify your email</h1>
                        <p onClick={backToLogin} className='font-semibold mt-[30px] p-[20px] bg-PurpleBlue inline-block text-white rounded-[8.6px] cursor-pointer '>Back to Login</p>
                    </div>

            }
        </>
    )
}

export default Home