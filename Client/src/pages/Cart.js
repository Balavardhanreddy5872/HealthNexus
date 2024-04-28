// Cart.js
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price * (quantities[item._id] || 1);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = (pid, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [pid]: quantity,
    }));
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/api/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8081/api/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <br />

        {cart?.length > 0 && (
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.map((p) => (
                      <tr key={p._id}>
                        <td>
                          <img
                            src={`http://localhost:8081/api/product/medicine-photo/${p._id}`}
                            alt={p.name}
                            width="100px"
                            height="50px"
                          />
                        </td>
                        <td>
                          <p><b></b> {p.name}</p>
                          {/* <p><b>{p.description.substring(0, 30)}</b></p> */}
                        </td>
                        <td>
                          <label>Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={quantities[p._id] || 1}
                            onChange={(e) => updateQuantity(p._id, parseInt(e.target.value, 10))}
                            style={{ width: '50px', border: 'none', outline: 'none' }}
                          />
                        </td>
                        <td>₹ {p.price}</td>
                        <td>₹ {(p.price * (quantities[p._id] || 1)).toFixed(2)}</td>
                        <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => removeCartItem(p._id)}
                          >
                            <i className="fas fa-trash-alt"></i> 
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4" className="text-right"><b>Total Amount:</b></td>
                      <td>{totalPrice()}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

<div className="row justify-content-center">
            <div className="col-md-8">
              {/* <div className="checkout-box text-center p-4">
                <h2 className="mb-4">Cart Summary</h2>
                <div className="checkout-options mb-4">
                  <p className="checkout-option">Total</p>
                  <p className="checkout-option">Checkout</p>
                  <p className="checkout-option">Payment</p>
                </div>
              </div> */}

              {/* Address Box */}
              <div className="checkout-box address-box text-center p-4 mb-4">
                {auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h4>Current Address : {auth?.user?.address}</h4>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Box */}
              <div className="checkout-box text-center p-4">
                <div className="mt-4">
                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-primary mt-3"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : `Pay ${totalPrice()}`}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
      
      </div>
    </Layout>
  );
};

export default Cart;
