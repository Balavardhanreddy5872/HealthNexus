import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import "../styles/labtest.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";

const Labtest = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const initialInputFields = {
    name: "",
    number: "",
    pincode: "",
    Package: null,
    test: null
  }
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleBlur = (field) => {
    setTouchedFields({
      ...touchedFields,
      [field]: true,
    });
    validateForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const handleChange1 = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true); // Reset validation on each change
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    setIsValidEmail(isValid);

    if (isValid) {
      // Perform actions after a correct email is submitted
      console.log('Email submitted:', email);

      // Show success message
      setShowSuccessMessage(true);

      // You can also reset the form or perform other actions as needed
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const numberPattern = /^[6-9][0-9]{9}$/;
    if (touchedFields.name && inputFields.name.length < 5) {
      newErrors.name = 'Name at least 5 characters long.';
    } else {
      newErrors.name = '';
    }
    if (touchedFields.number && !numberPattern.test(inputFields.number)) {
      newErrors.number = 'Number should be 10 digits.';
    } else {
      newErrors.number = '';
    }
    if (touchedFields.pincode && inputFields.pincode.length !== 6) {
      newErrors.pincode = 'Pincode should be 6 digits.';
    } else {
      newErrors.pincode = '';
    }
    if (touchedFields.package && !inputFields.package) {
      newErrors.package = 'Please choose a package.';
    } else {
      newErrors.package = '';
    }
    if (touchedFields.test && !inputFields.test) {
      newErrors.test = 'Please choose a test.';
    } else {
      newErrors.test = '';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8081/api/lab/report`, {
        name: inputFields.name,
        number: inputFields.number,
        pincode: inputFields.pincode,
        Package: inputFields.Package,
        test: inputFields.test,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/dashboard/user/lab");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    const accessKey = 'pUnITtCFmckwccMDLoHKPPMVAQqueUBs0t2AgX37Jf0';
    const query = 'lab tests';

    fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`)
      .then(response => response.json())
      .then(data => {
        const newImageSource = data.urls.regular;
        setImageSource(newImageSource);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, []);
  const selectPackage = (packageDetails) => {
    setInputFields({
      ...inputFields,
      Package: packageDetails,
    });
  };
  return (
    <Layout>
      <div className="image1">
        <img src={imageSource} alt="Lab Test" style={{ width: "75%", height: "500px", margin: "30px 25px" }} />
        <div className="formfill" id="bn">
          <form className="form1" id="fm" onSubmit={handleSubmit}>
            <p>Please fill in your details </p>
            <label htmlFor="name">NAME</label><br />
            <input type="text" name="name" id="name" maxLength={50} onChange={handleChange} value={inputFields.name}
              style={{ border: errors.name ? "1px solid red" : null }}
              onBlur={() => handleBlur('name')} />
            {errors.name ? (
              <p className="error">
                {errors.name}
              </p>
            ) : null}<br />
            <label htmlFor="number">MOBILE NUMBER</label>
            <br />
            <input type="tel" pattern="[6-9][0-9]{9}" name="number" id="number" onChange={handleChange} value={inputFields.number}
              style={{ border: errors.number ? "1px solid red" : null }}
              onBlur={() => handleBlur('number')} />
            {errors.number ? (
              <p className="error">
                {errors.number}
              </p>
            ) : null}<br />
            <label htmlFor="pincode">PINCODE</label><br />
            <input type="tel" name="pincode" id="pincode" maxLength={6} style={{ border: errors.pincode ? "1px solid red" : null }}
              onChange={handleChange} value={inputFields.pincode}
              onBlur={() => handleBlur('pincode')} />
            {errors.pincode ? (
              <p className="error">
                {errors.pincode}
              </p>
            ) : null}<br />
            <label htmlFor="package" id="ff">CHOOSE PACKAGE</label><br />
            <input list="medic" id="Package" name="Package" onChange={handleChange} value={inputFields.Package}
              style={{ border: errors.Package ? "1px solid red" : null }}
              onBlur={() => handleBlur('package')} />
            {errors.Package ? (
              <p className="error">
                {errors.package}
              </p>
            ) : null}<br />
            <datalist id="medic">
              <option value="Aarogyam A">Aarogyam A</option>
              <option value="Aarogyam B">Aarogyam B</option>
              <option value="Aarogyam C">Aarogyam C</option>
              <option value="HealthNexus A">HealthNexus A</option>
              <option value="HealthNexus B">HealthNexus B</option>
              <option value="HealthNexus C">HealthNexus C</option>
              <option value="NHP">HealthNexus Health Pack</option>
              <option value="Aarogyam X">Aarogyam X</option>
              <option value="BEP">Basic Elergy Package</option>
              <option value="NMP">HealthNexus Male Package</option>
              <option value="NFP">HealthNexus Female Package</option>
              <option value="Aarogyam xl">Aarogyam XL</option>
            </datalist>
            <label htmlFor="tet" id={11}>CHOOSE Test</label><br />
            <input list="medicover" id="test" name="test" onChange={handleChange} value={inputFields.test}
              style={{ border: errors.test ? "1px solid red" : null }}
              onBlur={() => handleBlur('test')} />
            {
              errors.test ? (<p className='error'>{errors.test}</p>) : null
            }
            <datalist id="medicover">
              <option className="scroll">Liver Profile</option>
              <option className="scroll">Diabets</option>
              <option className="scroll">Lipid Profile</option>
              <option className="scroll">Thyroid Profile</option>
              <option className="scroll">Iron deficiency</option>
              <option className="scroll">T3-T4-TSH</option>
              <option className="scroll">TSH</option>
              <option className="scroll">HBA1C</option>
              <option className="scroll">AMA(anti microsomal antibody)</option>
              <option className="scroll">Urirc Acid Serum</option>
              <option className="scroll">RF(Rhumatoid Factor)</option>
              <option className="scroll">Vitamin B-12</option>
              <option className="scroll">Calcium</option>
              <option className="scroll">PPBS</option>
              <option className="scroll">FBS</option>
              <option className="scroll">CRP</option>
              <option className="scroll">PRL</option>
            </datalist>
            <div className="error" id="terror" /><br />
            <input type="checkbox" />I agree to HealthNexus Terms and Conditions. <br />
            <button type="submit" className='button' name="BOOK NOW">BOOK NOW</button>
          </form>
        </div>
      </div>
      <div className='labtest'>
        <div className="pop">
          <h2>Popular Tests</h2>
          <p>and many more tests and packages THE BEST PRICES</p>
        </div>
        <div className="popular">
          <div className="disease">
            <div className='test-1'>
              <p>Thyroid Profile</p>
              <p>Liver Profile</p>
              <p>Lipid Profile</p>
              <p>Diabets</p>
              <p>Iron Deficiency</p>
              <p>Testosterone</p>
              <p>Complete Hemogram</p>
              <p>Vitamin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="spackages">

        <h2>Top Selling Packages</h2>
        <p>Choose from the list of top-selling packages tailored for you. We care for your health!</p>
        <div className="selling">
          <div className="swasthya">
            <div className="swa-matter">
              <div className='swa-matter head'>
                <h3>HealthNexus Swasthya</h3>
              </div>
              <p>Book Regular Health Check-up Package HealthNexus Swasthya, a Basic Screening Preventive Health Check-up Profile including
                59 tests.</p>
              <div>
                <del>Rs.3200</del>&nbsp;
                <span>Rs.1100</span>
              </div>
              
              <button className="now" onClick={() => selectPackage('HealthNexus Swasthya')}>
              BOOK NOW
            </button>
            </div>
            <div className='swa-image'>
              <img  src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/family.png' alt="family image" />
            </div>
          </div>
          <div className="shield">
            <div className="shield-matter">
              <h3>HealthNexus Shield Pack</h3>
              <p>HealthNexus Shield Pack helps to protect against a particular danger or risk. It includes a unique diagnostic profile of
                56 tests for a comprehensive health evaluation.</p>
              <div>
                <del>Rs.3000</del>
                <span>Rs.800</span>
              </div>
              <button className="now" onClick={() => selectPackage('HealthNexus Shield Pack')}>
              BOOK NOW
            </button>
            </div>
            <div className='s-image'>
              <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/Aarogyam-1.3.png' alt='aarogyam'/>
            </div>
          </div>
          <div className="Health">
            <div className="Health-matter">
              <h3>HealthNexus Health Pack</h3>
              <p>Health check-ups are very useful in the early detection of all types of illnesses and risk factors. Simple to
                understand and less time consuming, our HealthNexus Health Pack comprises of 35 parameters of regular tests that have been
                specially designed keeping your health in mind.</p>
            <div>
              <del>Rs.1699</del>&nbsp;
              <span>Rs.499</span>
            </div>
            <button className="now" onClick={() => selectPackage('HealthNexus Health Pack')}>
              BOOK NOW
            </button>
            </div>
            <div className='h-image'>
              <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/Allergy.png' alt='allergy' />
            </div>
          </div>
          
          <div className="diabetes">
            <div className="diabets-matter">
              <h3>HealthNexus Diabetic Checkup</h3>
              <p>Meant for people who want to get regular reports to prevent/check their diabetes levels. It includes 49 tests.</p>
            <div>
              <del>Rs.3450</del>&nbsp;
              <span>Rs.899</span>
            </div>
            <div className='button-wrap'>
            <button className="now" onClick={() => selectPackage('HealthNexus Diabetic checkup')}>
              BOOK NOW
            </button>
            </div>
            </div>
            <div className='d-image'>
              <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/Diabetes.png' />
            </div>
          </div>
          <div className="Aarogyam">
            <div className="Aarogyam-matter">
              <h3>Aarogyam B</h3>
              <p>Meant for people who want to get regular reports to prevent/check their diabetes levels. It includes 49 tests.</p>
            
            <div>
              <del>Rs.2600</del>&nbsp;
              <span>Rs.1050</span>
            </div>
            <button className="now" onClick={() => selectPackage('Aarogyam B')}>
              BOOK NOW
            </button>
            </div>
            <div className='a-image'>
              <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/Fever.png' alt='fever'/>
            </div>
          </div>
          <div className="nhealthy">
            <div className="nhealthy-matter">
              <h3>HealthNexus Healthy</h3>
              <p>HealthNexus Healthy Full Body Checkup Package will help you know the functioning of your major body organs.</p>
            
            <div>
              <del>Rs.3000</del>
              <span>Rs.999</span>
            </div>
            <button className="now" onClick={() => selectPackage('HealthNexus Healthy')}>
              BOOK NOW
            </button>
            </div>
            <div className='n-image'>
              <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/Netmeds-Health-Pack.png' alt='pack' />
            </div>
          </div>
          <div className="screens">
            <div className="screens-matter">
              <h3>HealthNexus Pre-Screening</h3>
              <p>HealthNexus Pre-Screening helps to evaluate against common illness /infection of blood / urine / stool and also
                determines blood group of a person which is an important parameter required in cases of anaemia (due to chronic blood
                loss) and for identity.</p>
            
            <div>
              <del>Rs.910</del>
              <span> Rs.649</span>
            </div>
            <button className="now" onClick={() => selectPackage('HealthNexus Pre-Scanning')}>
              BOOK NOW
            </button>
          </div>
          <div className='sm-image'>
            <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/Antenatal_Care.png' alt='care' />
          </div>
        </div>
        </div>
      </div>
      <div className="customers">
        <h2><b> Customer Speak</b></h2>
        <p>Customer Speak Customer satisfaction is our prime focus. We would like to hear your comments about our service.</p>
        <div className="boxes">
          <div className="box1 bb">
            <h3 className="manzo">Rajiv Singh </h3>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i className="bi manzo bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" /><br />
            <span>Mumbai</span><br />
            <span>--------------------------------</span>
            <p>I've done lab tests before. The process seemed so off-putting.But with HealthNexus it has been so easy and Professional.</p>
          </div>
          <div className="box2 bb">
            <h3 className="manzo ">Manzoor </h3>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i className="bi manzo bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" /><br />
            <span>Delhi</span><br />
            <span>--------------------------------</span>
            <p>This is the best lab test experience ever!The process seemed so off putting but with HealthNexus it has been so easy and HealthNexus Swasthya package</p>
          </div>
          <div className="box3 bb">
            <h3 className="manzo">Kiran chakravarthi</h3>
            &nbsp; &nbsp; &nbsp;
            <i class="bi bi-star-fill" ></i>
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" /><br />
            <span>Chennai</span><br />
            <span>--------------------------------</span>
            <p>In HealthNexus,The phlebotomists took great care when drawing the blood etc. He was very reassuring!The process very smoothly.</p>
          </div>
        </div>
      </div>
      <div className="light">
        <h2><b>Our Highlights</b></h2>
      </div>
      <div className='highlight'>
      <div className="high">
          <div className="hh1 r">
            <img src='https://www.netmeds.com/assets/icons/location.png' alt='location' />
            <h4>Home Sample Collection</h4>
          </div>
          <div className="hh2 r">
          <img src=' https://www.netmeds.com/assets/icons/store.png' alt='location2' />
            <h4>2000+Location Served</h4>
          </div>
          <div className="hh3 r">
          <img src=' https://www.netmeds.com/assets/icons/user.png' alt='location3' />
            <h4>NABL,CAP ISO Certified</h4>
          </div>
          <div className="hh4 r">
          <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/pathology/75_discount.png' alt='location4' />
            <h4>Upto 75% Discount </h4>
          </div>
      </div>
      </div>
      <div className='partners'>
        <div className='hedaing-1'>
          <h2><b>Lab Partner</b></h2>
          <p style={{fontSize:"20px"}}>We provide lab tests and health packages from well-reputed, certified diagnostic labs across the country.</p>
        </div>
        <div className='image-lab'>
          <img src='https://www.netmeds.com/images/cms/wysiwyg/Diagnostics/2022/thyrocare_newlogo.jpg' alt='Thyrocare' />
          <img src='https://www.netmeds.com/images/cms/wysiwyg/cms/1683033888_Orange_logo.jpg' alt='Orange health care' />
          <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/radiology/Healthians.jpg' alt='Healthians' />
          <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/radiology/Niramaya.jpg' alt='Niramaya' />
          <img src='https://www.netmeds.com/images/cms/wysiwyg/health-packages/radiology/Neuberg.jpg' alt='Neuberg' />
        </div>
      </div>

      <div className="labs">
        <ul>
          <li> Certified Labs </li>
          <li><a href="https://netmeds.com/health-packages" className="lnk" target="_blank" rel="noopener"> Best Price </a></li>
          <li><a href="https://netmeds.com/health-packages" className="lnk" target="_blank" rel="noopener"> Assured Quality </a></li>
        </ul>
      </div>
      <div className="nexus">
        <img id="grp" src="/images/SimplyVital-logo.jpg" alt='logo' />
      </div>
      <div className="nxs">
        <p>
          Health Nexus is the most trusted pharmacies, dispensing quality medicines at reasonable prices to all customers – PAN India.
        </p>
      </div>
      <hr />
      <div className="foot">
        <div className='ft-txt'>
        <div className="company">
          <h3>COMPANY</h3>
          <ul>
            <li>About Nexus</li>
            <li>customers Speak</li>
            <li>In the News</li>
            <li>Career</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li> Fees and Payments Policy</li>
            <li>Shipping and Delivery Policy</li>
          </ul>
        </div>
        <div className="shop">
          <h3>SHOPPING</h3>
          <li>Browse by A-Z</li>
          <li>Browse by Manufacturers</li>
          <li>Health Articles</li>
          <li>Offers / Coupons</li>
          <li>FAQs</li>
        </div>
        <div className="social">
          <h3>SOCIAL</h3>
          <li>Patients Alike</li>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>LinkedIn</li>
          <li>Youtube</li>
          <li>Refer &amp; Earn</li>
        </div>
        
        <div className="subscribe">
          <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
          <p>Get a free subscription to our health and <br />fitness tip and stay tuned to our latest offers</p>
          <div>
            <form onSubmit={handleSubmit1}>
              <input
                type="email"
                placeholder="Enter your Email address"
                value={email}
                onChange={handleChange1}
              />
              <button type="submit" className='arrow_button'>
                <i className="bi bi-arrow-bar-right" ></i>
              </button>
            </form>
            {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}

            {showSuccessMessage && (
              <div className="success-message">
                <p><i className="bi bi-check" style={{ fontSize: '1.5rem' }}></i>Thank you for your subscription.</p>
              </div>
            )}
          </div>
        </div>
        </div>
        <div className='payment'>
          <h3 style={{paddingLeft:"70px",marginTop:"20px"}}>Our Payment Partners</h3>
          <div className='p-partner'>
          <img class="g-img" src="https://www.netmeds.com/assets/global/images/footer-payment-icon/google-pay.svg" alt='gpay'/>
          <img class="p-img" src="https://www.netmeds.com/assets/global/images/footer-payment-icon/phonepe.svg" alt="PhonePe" />
          <img class="pt-img" src="https://www.netmeds.com/assets/global/images/footer-payment-icon/paytm.svg" alt="Paytm" />
          <img class="r-img" src="https://www.netmeds.com/assets/global/images/footer-payment-icon/rupay.svg" alt="Rupay"/>
          <img class="v-img" src="https://www.netmeds.com/assets/global/images/footer-payment-icon/visa.svg" alt="Visa Card Network" />
          <img class="vs-img" src="https://www.netmeds.com/assets/global/images/footer-payment-icon/mastercard.svg" alt="MasterCard"/>
        </div>
        </div>
      </div>
      

    </Layout>

  )
}

export default Labtest
