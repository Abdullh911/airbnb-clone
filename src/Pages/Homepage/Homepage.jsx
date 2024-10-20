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

    const [lastIndex, setLastIndex] = useState(0); // Keeps track of the last index of loaded items
    const [pageSize, setPageSize] = useState(0);
    const [allHomes, setAllHomes] = useState([]); // Store all fetched homes to avoid re-fetching

    // Fetch initial homes and set up the filters
    useEffect(() => {
        async function update() {
            let temp2 = Array(15).fill(false);
            temp2[0] = true;
            setCategories(temp2);
            
            let language = english ? 'en' : 'ar';
            let temp = await getAllHomes(language);
            setAllHomes(temp); // Store all homes once fetched
            
            const portionSize = Math.ceil(temp.length * 0.25); // Set portion size to 25%
            setPageSize(portionSize);
            
            const initialFiltered = filterListings(temp.slice(0, portionSize)); // Slice the first 25% of listings
            setFiltered(initialFiltered);
            setLastIndex(portionSize);
        }
        setShowText(true);
        update();
        setShowText(false);
    }, [english, filters]);

    // Reset some states on mount
    useEffect(() => {
        setIsTp(false);
        setIsWish(false);
        setIsRoomPage(false);
        setShowCmodal(false);
        setShowDmodal(false);
    }, []);

    // Filter logic
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

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 200) {
                // Check if there's more data to load
                if (lastIndex >= allHomes.length) {
                    return; // No more data to load
                }

                // Load the next portion of items
                const nextItems = allHomes.slice(lastIndex, lastIndex + pageSize);
                const newFiltered = filterListings(nextItems);

                // Append new items to the filtered list
                setFiltered(prev => [...prev, ...newFiltered]);
                setLastIndex(lastIndex + pageSize); // Update the last index to track the loaded items
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastIndex, allHomes, pageSize, filters]);

    return ( 
        <div className="homepage">
            <CardContainer />
        </div>
    );
};

export default Homepage;
