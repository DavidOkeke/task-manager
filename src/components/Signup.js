import React, { useState } from 'react';
import firebase from '../auth/firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {

  const auth = getAuth(firebase);

  const navigate = useNavigate(); // Initialize useNavigate

  const [inputField, setInputField] = useState({
    email: "",
    password: ""
  });

  const [showModal, setShowModal] = useState(false);
  
  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputField((prevState) => ({ ...prevState, [name]: value }));
  }
  
  const submitButton = (e) => {
    e.preventDefault();
    console.log(inputField);
    createUserWithEmailAndPassword(auth, inputField.email, inputField.password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
      // alert("Account created successfully")
      // Show the modal on successful signup
      setShowModal(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", errorCode, errorMessage);
      alert(errorMessage)
    })
  }

  const goToTasks = () => {
    setShowModal(false); // Close the modal
    navigate('/tasks'); // Navigate to the Task.js component
  };

  const goToSignin = () => {
    navigate('/'); // Navigate to the Signin.js component
  };

  return (
    <>
      <div className="container signup-form">
        <div className="row col-md-12">
          <div className="card card-white col-md-6 offset-md-3 mt-5 form-holder">
            <div className="card-body">
                <div className="card-subtitle"><i className="fa fa-check-circle" aria-hidden="true"></i> Create a new account</div>
                <form className="">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" id="email" name="email" type="email" value={inputField.email} onChange={onChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input className="form-control" id="password" name="password" type="password" value={inputField.password} onChange={onChange} required/>
                  </div>
                  <button type="submit" className='form-control btn btn-primary mt-3' onClick={submitButton}>Signup</button>
                </form>
                <button
                  className="btn btn-link mt-3"
                  onClick={goToSignin} // Navigate to Signin.js
                >
                  Already have an account? Sign In
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Successful SignUp Modal */}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={!showModal} style={{ backgroundColor: showModal ? "rgba(0, 0, 0, 0.5)" : "transparent" }} >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Signup Successful
              </h5>
            </div>
            <div className="modal-body">
              Your account has been created successfully!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={goToTasks} >
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;