import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {DisabledButton, LoadingButton} from "../../components/libs";
import Userservice from "../../services/user";
import toastr from "toastr";

interface ResetPasswordProps {
  resetPasswordToken: string
}
const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const {resetPasswordToken} = props
  const [loading, setLoading] = useState(false)
  const [submitForm, setSubmitForm] = useState(false)
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    disabled: true,
    errors: {
      oldPassword: "",
      newPassword: "",
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

      case "newPassword":
        errors.newPassword = "";
        if (value.length && value.length <= 5) {
          errors.newPassword = "password too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.newPassword;

      case "oldPassword":
        errors.oldPassword = "";
        if (value.length && value.length <= 5) {
          errors.oldPassword = "password too short";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.oldPassword;
      default:
        setSubmitForm(false);
        break;
    }

  };
  const  handleSubmit =  async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    setLoading(true);
    const {newPassword, oldPassword} = formValues
    let data = await Userservice.changePassword({newPassword, oldPassword, resetPasswordToken})
    const { message }: any = data
    if (message == "Wrong Current Password Provided" || message  == "invalid or expired reset Password Token") {
      setLoading(false);
      toastr.error(message);
      setFormValues(prevState => {
        return {
          ...prevState,
          oldPassword: "",
          newPassword: "",
          disabled: true,
          errors: {
            oldPassword: "",
            newPassword: "",
          }
        }
      });
    } else {
      setLoading(false);
      toastr.success(message);
      window.location.replace("/login")
    }
  }

  const { errors } = formValues;
  return (
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
                            <a href="/">Change Your Password</a>
                          </h3>
                        </div>
                        <form>
                          <div className="form-group">
                            <label htmlFor="emailaddress">Old Password</label>
                            <input
                              type="password"
                              name="oldPassword"
                              className="form-control"
                              placeholder="Your Old Password"
                              onChange={handleChange}
                              value={formValues.oldPassword}
                              id="inputPassword4"
                              autoComplete="off"
                            />
                            {errors.oldPassword.length > 0 && (
                              <span className="addUser__error">{errors.oldPassword}</span>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                              type="password"
                              name="newPassword"
                              className="form-control"
                              placeholder="Your New Password"
                              onChange={handleChange}
                              value={formValues.newPassword}
                              id="inputPassword4"
                              autoComplete="off"
                            />
                            {errors.newPassword.length > 0 && (
                              <span className="addUser__error">{errors.newPassword}</span>
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
                            <p>No Account? <Link to="/login"> Login </Link> </p>
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

export {ResetPassword}