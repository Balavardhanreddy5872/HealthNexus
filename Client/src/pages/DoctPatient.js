import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/Doctpat.css";

const Doctor = () => {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [reason, setReason] = useState("");
    const [specializationsList, setSpecializationsList] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
        const fetchall = async () => {
            try {
                const response = await fetch("http://localhost:8081/doctorres", {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setSpecializationsList(data);
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };
        fetchall();
    }, []);


  const [formValues, setFormValues] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: "",
    specialization: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Name validation
    if (!formValues.patientName) {
      formIsValid = false;
      errors["patientName"] = "*Please enter your name.";
    }

    // Email validation
    if (!formValues.patientEmail) {
      formIsValid = false;
      errors["patientEmail"] = "*Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.patientEmail)) {
      formIsValid = false;
      errors["patientEmail"] = "*Email is not valid.";
    }

    // Phone validation
    if (!formValues.patientPhone) {
      formIsValid = false;
      errors["patientPhone"] = "*Please enter your phone number.";
    } else if (!/^\d{10}$/.test(formValues.patientPhone)) {
      // Adjust regex according to the format you expect
      formIsValid = false;
      errors["patientPhone"] = "*Please enter a valid phone number.";
    }

    // Appointment Date validation
    const currentDate = new Date();
    const selectedDate = new Date(formValues.appointmentDate);

    if (!formValues.appointmentDate || selectedDate < currentDate) {
      formIsValid = false;
      errors["appointmentDate"] =
        "*Please choose a valid future appointment date.";
    }

    // Specialization validation
    if (!formValues.specialization) {
      formIsValid = false;
      errors["specialization"] = "*Please select a specialization.";
    }

    // Reason validation
    if (!formValues.reason) {
      formIsValid = false;
      errors["reason"] = "*Please enter a reason for your visit.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const response = await fetch("http://localhost:8081/patientdetails", {
          method: "POST",
          body: JSON.stringify({
            patientName,
            patientEmail,
            patientPhone,
            appointmentDate,
            specialization,
            reason,
          }),
          headers: { "content-type": "application/json" },
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
          alert("Form is valid and submitted successfully!");
          navigate("/");
        } else {
          alert("Form submission failed.");
        }
      }
    } catch (err) {
      alert("An error occurred while submitting the form.");
      console.error(err);
    }
  };
  //-------------------------------------

  const backgroundURL =
    'url("https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61811.jpg?size=626&ext=jpg&ga=GA1.1.780333128.1700286974&semt=ais")';

  return (
    <div
      style={{
        backgroundImage: backgroundURL,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Layout>
        <div className="registration-container">
          <h2>Appointment Registration</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="patientName">Patient Name:</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formValues.patientName}
                onChange={(e) => {
                  setPatientName(e.target.value);
                  handleInputChange(e);
                }}
                className={errors.patientName ? "input-error" : ""}
              />
              {errors.patientName && (
                <span className="error">{errors.patientName}</span>
              )}
            </div>

            <div>
              <label htmlFor="patientEmail">Email:</label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                value={formValues.patientEmail}
                onChange={(e) => {
                  setPatientEmail(e.target.value);
                  handleInputChange(e);
                }}
                className={errors.patientEmail ? "input-error" : ""}
              />
              {errors.patientEmail && (
                <span className="error">{errors.patientEmail}</span>
              )}
            </div>

            <div>
              <label htmlFor="patientPhone">Phone Number:</label>
              <input
                type="tel"
                id="patientPhone"
                name="patientPhone"
                value={formValues.patientPhone}
                onChange={(e) => {
                  setPatientPhone(e.target.value);
                  handleInputChange(e);
                }}
                className={errors.patientPhone ? "input-error" : ""}
              />
              {errors.patientPhone && (
                <span className="error">{errors.patientPhone}</span>
              )}
            </div>

            <div>
              <label htmlFor="appointmentDate">Appointment Date:</label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formValues.appointmentDate}
                onChange={(e) => {
                  setAppointmentDate(e.target.value);
                  handleInputChange(e);
                }}
                className={errors.appointmentDate ? "input-error" : ""}
              />
              {errors.appointmentDate && (
                <span className="error">{errors.appointmentDate}</span>
              )}
            </div>

            <div>
              <label htmlFor="specialization">Doctor:</label>
              <select
                id="specialization"
                name="specialization"
                value={formValues.specialization}
                onChange={(e) => {
                  setSpecialization(e.target.value);
                  handleInputChange(e);
                }}
                className={errors.specialization ? "input-error" : ""}
              >
                              <option value="">--Please choose an option--</option>
                              {specializationsList.map((specialization) => (
                                  <option key={specialization.id} value={specialization.name}>
                                      {specialization.name}
                                  </option>
                              ))}
              </select>
              {errors.specialization && (
                <span className="error">{errors.specialization}</span>
              )}
            </div>

            {/* Reason for Visit Field */}
            <div>
              <label htmlFor="reason">Reason for Visit:</label>
              <textarea
                id="reason"
                name="reason"
                rows="4"
                value={formValues.reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  handleInputChange(e);
                }}
                className={errors.reason ? "input-error" : ""}
              ></textarea>
              {errors.reason && <span className="error">{errors.reason}</span>}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Doctor;
