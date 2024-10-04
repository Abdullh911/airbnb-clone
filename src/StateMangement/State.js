import { atom } from 'recoil';

import homes from '../Components/mockData';
export const isLarge = atom({
  key: 'isLarge', 
  default: true,
});
export const listings = atom({
    key: 'listings', 
    default: homes,
});
export const showModal = atom({
    key: 'showModal', 
    default: false,
});
export const initFilters = atom({
    key: 'initFilters', 
    default: {
        type:'Any',
        minBeds:0,
        minBedrooms:0,
        minPrice:0,
        maxPrice:1000
    },
});
export const showUserMenu = atom({
    key: 'showUserMenu', 
    default: false,
});
export const currUser = atom({
    key: 'currUser', 
    default: null,
});
export const users = atom({
    key: 'users', 
    default: [],
});
export const showSignup = atom({
    key: 'showSignup', 
    default: 0,
});
export const isStay = atom({
    key: 'isStay', 
    default: false,
});
export const isWishlist = atom({
    key: 'isWishlist', 
    default: false,
});
export const isTrips = atom({
    key: 'isTrips', 
    default: false,
});
export const isLoading = atom({
    key: 'isLoading', 
    default: true,
});
export const currCat = atom({
    key: 'currCat', 
    default: 'icons',
});
export const selectedCat = atom({
    key: 'selectedCat', 
    default: [true,Array(14).fill(false)],
});
export const cats=atom({
    key: 'cats', 
    default:['Icons','Farms','Amazing pools','OMG!','Arctic','Camping','Rooms','Amazing Views','Beach Front',"Trending",'Islands','Lakefront', "Surfing",'Cabins','Mansions']
});
export const showContModal = atom({
    key: 'showContModal', 
    default: false,
});
export const showDateModal = atom({
    key: 'showDateModal', 
    default: false,
});
export const mobileSearchModal = atom({
    key: 'mobileSearchModal', 
    default: false,
});
export const isReservePage = atom({
    key: 'isReservePage', 
    default: false,
});
