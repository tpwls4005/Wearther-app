import React from "react";
import { Button } from 'react-bootstrap';

const WeatherBox =({cites,setCity})=>{
    console.log("cites?", cites);
    return(
        <div>
            <Button variant="warning">Current Location</Button>{' '}
            
            {cites.map((item, index)=>(
                <Button 
                variant="warning"
                key={index}
                onClick={()=>setCity(item)}
                > 
                    {item}
                    </Button>
            ))}
        </div>
    );
};

export default WeatherBox;