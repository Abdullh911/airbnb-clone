import { useEffect, useState } from "react";
import { Slider } from '@mui/material';
import { useRecoilState } from "recoil";
import { initFilters } from "../../StateMangement/State";
const PriceRange = ({setRange}) => {
    let [storeFltrs,setSetStoreFltrs]=useRecoilState(initFilters)
    const [value, setValue] = useState([storeFltrs.minPrice,storeFltrs.maxPrice])
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRange(newValue);
    };
    const handleChangeMin = (event) => {
        const newValue = Number(event.target.value);
        setValue([newValue, value[1]]);
        setRange([newValue, value[1]])
    };

    const handleChangeMax = (event) => {
        const newValue = Number(event.target.value);
        setValue([value[0], newValue]);
        setRange([value[0], newValue]);
    };
    return ( 
        <div className="">
            <Slider 
                max={1000}
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{
                    color: 'white',
                    '& .MuiSlider-thumb': {
                        backgroundColor: 'white',
                        
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: '#ff385c',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#ff385c',
                    },
                }}
            />
            <div className="flex justify-between">
                <div className="flex flex-col items-center">
                    <h2 className="text-[12px] text-gray-500">
                        Minimum
                    </h2>
                    <input onChange={handleChangeMin} value={value[0]} type="text" name="input" className="w-20 border-2 rounded-full  pl-[35%] py-2"/>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-[12px] text-gray-500">
                        Maximum
                    </h2>
                    <input onChange={handleChangeMax} value={value[1]} type="text" name="input" className="w-20 border-2 rounded-full  pl-[35%] py-2"/>
                </div>
            </div>
        </div>
     );
}
 
export default PriceRange;