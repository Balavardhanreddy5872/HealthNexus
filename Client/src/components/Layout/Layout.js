import React from 'react'
import Fotter from './Fotter'
import Header from './Header'
import { Toaster } from "react-hot-toast";

const Layout = ({children}) => {
  return (
    <>
       <Header />
        <main style={{minHeight:'70vh'}}>{children}</main>
        <Toaster />
       <Fotter />
    </>
  )
}

export default Layout
