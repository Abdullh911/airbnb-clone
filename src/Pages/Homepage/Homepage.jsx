import { useEffect } from "react";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Navbar from "../../Components/Navbar/Navbar";
import TypeCarousel from "../../Components/TypeCarousel/TypeCarousel";
import './Homepage.css'
import { useRecoilState } from "recoil";
import { cats, initFilters, isEnglish, isLoading, isStay, isTrips, isWishlist, listings, selectedCat, showContModal, showDateModal } from "../../StateMangement/State";
import homes from "../../Components/mockData";
import homesAr from "../../Components/mockDataAr";
import { getAllHomes } from "../../Components/dataFetch";
const Homepage = () => {
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let [showText,setShowText]=useRecoilState(isLoading);
    const [filtered, setFiltered] = useRecoilState(listings);
    let [categories,setCategories] = useRecoilState(selectedCat);
    let [filters,setFilters]=useRecoilState(initFilters);
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    let [showDmodal,setShowDmodal]=useRecoilState(showDateModal);
    let [english,setEnglish]=useRecoilState(isEnglish);
    useEffect(()=>{
        async function update(){
            let temp2=Array(15).fill(false);
            temp2[0]=true;
            setCategories(temp2);
            let language=english?'en':'ar';
            let temp=await getAllHomes(language);
            setFiltered(temp);
        }
        setShowText(true)
        update();
        const timer = setTimeout(() => {
            setShowText(false);
        }, 1500); 
        return () => clearTimeout(timer);
    },[]);
    useEffect(()=>{
        setIsTp(false);
        setIsWish(false);
        setIsRoomPage(false);
        setShowCmodal(false);
        setShowDmodal(false);
    },[]);
    useEffect(()=>{
        const filterListings = (listingss) => {
            
            if(filters.type === 'Any'){
                return listingss.filter(listing => 
                    (listing.category.toLowerCase()==="icons"||listing.category==="أيقونات")&&
                    listing.beds >= filters.minBeds &&
                    listing.bedrooms >= filters.minBedrooms &&
                    listing.pricePerNight >= filters.minPrice &&
                    listing.pricePerNight <= filters.maxPrice
                  )
            }
            return listingss.filter(listing => 
                (listing.category.toLowerCase()==="icons"||listing.category==="أيقونات")&&
              listing.type === filters.type &&
              listing.beds >= filters.minBeds &&
              listing.bedrooms >= filters.minBedrooms &&
              listing.pricePerNight >= filters.minPrice &&
              listing.pricePerNight <= filters.maxPrice
            )
        }
        
        async function update() {
            let temp=await getAllHomes(english?'en':'ar');
            temp=filterListings(temp);
            setFiltered(temp);
        }
        update();
        
    },[filters]);
    return ( 
        <div className="homepage">
            <CardContainer/>
        </div>
     );
}
 
export default Homepage;