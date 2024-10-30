import React, { useEffect } from 'react';
import './CardContainer.css';
import Card from '../Card/Card';
import { useRecoilState } from 'recoil';
import { isLarge, showContModal, showDateModal, showModal } from '../../StateMangement/State';
import { listings } from '../../StateMangement/State';
import Footer from '../Footer';
import { VirtuosoGrid } from 'react-virtuoso';

const CardContainer = () => {
    const [visible, setVisible] = useRecoilState(isLarge);
    const [filtered, setFiltered] = useRecoilState(listings);
    let [showM, setShowM] = useRecoilState(showModal);
    let [showCmodal, setShowCmodal] = useRecoilState(showContModal);
    let [showDmodal, setShowDmodal] = useRecoilState(showDateModal);

    // Log the data length to confirm there are enough items for scrolling
    useEffect(() => {
        console.log("Filtered data length:", filtered.length);
    }, [filtered]);

    const handleStartScroll = () => {
        // Action to perform at the start of scrolling down
        console.log("Scroll started near the top of VirtuosoGrid");
        setVisible(false);
        setShowCmodal(false);
        setShowDmodal(false);
    };

    const handleEndScroll = () => {
        // Action to perform when reaching the bottom of the content
        console.log("Reached the end of VirtuosoGrid");
        // You could load more content here if needed
    };

    return (
        <div className='overflow-hidden flex flex-col items-center relative  top-[150px] md:top-[280px] '>
            <div className='h-[70vh] md:h-[60vh] 2xl:h-[79vh] ml-8 md:ml-0' style={{ width: '100%', overflowY: 'auto' }}> {/* Ensure overflow is scrollable */}
                <VirtuosoGrid
                    data={filtered}
                    itemContent={(index, home) => <Card key={home.id} home={home} />}
                    listClassName="CardContainer"
                    style={{ width: '100%' }}
                    
                />
                <Footer />
            </div>
            
        </div>
    );
};

export default CardContainer;
