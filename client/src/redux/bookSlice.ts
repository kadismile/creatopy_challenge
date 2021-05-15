import { createSlice } from "@reduxjs/toolkit";
import BookService from '../services/book'
export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: []
  },
  reducers: {
    addBook(state:any, action) {
      if (action.payload.title) {
        state.books.push(action.payload);
      } else {
        state.books = []
        state.books.push(...action.payload);
      }
    },
  },
});

export const fetchBooks =  (accessToken: string) => {
  return (dispatch: any) => {
    BookService.fetchBooks(accessToken).then((doc:any) => {
      dispatch(addBook(doc))
    })
  };
};

export const { addBook} = bookSlice.actions;
export const selectBook = (state: any) => state.books.books;
export default bookSlice.reducer;
