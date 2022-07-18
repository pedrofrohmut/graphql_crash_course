import { gql } from "@apollo/client"

export const getProjectsQuery = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`

export const getProjectQuery = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`
