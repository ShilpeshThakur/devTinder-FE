import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store)=>store.requests)
    const dispatch = useDispatch();

    const fetchRequest = async()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true,
            })
            dispatch(addRequest(res?.data?.data))
        }catch(err){
            // Error

        }
    }

    useEffect(()=>{
        fetchRequest()
    },[])
    
    if(!requests) return;

    if(requests.length === 0) return; <h1 className="text-bold text-2xl">No Requests found.</h1>
    
  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-4xl">Requests</h1>

        {requests.map((request)=>{
            const { _id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId

            return (
                <div key={_id} className="flex justify-between items-center m-4 p-4 rounded bg-base-300 w-2/3 mx-auto">
                    <div>
                          <img alt="photo" className="w-20 h-20" src={photoUrl}/>
                    </div>
                    <div className="text-left mx-4">
                        <h2 className="font-bold text-xl">{firstName + " " + lastName} </h2>
                        {age && gender && <p>{age +","+ gender}</p>}
                        <p>{about}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary mx-2">Reject</button>
                        <button className="btn btn-secondary mx-2">Accept</button>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Requests