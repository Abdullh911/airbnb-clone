import { useRecoilState } from 'recoil';
import './Wishlist.css'
import { currUser, isStay, isWishlist } from '../../StateMangement/State';
import Card from '../../Components/Card/Card';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let navigate=useNavigate();
    useEffect(()=>{
        setIsWish(true);
    },[])
    return ( 
        <div>
            {curr&&<div className="wishContainer">
                {curr.wishlist.map(home => (
                    <Card key={home.id} home={home} />
                ))}
            </div>}
            {!curr&&<div className='relative top-20'>
                <h1>Oops nothing is here.....</h1>
            </div>}
        </div>
     );
}
 
export default Wishlist;