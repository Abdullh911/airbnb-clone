import LargeSearch from '../LargeSearch/LargeSearch';
import SmallSearch from '../SmallSearch/SmallSearch';
import './Navbar.css';
import { useRecoilState } from 'recoil';
import { currUser, isLarge, isLoading, isReservePage, isStay, isTrips, isWishlist, showModal, showUserMenu } from '../../StateMangement/State';
import { Globe, List, UserCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import UserMenu from '../UserMenu/UserMenu';
import Switch from '../Switch/Switch';
import TypeCarousel from '../TypeCarousel/TypeCarousel';
import { useNavigate } from 'react-router-dom';
import SmallDate from '../SmallDateInput';
import LargeDate from '../../LargeDate';

const Navbar = () => {
    let [isRoomPage,setIsRommPage]=useRecoilState(isStay);
    const [visible, setVisible] = useRecoilState(isLarge);
    const [isAnimating, setIsAnimating] = useState(false);
    let [showU,setShowU]=useRecoilState(showUserMenu);
    let [curr,setCurr]=useRecoilState(currUser);
    let [showM,setShowM]=useRecoilState(showModal);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let [showText,setShowText]=useRecoilState(isLoading);
    let [reserve,setReserve]=useRecoilState(isReservePage);

    let navigate=useNavigate();
    useEffect(() => {
        
        if (!visible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div className='navbar'>
            <div className='navP1'>
                
                <div onClick={()=>{
                    navigate('/');
                }} className='logo'>
                    <i id='logoPic' className="fa-brands fa-airbnb fa-2xl"></i>
                    <h1 className='logoText'>airbnb</h1>
                </div>
                {(!isWish&&!isTp&&!isRoomPage&&visible) && (
                    <div className={`btnStays ${reserve?'opacity-0':''}`}>
                        <div className={`${!showText?'p-3 font-semibold f':'loadingNormal'}`}>Stays</div>
                        <div className={`${!showText?'st f':'loadingNormal'}`}>Experiences</div>
                    </div>
                )}
                {!reserve&&(isRoomPage||!visible) && <SmallSearch />}

                <div className={`user ${reserve?'opacity-0':''}`}>
                    <div className='relative  '>
                        <div className='flex items-center gap-4'>
                            <Globe size={18} color="#0f0f0f" />
                            <div className='userOptn' onClick={()=>{
                                setShowU(!showU)
                            }}>
                                <List size={18} color="#0f0f0f" />
                                {!curr&&<UserCircle size={32} color="#6a6a6a" weight="fill" />}
                                {curr&&<div className='profilePic'>
                                    {curr.email.charAt(0).toUpperCase()}
                                </div>}
                            </div>
                        </div>
                        
                        {showU&&<UserMenu/>}
                    </div>
                    
                </div>
            </div>
            <div
                className={`navP2 border-b-[1px]  transition-transform duration-500 ease-in-out ${
                    visible ? 'translate-y-0 opacity-100 scale-x-100' : isAnimating ? ' opacity-0 scale-x-0' : ''
                }`}
               
            >
                {(!isWish&&!isTp&&!isRoomPage&&visible) && <LargeSearch />}

            </div>
            {!isRoomPage&&<div className={`${reserve?'md:hidden':'md:flex'} w-[100%] md:px-28 lg:px-0   gap-1 mb-[8px] justify-center items-center hidden -z-10`}>
                    <div className='w-[65%] z-0'>
                        <TypeCarousel/>
                    </div>
                    <div className=' flex gap-4 w-max '>
                        <button onClick={()=>{
                            setShowM(true);
                        }} className='fltrBtn'><i class="fa-solid fa-sliders"></i>Filters</button>
                        <div className='fltrBtn'>
                            <p className='text-[12px] text-nowrap'>Display total before taxes</p>
                            <Switch/>
                        </div>
                    </div>
            </div>}
        </div>
    );
}

export default Navbar;
