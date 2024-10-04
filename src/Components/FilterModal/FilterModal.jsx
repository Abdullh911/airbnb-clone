import { useEffect, useState } from 'react';
import './FilterModal.css';
import PriceRange from '../PriceRange/PriceRange';
import BedCounter from '../BedCounter/BedCounter';
import { useRecoilState } from 'recoil';
import { currCat, initFilters, listings, showModal } from '../../StateMangement/State';
import homes from '../mockData';
const FilterModal = () => {
    let tempFilters={
        type:'Any',
        minBeds:0,
        minBedrooms:0,
        minPrice:0,
        maxPrice:1000
    }
    let [list,setList]=useRecoilState(listings);
    const [chosens,setChosens]=useState([true,false,false]);
    let [storeFltrs,setSetStoreFltrs]=useRecoilState(initFilters)
    let [showM,setShowM]=useRecoilState(showModal);
    const [filters,setFilters]=useState(tempFilters);
    let [catCurr, setCatCurr]=useRecoilState(currCat);
    
    useEffect(()=>{
        if(storeFltrs.type=="Any"){
            select(0);

        }
        else if(storeFltrs.type=="Room"){
            select(1);
        }
        else{
            select(2);
        }
    },[])
    function reset(){
        setSetStoreFltrs(tempFilters);
        //startFilter(homes);
        setShowM(false);
    }
    function select(index){
        let temp =Array(3).fill(false);
        temp[index]=true;
        setChosens(temp);
        if(index==0){
            let temp=filters
            temp.type='Any';
            setFilters(temp);
        }
        else if(index==1){
            let temp=filters
            temp.type='Room';
            setFilters(temp);
        }
        else{
            let temp=filters
            temp.type='Home';
            setFilters(temp);
        }
        console.log();
        
    }
    function setPriceRange(range){
        let temp=filters;
        temp.minPrice=range[0];
        temp.maxPrice=range[1];
        setFilters(temp);
    }
    function setBeds(min){
        let temp=filters;
        temp.minBeds=min;
        setFilters(temp);
        
    }
    function setBedrooms(min){
        let temp=filters;
        temp.minBedrooms=min;
        setFilters(temp);
    }
    function startFilter(){
        //let temp=filterListings(homes);
        //setList(temp);
        setSetStoreFltrs(filters);
        setShowM(false);
    }
    
    
    const filterListings = (listingss) => {
        console.log(catCurr,listingss);
        
        if(filters.type === 'Any'){
            return listingss.filter(listing => 
                listing.category.toLowerCase()===catCurr.toLowerCase()&&
                listing.beds >= filters.minBeds &&
                listing.bedrooms >= filters.minBedrooms &&
                listing.pricePerNight >= filters.minPrice &&
                listing.pricePerNight <= filters.maxPrice
              )
        }
        return listingss.filter(listing => 
            listing.category.toLowerCase()===catCurr.toLowerCase()&&
          listing.type === filters.type &&
          listing.beds >= filters.minBeds &&
          listing.bedrooms >= filters.minBedrooms &&
          listing.pricePerNight >= filters.minPrice &&
          listing.pricePerNight <= filters.maxPrice
        )
    }
    const amenities=['Wifi','Kitchen','Washer','Dryer','Air conditioning','Heating'];
    const amenitiesIcons=[<i class="fa-solid fa-wifi"></i>,<i class="fa-solid fa-kitchen-set"></i>,<i class="fa-solid fa-hard-drive"></i>,<i class="fa-solid fa-wind"></i>,<i class="fa-regular fa-snowflake"></i>,<i class="fa-solid fa-temperature-three-quarters"></i>]
    const bookingOpts=['Instant book','Self check in','Free cancellation','Allow pets']
    const bookingOptsIcons=[<i class="fa-solid fa-bolt"></i>,<i class="fa-solid fa-key"></i>,<i class="fa-regular fa-calendar-xmark"></i>,<i class="fa-solid fa-paw"></i>]
    return ( 
        <div className="fixed w-full h-full z-40"> 
            <div className="backdrop" />
            <div className="filterModal">
                <div className="head">
                    <div className='title'>
                        <p>Filters</p>
                    </div>
                    <div onClick={()=>{
                        setShowM(false);
                    }} className='close'>
                        <i class="text-[18px] fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className='body'>
                    <div className='type'>
                        <h1 className='mb-7 text-[19px]'>
                            Type of place
                        </h1>
                        <div className='tabs'>
                            <button className={`${chosens[0]?'bg-gray-100 border-2 border-black':''}`} onClick={()=>{
                                select(0);
                            }}>
                                Any type
                            </button>
                            <button className={`${chosens[1]?'bg-gray-100 border-2 border-black':''}`} onClick={()=>{
                                select(1);
                            }}>
                                Rooms
                            </button>
                            <button className={`${chosens[2]?'bg-gray-100 border-2 border-black':''}`} onClick={()=>{
                                select(2);
                            }}>
                                Entire home
                            </button>
                        </div>
                    </div>
                    <div className='pricee'>
                        <h1 className=' text-[19px]'>
                            Price Range
                        </h1>
                        <p>Nightly prices before fees and taxes</p>
                        <PriceRange setRange={setPriceRange}/>
                    </div>
                    <div className='beds'>
                        <h1 className=' text-[19px]'>
                            Rooms and beds
                        </h1>
                        <BedCounter set={setBedrooms} title={"Bedrooms"}/>
                        <BedCounter set={setBeds} title={"Beds"}/>
                        <BedCounter title={"Bathrooms"}/>
                    </div>
                    <div className='amenties'>
                        <h1 className='text-[19px] mb-5'>
                            Amenties
                        </h1>
                        <div className='amenitiesCont'>
                            {amenities.map((amenity,index)=>(
                                <div className='select'>
                                    {amenitiesIcons[index]}
                                    <p>{amenity}</p>
                                </div>
                            ))}
                        </div>
                        <h1 className='showMore'>Show more    <i class="fa-solid fa-chevron-down"></i></h1>
                    </div>
                    <div className='bookingOpts'>
                        <h1 className='text-[19px] mb-5'>
                            Booking Options
                        </h1>
                        <div className='amenitiesCont'>
                            {bookingOpts.map((opt,index)=>(
                                <div className='select'>
                                    {bookingOptsIcons[index]}
                                    <p>{opt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='guestFav'>
                        <h1 className='text-[19px] mb-5'>Standout stays</h1>
                        <div className='guestFavorite w-[240px]'>
                            <i class="fa-solid fa-award text-[35px]"></i>
                            <div className='flex flex-col'>
                                <h2>Guest favourite</h2>
                                <p className='text-[14px] text-gray-500'>The most loved homes on Airbnb</p>
                            </div>
                        </div>
                    </div>
                    <div className='guestFav'>
                        <div className='flex justify-between items-center cursor-pointer'>
                            <h1 className='text-[19px]'>Property type</h1>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className='guestFav'>
                        <div className='flex justify-between items-center cursor-pointer'>
                            <h1 className='text-[19px]'>Accessibility features</h1>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className='guestFav'>
                        <div className='flex justify-between items-center cursor-pointer'>
                            <h1 className='text-[19px]'>Host language</h1>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div className='showBtnCont'>
                        <button onClick={reset} className='p-3 hover:bg-gray-200 rounded-xl font-bold'>
                            Clear all
                        </button>
                        <button onClick={startFilter} className='p-3 bg-black text-white rounded-xl font-bold'>
                            Show
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default FilterModal;
