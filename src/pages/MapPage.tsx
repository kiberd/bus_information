import React from 'react';
import Layout from '../components/layout/Layout';
import BusMapContainer from '../components/map/BusMapContainer';
import BusListContainer from '../components/map/BusListContainer';
import MapContainer from '../components/map/MapContainer';

const MapPage = () => {
    return (
        <Layout>
            <MapContainer/>
        </Layout>
    );
};

export default MapPage;