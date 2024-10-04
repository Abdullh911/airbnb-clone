import { useEffect, useState } from 'react';
import VDivider from '../VDivider';
import './LargeSearch.css';
import { useRecoilState } from 'recoil';
import { isLoading, isReservePage, isStay, showContModal, showDateModal } from '../../StateMangement/State';
import ContinentModal from '../ContinentModal/ContinentModal';
import { useLocation, useNavigate } from 'react-router-dom';
import LargeDate from '../../LargeDate';
const LargeSearch = () => {

    let [showText, setShowText] = useRecoilState(isLoading);
    let [showCmodal, setShowCmodal] = useRecoilState(showContModal);
    let [inDate,setInDate]=useState("Add Dates");
    let [outDate,setOutDate]=useState("Add Dates");
    let [dest,setDest]=useState("Search Destinations");
    const location = useLocation();
    const isStayRoute = location.pathname.startsWith('/stay');
    let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);
    let [reserve,setReserve]=useRecoilState(isReservePage);

    let navigate=useNavigate();
    function setDateRange(range){
        setInDate(range[0]);
        setOutDate(range[1]);
    }
    function setDestination(d){
        setDest(d);
        setShowCmodal(false);
    }
    return ( 
        <div className={`${reserve?'hidden':''} largeSearchCont font-[Poppins]`}>
            
            <div onClick={()=>{
                setShowCmodal(x=>!x);
                setShowDmodal(false);
            }} className="searchcrit ">
                <h5 className={`${!showText?'searchTxth':'loading'}`}>Where</h5>
                <p className={`${!showText?'searchTxtp':'loading'}`}>{dest}</p>
            </div>
            <VDivider/>
            <div onClick={()=>{
                setShowDmodal(x=>!x);
                setShowCmodal(false);
            }} className="searchcrit">
                <h5 className={`${!showText?'searchTxth':'loading'}`}>Check In</h5>
                <p className={`${!showText?'searchTxtp':'loading'}`}>{inDate}</p>
            </div>
            <VDivider/>
            <div onClick={()=>{
                setShowDmodal(x=>!x);
                setShowCmodal(false);
            }} className="searchcrit">
                <h5 className={`${!showText?'searchTxth':'loading'}`}>Check Out</h5>
                <p className={`${!showText?'searchTxtp':'loading'}`}>{outDate}</p>
            </div>
            <VDivider/>
            <div className="searchcrit ">
                
                    <h5 className={`${!showText?'searchTxth':'loading'}`}>Who</h5>
                    <p className={`${!showText?'searchTxtp':'loading'}`}>Add Guests</p>
                
                
            </div>
            <div onClick={()=>{
                if(dest!="Search Destinations"){
                    navigate(`/search/${dest}`);
                }
                
            }} id='searchBtn'>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <ContinentModal setDestination={setDestination}/>
            <LargeDate onRangeSelect={setDateRange}/>
        </div>
     );
}
 
export default LargeSearch;