import React, {useEffect} from 'react'
import {selectUser} from "../../redux/userSlice";
import { selectBook, fetchBooks} from "../../redux/bookSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {AddBook} from "../../components/addBook";


function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const books = useSelector(selectBook)

  useEffect(()=> {
    dispatch(fetchBooks(user.accessToken))
  }, [])


  console.log("uselessBooks ", books)

  return (
    <>
      <AddBook/>
    <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">

                  <div id="datatable-buttons_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                      </div>

                    </div>
                    <br/>
                    <br/>
                    <div className="row">
                      <div className="col-sm-12">
                        <table id="datatable-buttons" className="table table-striped dt-responsive nowrap dataTable no-footer dtr-inline" role="grid" aria-describedby="datatable-buttons_info" style={{width: '1590px'}}>
                          <thead>
                          <tr role="row">
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                aria-label="Name: activate to sort column descending">#
                            </th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '274px'}} aria-sort="ascending"
                                aria-label="Name: activate to sort column descending">Title
                            </th>
                            <th className="sorting" tabIndex={0} aria-controls="datatable-buttons" rowSpan={1}
                                colSpan={1} style={{width: '397px'}}
                                aria-label="Position: activate to sort column ascending">Description
                            </th>
                          </tr>
                          </thead>
                          <tbody>

                          {
                            books.map((book, index)=> { return (
                              <tr role="row" className="odd" key={index}>
                                <td tabIndex={0} className="sorting_1">{index+1}</td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                              </tr>
                            )
                            })
                          }
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
    </>
  )
}

export {Home}