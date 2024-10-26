import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"


const Signup = () => {

    const [remeberLogin, setRememberLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {user, signUp} = UserAuth()
    const navigate = useNavigate()


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try{
            await signUp(email, password)
            navigate('/')
            
        } catch(err){
            console.log(err)
        }
        
    }
    return (
        <>
            <div className='w-full h-screen'>
                <img 
                className="hidden sm:block absolute w-full h-full object-cover"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_small.jpg" alt="///" />

                <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

                <div className="fixed w-full px-4 py-24 z-20">
                    <div className='max-w-[450px] h-[600px] mx-auto bg-black/70 rounded-lg '>
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className='text-3xl font-sans-bold'>Sign up</h1>

                            <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
                            <input 
                            className='p-3 my-2 bg-gray-700 rounded'
                            type="email" 
                            placeholder="email" 
                            autoComplete="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            />

                            <input 
                            className='p-3 my-2 bg-gray-700 rounded'
                            type="password" 
                            placeholder="password" 
                            autoComplete="current-password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className="bg-red-600 py-3 rounded font-sans-bold">Sing Up</button>

                            <div className='flex justify-between items-center text-gray-600'>
                                <p>
                                    <input 
                                    type='checkbox' 
                                    className="mr-2" 
                                    checked={remeberLogin} 
                                    onChange={(e) => setRememberLogin(!remeberLogin)}
                                    />Remember me
                                </p>
                                <p>Need help?</p>
                            </div>
                                <p className="my-4">
                                    <span className="text-gray-600 mr-2">Already subscribed to Netflix?</span>
                                    <Link to='/login'>Sign In</Link>
                                </p>
                            

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default Signup 