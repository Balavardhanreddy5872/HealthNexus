import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout2 from "../../components/Layout/Layout2";

const AdminOrders = () => {
  const [userInfoo, setUserInfoo] = useState([]);
  const [acceptedDoctors, setAcceptedDoctors] = useState([]);
  const [rejectedDoctors, setRejectedDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [clickedDoctors, setClickedDoctors] = useState([]);
  const [showAllDoctors, setShowAllDoctors] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8081/alldoctors", {
        credentials: "include",
      });
      const data = await response.json();
      setUserInfoo(data);
    };
    fetchData();

    // Load accepted and rejected doctors from storage on component mount
    const storedAcceptedDoctors =
      JSON.parse(localStorage.getItem("acceptedDoctorss")) || [];
    const storedRejectedDoctors =
      JSON.parse(localStorage.getItem("rejectedDoctorss")) || [];
    setAcceptedDoctors(storedAcceptedDoctors);
    setRejectedDoctors(storedRejectedDoctors);
  }, []);

  useEffect(() => {
    localStorage.setItem("acceptedDoctorss", JSON.stringify(acceptedDoctors));
    localStorage.setItem("rejectedDoctorss", JSON.stringify(rejectedDoctors));
  }, [acceptedDoctors, rejectedDoctors]);

  const handleAcceptReject = async (index, isAccepted) => {
    const updatedDoctors = [...userInfoo];
    const doctorToUpdate = updatedDoctors[index];

    if (
      doctorToUpdate.status !== "Accepted" &&
      doctorToUpdate.status !== "Rejected"
    ) {
      doctorToUpdate.status = isAccepted ? "Accepted" : "Rejected";

      try {
        const response = await fetch(
          `http://localhost:8081/updateStatus/${doctorToUpdate._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: doctorToUpdate.status }),
          }
        );

        if (response.ok) {
          if (isAccepted) {
            setAcceptedDoctors([...acceptedDoctors, doctorToUpdate]);
          } else {
            setRejectedDoctors([...rejectedDoctors, doctorToUpdate]);
          }

          setUserInfoo(updatedDoctors);
          setClickedDoctors([...clickedDoctors, doctorToUpdate._id]);
        } else {
          console.error("Failed to update status in the database");
        }
      } catch (error) {
        console.error("Error updating status:", error.message);
      }
    }
  };

  const handleShowDoctors = (type) => {
    setShowAllDoctors(type === "all");
    setFilteredDoctors(
      type === "all"
        ? userInfoo
        : type === "accepted"
          ? acceptedDoctors
          : type === "rejected"
            ? rejectedDoctors
            : []
    );
  };

  return (
    <Layout2 title={"All Orders Data"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="user-account-page">
              <div className="user-appointments-container">
                <h2>Doctors</h2>
                <div>
                  <button onClick={() => handleShowDoctors("all")}>
                    All Doctors
                  </button>
                  <button onClick={() => handleShowDoctors("accepted")}>
                    Accepted Doctors
                  </button>
                  <button onClick={() => handleShowDoctors("rejected")}>
                    Rejected Doctors
                  </button>
                </div>
                <table className="user-appointments-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Doctor Name</th>
                      <th>Specialization</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((user, index) => (
                      <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.specialization}</td>
                        <td>
                          {user.status === "Accepted" && (
                            <span style={{ color: "green" }}>Accepted</span>
                          )}
                          {user.status === "Rejected" && (
                            <span style={{ color: "red" }}>Rejected</span>
                          )}
                          {user.status !== "Accepted" &&
                            user.status !== "Rejected" &&
                            !clickedDoctors.includes(user._id) && (
                              <>
                                <button
                                  onClick={() =>
                                    handleAcceptReject(index, true)
                                  }
                                  style={{ color: "green", marginRight: "5px"  ,backgroundColor:'lightblue'}}
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleAcceptReject(index, false)
                                  }
                                  style={{ color: "red" ,backgroundColor:'lightblue'}}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default AdminOrders;
