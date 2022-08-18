import React from 'react';
import busLogo from '../../../public/bus.png';

const BusStationInfo = () => {
    return (
        <div className="w-full p-3 ml-1 flex items-center border-b border-gray-600">
            <img src={process.env.PUBLIC_URL + '/bus.png'} className="w-8 h-8" />
            <p className="ml-4">군자역(D10202827)</p>
        </div>
    );
};

export default BusStationInfo;