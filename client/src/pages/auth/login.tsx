import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Userservice from '../../services/user'
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import toastr from 'toastr'
import validator from "validator";
import {DisabledButton, LoadingButton} from '../../components/libs'

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [submitForm, setSubmitForm] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    disabled: true,
    errors: {
      email: "",
      password: "",
    }
  });

  const disableForm = () => {
    let newValues = { ...formValues };

    let isError = false;
    for (let val of Object.values(newValues)) {
      if (val === "") {
        isError = true
      }
    }

    if (isError && submitForm) {
      console.log("Form is not Valid!");
      return true
    }

    if (!isError && !submitForm) {
      console.log("Form is not Valid!");
      return true
    }

    if (isError && !submitForm) {
      console.log("Form is not Valid!");
      return true
    }

    if (!isError && !submitForm) {
      console.log("Form is Valid!");
      return false
    }
  };
  const handleChange = (event: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    event.preventDefault();
    let { name, value } = event.target;
    let errors = formValues.errors;
    validateForm(name, errors, value);
    setFormValues(prevState => {
      return {
        ...prevState,
        errors,
        [name]: value
      }
    });
    for (let val of Object.values(formValues.errors)) {
      if (val !== "") {
        setSubmitForm(false)
      }
    }
  };
  const validateForm = (name:any, errors:any, value:any) => {
    switch (name) {
      case "email":
        errors.email = "";
        if (value.length && value.length <= 3) {
          errors.email = "email must be more than 3 characters long!";
          setSubmitForm(false);
        } else if (!validator.isEmail(value)) {
          errors.email = "Email is not valid!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.email;

      case "password":
        errors.password = "";
        if (value.length && value.length <= 5) {
          errors.password = "password too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.password;
      default:
        setSubmitForm(false);
        break;
    }

  };
  const  handleSubmit =  async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    setLoading(true);
    const {email, password} = formValues
    let data = await Userservice.login(email, password)
    const { accessToken, name, message }: any = data
    if (accessToken) {
      dispatch(login({accessToken, name, email}))
      setLoading(false);
      toastr.success("Login Successful");
      window.location.replace("/")
    } else {
      setLoading(false);
      toastr.error(message);
    }
  }

  const { errors } = formValues;

  return  (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center min-vh-100">
              <div className="w-100 d-block my-5">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-5">
                    <div className="card">
                      <div className="card-body">
                        <div className="text-center mb-4 mt-3">
                          <h3>
                            <a href="/">Login</a>
                          </h3>
                        </div>
                        <form>
                          <div className="form-group">
                            <label htmlFor="emailaddress">Email address</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Your Email Address"
                              onChange={handleChange}
                              value={formValues.email}
                              id="inputPassword4"
                              autoComplete="off"
                            />
                            {errors.email.length > 0 && (
                              <span className="addUser__error">{errors.email}</span>
                            )}
                          </div>
                          <div className="form-group">
                            <Link className="text-muted float-right" to="/forgot-password"> Forgot your password? </Link>
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Your Password"
                              onChange={handleChange}
                              value={formValues.password}
                              id="inputPassword4"
                              autoComplete="off"
                            />
                            {errors.password.length > 0 && (
                              <span className="addUser__error">{errors.password}</span>
                            )}
                          </div>

                          <div className="form-group mb-4 pb-3">
                            <div className="custom-control custom-checkbox checkbox-primary">
                              <input type="checkbox" className="custom-control-input" id="checkbox-signin"/>
                              <label className="custom-control-label" htmlFor="checkbox-signin">Remember me</label>
                            </div>
                          </div>
                          <div className="mb-3 text-center">
                            {
                              disableForm() ?
                                <DisabledButton/> :

                                loading ?

                                  <LoadingButton/> :

                                  <button
                                    type="button"
                                    className="btn btn-primary btn-large waves-effect waves-light"
                                    style={{ margin: "auto", display: "block", width: "200px" }}
                                    onClick={(event) =>handleSubmit(event)}
                                  > Submit
                                  </button>
                            }
                            <br/>
                            <p>No Account? <Link to="/register"> Register </Link> </p>
                          </div>
                        </form>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Login}