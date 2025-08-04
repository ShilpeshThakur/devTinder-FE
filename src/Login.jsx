import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [emailId, setEmailId] = useState("akshay@gmail.com");
    const [password, setPassword] = useState("Akshay@1234");

    const handleLogin = async() =>{
        try{
            const res = await axios.post(
                "http://localhost:7777/login",{
                emailId,
                password
            }, {withCredentials: true}
        );
        }catch(err){
            console.log(err)
        } 
    }
  return (
    <div className="flex justify-center my-10">
        <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <div>
                    <label className="font-control w-full max-w-xs my-5">
                        <div className="label">
                            <span className="label-text">Email Id:</span>
                        </div>
                        <input 
                            type="text" 
                            value={emailId}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>setEmailId(e.target.value)}
                        />
                    </label>

                    <label className="font-control w-full max-w-xs my-5">
                        <div className="label mt-5">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                            type="text"
                            value={password} 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login