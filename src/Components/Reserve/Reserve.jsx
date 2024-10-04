import { useState } from "react";
import SmallDate from "../SmallDateInput";
import { useRecoilState } from "recoil";
import { currUser } from "../../StateMangement/State";
import { useNavigate } from "react-router-dom";

const Reserve = ({price,home}) => {
    let [total,setTotal]=useState(0);
    let [nights,setNights]=useState(0);
    let [start,setStart]=useState("");
    let [end,setEnd]=useState("");
    let [curr,setCurr]=useRecoilState(currUser);
    let navigate=useNavigate();
    function setParams(nights,end,start){
        setTotal(nights*price);
        setNights(nights);
        setStart(start);
        setEnd(end);
    }
    
    function toResPage(){
        if(nights==0){
            return;
        }
        navigate(`/book/${home.id}/${home.pricePerNight}/${nights}/${start}/${end}`);
    }
    return ( 
        <>
            <h1 className="mb-5 text-[20px]"> {price}$ night</h1>
            <SmallDate setAll={setParams}/>
            <div  className="border-2 rounded-lg mt-3 p-2">
                <p className=''>{1} Adults, {1} Children, {1} Infants & {1} Pet</p>
            </div>
            <div className="flex justify-center mt-3">
                <button onClick={toResPage}  className="bg-[#e41d55] text-white w-full rounded-lg h-12">Reserve</button>
            </div>
            <div className="flex justify-center my-5">
                <p className="text-sm">You won't be charged yet</p>
            </div>
            <div >
                <div className="flex justify-between mb-3">
                    <p>{price}$ X {nights} nights</p>
                    <p>{total}$</p>
                </div>
                <div className="border-t-2 pb-8 flex justify-between mt-4 ">
                    <p>Total before taxes</p>
                    <p>{total}$</p>
                </div>
            </div>
        </>
     );
}
 
export default Reserve;