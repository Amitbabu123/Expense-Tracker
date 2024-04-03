import React from 'react'
import './Layout.css'
import Hero from '../hero/Hero'

const Layout = () => {
  return (
    <>
        <div className='layout'>
        <div className='logo'>Expense Tracker</div>
        <Hero/>
        </div>
       
    </>
    

  )
}

export default Layout