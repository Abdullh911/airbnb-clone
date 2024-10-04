import { useRecoilState } from 'recoil';
import VDivider from '../VDivider';
import './SmallSearch.css'
import { isLarge, isStay, showContModal, showDateModal } from '../../StateMangement/State';
const SmallSearch = () => {
    let [visible,setVisible]=useRecoilState(isLarge);
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);
    let [isRoomPage,setIsRoomPage]=useRecoilState(isStay);
    let [showDmodal,setShowDmodal]=useRecoilState(showDateModal);
    return ( 
        <div className="SmallSearch font-[Poppins]">
            <div onClick={()=>{
                setVisible(true);
                setShowCmodal(true);
                setIsRoomPage(false);
                setShowDmodal(false);
            }} className="SmSearchCrit">
                <p className='font-semibold'>Anywhere</p>
            </div>
            <VDivider/>
            <div onClick={()=>{
                setVisible(true);
                setShowDmodal(true);
                setIsRoomPage(false);
                setShowCmodal(false);
            }} className="SmSearchCrit">
                <p className='font-semibold'>Any week</p>
            </div>
            <VDivider/>
            <div className=" SmSearchCrit ">
                <p className='font-normal'>Add guests</p>
            </div>
            <div id='searchBtnn'>
                <i class="y fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
     );
}
 
export default SmallSearch;