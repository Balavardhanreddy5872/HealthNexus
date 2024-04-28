import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Doctorreg = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [experience, setExperience] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    specialization: "",
    profileImage: "",
    experience: "",
  });

  const [isActive, setActive] = useState({
    name: false,
    email: false,
    specialization: false,
    profileImage: false,
    experience: false,
    address: false,
    phoneNumber: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    specialization: '',
    profileImage: '',
    experience: '',
    address: '',
    phoneNumber: '',
  });

  const testEmailValidity = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

  const nameRegex = (name) => /^[A-Z][a-zA-Z]*$/.test(name);

  const isValidImage = (image) => image !== null;

  const experienceRegex = (experience) => /^\d{1,2}$/.test(experience);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      specialization: '',
      profileImage: '',
      experience: '',
      address: '',
      phoneNumber: '',
    };

    if (!nameRegex(name)) {
      newErrors.name = 'Name is not valid';
    }

    if (!testEmailValidity(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!nameRegex(specialization)) {
      newErrors.specialization = 'Specialization not entered';
    }

    if (!isValidImage(profileImage)) {
      newErrors.profileImage = 'Profile Image is not valid';
    }

    if (!experienceRegex(experience)) {
      newErrors.experience = 'Experience is not valid';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is not valid';
    }

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => error === '');
  };

  const backgroundURL =
    'url("https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61809.jpg?size=626&ext=jpg&ga=GA1.1.1583734797.1707733052&semt=ais")';

  return (
    <Layout>
      <section
        className="vh-10"
        style={{
          backgroundImage: backgroundURL,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11" style={{ width: '700px' }}>
              <div
                className="card text-black xyzp"
                style={{
                  borderRadius: '25px',
                  width: '700px',
                  height: '750px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ width: '450px' }}>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registration</p>
                      <form
                        className="mx-1 mx-md-4"
                        action="/doctorlogin"
                        method="POST"
                        encType="multipart/form-data"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            if (validateForm()) {
                              // Create a FormData object to send the image file
                              const formData = new FormData();
                              formData.append('name', name);
                              formData.append('email', email);
                              formData.append('specialization', specialization);
                              formData.append('profileImage', profileImage);
                              formData.append('experience', experience);
                              formData.append('address', address);
                              formData.append('phoneNumber', phoneNumber);

                              // Send the formData to the server
                              const response = await fetch('http://localhost:8080/register', {
                                method: 'POST',
                                body: formData,
                              });

                              console.log(await response.json());
                              console.log('Profile Image:', profileImage);
                              if (response.status === 200) {
                                navigate('/');
                              }
                            } else {
                              setActive({
                                name: true,
                                email: true,
                                specialization: true,
                                profileImage: true,
                                experience: true,
                                address: true,
                                phoneNumber: true,
                              });
                            }
                            const formData = new FormData();
                            formData.append('name', name);
                            formData.append('email', email);
                            formData.append('specialization', specialization);
                            formData.append('profileImage', profileImage);
                            formData.append('experience', experience);
                            formData.append('address', address);
                            formData.append('phoneNumber', phoneNumber);

                            // Send the formData to the server
                            const response = await fetch('http://localhost:8081/register', {
                              method: 'POST',
                              body: formData,
                            });

                            console.log(await response.json());
                            console.log('Profile Image:', profileImage);
                            if (response.status === 200) {
                              navigate('/');
                            }
                          } catch (err) {
                            alert(err);
                            console.log(err);
                          }
                        }}
                      >
                        
                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: "-23px" }}>
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Your Name"
                              className={`form-control ${isActive.name }`}
                              onChange={(e) => {
                                setName(e.target.value)
                                setDetails({
                                  ...details,
                                  name: e.target.value,
                                });
                                setActive((x) => ({ ...x, name: e.target.value !== "" }));
                              }}
                              value={details.name}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: "-23px" }}>
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Your Email"
                              className={`form-control ${isActive.email }`}
                              onChange={(e) => {
                                setEmail(e.target.value)
                                setDetails({

                                  ...details,
                                  email: e.target.value,
                                });
                              }}
                              value={details.email}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: '-23px' }}>
                          <i className="fas fa-phone-alt fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="tel"
                              id="phoneNumber"
                              placeholder="Your Phone Number"
                              name="phoneNumber"
                              className={`form-control ${isActive.phoneNumber }`}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                setDetails({
                                  ...details,
                                  phoneNumber: e.target.value,
                                });
                                setActive((x) => ({ ...x, phoneNumber: e.target.value !== '' }));
                              }}
                              value={phoneNumber}
                            />
                            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: '-23px' }}>
                          <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="address"
                              placeholder="Your Address"
                              name="address"
                              className={`form-control ${isActive.address }`}
                              onChange={(e) => {
                                setAddress(e.target.value);
                                setDetails({
                                  ...details,
                                  address: e.target.value,
                                });
                                setActive((x) => ({ ...x, address: e.target.value !== '' }));
                              }}
                              value={address}
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                          </div>
                        </div>


                        

                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: "-20px" }}>
                          <i style={{ marginRight: "20px" }} class="fa-solid fa-image"></i>
                          <div className="form-outline flex-fill mb-0">

                            <input
                              type="file"
                              id="profileImage"
                              name="profileImage"
                              className={`form-control ${isActive.profileImage }`}
                              onChange={
                                handleImageChange

                              }
                            />
                            {errors.profileImage && <div className="invalid-feedback">{errors.profileImage}</div>}
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: "-23px" }}>
                          <i className="fas fa-user-doctor fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="specialization"
                              placeholder="specialization"
                              name="specialization"
                              className={`form-control ${isActive.specialization }`}
                              onChange={(e) => {
                                setSpecialization(e.target.value)
                                setDetails({
                                  ...details,
                                  specialization: e.target.value,
                                });
                              }}
                              value={details.specialization}
                            />
                            {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4" style={{ marginLeft: '-23px' }}>
                          <i className="fas fa-calendar-alt fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="experience"
                              placeholder="Your Experience (in years)"
                              name="experience"
                              className={`form-control ${isActive.experience }`}
                              onChange={(e) => {
                                setExperience(e.target.value);
                                setDetails({
                                  ...details,
                                  experience: e.target.value,
                                });
                                setActive((x) => ({ ...x, experience: e.target.value !== '' }));
                              }}
                              value={experience}
                            />
                            {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                          </div>
                        </div>

                        <div className="d-grid gap-2 col-6 mx-auto">
                          <button className="btn btn-primary btn-lg">Register</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );

};

export default Doctorreg;
