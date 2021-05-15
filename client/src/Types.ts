import {AnyAction} from "redux"

export interface ActionType extends AnyAction{
  type: string,
  payload?: any
}

export interface UserType {
  name: string;
  email: string;
  accessToken: string
}

export interface BookType {
  title: string;
  description: string;
}