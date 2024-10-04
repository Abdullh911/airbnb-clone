import { useEffect } from "react";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Navbar from "../../Components/Navbar/Navbar";
import TypeCarousel from "../../Components/TypeCarousel/TypeCarousel";
import './Homepage.css'
import { useRecoilState } from "recoil";
import { cats, initFilters, isEnglish, isLoading, isStay, isTrips, isWishlist, listings, selectedCat, showContModal, showDateModal } from "../../StateMangement/State";
import homes from "../../Components/mockData";
import homesAr from "../../Components/mockDataAr";
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
        console.log(english);
        let temp2=Array(15).fill(false);
        temp2[0]=true;
        setCategories(temp2);
        let temp=english?homes:homesAr;
        temp=temp.filter(listing=>
            listing.category==="icons" || listing.category==="أيقونات"
        );
        setFiltered(temp);
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
        let temp=filterListings(english?homes:homesAr);
        setFiltered(temp);
    },[filters]);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowText(false);
    //     }, 3000); 
    //     return () => clearTimeout(timer);
    // }, []);
    return ( 
        <div className="homepage">
            
            <CardContainer/>
        </div>
     );
}
 
export default Homepage;