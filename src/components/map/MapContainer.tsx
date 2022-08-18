import React from 'react';
import Layout from '../layout/Layout';
import BusMapContainer from './BusMapContainer';
import BusListContainer from './BusListContainer';

const MapContainer = () => {
    return (
        <div className="flex p-2">
            <BusMapContainer/>
            <BusListContainer/>
        </div>
    );
};

export default MapContainer;