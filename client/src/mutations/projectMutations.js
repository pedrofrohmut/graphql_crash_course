import { gql } from "@apollo/client"

export const addProjectMutation = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
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

export const deleteProjectMutation = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
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

export const updateProjectMutation = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(id: $id, name: $name, description: $description, status: $status) {
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
