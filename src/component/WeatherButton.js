import React from "react";
import { Button } from 'react-bootstrap';

const WeatherBox =()=>{
    return(
        <div>
            <Button variant="warning">Current</Button>{' '}
            <Button variant="warning">Paris</Button>{' '}
            <Button variant="warning">Tokyo</Button>{' '}
            <Button variant="warning">Philippines</Button>{' '}
            <Button variant="warning">Lisbon</Button>{' '}
        </div>
    );
};

export default WeatherBox;