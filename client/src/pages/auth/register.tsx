import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import validator from "validator";
import {DisabledButton, LoadingButton} from "../../components/libs";
import Userservice from "../../services/user";
import {login} from "../../redux/userSlice";
import toastr from "toastr";


function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [submitForm, setSubmitForm] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    password: "",
    repeat_password: "",
    disabled: true,
    errors: {
      email: "",
      name: "",
      password: "",
      repeat_password: ""
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

    if (formValues.password !== formValues.repeat_password) {
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
      case "name":
        errors.name = "";
        if (value.length && value.length <= 3) {
          errors.name = "name must be more than 3 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.name;
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
      case "repeat_password":
        errors.repeat_password = "";
        if (value.length && value.length <= 5) {
          errors.repeat_password = "password too short";
          setSubmitForm(false);
        } else if (value !== formValues.password) {
          errors.repeat_password = "password do not match";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.repeat_password;
      default:
        setSubmitForm(false);
        break;
    }

  };

  const  handleSubmit =  async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    setLoading(true);
    let {email, password, name} = formValues
    let data: any = await Userservice.register({email, password, name} )
    const {accessToken} = data
    if (accessToken) {
      dispatch(login({accessToken, name, email}))
      setLoading(false);
      toastr.success("Registration Successful")
      window.location.replace("/")
    } else {
      let { message } = data
      setLoading(false);
      toastr.error(message)
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
                            <a href="/">Register</a>
                          </h3>
                        </div>
                        <form>
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Your Name"
                              onChange={handleChange}
                              value={formValues.name}
                              autoComplete="off"
                            />
                            {errors.name.length > 0 && (
                              <span className="addUser__error">{errors.name}</span>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="emailaddress">Email address</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Your Email Address"
                              onChange={handleChange}
                              value={formValues.email}
                              autoComplete="off"
                            />
                            {errors.email.length > 0 && (
                              <span className="addUser__error">{errors.email}</span>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="password"> Password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Your Name"
                              onChange={handleChange}
                              value={formValues.password}
                              autoComplete="off"
                            />
                            {errors.password.length > 0 && (
                              <span className="addUser__error">{errors.password}</span>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="password">Repeat Password</label>
                            <input
                              type="password"
                              name="repeat_password"
                              className="form-control"
                              placeholder="Your Name"
                              onChange={handleChange}
                              value={formValues.repeat_password}
                              autoComplete="off"
                            />
                            {errors.repeat_password.length > 0 && (
                              <span className="addUser__error">{errors.repeat_password}</span>
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
                            <p>Already Registered? <Link to="/login"> Login </Link> </p>
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

export {Register}