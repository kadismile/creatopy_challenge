import {apolloClient} from "../../graphql";
import { GET_BOOKS, ADD_BOOK } from "./queries";


interface IBook {
  title?: string,
  description?: string,
  accessToken?: string
}

class BookService {

  async fetchBooks(accessToken: string): Promise<IBook> {
    try {
      const response = await apolloClient.query({ query: GET_BOOKS, variables: { accessToken }})
      if (!response || !response.data)
        throw new Error("Cannot login")
      return response.data.fetchBooks
    } catch (e) {
      throw e
    }
  }

  async addBook( data: IBook): Promise<IBook> {
    const {title, description, accessToken} = data
    try {
      const response = await apolloClient.mutate({ mutation: ADD_BOOK, variables: { title, description, accessToken }})
      if (!response || !response.data)
        throw new Error("Cannot Add Book")
      return response.data.createBook
    } catch (e) {
      throw e
    }
  }

}

export default new BookService();