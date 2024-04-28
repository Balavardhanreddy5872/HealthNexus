import React from "react";
import { useSpring, animated } from "react-spring";
import Layout from "./../components/Layout/Layout";

const About = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  // Dummy data for project members
  const projectMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      photo: "/images/member1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      photo: "/images/member2.jpg",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      photo: "/images/member2.jpg",
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      photo: "/images/member2.jpg",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      photo: "/images/member2.jpg",
    },
  ];

  return (
    <Layout>
      <animated.div style={fadeIn}>
        <div className="container">
          <div className="row my-5">
            <div className="col-md-12 text-center">
              <h2 className="mb-4" style={{ fontSize: "28px" }}>Welcome to Health Nexus</h2>
              <p className="lead" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                Health Nexus is your go-to platform for accessing essential
                healthcare services. We provide a wide range of medicines, lab
                tests, and doctor appointments, ensuring you can easily manage
                your health needs from the comfort of your home. Our mission is
                to make healthcare accessible and convenient for everyone.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4 text-center">Meet Our Team</h2>
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-inner">
                  {projectMembers.map((member, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={member.id}>
                      <div className="d-flex justify-content-center">
                        <img src={member.photo} className="img-thumbnail rounded-circle" alt={member.name} style={{ width: "200px", height: "200px" }} />
                      </div>
                      <div className="text-center mt-3">
                        <h5>{member.name}</h5>
                        <p>{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" style={{ backgroundColor: "transparent", border: "none" }}>
                  <span className="carousel-control-prev-icon" aria-hidden="true" style={{ color: "#000", fontSize: "24px" }}></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" style={{ backgroundColor: "transparent", border: "none" }}>
                  <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: "#000", fontSize: "24px" }}></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </Layout>
  );
};

export default About;
