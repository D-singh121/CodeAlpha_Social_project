import { Button, Input } from '../components';
import { useState } from 'react';



const AuthPage = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true)

  const loginSignupHandler = () => {
    setIsLogin(!isLogin)
  }


  return (
    <>
      <section>
        <div className='w-screen h-screen flex items-center justify-center'>
          <div className='flex items-center justify-evenly w-[80%]'>
            <div>
              <img className='ml-5' width={"300px"} src="../../public/twitternew.png" alt="twitter-logo" />
            </div>
            
            <div>
              <div className='my-5'>
                <h1 className='font-bold text-6xl'>Happening now.</h1>
              </div>
              <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Singup"}</h1>
              <form className='flex flex-col w-[55%]'>
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
                      value={username}
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
                  children={isLogin ? "Login" : "Create Account"}
                />
                <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthPage; 