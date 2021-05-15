import React, {useEffect, useState} from 'react';
import Userservice from './services/user'
import { selectUser } from "./redux/userSlice";
import { useSelector } from "react-redux";
import {FullPageSpinner} from './components/libs'
import AuthenticatedApp  from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
function App() {

  let token = useSelector(selectUser);

  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    ( async () => {
      if (token?.accessToken) {
        setLoading(true)
        let data = await Userservice.fetchUser(token.accessToken)
        const { accessToken }: any = data
        setUser(accessToken)
        setLoading(false)
      }
    })()
  }, [token?.accessToken])
  return (
    loading ? <FullPageSpinner/> :
    user ? <AuthenticatedApp /> : <UnauthenticatedApp />
  )
}

export default App;
