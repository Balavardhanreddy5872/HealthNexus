import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Doctorlogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth] = useAuth();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [isActive, setActive] = useState({
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const testEmailValidity = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

  const passwordRegex = (password) => /^(?=.*\d).{6,}$/.test(password);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!testEmailValidity(details.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!passwordRegex(details.password)) {
      newErrors.password = "Password is not valid";
    }

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const backgroundURL =
    'url("https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61811.jpg?size=626&ext=jpg&ga=GA1.1.780333128.1700286974&semt=ais")';

  return (
    // Done
    <Layout>
      <section
        className="vh-100"
        style={{
          backgroundImage: backgroundURL,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11" style={{ width: "580px" }}>
              <div
                className="card text-black"
                style={{
                  borderRadius: "25px",
                  width: "530px",
                  height: "520px",
                }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      style={{ width: "450px" }}
                    >
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        method="POST"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            if (validateForm()) {
                              setDetails({
                                email: "",
                                password: "",
                              });
                            } else {
                              setActive({
                                password: true,
                                email: true,
                              });
                            }

                            const response = await fetch(
                              "http://localhost:8081/login",
                              {
                                method: "POST",
                                body: JSON.stringify({ email, password }),
                                headers: { "Content-Type": "application/json" },
                              }
                            );
                            const data = await response.json();
                            localStorage.id = data.id;
                            if (response.status === 200) {
                              navigate("/doctorprofile");
                            } else {
                              alert("wrong credientials");
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        <div
                          className="d-flex flex-row align-items-center mb-4"
                          style={{ marginLeft: "-23px" }}
                        >
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Your Email"
                              className={`form-control ${
                                isActive.email && "is-invalid"
                              }`}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setDetails({
                                  ...details,
                                  email: e.target.value,
                                });
                                setActive({
                                  ...isActive,
                                  email: false,
                                });
                              }}
                              value={details.email}
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className="d-flex flex-row align-items-center mb-3"
                          style={{ marginLeft: "-23px" }}
                        >
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Your Password"
                              className={`form-control ${
                                isActive.password && "is-invalid"
                              }`}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setDetails({
                                  ...details,
                                  password: e.target.value,
                                });
                                setActive({
                                  ...isActive,
                                  password: false,
                                });
                              }}
                              value={details.password}
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        <br />

                        <div className="d-grid gap-2 col-6 mx-auto">
                          {/* {auth?.user?.email === email ? ( */}
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                          {/* // ):(
                                                    //     <p>Error!!!!</p>
                                                    // )} */}
                        </div>

                        <p className="my-3">
                          Don't Have an account?{" "}
                          <Link
                            style={{ textDecoration: "none" }}
                            to="../doctorreg"
                          >
                            Register..
                          </Link>{" "}
                        </p>
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

export default Doctorlogin;
