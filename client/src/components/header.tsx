import React from 'react';
import {logout, selectUser} from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";




function Header() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  const signOut = () => {
    dispatch(logout({accessToken: null}))
    window.location.replace("/")
  }
  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-left">
            <button type="button" className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
                    id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars"></i>
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown d-none d-sm-inline-block ml-2">
              <button type="button" className="btn header-item noti-icon waves-effect"
                      id="page-header-search-dropdown" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                <i className="mdi mdi-magnify"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                   aria-labelledby="page-header-search-dropdown">

                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search ..."
                             aria-label="Recipient's username"/>
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit"><i
                              className="mdi mdi-magnify"></i></button>
                        </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="dropdown d-inline-block ml-2">
              <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="rounded-circle header-profile-user" src="/images/users/avatar-3.jpg"
                     alt="Header Avatar"/>
                  <span className="d-none d-sm-inline-block ml-1">{user.name}</span>
                  <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item "
                   href="/" onClick={signOut}>
                  <span>Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export {Header}