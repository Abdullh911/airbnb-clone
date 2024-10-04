import {Lock,Broadcast ,PawPrint,Snowflake,Calendar ,Drop,CarProfile ,Television,Broom,VideoCamera    } from '@phosphor-icons/react'
import Offer from './Offer';
const Offers = () => {
    return ( 
        <div className='w-full'>
            <h1 className='font-bold my-5'>
                What this place offers
            </h1>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                    <Offer icon={<Lock size={20} color="#0f0f0f" />} text={"Lock on bedroom door"}/>
                    <Offer icon={<Broadcast  size={20} color="#0f0f0f" />} text={"Wifi"}/>
                    <Offer icon={<PawPrint size={20} color="#0f0f0f" />} text={"Pets allowed"}/>
                    <Offer icon={<Snowflake  size={20} color="#0f0f0f" />} text={"Air conditioning"}/>
                    <Offer icon={<Calendar  size={20} color="#0f0f0f" />} text={"Long-term stays allowed"}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Offer icon={<Drop  size={20} color="#0f0f0f" />} text={"Lake access"}/>
                    <Offer icon={<CarProfile  size={20} color="#0f0f0f" />} text={"Free parking on premises"}/>
                    <Offer icon={<Television  size={20} color="#0f0f0f" />} text={"TV"}/>
                    <Offer icon={<VideoCamera  size={20} color="#0f0f0f" />} text={"Security cameras on property"}/>
                    <Offer icon={<Broom  size={20} color="#0f0f0f" />} text={"Cleaning available during stay"}/>
                </div>
                
            </div>
            <button className='mt-4 border-gray-500 border-2 p-3 hover:bg-gray-300 rounded-xl'>Show All Amenities</button>
        </div>
     );
}
 
export default Offers;