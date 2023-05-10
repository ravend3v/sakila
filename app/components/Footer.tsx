import React from 'react';
import StoreInfo from './StoreInfo';

export default function Footer() {
  return <footer className='bg-primary-black'>
    <div className='bg-slate-950 p-3'>
      <h1 className='text-slate-100 text-center'>Footer</h1>
      <StoreInfo />
    </div>
    
  </footer>
}