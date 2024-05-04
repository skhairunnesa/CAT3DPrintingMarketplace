import { useNavigate } from "react-router-dom";
import "./Login.scss";
import "./branding.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {APIURL} from './config.js';

function storeCredsAndRedirect(tokenObj, userObj) {
    localStorage.setItem("token", JSON.stringify(tokenObj));
    localStorage.setItem("user", JSON.stringify(userObj));
    redirectToUserHome(userObj);
}

function redirectToUserHome(userObj) {
    if (userObj.type === 'seller' && userObj.seller.subType !== undefined) {
        window.location.href = `/login/${userObj.seller.subType.toLowerCase()}`;
    }
    else {
        window.location.href = `/login/${userObj.type}`;
    }
}

function Modal({
        modalHeader,
        modalMessage,
        modalActions}
    ) {
    if (!modalHeader || !modalMessage) return null;
    return(
        <div id={"MyModal"} className="loginModal">
            <div>
                <strong id={"ModalHeader"}>{modalHeader}</strong>
                <p id={"ModalMessage"}>{modalMessage}</p>
                <span className={"ModalActions"}>{modalActions}</span>
            </div>
        </div>
    )
}


function Template({children}){
    //Make the login screen a reusable component for the signup 
    //and create account pages
    const nav = useNavigate()

    return (
        <div className="HeaderTemplate">
            <div onClick={()=>nav("/")}>

                <img src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha" />
            </div>
            <div/>
            {children}
            <Modal/>
        </div>
    );

}

function LoginScreenBase({children}){
    const nav = useNavigate();

    return(
        <div className="SignUpPage">
            <div>
                <img src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha" onClick={()=>nav("/")}/>
            </div>
            {children}
        </div>
    );
}

function SignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

