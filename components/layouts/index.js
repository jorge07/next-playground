import React from 'react'
import Header from '../head'
import Footer from '../footer'
import Menu from '../menu'
export default ({ children }) => (
    <div>
        <Header />
        <Menu />
        <div className="container">
            { children }
        </div>
        <Footer />
    </div>
)