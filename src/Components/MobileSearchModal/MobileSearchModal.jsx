import { useState } from 'react';
import Shrunk from '../Shrunk';
import './MobileSearchModal.css'
import LargeDate from '../../LargeDate';
import MobileDate from '../../MobileDate';
import MobileRegionContainer from '../MobileRegionContainer';
import { useRecoilState } from 'recoil';
import { mobileSearchModal } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';
const MobileSearchModal = () => {
    let [chosenDest,setChosenDest]=useState("I'm flexible");
    let [chosenDates,setChosenDates]=useState("Add Dates");
    let [extendedDest,setExtendedDest]=useState(true);
    let [extendedDates,setExtendedDates]=useState(false);
    let [show,setShow]=useRecoilState(mobileSearchModal);
    let navigate=useNavigate();
    function extendDestination(){
        setExtendedDest(true);
        setExtendedDates(false);
    }
    function extendDates(){
        setExtendedDest(false);
        setExtendedDates(true);
    }
    function nothing(){

    }
    function setRange(range){
        setChosenDates(range);
    } 
    function setDest(dest){
        setChosenDest(dest);
        extendDates();
    }
    return ( 
        <div className={`modalBody ${show?'':'hidden'}`}>
            <div className='exitStayExp'>
                    <div onClick={()=>{
                        setShow(false);
                    }} className='w-8 bg-white h-8 text-[13px] rounded-full border-[1px] border-gray-400 flex justify-center items-center'>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <h1 className='border-b-black border-b-2 pb-1'>
                        Stays
                    </h1>
                    <h1 className='text-[gray] pb-1'>
                        Experiences
                    </h1>
            </div>
            <div className='searchmodalContent'>
                <div>
                    <Shrunk clicked={extendDestination} first={"Where"} second={chosenDest} show={!extendedDest}/>
                    <MobileRegionContainer setDest={setDest} show={extendedDest}/>
                </div>
                <div>
                    <Shrunk clicked={extendDates} first={"When"} second={chosenDates} show={!extendedDates}/>
                    <div>
                        <MobileDate setRange={setRange} show={extendedDates}/>
                    </div>
                </div>
                <Shrunk clicked={nothing} first={"Who"} second={"Add Guests"} show={true}/>
            </div>
            <div className='searchFooter'>
                <p className='underline'>Clear All</p>
                <button onClick={()=>{
                    setShow(false);
                    if(chosenDest==="I'm flexible"){
                        navigate(`/search/flexible`);
                    }
                    else{
                        navigate(`/search/${chosenDest.toLowerCase()}`);
                    }
                    
                }} className='bg-[#d80665] rounded-xl p-3 w-32 text-white'><i style={{color:'white'}} class="fa-solid fa-magnifying-glass"></i> Search</button>
            </div>
        </div>
     );
}
 
export default MobileSearchModal;