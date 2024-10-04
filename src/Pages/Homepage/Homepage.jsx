import { useEffect } from "react";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Navbar from "../../Components/Navbar/Navbar";
import TypeCarousel from "../../Components/TypeCarousel/TypeCarousel";
import './Homepage.css'
import { useRecoilState } from "recoil";
import { cats, initFilters, isLoading, isStay, isTrips, isWishlist, listings, selectedCat, showContModal, showDateModal } from "../../StateMangement/State";
import homes from "../../Components/mockData";
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
    useEffect(()=>{
        let temp2=Array(15).fill(false);
        temp2[0]=true;
        setCategories(temp2);
        let temp=homes;
        temp=temp.filter(listing=>
            listing.category==="icons"
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
                    listing.category.toLowerCase()==="icons"&&
                    listing.beds >= filters.minBeds &&
                    listing.bedrooms >= filters.minBedrooms &&
                    listing.pricePerNight >= filters.minPrice &&
                    listing.pricePerNight <= filters.maxPrice
                  )
            }
            return listingss.filter(listing => 
                listing.category.toLowerCase()==="icons"&&
              listing.type === filters.type &&
              listing.beds >= filters.minBeds &&
              listing.bedrooms >= filters.minBedrooms &&
              listing.pricePerNight >= filters.minPrice &&
              listing.pricePerNight <= filters.maxPrice
            )
        }
        let temp=filterListings(homes);
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