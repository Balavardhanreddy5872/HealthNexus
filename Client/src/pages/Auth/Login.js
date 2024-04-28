import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";
import '../../styles/authstyles.css'
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

     // form function 
     const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8081/api/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                  });
                  localStorage.setItem("auth", JSON.stringify(res.data));
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    const register = async (e) =>{
        e.preventDefault();
        navigate("/register");
    }

  return (
    <Layout>
        <div className="form-container ">
                <form onSubmit={handleSubmit} style={{height:'70vh'}}>
                    <h4 className="title">LOGIN </h4>
                    <img src= '/images/HealthNexus+logo+transparent+2.png' alt='HealthNexus' style={{height:'120px', width:'320px',marginLeft:'80px',marginTop:'40px'}}/>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div style={{display:'flex'}}>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={register}>
                        Register
                    </button>
                    </div>
                </form>
            </div>
    </Layout>
  )
}

export default Login
