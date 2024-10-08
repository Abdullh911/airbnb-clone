import { useRecoilState } from "recoil";
import { currUser, isEnglish, langCode, showSignup, users } from "../../StateMangement/State";
import './SignupLogin.css'
import { useRef } from "react";
import langs from '../../langs';

const SignupLogin = () => {
    let [english,setEnglish]=useRecoilState(isEnglish);
    let [lang,setLang]=useRecoilState(langCode);
    let [showS,setShowS]=useRecoilState(showSignup);
    let [curr,setCurr]=useRecoilState(currUser);
    let [usersList,setUsersList]=useRecoilState(users);
    const social=['Facebook','Google','Apple'];
    const socialIcons=[<i class="fa-brands fa-facebook"></i>,<i class="fa-brands fa-google"></i>,<i class="fa-brands fa-apple"></i>]
    let emailref=useRef(null);
    let passref=useRef(null);
    function userAction() {
        if (showS == 1) { 
            let newUser = {
                email: emailref.current.value,
                password: passref.current.value,
                wishlist:[],
                trips:[]
            };
    
            const foundUser = usersList.find(user => user.email === emailref.current.value);
            if (!foundUser) {
                let updatedUsersList = [...usersList, newUser]; 
                setUsersList(updatedUsersList); 
                setCurr(newUser); 
                setShowS(0); 
            } else {
                console.log('User already exists');
            }
        } 
        else if (showS == 2) {
            const foundUser = usersList.find(user => user.email === emailref.current.value);
            if (foundUser && foundUser.password==passref.current.value) {
                setCurr(foundUser);
                setShowS(0); 
            } else {
                console.log('User not found');
            }
        }
    }
    
    return ( 
        <div dir={`${english?'ltr':'rtl'}`} className="fixed w-full h-full z-50"> 
            <div className="backdrop" />
            <div className="filterModal">
                <div className="head">
                    <div className='title'>
                        <p>{showS==1?langs[lang].sign_up:langs[lang].log_in}</p>
                    </div>
                    <div onClick={()=>{
                        setShowS(0);
                     }} className='close'>
                        <i class="text-[18px] fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className="logBody">
                    <h1 className="text-[22px] font-[Poppins] mb-7">
                        {langs[lang].welcomeToAirbnb}
                    </h1>
                    <div className="inputCont">
                        <input ref={emailref} placeholder={langs[lang].email} type="text" className="rounded-t-xl"/>
                        <input ref={passref} placeholder={langs[lang].password} type="text" className="rounded-b-xl" />
                    </div>
                    <p className="text-[11px] mb-3">
                        {langs[lang].messageAndDataRates}                   
                    </p>
                    <p className="mb-5 underline w-max cursor-pointer" onClick={()=>{
                        if(showS==1){
                            setShowS(2);
                        }
                        else{
                            setShowS(1);
                        }
                    }}>{showS==1?langs[lang].log_in:langs[lang].sign_up}</p>
                    <button onClick={userAction}>{showS==1?langs[lang].sign_up:langs[lang].log_in}</button>
                    <div className="divide relative mb-7">
                        <p className="or">or</p>
                    </div>
                    <div>
                        {social.map((x,index)=>(
                            <div className="socialDiv">
                                {socialIcons[index]}
                                <p>{langs[lang].continueWith} {x}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default SignupLogin;