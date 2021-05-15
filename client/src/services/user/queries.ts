import {gql} from "@apollo/client/core";

export const LOGIN = gql`  
  query Login($email: String!, $password: String!) {
    login(email: $email password: $password) {
        accessToken,
        id,
        name,
        message,
        email
    },
      
      
  }
`;

export const GET_USER = gql`
  query checkToken($accessToken: String!) {
      fetchUser(accessToken: $accessToken) {
        accessToken,
        email,
        name
      }
  }
`

export const REGISTER_USER = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name:$name, password: $password ) {
        accessToken,
        email,
        name,
        message
    }
  }
`
export const RECOVER_PASSWORD = gql`
    mutation recoverPassword($email: String!) {
        recoverPassword(email: $email) {
            message
        }
}
`
export const CHANGE_PASSWORD = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!, $resetPasswordToken: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword, resetPasswordToken: $resetPasswordToken) {
            message
        }
    }
`