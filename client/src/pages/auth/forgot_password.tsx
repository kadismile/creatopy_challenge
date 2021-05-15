import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Userservice from '../../services/user'
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import toastr from 'toastr'
import validator from "validator";
import {DisabledButton, LoadingButton} from '../../components/libs'

function ForgotPassword() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [submitForm, setSubmitForm] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    disabled: true,
    errors: {
      email: "",
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
    const {email} = formValues
    let data = await Userservice.recoverPassword({email})
    const { message }: any = data
    if (message) {
      setLoading(false);
      toastr.success(message);
      setFormValues(prevState => {
        return {
          ...prevState,
          email: "",
          disabled: true,
          errors: {
            email: ""
          }
        }
      });
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
                            <a href="#">Recover Your Password</a>
                          </h3>
                        </div>
                        <form>
                          <div className="form-group">
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
                            <p>Remeber Your Password? <Link to="/login"> Login </Link> </p>
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

export {ForgotPassword}