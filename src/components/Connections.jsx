import React, { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {

    const [error,setError] = useState("");
    const connections = useSelector((store)=> store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () =>{
        try{
            const res = await axios.get(
                BASE_URL+"/user/connections",
                {withCredentials:true}
            );
            dispatch(addConnections(res?.data?.data))
        }catch(err){
            console.log(err);
            //handle error case
            setError(err?.response?.data || "Something went wrong.");
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return;

    if(connections.length === 0) return <h1 className="flex justify-center my-10">No connections found.</h1>;
    
  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-4xl">connection</h1>

        {connections.map((connection)=>{
            const { _id, firstName, lastName, photoUrl, age, gender, about} = connection

            return (
                <div key={_id} className="flex m-4 p-4 rounded bg-base-300 w-1/2 mx-auto">
                    <div>
                          <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl}/>
                    </div>
                    <div className="text-left mx-4">
                        <h2 className="font-bold text-xl">{firstName + " " + lastName} </h2>
                        {age && gender && <p>{age +","+ gender}</p>}
                        <p>{about}</p>
                    </div>
                </div>
            )
        })}
        <p className="text-red-500">{error}</p>
    </div>
  )
}

export default Connections