import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout2 from "./../../components/Layout/Layout2";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Dropdown } from 'react-bootstrap';
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [sortByDate, setSortByDate] = useState("desc"); // Default sort by descending order

  const calculateProgress = (startDate, deliveryDate, status) => {
    const start = moment(startDate);
    const end = moment(deliveryDate).add(2, "days");
    const today = moment();
    let totalDuration = end.diff(start, "days");
    let elapsedDuration = today.diff(start, "days");

    // If status is "Processing", set the progress directly to 40%
    if (status === "Processing") {
      totalDuration = 5; // Assuming the total duration from "Processing" to "Delivered" is 5 days
      elapsedDuration = 2; // Assuming 2 days have passed from "Processing"
    }

    const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);
    return progress;
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const toggleSortOrder = () => {
    setSortByDate(sortByDate === "asc" ? "desc" : "asc");
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortByDate === "asc") {
      return moment(a.createdAt).unix() - moment(b.createdAt).unix();
    } else {
      return moment(b.createdAt).unix() - moment(a.createdAt).unix();
    }
  });

  return (
    <Layout2 title={"Your Orders"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="order-filter">
              <span className="filter-label">Sort Orders : </span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  {sortByDate === "asc" ? "Oldest First" : "Newest First"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortByDate("asc")}>Oldest First</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortByDate("desc")}>Newest First</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <h1 className="text-center"> My Orders</h1>
            <br />
            <br />
            {sortedOrders.map((o, i) => {
              const progress = calculateProgress(
                o.createdAt,
                o.deliveryDate,
                o.status
              );
              return (
                <div className="order-container" key={o._id}>
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Order-Date</th>
                          <th scope="col">Delivery-Date</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>
                            {moment(o?.createdAt).format("MMMM Do YYYY")}
                          </td>
                          <td>
                            {moment(o?.createdAt).add(3, 'days').format("MMMM Do YYYY")}
                          </td>

                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container" style={{ marginBottom: "100px" }}>
                      <div className="product-details">
                        {o?.products?.map((p, i) => (
                          <div
                            className="row mb-2 p-3 card flex-row"
                            key={p._id}
                          >
                            <div className="col-md-4">
                              <img
                                src={`http://localhost:8081/api/product/medicine-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                width="150px"
                                height="250px"
                              />
                            </div>
                            <div className="col-md-8">
                              <p>Name: {p.name}</p>
                              <p>
                                Description: {p.description.substring(0, 30)}
                              </p>
                              <p>Price: ₹{p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-timeline" style={{ marginLeft: '36px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${progress}%`,
                            background: `linear-gradient(to right, ${getStatusColor(
                              o.status
                            )} ${progress}%, transparent ${progress}%)`
                          }}
                        ></div>
                        <div className="states">
                          <div className="state" style={{ left: "0%" }}>
                            Ordered
                          </div>
                          <div className="state" style={{ left: "20%" }}>
                            Processing
                          </div>
                          <div className="state" style={{ left: "40%" }}>
                            Shipped
                          </div>
                          <div className="state" style={{ left: "60%" }}>
                            Out for delivery
                          </div>
                          <div className="state" style={{ left: "90%" }}>
                            Delivered
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout2>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Ordered":
      return "#007bff";
    case "Processing":
      return "#ffc107";
    case "Shipped":
      return "#28a745";
    case "Out for delivery":
      return "#17a2b8";
    case "Delivered":
      return "#28a745";
    default:
      return "#000000";
  }
};

export default Orders;
