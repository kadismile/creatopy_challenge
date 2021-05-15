import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/userSlice";
import {addBook} from "../redux/bookSlice";
import BookService from '../services/book'
import toastr from "toastr";
import {DisabledButton, LoadingButton} from "./libs";

function AddBook() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [submitForm, setSubmitForm] = useState(false)
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    disabled: true,
    errors: {
      title: "",
      description: "",
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
      case "title":
        errors.title = "";
        if (value.length && value.length <= 0) {
          errors.title = "title must be more than a characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.title;

      case "description":
        errors.description = "";
        if (value.length && value.length <= 5) {
          errors.description = "description must be more than 5 characters long!";
          setSubmitForm(false);
        } else {
          setSubmitForm(true);
        }
        return errors.description;
      default:
        setSubmitForm(false);
        break;
    }

  };
  const  handleSubmit =  async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    setLoading(true);
    const { title, description}= formValues
    let data = await BookService.addBook({title, description, accessToken:user.accessToken})
    if (data.title) {
      setTimeout(()=> {
        dispatch(addBook(data))
        setLoading(false);
        toastr.success("book Added");
        setFormValues(prevState => {
          return {
            ...prevState,
            title: "",
            description: "",
            disabled: true,
            errors: {
              title: "",
              description: "",
            }
          }
        });
      }, 1000)
    } else {
      setLoading(false);
      console.log("error")
    }
  }

  const { errors } = formValues;

  return (
    <div>
        <div className="col-12">
          <div className="d-flex align-items-center min-vh-50">
            <div className="w-100 d-block my-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center mb-4 mt-3">
                        <h3>
                          <a href="/">Add a Book</a>
                        </h3>
                      </div>
                      <form>
                        <div className="form-group">
                          <label htmlFor="emailaddress">Title</label>
                          <input
                            type="email"
                            name="title"
                            className="form-control"
                            placeholder="Title"
                            id="inputPassword4"
                            autoComplete="off"
                            onChange={handleChange}
                            value={formValues.title}
                          />
                          {errors.title.length > 0 && (
                            <span className="addUser__error">{errors.title}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Description</label>
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            placeholder="Description"
                            id="inputPassword4"
                            autoComplete="off"
                            onChange={handleChange}
                            value={formValues.description}
                          />
                          {errors.description.length > 0 && (
                            <span className="addUser__error">{errors.description}</span>
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
  )
}

export {AddBook}