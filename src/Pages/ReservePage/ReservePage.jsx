import { useRecoilState } from "recoil";
import { currUser, isReservePage, showSignup } from "../../StateMangement/State";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ReservePage.css'
import homes from "../../Components/mockData";
import Loader from "../../Components/Loader";
const ReservePage = () => {
    let {id,price,nights,inDate,outDate}=useParams();
    let [reserve,setReserve]=useRecoilState(isReservePage);
    let [showSmodal,setShowSmodal]=useRecoilState(showSignup);
    let [curr,setCurr]=useRecoilState(currUser);
    let [loading,setLoading]=useState(false);
    let navigate=useNavigate();
    useEffect(()=>{
        console.log("hi");
        
        setReserve(true);
        return ()=>{
            setReserve(false);
        };
    },[])

    function reserveHome(){
        let reservation={
            start:inDate,
            end:outDate,
            total:nights*price,
            nights:nights,
            home:homes[id-1]
        }
        if(nights>0 && curr){
            let temp = { ...curr, trips: [...curr.trips] };
            temp.trips.push(reservation);
            setCurr(temp);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate('/trips');
            }, 3000);
        }
        else if(!curr){
            setShowSmodal(true);
        }
    }
    if(loading){
        return (
            <Loader/>
        )
    }
    return ( 
        
        <div className="reservationPage">
            <h1 className="text-3xl font-semibold mb-8 ">Confirm and Pay</h1>
            <div className="reservationPageCont">
            
                <div className="w-full md:w-1/2">
                    
                    <h1 className="text-xl font-semibold mb-5 ">Your trip</h1>
                    <div className="mb-5 text-lg">
                        <p>Dates</p>
                        <p>{inDate} to {outDate}</p>
                    </div>
                    <div className="border-b-2 pb-4 text-lg">
                        <p>Guests</p>
                        <p>1 guest</p>
                    </div>
                    <div className="border-b-2 pb-4 mt-4">
                        <h1 className="text-xl font-semibold mb-8">Pay with</h1>
                        <p className="text-lg"><i class="fa-brands fa-cc-mastercard mr-5"></i> 5408************</p>
                    </div>
                    <div className="border-b-2 pb-4 mt-4">
                        <h1 className="text-xl font-semibold mb-8">Non-refundable</h1>
                        <p className="text-lg">This reservation is non-refundable. <span className="underline">Learn more</span></p>
                    </div>
                    <div className="border-b-2 pb-4 mt-4">
                        <h1 className="text-xl font-semibold mb-8">Ground rules</h1>
                        <p className="text-lg">We ask every guest to remember a few simple things about what makes a great guest.</p>
                    </div>
                    <div>
                        <button onClick={reserveHome} className="mb-20 my-5 rounded-xl w-48 h-12 bg-purple-600 text-white text-nowrap">Confirm and pay</button>
                    </div>
                </div>
                <div className="w-full md:w-[40%] border-2 h-max p-8 rounded-2xl">
                    <div>
                        <div className="roomData">
                            <img src={homes[id-1].pictures[0]} alt="" />
                            <div>
                                <p>{homes[id-1].title}</p>
                                <p>{homes[id-1].type}</p>
                                <p><i class="fa-solid fa-star"></i> {homes[id-1].rating} </p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold mb-5 ">Price Details</h1>
                            <div className="flex justify-between mb-5">
                                <p>{homes[id-1].pricePerNight}$ X {nights}</p>
                                <p>{nights*homes[id-1].pricePerNight}$</p>
                            </div>
                            <div className="flex justify-between border-b-2 pb-5 mb-5">
                                <p>Long stay discount</p>
                                <p>-30$</p>
                            </div>
                        </div>
                        <div className="flex justify-between pb-5 mb-5">
                            <p>Total</p>
                            <p>{nights*homes[id-1].pricePerNight-30}$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ReservePage;