import { useEffect, useState } from "react";
import CardContainer from "../../Components/CardContainer/CardContainer";
import './Homepage.css';
import { useRecoilState } from "recoil";
import { initFilters, isEnglish, isLoading, listings, selectedCat, showContModal, showDateModal, isStay, isWishlist, isTrips } from "../../StateMangement/State";
import { getAllHomes } from "../../Components/dataFetch";

const Homepage = () => {
    let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
    let [isWish, setIsWish] = useRecoilState(isWishlist);
    let [isTp, setIsTp] = useRecoilState(isTrips);
    let [showText, setShowText] = useRecoilState(isLoading);
    const [filtered, setFiltered] = useRecoilState(listings);
    let [categories, setCategories] = useRecoilState(selectedCat);
    let [filters, setFilters] = useRecoilState(initFilters);
    let [showCmodal, setShowCmodal] = useRecoilState(showContModal);
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);
    let [english, setEnglish] = useRecoilState(isEnglish);
    useEffect(() => {
        async function update() {
            let temp2 = Array(15).fill(false);
            temp2[0] = true;
            setCategories(temp2);
            
            let language = english ? 'en' : 'ar';
            let temp = await getAllHomes(language);
            temp=filterListings(temp);
            setFiltered(temp);
        }
        setShowText(true);
        update();
        const timer = setTimeout(() => {
            setShowText(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, [english, filters]);

    useEffect(() => {
        setIsTp(false);
        setIsWish(false);
        setIsRoomPage(false);
        setShowCmodal(false);
        setShowDmodal(false);
    }, []);

    const filterListings = (listingsToFilter) => {
        if (filters.type === 'Any') {
            return listingsToFilter.filter(listing => 
                listing.beds >= filters.minBeds &&
                listing.bedrooms >= filters.minBedrooms &&
                listing.pricePerNight >= filters.minPrice &&
                listing.pricePerNight <= filters.maxPrice
            );
        }
        return listingsToFilter.filter(listing => 
            listing.type === filters.type &&
            listing.beds >= filters.minBeds &&
            listing.bedrooms >= filters.minBedrooms &&
            listing.pricePerNight >= filters.minPrice &&
            listing.pricePerNight <= filters.maxPrice
        );
    };

    

    return ( 
        <div className="homepage">
            <CardContainer containerList={filtered}/>
        </div>
    );
};

export default Homepage;
