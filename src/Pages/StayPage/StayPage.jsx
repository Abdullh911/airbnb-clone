import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoading, isStay, showContModal, showDateModal } from "../../StateMangement/State";
import homes from "../../Components/mockData";
import './StayPage.css';
import img from '../../assets/guestFavortite.png'
import stars from '../../assets/5star.png'
import Services from "../../Components/Services/Services";
import Offers from "../../Components/Offers/Offers";
import leftLeaf from '../../assets/leftLeaf.png';
import rightleaf from '../../assets/rightLeaf.png';
import MeetHost from "../../Components/MeetYourHost/MeetHost";
import Reserve from "../../Components/Reserve/Reserve";
import SmallPayment from "../../Components/SmallPayment/SmallPayment";
import RoomNav from "../../Components/RoomNav/RoomNav";
import ImgCarousel from "../../Components/imgCarousel/ImgCarousel";
const StayPage = () => {
    let {id}=useParams();
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [data,setData]=useState(homes[id-1]);
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    let [showDmodal,setShowDmodal]=useRecoilState(showDateModal);
    let [isLoad,setIsload]=useRecoilState(isLoading);
    useEffect(()=>{
        setIsRoomPage(true);
        setIsload(false);
        window.scrollTo(0, 0);
    },[id]);
    useEffect(() => {
        const handleScroll = () => {
            setIsRoomPage(true);
            setShowCmodal(false);
            setShowDmodal(false)
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setIsRoomPage(false);
        };
    }, []);

    return ( 
        <div onClick={()=>{
            setIsRoomPage(true);
            setShowCmodal(false); 
        }} className="w-full">
            <RoomNav home={homes[id-1]}/>
            <ImgCarousel images={data.pictures} />
            <div className="stayAll">
            <SmallPayment home={homes[id-1]} price={data.pricePerNight}/>
            
            <div className="stayBody">
                <h1 className="hidden md:block text-[26px] mb-7">{data.title}</h1>
                
                <div className="imgs">
                    <div className="soloImg">
                        <img src={data.pictures[0]} alt="" />
                    </div>
                    <div className="grpImgs">
                        <img src={data.pictures[1]} alt="" />
                        <img className="rounded-tr-xl" src={data.pictures[2]} alt="" />
                        <img src={data.pictures[3]} alt="" />
                        <img className="rounded-br-xl" src={data.pictures[4]} alt="" />
                    </div>
                    <div className="showAllPics">
                        <i class="fa-solid fa-table-cells"></i>
                        <p>Show all photos</p>
                    </div>
                </div>
                <div className="stayDetails">
                    <div className="flex w-full justify-between pr-[5%]">
                        <div className="description">
                            <h2 className="text-[23px]">Entire {data.type} in {data.city+", "+data.country}</h2>
                            <p className="mb-7">6 guests · {data.bedrooms} bedrooms · {data.beds} beds · 1 bath</p>
                            <div className="guestFavoriteHome">
                                <img className="rome" src={img} alt="" />
                                <p className="w-[270px] hidden xl:block">One of the most loved homes on Airbnb,according to guests</p>
                                <img className="w-20 h-14" src={stars} alt="" />
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold text-[20px]">6</p>
                                    <p className="underline">Reviews</p>
                                </div>
                            </div>
                            <div className="host">
                                <div className="text-white bg-pink-600 flex justify-center items-center w-9 h-9 rounded-full">
                                    P
                                </div>
                                <div>
                                <p className=" font-semibold">Hosted by Piavi</p>
                                <p className="text-gray-500 text-[13px]">3 months hosting</p>
                                </div>
                            </div>
                            <div className="border-b-[1px] pb-5 mb-7">
                                <Services title={"Room in a home"} slogan={"Your own room in a home, plus access to shared spaces."}/>
                                <Services title={"Shared common spaces"} slogan={"You’ll share parts of the home with other guests."}/>
                                <Services title={"Private attached bathroom"} slogan={"This place has a bathroom that’s connected to your room."}/>
                                <Services title={"Great check-in experience"} slogan={"100% of recent guests gave the check-in process a 5-star rating."}/>
                            </div>
                            <Offers/>
                        </div>
                        <div className="w-[33%] shadow-2xl h-[30%] p-5 rounded-xl border-[1px] hidden md:block">
                            <Reserve home={homes[id-1]} price={data.pricePerNight}/>
                        </div>
                        
                    </div>
                    <div className="hostDes">
                        <div>
                            <div className="voteSec">
                                <div className="fullVote">
                                    <img src={leftLeaf} alt="" />
                                    <p className="text-[100px] font-semibold">5.0</p>
                                    <img src={rightleaf} alt="" />
                                </div>
                                <div className="w-full text-center flex flex-col items-center">
                                    <p className="font-bold text-[22px]">Guest favorite</p>
                                    <p className="w-80 text-gray-500">
                                        One of the most loved homes on Airbnb based on ratings, reviews, and reliability
                                    </p>  
                                </div>
                                <div className="breakVote">
                                    <div className="votePoint">
                                        <p>Overall rating</p>
                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>Cleanliness</p>
                                            <p>4.8</p>
                                        </div>
                                        <i class="fa-solid fa-spray-can-sparkles"></i>
                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>Accuracy</p>
                                            <p>4.8</p>
                                        </div>
                                        <i class="fa-regular fa-circle-check"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>Check-in</p>
                                            <p>5.0</p>
                                        </div>
                                        <i class="fa-solid fa-key"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>Communication</p>
                                            <p>4.8</p>
                                        </div>
                                        <i class="fa-regular fa-message"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>Location</p>
                                            <p>5.0</p>
                                        </div>
                                        <i class="fa-solid fa-map"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>Value</p>
                                            <p>5.0</p>
                                        </div>
                                        <i class="fa-solid fa-tag"></i>                                    </div>
                                </div>
                            </div>
                            <MeetHost/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
       
     );
}
 
export default StayPage;