import { useRecoilState } from "recoil";
import { currUser, isStay, isTrips } from "../../StateMangement/State";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [isRoomPage,setIsRoomPage] = useRecoilState(isStay);
    let [isTp,setIsTp] = useRecoilState(isTrips)
    let navigate=useNavigate();
    useEffect(()=>{
        console.log(curr);
        setIsTp(true);
    },[])
    return ( 
        <div className="relative top-32  p-5">
            {curr&&<div className="flex flex-wrap gap-5 pl-7">
                {curr.trips.map((trip,index)=>(
                    <div onClick={()=>{
                        navigate(`/stay/${trip.home.id}`);
                    }} className="cursor-pointer shadow-lg w-[90%] md:w-[40%] lg:w-[23%] p-5 rounded-xl font-[Poppins] flex flex-col gap-5 border-[1px]">
                        <div className="flex justify-between">
                            <p>Start: {trip.start}</p>
                            <p>End: {trip.end}</p>
                        </div>
                        <p>{trip.nights} nights</p>
                        <p>Total: {trip.total}$</p>
                    </div>
                ))}
            </div>}
        </div>
     );
}
 
export default Reservations;