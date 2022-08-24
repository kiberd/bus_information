import React from 'react';
import Layout from '../layout/Layout';
import BusMapContainer from './BusMapContainer';
import BusListContainer from './BusListContainer';

const MapContainer = () => {
    return (
        <div className="flex flex-col p-2 md:flex-row">
            <BusMapContainer/>
            <BusListContainer/>
        </div>
    );
};

export default MapContainer;