function LoginForm(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const nav = useNavigate();
    
    const [thisModal, setThisModal] = useState(null);
    const [modal, setModal] = useState(null);
    const closeModal = () => <button onClick={()=>setModal(null)}>OK</button>
    useEffect(() => {
        setThisModal(modal);
    }, [modal]);
    let wa = null;
    useEffect(() => {
        setThisModal(wa);
    }, [wa]);

    //removes google credential jwt, and provider at login screen
    localStorage.removeItem("jwt");
    localStorage.removeItem("provider");

    if(localStorage.getItem("token")){
        const user = JSON.parse(localStorage.getItem("user"));
        //check if there is currently a session token/valid one
        const token = JSON.parse(localStorage.getItem("token"));
        if (token && token.expires) {
            const expirationDate = new Date(token.expires);
            const currentDate = new Date();
            
            if (currentDate < expirationDate) {
                // Token is still valid
                wa = (
                    <Modal
                        modalHeader="You're already signed in"
                        modalMessage='In order to use another account, you must sign out first.'
                        modalActions={
                            <>
                                <button onClick={()=>{SignOut(); window.location.reload()}}>Sign Out</button>
                                <button onClick={()=>redirectToUserHome(user)}>Go to dashboard</button>
                            </>
                        }
                    />
                )
            } 
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${APIURL}/auth/login`, {email: email, password: password})
        .then(result => {
            if(result.data.status === "success"){
                storeCredsAndRedirect(result.data.token, result.data.user);
            }
            else console.log(result.data.reason)
        })
        .catch(err => setModal(
            <Modal
                modalHeader="Login Failed"
                modalMessage={err.response.data.reason}
                modalActions={closeModal()}
            />
        ))


    }

    //Facebook front
    const responseFacebook = async (response) => {
        // Handle Facebook login response here
        console.log(response);
        // Send the Facebook JWT to the server for verification and login
        axios.post(`${APIURL}/auth/facebook`, {
            jwt: response.accessToken
        }).then(result => {
            // Handle server response after Facebook OAuth login
            console.log(result);
            if (result.data.status === 'success') {
                localStorage.setItem('token', JSON.stringify(result.data.token));
            } else {
                setModal(
                    <Modal
                        modalHeader="Login Failed"
                        modalMessage={result.data.reason}
                        modalActions={closeModal()}
                    />
                );
                
            }
        }).catch(err => setModal(
            <Modal
                modalHeader="Login Failed"
                modalMessage={err.response.data.reason}
                modalActions={closeModal()}
            />
        ));
    };

    return(
        <>
            {thisModal}
            <GoogleOAuthProvider clientId="868741849492-ias2jaeoigl0pls8ji5qlqrmcn2h41c5.apps.googleusercontent.com">
                <div className="LoginForm">
                    
                    <div className="InputFields">
                        <strong>Email</strong>
                        <input type="email" placeholder="Ex. Example@email.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="InputFields">
                        <strong>Password</strong>
                        <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <strong>OR</strong>
                    <div className="buttonLinkContainer">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                axios.post(`${APIURL}/oauth/google`, {
                                    oauth:{
                                        jwt: credentialResponse.credential
                                    }
                                })
                                .then(login => {
                                    if (login.data.needsSignup === true){
                                        //logged in
                                        nav("/SignUp")
                                        localStorage.setItem('jwt', credentialResponse.credential)
                                        localStorage.setItem('provider', "google")
                                    }
                                    else{
                                        //redirect user dashboard
                                        storeCredsAndRedirect(login.data.token, login.data.user);
                                    }
                                })
                                .catch(err=> setModal(
                                    <Modal
                                        modalHeader="Login Failed"
                                        modalMessage={err.response.data.reason}
                                        modalActions={closeModal()}
                                    />
                                )
                            )
                            }}
                            onError={err => {
                                console.log('Login Failed');
                                setModal(
                                    <Modal
                                        modalHeader="Invalid OAuth"
                                        modalMessage={err.response.data.reason}
                                        modalActions={closeModal()}
                                    />
                                )
                            }}
                        />
                        <FacebookLogin
                            appId="737362851712100"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            style={{
                                backgroundColor: '#4267b2',
                                color: '#fff',
                                fontSize: '16px',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={()=>{nav("/SignUp")}}> Create Account</button>
                        <button onClick={handleSubmit}> Login </button>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>
    )
}

function CreateAccountForm(){
    const [myNav, setNav] = useState(undefined); //default is /SignUp
    const [thisModal, setThisModal] = useState(null);
    const [modal, setModal] = useState(null);
    const closeModal = () => <button onClick={()=>setModal(null)}>OK</button>
    useEffect(() => {
        setThisModal(modal);
    }, [modal]);
    const nav = useNavigate();
    function handleNav(){
        if(myNav === undefined){
            setModal(
                <Modal
                    modalHeader="Invalid Option"
                    modalMessage={'Please select an account type'}
                    modalActions={closeModal()}
                />
            )
            //do nothing
        }else if(myNav === 0){
            nav("/SignUp/SellerSignUp");
        }else if(myNav === 1){
            nav("/SignUp/BuyerSignUp");
        }
    }

    return(
        <>
            {thisModal}
            <div className="CreateAccountForm">
                
                <button className={myNav==0 ? "LinkButton toPageButton" : "LinkButton"} onClick={()=>setNav(0)}>Create Vendor Account</button>
                <button className={myNav==1 ? "LinkButton toPageButton" : "LinkButton"} onClick={()=>setNav(1)}>Create Customer Account</button>
                <button className="LinkButton" onClick={()=>handleNav()}>Continue</button>

            </div>
        </>

    )
}

//Used to keep track of the countries list
const countriesList = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
    'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
    'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
    'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'DR Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
    'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
    'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
    'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
    'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
    'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
    'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
    'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

function CreateSellerForm(){
    const OAuthsuccess = localStorage.getItem("jwt") !== null;
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [selectedCountry, setSelectedCountry] = useState('');
    const [subType, setSubType] = useState();
    const [biz, setBiz] = useState();
    const [bin, setBin] = useState();
    const [zip, setZip] = useState();
    const [thisModal, setThisModal] = useState(null);
    const [modal, setModal] = useState(null);
    const closeModal = () => <button onClick={()=>setModal(null)}>OK</button>
    useEffect(() => {
        setThisModal(modal);
    }, [modal]);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            setModal(
                <Modal
                    modalHeader="Account Creation Failed"
                    modalMessage='Passwords Do Not Match'
                    modalActions={closeModal()}
                />
            )
        }
        else{
            axios.post(`${APIURL}/auth/signup`, {type: "seller", firstName:firstName, lastName: lastName, email: email, password: password,
                country: selectedCountry,
                seller: {
                    businessName: biz,
                    businessID: bin,
                    subType: subType
                },
                oauthUser: OAuthsuccess,
                oauth: (
                    !OAuthsuccess ? undefined :
                    {
                        source: localStorage.getItem("provider"),
                        jwt: localStorage.getItem("jwt")
                    } 
                )
            })
            .then(result => {
                SignOut();
                navigate("/login")
            })
            .catch(err=> setModal(
                <Modal
                    modalHeader="Account Creation Failed"
                    modalMessage={err.response.data.reason}
                    modalActions={closeModal()}
                />
            ))



        }
        
    }

    //Handles changes to the country dropdown
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const changeSubType = (e) => {
        setSubType(e.target.value);
    };

    return (
        <>
            {thisModal}
            <div className="SellerForm">
                <h2>Join as Vendor</h2>
                <strong>Contact information</strong>
                <div className="InputFields">
                    <strong>First Name</strong>
                    <input type="text" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="InputFields">
                    <strong>Last Name</strong>
                    <input type="text" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)} />
                </div>
                {!OAuthsuccess && (
                    <>
                <div className="InputFields">
                    <strong>Email</strong>
                    <input type="email" placeholder="Ex. Example@email.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="InputFields">
                    <strong>Password</strong>
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="InputFields">
                    <strong>Confirm Password</strong>
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                    </>
                )}

                <strong>Business information</strong>

                <div className="InputFields">
                    <strong>Country</strong>
                    <select value={selectedCountry} onChange={handleCountryChange}>
                        <option selected disabled value="">Select country</option>
                        {countriesList.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <div className="InputFields">
                    <strong>Legal Business Name</strong>
                    <input type="text" placeholder="Enter name of business" onChange={e => setBiz(e.target.value)}/>
                </div>
                <div className="InputFields">
                    <strong>Business Identification Number(BIN)</strong>
                    <input type="text" placeholder="BIN number" onChange={e => setBin(e.target.value)}/>
                </div>
                <div className="InputFields">
                    <strong>Industry Segment</strong>
                    <select onChange={changeSubType} value={subType}>
                        <option disabled selected>Select an option</option>
                        <option>Designer</option>
                        <option>Contractor</option>
                        <option>Company</option>
                        <option>Dealer</option>
                    </select>
                </div>
                <div className="InputFields">
                    <strong>Zipcode</strong>
                    <input type="text" placeholder="Zipcode" onChange={e => setZip(e.target.value)}/>
                </div>
                <button onClick = {handleSubmit}>Continue</button>
            </div>
        </>
        
    )
}
function CreateBuyerForm(){
    const OAuthsuccess = localStorage.getItem("jwt") !== null;
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName]   = useState();
    const [email, setEmail]         = useState();
    const [password, setPassword]   = useState();
    const [password2, setPassword2]   = useState();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [interest, setInterest]   = useState();
    const [postal, setPostal] = useState();
    const navigate = useNavigate()

    const [thisModal, setThisModal] = useState(null);
    const [modal, setModal] = useState(null);
    const closeModal = () => <button onClick={()=>setModal(null)}>OK</button>
    useEffect(() => {
        setThisModal(modal);
    }, [modal]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            setModal(
                <Modal
                    modalHeader="Account Creation Failed"
                    modalMessage={`Passwords Do Not Match`}
                    modalActions={closeModal()}
                />
            );
        }
        else{
            axios.post(`${APIURL}/auth/signup`, 
            {type: "buyer",firstName:firstName, lastName: lastName, email: email, password: password, country: selectedCountry,
                buyer: {
                    interests: [interest],
                    postalCode: postal
                },
                oauthUser: OAuthsuccess,
                oauth: (
                    !OAuthsuccess ? undefined :
                    {
                        source: localStorage.getItem("provider"),
                        jwt: localStorage.getItem("jwt")
                    } 
                )
            })
            .then(result => {console.log(result)
                SignOut();
                navigate("/login")
            })
            .catch(err=> setModal(
                <Modal
                    modalHeader="Account Creation Failed"
                    modalMessage={err.response.data.reason}
                    modalActions={closeModal()}
                />
            ))
        }
    }

    //Handles changes to the country dropdown
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const handleInterestChange = (e) => {
        setInterest(e.target.value);
    };

    return (
        <>
            {thisModal}
            <div className="BuyerForm">
                <h2>Join as Customer</h2>
                <strong>Contact information</strong>
                <div className="InputFields">
                    <strong>First Name</strong>
                    <input type="text" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="InputFields">
                    <strong>Last Name</strong>
                    <input type="text" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                {!OAuthsuccess && (
                    <>
                <div className="InputFields">
                    <strong>Email</strong>
                    <input type="email" placeholder="Ex. Example@email.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="InputFields">
                    <strong>Password</strong>
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="InputFields">
                    <strong>Confirm Password</strong>
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                    </>
                )}
                <div className="InputFields">
                    <strong>Country</strong>
                    <select value={selectedCountry} onChange={handleCountryChange}>
                        <option selected disabled value="">Select country</option>
                        {countriesList.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <div className="InputFields">
                    <strong>Postal Code (ZIP in U.S.)</strong>
                    <input type="text" placeholder="Postal Code" onChange={e => setPostal(e.target.value)}/>
                </div>
                <div className="InputFields">
                    <strong>Which of the following best describes you?</strong>
                    <select value={interest} onChange={handleInterestChange}>
                        <option disabled selected>Select an option</option>
                        <option value="home_6mo">I'm looking to purchase a home within the next 6 months</option>
                        <option value="home_year">I'm looking to build or purchase a home within a year</option>
                        <option value="printed_objects">I'm looking for 3D printed objects</option>
                        <option value="no_preference">Just interested in 3D printing construction</option>
                    </select>
                </div>
                <button onClick = {handleSubmit}>Create Account</button>
            </div>
        </>
    )
}

export default LoginForm
export{Template, LoginScreenBase, LoginForm, CreateAccountForm, CreateSellerForm, CreateBuyerForm}