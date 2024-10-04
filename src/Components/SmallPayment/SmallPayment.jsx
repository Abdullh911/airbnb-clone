import { useState } from "react";
import SmallDate from "../SmallDateInput";
import './SmallPayment.css'
import { useRecoilState } from "recoil";
import { currUser } from "../../StateMangement/State";
import { useNavigate } from "react-router-dom";
const SmallPayment = ({price,home}) => {
    let [total,setTotal]=useState(0);
    let [nights,setNights]=useState(0);
    let [start,setStart]=useState("");
    let [end,setEnd]=useState("");
    let [curr,setCurr]=useRecoilState(currUser);
    let navigate=useNavigate()
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
        <div className="smallPay">
            <div className="price">
                <h2>{price}$ night</h2>
                <SmallDate setAll={setParams}/>
            </div>
            <div>
                <button onClick={toResPage} className="bg-[#e41d55] text-white px-7 rounded-lg h-12">
                    Reserve
                </button>
                <p className="flex justify-between"><span>Total</span><span>{total}$</span></p>
            </div>
        </div>
     );
}
 
export default SmallPayment;