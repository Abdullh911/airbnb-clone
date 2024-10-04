import {Globe,MapPin} from '@phosphor-icons/react'
const MeetHost = () => {
    return ( 
        <div className='mt-7 mb-96'>
            <h2 className="font-bold text-[20px] ">Meet your Host</h2>
            <div className="w-full flex justify-center">
                <div className="flex flex-col items-center w-full shadow rounded-2xl ">
                    <div className="flex gap-10 shadow rounded-2xl mt-4 p-10 w-[90%] justify-center">
                        <div className="flex flex-col items-center">
                            <div id='pfp' className='w-8 h-8 p-12 rounded-full bg-gray-300 flex justify-center items-center'>
                                M
                            </div> 
                            <h1>Piava</h1>
                        </div>
                        <div className="flex flex-col">
                            <div className="border-b-2">
                                <p className="font-bold">473</p>
                                <p>Reviews</p>
                            </div>
                            <div className="border-b-2">
                                <p className="font-bold">4.26</p>
                                <p>Rating</p>
                            </div>
                            <div>
                                <p className="font-bold">8 Years</p>
                                <p>Hosting</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/5 mt-5'>
                        <div className='flex gap-4 mb-3'>
                            <Globe size={18} color="#0f0f0f" />
                            <p className='text-sm'>Speaks English, French and Hindi</p>
                        </div>
                        
                        <div className='flex gap-4 mb-3'>
                            <MapPin size={18} color="#0f0f0f" />
                            <p className='text-sm'>Lives in Jaipur, India</p>
                        </div>
                        
                    </div>
                    <div className='m-0 p-0 w-3/5'>
                        <p className='break-words text-sm'>Hi All I am Piava Jain C/O Le Pensions Stays & Enterprises Pvt Ltd. By qualification, I am a chartered Accountant from The Institute of Chartered Accountants of India. But at heart, I have always been an entrepreneur. Our team has a collective experience of more than 24 years in hospitality and we love what we do. Le Pension...</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default MeetHost;