import React from 'react'
import Sidebar from '../components/Sidebar'
function Layout({children}) {
  return (
    <>
        <div className='columns' style={{minHeight:"100vh"}}>
            <div className='column is-2 mt-6 ml-2'>
                <Sidebar/>
            </div>
            <div className='column has-background-light'>
                <main>
                    {children}
                </main>
            </div>
        </div>
    </>
    
  )
}

export default Layout