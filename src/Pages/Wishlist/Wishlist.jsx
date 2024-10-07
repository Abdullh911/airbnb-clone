import { useRecoilState } from 'recoil';
import './Wishlist.css'
import { currUser, isEnglish, isStay, isWishlist, langCode } from '../../StateMangement/State';
import Card from '../../Components/Card/Card';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homes from '../../Components/mockData';
import homesAr from '../../Components/mockDataAr';
const Wishlist = () => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    let navigate=useNavigate();
    useEffect(()=>{
        setIsWish(true);
    },[])
    return ( 
        <div>
            {curr&&<div className="wishContainer">
                {curr.wishlist.map(homeId => (
                    <Card key={homeId} home={english?homes[homeId-1]:homesAr[homeId-1]} />
                ))}
            </div>}
            {!curr&&<div className='relative top-20'>
                <h1>Oops nothing is here.....</h1>
            </div>}
        </div>
     );
}
 
export default Wishlist;