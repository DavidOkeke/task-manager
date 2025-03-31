import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Signin = () => {
  const auth = getAuth(); // Initialize Firebase Auth
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [inputField, setInputField] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitButton = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, inputField.email, inputField.password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log("Signed in user:", user);

        // Navigate to the Task component
        navigate('/tasks');
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        setErrorMessage(errorMessage); // Display error message to the user
      });
  };

  const goToSignup = () => {
    navigate('/signup'); // Navigate to Signup.js when "Sign Up" is clicked
  };

  return (
    <>
      <div className="container signin-form">
        <div className="row col-md-12">
          <div className="card card-white col-md-6 offset-md-3 mt-5 form-holder">
            <div className="card-body">
              <div className="card-subtitle">
                <i className="fa fa-check-circle" aria-hidden="true"></i> Sign in to your account
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    value={inputField.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type="password"
                    value={inputField.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="form-control btn btn-primary mt-3"
                  onClick={submitButton}
                >
                  Sign In
                </button>
              </form>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
              <button
                className="btn btn-link mt-3"
                onClick={goToSignup} // Navigate to Signup.js
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;