// import React, { useState, useEffect } from 'react';
// import { useCart } from '../context/cart';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// import { useNavigate } from 'react-router-dom';
// // import '../styles/homeswiper.css'
// const Homeswiper = () => {
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8081/api/product/get-medicine');
//         setProducts(data.products);
//       } catch (error) {
//         console.log(error);
//         toast.error('Something Went Wrong');
//       }
//     };

//     fetchData();
//   }, []);

//   // Shuffle array function
//   const shuffleArray = (array) => {
//     let currentIndex = array.length, randomIndex;

//     // While there remain elements to shuffle...
//     while (currentIndex !== 0) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }

//     return array;
//   }
//   const randomProducts = shuffleArray(products).slice(0, 6);
//   return (
//     <div className='swiper-slide'>
//        <div className="d-flex flex-wrap" style={{ margin: '80px', marginTop: '20px' }}>
//           {randomProducts?.map((p) => (
//             <div key={p._id} onClick={() => navigate(`/productdetails/${p.slug}`)} style={{ cursor: 'pointer' }}>
//               <div className="card m-2" style={{ width: '20rem', height: '65vh' }}>
//                 <img
//                   src={`http://localhost:8081/api/product/medicine-photo/${p._id}`}
//                   className="card-img-top"
//                   height="200px"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">{p.description.substring(0, 30)}...</p>
//                   <p className="card-text"><b>₹ {p.price}</b></p>
//                   <button
//                     className="btn btn-secondary ms-1"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setCart([...cart, p]);
//                       toast.success('Item Added to Cart');
//                     }}
//                   >
//                     ADD TO CART
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//     </div>
//   )
// }
// export default Homeswiper;


// import React, { useState, useEffect } from 'react';
// import { useCart } from '../context/cart';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// import { useNavigate } from 'react-router-dom';

// const Homeswiper = () => {
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8081/api/product/get-medicine');
//         setProducts(data.products);
//       } catch (error) {
//         console.log(error);
//         toast.error('Something Went Wrong');
//       }
//     };

//     fetchData();
//   }, []);

//   // Shuffle array function
//   const shuffleArray = (array) => {
//     let currentIndex = array.length, randomIndex;

//     // While there remain elements to shuffle...
//     while (currentIndex !== 0) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       // And swap it with the current element.
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }

//     return array;
//   }

//   const randomProducts = shuffleArray(products).slice(0, 6);

//   // Function to handle the next button click
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 4) % randomProducts.length);
//   };

//   return (
//     <div className='swiper-slide'>
//       <div className="d-flex flex-wrap" style={{ margin: '80px', marginTop: '20px' }}>
//         {randomProducts.slice(currentIndex, currentIndex + 4).map((p) => (
//           <div key={p._id} onClick={() => navigate(`/productdetails/${p.slug}`)} style={{ cursor: 'pointer' }}>
//             <div className="card m-2" style={{ width: '20rem', height: '65vh' }}>
//               <img
//                 src={`http://localhost:8081/api/product/medicine-photo/${p._id}`}
//                 className="card-img-top"
//                 height="200px"
//                 alt={p.name}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description.substring(0, 30)}...</p>
//                 <p className="card-text"><b>₹ {p.price}</b></p>
//                 <button
//                   className="btn btn-secondary ms-1"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setCart([...cart, p]);
//                     toast.success('Item Added to Cart');
//                   }}
//                 >
//                   ADD TO CART
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="btn btn-secondary" onClick={handleNext}>Next</button>
//     </div>
//   );
// };

// export default Homeswiper;
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cart';
import axios from 'axios';
import toast from 'react-hot-toast';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
// import '../styles/homeswiper.css';
// Install Swiper modules
SwiperCore.use([Navigation]);



const Homeswiper = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8081/api/product/get-medicine');
        setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      }
    };

    fetchData();
  }, []);

  // Shuffle array function
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const randomProducts = shuffleArray(products).slice(0, 8);

  // Function to handle the next button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % randomProducts.length);
  };

  return (
    <div style={{width: '85%'}}>
    <div className='swiper-slide' style={{marginLeft:"200px"}}>
      <Swiper
        slidesPerView={5}
        spaceBetween={60}
        navigation={true}
      >
        {randomProducts.map((p) => (
          <SwiperSlide key={p._id} style={{width: '15rem'}}>
              <div onClick={() => navigate(`/productdetails/${p.slug}`)} className="card" style={{ cursor: 'pointer', width: '220px'}}>
                <img
                  src={`http://localhost:8081/api/product/medicine-photo/${p._id}`}
                  className="card-img-top"
                  height="150px"
                  padding="25px"
                  alt={p.name}
                />
                <div className="card-body" style={{height:"220px"}}>
                  <h3 className="card-title" style={{textAlign:"center"}}>{p.name}</h3>
                  {/* <p className="card-text">{p.description.substring(0, 30)}...</p> */}
                  <p>Best Price<b style={{color:'red'}}>₹ {p.price/2}</b></p>
                  <p className="card-text">MRP &nbsp;<del>₹ {p.price}</del> </p>
                  <button
                    style={{background:"#24aeb1",width:"100%"}}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCart([...cart, p]);
                      toast.success('Item Added to Cart');
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default Homeswiper;
