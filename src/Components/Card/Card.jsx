import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Card.css';
import {Star,List,UserCircle} from '@phosphor-icons/react'
import homes from '../mockData';
import { useRecoilState } from 'recoil';
import { currUser, isLoading, showSignup } from '../../StateMangement/State';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loading from '../../assets/Loading.png'
const Card = ({ home }) => {
    let [curr,setCurr]=useRecoilState(currUser);
    let [showS,setShowS]=useRecoilState(showSignup);
    let [iconStyle,setIconStyle]=useState("");
    let [showText,setShowText]=useRecoilState(isLoading);
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
        <div onClick={()=>{
            
        }} className="cursor-pointer relative flex-shrink-0 w-full sm:w-[40%] md:w-[48%] lg:w-[31%] xl:w-[22%] mb-10 card">
            
            <i onClick={addFav} className={`${iconStyle} fa-heart absolute right-3 top-3 z-10 text-[20px] cursor-pointer hover:scale-110`} style={{ color: '#ff385c' }}></i>
            <div className='w-full h-[280px] mb-3 swiperCont' >
                <Swiper
                    className='h-full swiperCard '
                    spaceBetween={10}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        480: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 10 },
                        768: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 1, spaceBetween: 10 },
                        1200: { slidesPerView: 1, spaceBetween: 10 },
                    }}
                >
                    {home.pictures.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img onClick={()=>{
                                navigate(`/stay/${home.id}`);
                            }} className=' h-full object-cover w-full rounded-lg' src={!showText?image:loading} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div 
            onClick={()=>{
                navigate(`/stay/${home.id}`);
            }} className='w-full font-[Poppins]'>
                <div className='flex w-full justify-between'>
                    <p className={`${!showText?'font-[450] text-[14px] w-full flex justify-between':'loadingCardContent'}`} >{home.city+", "+home.country}</p>
                    <p className={`${!showText?'flex items-center text-[14px] gap-1':'loadingCardContent'}`}><span className={`${!showText?'':'opacity-0'}`}><Star size={12} color="#0f0f0f" weight="fill" /></span> {home.rating} </p>
                </div>
                <p className={`${!showText?'text-gray-500 text-[15px]':'loadingCardContent'}`}>{home.kilometersAway+" Kilometers away"}</p>
                <p className={`${!showText?'text-gray-500 text-[15px]':'loadingCardContent'}`} >Oct 18-23</p>
                <p className={`${!showText?' text-[15px]':'loadingCardContent'}`}><span className='font-semibold'>{home.pricePerNight}$</span> night</p>
            </div>
        </div>
    );
};

export default Card;
