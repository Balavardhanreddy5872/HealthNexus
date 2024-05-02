import Layout2 from '../../components/Layout/Layout2';
import UserMenu from '../../components/Layout/UserMenu';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useTrail, animated } from 'react-spring';
import moment from "moment";
import './Labtest.css';


const LabTests = () => {
  const [lab, setLab] = useState([]);
  const [auth, setAuth] = useAuth();

  const fadeInTrail = useTrail(lab.length, {
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/lab/formstatus");
      setLab(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout2>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">My Reports</h1>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Patient Name</th>
                  <th scope="col">Number</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Package</th>
                  <th scope="col">Test</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {fadeInTrail.map(({ opacity }, index) => (
                  <animated.tr key={lab[index]._id} style={{ opacity }}>
                    <td>{lab[index].name}</td>
                    <td>{lab[index].number}</td>
                    <td>{lab[index].pincode}</td>
                    <td>{lab[index].Package}</td>
                    <td>{lab[index].test}</td>
                    <td>{lab[index].status}</td>
                  </animated.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default LabTests;
