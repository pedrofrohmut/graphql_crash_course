import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"

import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

import "./index.css"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: { merge: (existing, incoming) => incoming },
        projects: { merge: (existing, incoming) => incoming }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
