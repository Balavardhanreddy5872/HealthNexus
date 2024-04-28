import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Medicines:${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap" style={{ margin: '80px', marginTop: '20px', textAlign:'left'}}>
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: '20rem', height: '65vh' }} key={p._id}>
                <img
                  src={`http://localhost:8081/api/product/medicine-photo/${p._id}`}
                  className="card-img-top"
                  height='200px'
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.letter}</p>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">₹ {p.price}</p>
                  <button className="btn btn-success ms-1"  onClick={() => navigate(`/productdetails/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1"  onClick={()=> {setCart([...cart, p]); toast.success("Item Added to cart");}}>ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;