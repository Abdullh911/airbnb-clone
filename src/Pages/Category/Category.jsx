import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cats, initFilters, isEnglish, isLoading, isStay, isTrips, isWishlist, listings, selectedCat } from "../../StateMangement/State";
import CardContainer from "../../Components/CardContainer/CardContainer";
import homes from "../../Components/mockData";
import homesAr from "../../Components/mockDataAr";

const Category = () => {
    let {category}=useParams();
    const [filtered, setFiltered] = useRecoilState(listings);
    let [categories,setCategories]=useRecoilState(cats);
    let [selected,setSelected] = useRecoilState(selectedCat);
    let [showText,setShowText]=useRecoilState(isLoading);
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let [filters,setFilters]=useRecoilState(initFilters);
    let [english,setEnglish]=useRecoilState(isEnglish);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(false);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);
    useEffect(()=>{
        setIsTp(false);
        setIsWish(false);
        setIsRoomPage(false);
    },[]);


    useEffect(()=>{
        const filterListings = (listingss) => {
            
            if(filters.type === 'Any'){
                return listingss.filter(listing => 
                    listing.category.toLowerCase()===category.toLocaleLowerCase()&&
                    listing.beds >= filters.minBeds &&
                    listing.bedrooms >= filters.minBedrooms &&
                    listing.pricePerNight >= filters.minPrice &&
                    listing.pricePerNight <= filters.maxPrice
                  )
            }
            return listingss.filter(listing => 
                listing.category.toLowerCase()===category.toLocaleLowerCase()&&
              listing.type === filters.type &&
              listing.beds >= filters.minBeds &&
              listing.bedrooms >= filters.minBedrooms &&
              listing.pricePerNight >= filters.minPrice &&
              listing.pricePerNight <= filters.maxPrice
            )
        }
        console.log(filters);
        
        let temp=filterListings(english?homes:homesAr);
        setFiltered(temp);
    },[filters,category]);


    useEffect(()=>{
        console.log(categories);
        console.log(english);
        
        let x=categories.findIndex(ct=>
            ct.toLowerCase()==category.toLowerCase()
        )
        console.log(category);
        
        let temp2=Array(15).fill(false);
        temp2[x]=true;
        setSelected(temp2);

    },[category])
    return ( 
        <div className="homepage">
            <CardContainer/>
        </div>
     );
}
 
export default Category;