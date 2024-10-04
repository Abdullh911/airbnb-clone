import { useEffect, useState } from 'react';
import './RoomNav.css'
import { useRecoilState } from 'recoil';
import { currUser, showSignup } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';
const RoomNav = ({home}) => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [showS,setShowS]=useRecoilState(showSignup);
    let [iconStyle,setIconStyle]=useState("");
    let navigate=useNavigate();
    function addFav() {
        if (curr) {
            let temp = { ...curr, wishlist: [...curr.wishlist] };
            if(checkIsFav()){
                const index = temp.wishlist.findIndex(obj => obj.id === home.id);
                temp.wishlist.splice(index, 1);
            }
            else{
                temp.wishlist.push(home);
            }
            setCurr(temp);            
        } else {
            setShowS(1); 
        }
    }
    function checkIsFav(){
        let isFavorite;
        if(curr){
            isFavorite = curr.wishlist.some(card => card.id === home.id);
        }
        return isFavorite;
    }
    
    useEffect(()=>{
        let isFavorite=true;
        isFavorite=checkIsFav();
        setIconStyle(curr&&isFavorite ? 'fa-solid' : 'fa-regular');
    },[curr])
    return ( 
        <div className='bg-white z-10 border-b-[1px] fixed top-0 flex md:hidden justify-between w-full h-20 items-center'>
            <button onClick={()=>{
                navigate('/');
            }} className=' p-3'>
                <i class="fa-solid fa-chevron-left"></i>
                home
            </button>
            <i onClick={addFav} className={`${iconStyle} fa-heart relative right-3 z-10 text-[20px] cursor-pointer hover:scale-110`} style={{ color: '#ff385c' }}></i>
        </div>
     );
}
 
export default RoomNav;