import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/labreport.css'
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import {Row, Col } from 'antd';
import moment from "moment";
import { Select, Card } from "antd";
import Layout2 from "../../components/Layout/Layout2";
const { Option } = Select;



const Labreport = () => {
  const [status, setStatus] = useState([
    "claim sent", "Samples collected", "Report in Progress", "Report completed", "Report cancelled"
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/lab/all-lab");
      setOrders(data.lab);
    } catch (error) {
      console.log(error);
    }
  };

  const reportSummary = {
    totalReports: orders.length,
    claimsSent: orders.filter(order => order.status === 'claim sent').length,
    samplesCollected: orders.filter(order => order.status === 'Samples collected').length,
    reportsSent: orders.filter(order => order.status === 'Report completed').length
  };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8081/api/lab/lab-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout2>
      <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <br/>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Total Reports" bordered={false}>
                {reportSummary.totalReports}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Claims Sent" bordered={false}>
                {reportSummary.claimsSent}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Samples Collected" bordered={false}>
                {reportSummary.samplesCollected}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Reports Sent" bordered={false}>
                {reportSummary.reportsSent}
              </Card>
            </Col>
          </Row>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {orders.map((order, index) => (
              <div key={order._id} style={{ flexBasis: "50%", paddingRight: index % 2 === 0 ? "8px" : "0" }}>
                <Card
                  style={{ margin: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                  title={<h5>User: <span style={{ fontSize: "1.2em" }}>{order.name}</span></h5>}
                  extra={<Select
                    style={{ width: 150 }}
                    onChange={(value) => handleChange(order._id, value)}
                    defaultValue={order?.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>}
                >
                  <p><strong>Patient's Name:</strong> {order.name}</p>
                  <p><strong>Number:</strong> {order.number}</p>
                  <p><strong>Pincode:</strong> {order.pincode}</p>
                  <p><strong>Package:</strong> {order.Package}</p>
                  <p><strong>Test:</strong> {order.test}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Time:</strong> {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </Layout2>
  );
};

export default Labreport;
