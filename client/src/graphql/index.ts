import {ApolloClient, InMemoryCache} from "@apollo/client";

const REACT_APP_BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
export const apolloClient = new ApolloClient({
  uri: REACT_APP_BASE_URL,
  cache: new InMemoryCache(),
})