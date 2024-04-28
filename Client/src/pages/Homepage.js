import React from 'react';
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import '../styles/style.css'
import '../styles/style2.css'
import '../styles/Homepage.css'
import  Homeswiper  from './homeswiper';

const Homepage = () => {
  
  // Get 6 random products
  
  return (
    <Layout>
      <div>
        <div>
          {/* <br/> */}
          <div className="main">
            <div id="slider">
              <figure>
                <img alt='web_home' src="/images/slider1.jpeg" />
                <img alt='web_home' src="/images/slider2.jpg"/>
                <img alt='web_home' src="/images/slider3.jpg" />
                <img alt='web_home' src="/images/slider4.png" />
                <img alt='web_home' src="/images/slider4.png" />
              </figure>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* discount section */}
        {/* <section className="discount_section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-5 offset-md-2">
                <div className="detail-box">
                  <h2>
                    You get <br />
                    any medicine <br />
                    on
                    <span> 10% discount </span>
                  </h2>
                  <div>
                    <Link to="/medicine"> Buy Now </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-5">
                <div className="img-box">
                  <img alt='web_home' src="/images/download-removebg-preview-fotor-bg-remover-2023032022277.png" />
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <br/>
        <div className="self">
          <div className="self_section" style={{ padding: 40, margin: '20px 40px' }}>
            <img alt='web_home'src="https://www.pngfind.com/pngs/m/170-1707648_truck-fast-delivery-speed-svg-png-icon-free.png" style={{ height: 100, marginLeft: 70 }} />
            <br />
            <br />
            <h4>we assure safe and fastest delivery</h4>
          </div>
          <div className="self_section" style={{ padding: 40, margin: '20px 40px' }}>
            <img alt='web_home'src="https://www.shutterstock.com/image-illustration/best-price-guarantee-label-icon-260nw-259618541.jpg" style={{ height: 100, marginLeft: 70 }} />
            <br />
            <br />
            <h4>One of the top selling site</h4>
          </div>
          <div className="self_section" style={{ padding: 40, margin: '20px 40px' }}>
            <img alt='web_home'src="https://www.shutterstock.com/image-vector/medical-team-icon-260nw-689072647.jpg" style={{ height: 100, marginLeft: 70 }} />
            <br />
            <br />
            <h4>Consult Top doctors at free</h4>
          </div>
        </div>
        <br />
        <br />
          <div className="headsell1">
            <h1 style={{ color: '#fff' }}>
              <h2><b>LABTESTS</b></h2>
            </h1>
            <br />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/labtests"><img alt='web_home'src="/images/1581428021_Web_Landingabc_Banner.jpg" style={{ height: '40vh', width: '80%' }} /></Link>
              <Link to="/labtests"><img alt='web_home'src="/images/Banner-02-scaled.jpg" style={{ height: '40vh', width: '80%' }} /></Link>
            </div>
          </div><br/>
        <div style={{marginTop:"10px",top:"0px", padding: "5px", background: `
        url("https://www.netmeds.com/images/cms/section/images/1704906417_Limited_Time.png") no-repeat left bottom / 240px,
        linear-gradient(to bottom, rgb(255 255 255 / -2%), rgba(255, 255, 255, .4) 78%),
        linear-gradient(180deg, #ab1e24, #ab1e24)
      `}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '10px'}}>
            <h4 style={{paddingLeft:"10px",color:"white"}}><b>Limited Time Deals</b></h4>
            <h6 style={{paddingLeft:"10px",color:"white"}}><b>Grab the deal</b></h6>
          </div>
          {/* <p style={{color:"white"}}>Grab  this limited time offer before it’s gone!</p> */}
          <div style={{margin:"20px"}}>
           <Homeswiper/>
          </div>
        </div>
        <div style={{marginTop:"30px", padding: "5px", background: `
        url("https://www.netmeds.com/images/cms/section/images/1708192463_Accu-chek_#009BC6.png") no-repeat left bottom / 240px,
        linear-gradient(to bottom, rgb(255 255 255 / -2%), rgba(255, 255, 255, .4) 78%),
        linear-gradient(180deg, #009BC6, #009BC6)
      `}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '10px'}}>
            <h4 style={{paddingLeft:"10px",color:"white"}}><b>New Arrivals</b></h4>
          </div>
          {/* <p style={{color:"white"}}>Grab  this limited time offer before it’s gone!</p> */}
          <div style={{margin:"20px"}}>
           <Homeswiper/>
          </div>
        </div>
        <br />
        <div style={{background:`linear-gradient(180deg,#ef4281 50%,#f3f7fb 50%)`}}>
          <h2 style={{padding:"10px",color:"white"}}>Health Library</h2>
          <div style={{display:"flex"}}>
          <div>
              <div className="card" style={{width: "16rem",margin:"20px"}}>
              <img className="card-img-top" src="https://www.netmeds.com/images/cms/wysiwyg/blog/2020/12/1608540328_Kaunch_big_1.jpg" alt="Card" />
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:"center",fontSize:"22px",fontFamily: 'Roboto, sans-serif'}}>Kaunch Beej</h5>
                <p className="card-text">helps in quick healing of wound, decreases swelling and brings back the normal texture of the skin. </p>
               </div>
              </div>
          </div>
          <div>
              <div className="card" style={{width: "16rem",margin:"20px"}}>
              <img className="card-img-top" src="https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/06/01/Pictures/_233c555a-4676-11e7-ae7e-b192f5497e3d.jpg" alt="Card" />
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:"center",fontSize:"22px",fontFamily: 'Roboto, sans-serif'}}>Almonds</h5>
                <p className="card-text">Almonds are rich in vitamin E,essential oils antioxidants which are beneficial for all .</p>
               </div>
              </div>
          </div>
          <div>
              <div className="card" style={{width: "16rem",margin:"20px"}}>
              <img className="card-img-top" src="https://www.shutterstock.com/image-photo/walnut-isolated-unpeeled-walnuts-nut-260nw-2306979049.jpg" alt="Card" />
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:"center",fontSize:"22px",fontFamily: 'Roboto, sans-serif'}}>Walnuts</h5>
                <p className="card-text">Walnuts help to reduce stress and prevents from cancer good for skins and hairs.</p>
               </div>
              </div>
          </div>
          <div>
              <div className="card" style={{width: "16rem",margin:"20px"}}>
              <img className="card-img-top" src="https://static.toiimg.com/thumb/msid-106130391,width-1280,height-720,resizemode-4/106130391.jpg" alt="Card" />
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:"center",fontSize:"22px",fontFamily: 'Roboto, sans-serif'}}>Raisins</h5>
                <p className="card-text">Raisins are dried grapes it is rich source of iron and treatment for anaemia.</p>
               </div>
              </div>
          </div>
          <div>
              <div className="card" style={{width: "16rem",margin:"20px"}}>
              <img className="card-img-top" src="https://images.healthshots.com/healthshots/en/uploads/2023/09/04073149/pistachip-1600x900.jpg" alt="Card" />
              <div className="card-body">
                <h5 className="card-title" style={{textAlign:"center",fontSize:"22px",fontFamily: 'Roboto, sans-serif'}}>Pistachio</h5>
                <p className="card-text">Pistachio prevents from diabetes and boosts immunity and helps to reduce weight.</p>
               </div>
              </div>
          </div>
        </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>

    </Layout>
  )
}

export default Homepage
