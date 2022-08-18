import React from 'react';
import Header from './Header';

const Layout = (props: {children: React.ReactNode}) => {
    return (
        <div className='pt-[70px]'>
            <Header />
            <main className='min-h-[100vh_-_70px]'>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;