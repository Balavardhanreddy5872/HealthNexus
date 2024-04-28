import React from 'react'
import { Link } from 'react-router-dom'

const Fotter = () => {
  return (
    <div className="footer" style={{backgroundColor:'black'}}>
      <h1 className="text-center">All Right Reserved &copy; HealthNexus</h1>
      <p className="text-center mt-3">
        <Link to="/aboutus">About</Link>|<Link to="/contact">Contact</Link>|<Link to="/doctorpatient">Book Appointment</Link>
      </p>
    </div>
  )
}

export default Fotter
