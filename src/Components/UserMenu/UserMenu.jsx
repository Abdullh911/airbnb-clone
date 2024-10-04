import { useRecoilState } from 'recoil';
import './UserMenu.css';
import { currUser, isStay, isTrips, isWishlist, showSignup, showUserMenu } from '../../StateMangement/State';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    let [showS, setShowS] = useRecoilState(showSignup);
    let [curr, setCurr] = useRecoilState(currUser);
    let [showU, setShowU] = useRecoilState(showUserMenu);
    let [isRoomPage, setIsRoomPage] = useRecoilState(isStay);
    let [isWish,setIsWish]=useRecoilState(isWishlist);
    let [isTp,setIsTp]=useRecoilState(isTrips);
    let navigate = useNavigate();

    const handleTripsClick = () => {
        // Update state first
        setIsTp(true);
        // Navigate to trips after ensuring the state update
        navigate('/trips');
        // Close the user menu
        setShowU(false);
    };

    const handleWishlistClick = () => {
        // Reset the state for non-room pages
        setIsWish(true);
        navigate('/wishlist');
        setShowU(false);
    };

    return (
        <div style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)' }} className="userMenu">
            {!curr && <div>
                <p onClick={() => {
                    setShowS(2);
                    setShowU(false);
                }} className='menuOptn'>Log in</p>
                <p onClick={() => {
                    setShowS(1);
                    setShowU(false);
                }} className='menuOptn'>Sign up</p>
            </div>}
            {curr && <div>
                <p className='menuOptn'>Account</p>
                <p onClick={handleWishlistClick} className='menuOptn'>Wishlist</p>
                <p onClick={handleTripsClick} className='menuOptn'>Trips</p>
            </div>}
            <div className='dummies'>
                <p className='menuOptn'>Gift cards</p>
                <p className='menuOptn'>Airbnb your home</p>
                <p className='menuOptn'>Host an experience</p>
                <p className='menuOptn'>Help center</p>
            </div>
            {curr && <p onClick={() => {
                setCurr(null);
                setShowU(false);
            }} className='menuOptn'>Log out</p>}
        </div>
    );
}

export default UserMenu;
