import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// components
import BookList from './Components/BookList'
import AddBook from './Components/AddBook'
// import BookDetail from "./Components/BookDetail"

// Apollo client setup
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
      return (
        <ApolloProvider client={client}>
          <div id="main">
            <h1>Graphql Library</h1>
            <BookList />
            {/* <BookDetail/> */}
            <AddBook />
          </div>
        </ApolloProvider>
      );
  }
}

export default App;
