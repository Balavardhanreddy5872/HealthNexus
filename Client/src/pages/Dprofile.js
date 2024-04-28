import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout2';
import '../styles/DoctorProfile2.css';
import UserMenu2 from "../components/Layout/UserMenu2";

const Dprofile = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    address: '',
    phoneNumber: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/doctprofile`, {
        method: 'POST',
        body: JSON.stringify({
          id: localStorage.getItem('id'),
        }),
        headers: { "Content-type": "application/json" }
      });
      const data = await response.json();
      setUserInfo(data);
      setFormData(data); // Set form data initially with fetched user info
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/updateProfile/${userInfo.email}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" }
      });
      const updatedData = await response.json();
      setUserInfo(updatedData);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  }

  const backgroundURL = 'url("https://img.freepik.com/free-photo/simple-blue-white-background-with-text-space_1017-46764.jpg?size=626&ext=jpg&ga=GA1.1.1583734797.1707733052&semt=ais")';

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu2 />
          </div>
          <div className="col-md-9">
            <div className="doctor-profile-page1">
              <form onSubmit={handleSubmit}>
                <div className="doctor-profile-container1" style={{ backgroundImage: backgroundURL, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <h2>Doctor Profile</h2>
                  <div className="doctor-info1">
                    <div className="profile-image1" >
                      {userInfo.profileImage && (
                        <img
                          src={`http://localhost:8081/uploads/${userInfo.profileImage}`}
                          alt=""
                          className="img-fluid"
                          height='20vh'
                        />
                      )}
                    </div>
                    <div className="text-content1">
                      <div className="text-content1">
                        <div>
                          <label htmlFor="name">Name:</label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                        </div>
                        <br/>
                        <div>
                          <label htmlFor="specialization">Specialization:</label>
                          <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Specialization" />
                        </div>
                        <br/>
                        <div>
                          <label htmlFor="experience">Experience:</label>
                          <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Experience" />
                        </div>
                        <br/>
                        <div>
                          <label htmlFor="address">Address:</label>
                          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
                        </div>
                        <br/>
                        <div>
                          <label htmlFor="phoneNumber">Phone Number:</label>
                          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />
                        </div>
                        <br/>
                        <br/>
                        <button type="submit">Update</button>
                      </div>

                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dprofile;
