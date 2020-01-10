import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Routes } from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:3001"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter children={Routes} />
      </ApolloProvider>
    );
  }
}

export default App;
