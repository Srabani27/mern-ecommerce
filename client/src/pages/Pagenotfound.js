import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
const Pagenotfound = () => {
  return (
    <Layout  title={"Go back-page not found"}>
    <div className='pnf'>
    <h1  className='pnf-title'>404</h1>
    <h2  className='pnf-heading'>Oops!Page Not Found</h2>
    <Link className='pnf-btn'>Goback</Link>
    </div>
        
    </Layout>
  )
}

export default Pagenotfound