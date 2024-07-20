import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios'
import { USER_API_URL_POINT } from '../Utils/Constant';
import { Button, Input } from '../components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser, setLoading } from '../Redux/userSlice';


const AuthPage = () => {

  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true)
  const loginSignupHandler = () => {
    setIsLogin(!isLogin)
  }

  const navigate = useNavigate(); // for redirection
  const dispatch = useDispatch(); // for saving the response in redux store


  const { isLoading } = useSelector(store => store.user) // from user store
  // console.log(isLoading);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {

      // login handler
      dispatch(setLoading(true))
      try {
        const loginData = { email, password };
        const loginRes = await axios.post(`${USER_API_URL_POINT}/login`, loginData, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        dispatch(getLoggedUser(loginRes?.data?.user))

        if (loginRes.data.success) {
          toast.success(loginRes.data.message);
          navigate("/");
        }
      } catch (error) {
        // console.log(error);
        toast.success(error.response.data.message)
      } finally {
        dispatch(setLoading(false))
      }

    } else {
      //Register
      dispatch(setLoading(true))
      try {
        const registerData = { name, userName, email, password };
        // console.log(registerData);
        dispatch(setLoading(true))
        const registerRes = await axios.post(`${USER_API_URL_POINT}/register`, registerData, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        dispatch(setLoading(false))
        if (registerRes.data.success) {
          setIsLogin(true);
          toast.success(registerRes.data.message);
        }
      } catch (error) {
        dispatch(setLoading(false))
        toast.success(error.response.data.message);
        // console.log(error);
      } finally {
        dispatch(setLoading(false))
      }
    }

    setName("")
    setUsername("")
    setEmail("")
    setPassword("")
  }


  return (
    <>
      <section>
        <div className='w-screen h-screen flex items-center justify-center'>
          <div className='flex items-center justify-evenly w-[80%]'>
            <div>
              <img className='ml-5' width={"300px"} src="/twitternew.png" alt="twitter-logo" />
            </div>

            <div>
              <div className='my-5'>
                <h1 className='font-bold text-6xl'>Happening now.</h1>
              </div>
              <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Singup"}</h1>

              <form className='flex flex-col w-[55%]' onSubmit={SubmitHandler} >
                {
                  !isLogin && (<>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name'
                      userClassName="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                    />

                    <Input
                      type="text"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='UserName'
                      userClassName="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                    />
                  </>)
                }

                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  userClassName="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />

                <Input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  userClassName="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />

                <Button
                  // type='submit'
                  userClassName='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'
                  children={!isLoading ? (isLogin ? "Login" : "Create Account") : ("Loading....")}
                />
                <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer hover:underline'>{isLogin ? "Signup" : "Login"}</span></h1>

                {
                  isLogin ? <p onClick={() => navigate("/forgetpass")} className=' text-blue-600 font-medium cursor-pointer hover:underline'>Forget Password</p> : ""
                }

              </form>
            </div>
          
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthPage; 