import { useParams } from "react-router-dom";
import CardContainer from "../../Components/CardContainer/CardContainer";
import { useRecoilState } from "recoil";
import { initFilters, isLarge, listings } from "../../StateMangement/State";
import { useEffect } from "react";
import homes from "../../Components/mockData";

const SearchPage = () => {
    let {destination}=useParams();
    let [filtered,setFiltered]=useRecoilState(listings);
    let [filters,setFilters]=useRecoilState(initFilters);
    useEffect(()=>{
        let temp;
        if(destination.toLocaleLowerCase()=="flexible"){
            temp=homes
        }
        else{
            temp=homes.filter(home=>(
                home.destination.toLowerCase()===destination.toLocaleLowerCase()
            ));
        }
        console.log(temp);
        
        temp=filterListings(temp);
        setFiltered(temp);

    },[destination,filters]);

    const filterListings = (listingss) => {
            
        if(filters.type === 'Any'){
            return listingss.filter(listing => 
                listing.beds >= filters.minBeds &&
                listing.bedrooms >= filters.minBedrooms &&
                listing.pricePerNight >= filters.minPrice &&
                listing.pricePerNight <= filters.maxPrice
              )
        }
        return listingss.filter(listing => 
          listing.type === filters.type &&
          listing.beds >= filters.minBeds &&
          listing.bedrooms >= filters.minBedrooms &&
          listing.pricePerNight >= filters.minPrice &&
          listing.pricePerNight <= filters.maxPrice
        )
    }
    return ( 
        <div className="homepage">
            <CardContainer/>
        </div>
     );
}
 
export default SearchPage;