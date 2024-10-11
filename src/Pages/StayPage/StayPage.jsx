import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isEnglish, isLoading, isStay, langCode, showContModal, showDateModal } from "../../StateMangement/State";
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
import langs from '../../langs';
import homesAr from "../../Components/mockDataAr";

const StayPage = () => {
    let {id}=useParams();
    let [english,setEnglish]=useRecoilState(isEnglish);

    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [data,setData]=useState(english?homes[id-1]:homesAr[id-1]);
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    let [showDmodal,setShowDmodal]=useRecoilState(showDateModal);
    let [isLoad,setIsload]=useRecoilState(isLoading);
    let [lang,setLang]=useRecoilState(langCode);

    useEffect(()=>{
        setIsRoomPage(true);
        setIsload(false);
        window.scrollTo(0, 0);
    },[id]);
    useEffect(()=>{
        console.log(homes[id-1]);
        
    },[])
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
            
            <div  className="stayBody">
                <h1 dir={`${english?'ltr':'rtl'}`} className="hidden md:block text-[26px] mb-7">{data.title}</h1>
                
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
                        <p>{langs[lang].showAll}</p>
                    </div>
                </div>
                <div className="stayDetails">
                    <div className={`flex w-full justify-between pr-[5%] ${english?'':'flex-row-reverse'}`}>
                        <div dir={`${english?'ltr':'rtl'}`} className="description">
                            <h2 className="text-[23px]">{langs[lang].entire}  {langs[lang].in} {data.city+", "+data.country}</h2>
                            <p  className="mb-7">6 {langs[lang].guests} · {data.bedrooms} {langs[lang].bedrooms} · {data.beds} {langs[lang].beds} · 1 {langs[lang].baths}</p>
                            <div className="guestFavoriteHome">
                                <img className="rome" src={img} alt="" />
                                <p className="w-[270px] hidden xl:block">{langs[lang].oneOfMost}</p>
                                <img className="w-20 h-14" src={stars} alt="" />
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-semibold text-[20px]">6</p>
                                    <p className="underline">{langs[lang].reviews}</p>
                                </div>
                            </div>
                            <div className="host">
                                <div className="text-white bg-pink-600 flex justify-center items-center w-9 h-9 rounded-full">
                                    P
                                </div>
                                <div>
                                <p className=" font-semibold">{langs[lang].hosted}</p>
                                <p className="text-gray-500 text-[13px]">{langs[lang].hostSpan}</p>
                                </div>
                            </div>
                            <div className="border-b-[1px] pb-5 mb-7">
                                <Services bePut={langs[lang].new_roomInHome} title={"Room in a home"} slogan={langs[lang].roomInHome}/>
                                <Services bePut={langs[lang].new_sharedSpaces} title={"Shared common spaces"} slogan={langs[lang].sharedSpaces}/>
                                <Services bePut={langs[lang].new_prvSpace} title={"Private attached bathroom"} slogan={langs[lang].prvSpace}/>
                                <Services bePut={langs[lang].new_grtExp} title={"Great check-in experience"} slogan={langs[lang].grtExp}/>
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
                                    <p className="font-bold text-[22px]">{langs[lang].guestFav}</p>
                                    <p className="w-80 text-gray-500">
                                        {langs[lang].oneOfMost}                                    
                                    </p>  
                                </div>
                                <div className="breakVote">
                                    <div className="votePoint">
                                        <p>{langs[lang].ovrAll}</p>
                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>{langs[lang].clean}</p>
                                            <p>4.8</p>
                                        </div>
                                        <i class="fa-solid fa-spray-can-sparkles"></i>
                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>{langs[lang].accuracy}</p>
                                            <p>4.8</p>
                                        </div>
                                        <i class="fa-regular fa-circle-check"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>{langs[lang].check_in}</p>
                                            <p>5.0</p>
                                        </div>
                                        <i class="fa-solid fa-key"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>{langs[lang].comm}</p>
                                            <p>4.8</p>
                                        </div>
                                        <i class="fa-regular fa-message"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>{langs[lang].loc}</p>
                                            <p>5.0</p>
                                        </div>
                                        <i class="fa-solid fa-map"></i>                                    </div>
                                    <div className="votePoint">
                                        <div>
                                            <p>{langs[lang].val}</p>
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