import { useRecoilState } from 'recoil';
import './SearchBarSmallD.css'
import { mobileSearchModal } from '../../StateMangement/State';
const SearchBarSmallD = () => {
    let [showMobileSearch,setMobileSearch]=useRecoilState(mobileSearchModal);
    return ( 
        <div onClick={()=>{
            setMobileSearch(true);
        }} className="small-S">
            <i class="z fa-solid fa-magnifying-glass"></i>
            <div className='searchCont'>
                <p className='text-[14px] font-bold'>Where to?</p>
                <div className='searchHolder'>
                    <p className='uncomp'>Anywhere </p>
                    <p>&nbsp;·&nbsp;</p>
                    <p className='uncomp'>Any week </p>
                    <p>&nbsp;·&nbsp;</p>
                    <p className='uncomp'>Add guests </p>
                </div>
            </div>
        </div>
     );
}
 
export default SearchBarSmallD;