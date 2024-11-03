import React, { useEffect } from 'react';
import './CardContainer.css';
import Card from '../Card/Card';
import { useRecoilState } from 'recoil';
import { isLarge, showContModal, showDateModal, showModal } from '../../StateMangement/State';
import { listings } from '../../StateMangement/State';
import Footer from '../Footer';
import { VirtuosoGrid } from 'react-virtuoso';
import Loader from '../Loader';

const CardContainer = ({containerList}) => {
    const [visible, setVisible] = useRecoilState(isLarge);
    const [filtered, setFiltered] = useRecoilState(listings);
    let [showM, setShowM] = useRecoilState(showModal);
    let [showCmodal, setShowCmodal] = useRecoilState(showContModal);
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);

    useEffect(() => {
        console.log( containerList);

    }, []);
    
    return (
        <div className='overflow-hidden flex flex-col items-center relative  top-[150px] md:top-[280px] '>
            <div className=' h-[70vh] md:h-[60vh] 2xl:h-[79vh] ml-8 md:ml-0 ' style={{ width: '100%', overflowY: 'auto' }}> 
                {containerList.length>0?<VirtuosoGrid
                    data={containerList}
                    itemContent={(index, home) => <Card key={home.id} home={home} wid={1}/>}
                    listClassName="CardContainer"
                    style={{ width: '100%' }}/>:<div>hi</div>}
                
                <Footer />
            </div>
            
        </div>
    );
};

export default CardContainer;
