import React, { useState } from "react";
import { Button } from 'react-bootstrap'; 


const WeatherButton = ({ cites, setCity, getCurrentLocation }) => {
    const [selectedCity, setSelectedCity] = useState(null);

    const handleButtonClick = (item) => {
        setCity(item);
        setSelectedCity(item);
    };

    return (
        <div className="menu-container">
            <Button variant="warning" onClick={getCurrentLocation}>Current Location</Button>{' '}
            {cites.map((item, index) => (
                <Button 
                    variant="warning"
                    key={index}
                    onClick={() => handleButtonClick(item)}
                    className={selectedCity === item ? "active" : ""}
                > 
                    {item}
                </Button>
            ))}
        </div>
    );
};

export default WeatherButton;
