import {apolloClient} from "../../graphql";
import {LOGIN, GET_USER, REGISTER_USER, RECOVER_PASSWORD, CHANGE_PASSWORD} from "./queries";


interface IUser {
  token?: string,
  name?: string,
  email?: string,
  password?: string
}

class UserService {
  async login(email: string, password: string): Promise<IUser> {
    try {
      const response = await apolloClient.query({query: LOGIN, variables: { email, password }})
      if (!response || !response.data)
        throw new Error("Cannot login")
      return response.data.login
    } catch (e) {
      throw e
    }
  }

  async fetchUser(accessToken: string): Promise<IUser> {
    try {
      const response = await apolloClient.query({query: GET_USER, variables: { accessToken }})
      if (!response || !response.data)
        throw new Error("Cannot login")
      return response.data.fetchUser
    } catch (e) {
      throw e
    }
  }

  async register( data: IUser): Promise<IUser> {
    const {name, email, password} = data
    try {
      const response = await apolloClient.mutate({ mutation: REGISTER_USER, variables: { email, name, password }})
      if (!response || !response.data)
        throw new Error("Cannot login")
      return response.data.createUser
    } catch (e) {
      throw e
    }
  }

  async recoverPassword( data: IUser): Promise<IUser> {
    const {email} = data
    try {
      const response = await apolloClient.mutate({ mutation: RECOVER_PASSWORD, variables: { email }})
      if (!response || !response.data)
        throw new Error("Error")
      return response.data.recoverPassword
    } catch (e) {
      throw e
    }
  }

  async changePassword( data: any): Promise<IUser> {
    const {newPassword, oldPassword, resetPasswordToken } = data
    try {
      const response = await apolloClient.mutate({ mutation: CHANGE_PASSWORD, variables: { newPassword, oldPassword, resetPasswordToken }})
      if (!response || !response.data)
        throw new Error("Error")
      return response.data.changePassword
    } catch (e) {
      throw e
    }
  }

}

export default new UserService();