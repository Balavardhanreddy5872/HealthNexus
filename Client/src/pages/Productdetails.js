import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from 'axios';
import toast from 'react-hot-toast';
import "../styles/Productdetails.css"


const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [counter,setCounter]=useState(0);
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
 const increment=()=>{
   setCounter(counter+1);
 }
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8081/api/product/get-medicine/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4" >
      <h1 className="text-center" style={{paddingTop:"15px"}}>Medicine Info</h1>
        <div style={{display:"flex",justifyContent:"center",backgroundColor:'skyblue' ,border:'2px solid grey' , borderRadius: '9px'}}>
          <div style={{marginLeft:"100px",marginTop:"100px"}}>
            <img
              src={`http://localhost:8081/api/product/medicine-photo/${product._id}`}
              className="img-fluid rounded"
              alt={product}
              style={{boxShadow:'2px 2px 2px 2px grey',height:'50vh' , width:'50vw'}}
            />
          </div>
          <div className="col-md-6" style={{ textAlign: "left" ,marginLeft:'10vw' ,backgroundColor:'whitesmoke'}}>
            <br />
            <div style={{margin:"20px",marginRight:"30px",paddingLeft:"50px"}}>
            <h1 className="mb-3">{product.name}</h1>
            <h5 className="lead">{product.description}</h5>
            <p>MRP:<b style={{fontSize:"20px"}}>₹{product.price*2}</b></p>
            <p>inclusive all taxes</p>
            <div style={{backgroundColor:"aquamarine",width:"70%",borderRadius:"10px",display:"flex"}}>
                {/* <strong>Price:</strong> ₹{product.price *2} */}
                <p>Get this at<b style={{fontSize:"20px",color:"red"}}>₹{product.price}</b><br/>
                simply add this item to the cart</p>
                <p style={{backgroundColor:"white",height:"50%",width:"30%",borderRadius:"5px"}}><i style={{fontSize:"20px",padding:"7px"}} class="fa-solid fa-cart-shopping"></i>cart:{counter}</p>
            </div> 
            
            <p className="lead">
              <strong>Discount:</strong> 50% 
            </p>
            <p className="lead">
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <br />
            <button className="btn btn-secondary ms-2" onClick={()=> {increment();setCart([...cart, product]); toast.success("Item Added to cart");}}>ADD TO CART</button>
          </div>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    </Layout>
  );
};

export default Productdetails;
