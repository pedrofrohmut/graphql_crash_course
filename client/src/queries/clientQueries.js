import { gql } from "@apollo/client"

export const getClientsQuery = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`
