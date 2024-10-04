import flexible from '../assets/flexible.jpg';
import europe from '../assets/europe.jpg';
import greece from '../assets/greece.jpg';
import seAsia from '../assets/seAsia.jpg';
import italy from '../assets/italy.jpg';
import usa from '../assets/usa.jpg';

const MobileRegionContainer = ({show,setDest}) => {
    const contImgs=[flexible,europe,italy,usa,greece,seAsia];
    const txts=["I'm flexible","Europe","Italy","United States","Greece","Southeast Asia"]
    return ( 
        <div className={`extendedDest ${show?'':'hidden'}`}>
            <h1 className='text-2xl font-bold mb-5'>Where To?</h1>
            <div className='flex items-center gap-4 p-3 rounded-xl border-[2px] w-[90%] mb-3'>
                <i style={{color:'black'}} class="fa-solid fa-magnifying-glass"></i>
                <input placeholder='Search Destinations' type="text" />
            </div>
            <div className='regionContainer'>
                {contImgs.map((cont,index)=>(
                    <div onClick={()=>{
                        setDest(txts[index]);
                    }} className='regionCard'>
                        <img className='rounded-xl' src={cont} alt="" />
                        <p className='mt-3'>{txts[index]}</p>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MobileRegionContainer;