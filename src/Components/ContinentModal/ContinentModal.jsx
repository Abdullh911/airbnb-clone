import flexible from '../../assets/flexible.jpg';
import europe from '../../assets/europe.jpg';
import greece from '../../assets/greece.jpg';
import seAsia from '../../assets/seAsia.jpg';
import italy from '../../assets/italy.jpg';
import usa from '../../assets/usa.jpg';
import './ContinentModal.css'
import { useRecoilState } from 'recoil';
import { isStay, showContModal } from '../../StateMangement/State';
const ContinentModal = ({setDestination}) => {
    const contImgs=[flexible,europe,italy,usa,greece,seAsia];
    const txts=["I'm flexible","Europe","Italy","United States","Greece","Southeast Asia"]
    let [showCmodal,setShowCmodal]=useRecoilState(showContModal);

    return ( 
        <div className={`contModal ${showCmodal?'':'hidden'}`}>
            <p className='mb-5 font-semibold'>Search by region</p>
            <div className='contContainer'>
                {contImgs.map((cont,index)=>(
                    <div onClick={()=>{
                        if(txts[index]==="I'm flexible"){
                            setDestination("flexible")
                        }
                        else{
                            setDestination(txts[index].toLocaleLowerCase());
                        }
                    }} className='contCard'>
                        <img src={cont} alt="" />
                        <p className='mt-3'>{txts[index]}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ContinentModal;