import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"

import { deleteClientMutation } from "../mutations/clientMutations"
import { getClientsQuery } from "../queries/clientQueries"

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(deleteClientMutation, {
    variables: { id: client.id },
    update: (cache, { data: { deleteClient: deletedClient } }) => {
      const { clients: cacheClients } = cache.readQuery({ query: getClientsQuery })
      const updatedClients = cacheClients.filter(client => client.id !== deletedClient.id)
      cache.writeQuery({ 
        query: getClientsQuery, 
        data: { clients: updatedClients } 
      })
    }
  })
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-sm btn-danger btn-delete"
          onClick={() => deleteClient(client.id)}
        >
          <FaTrash />
          <span>Delete</span>
        </button>
      </td>
    </tr>
  )
}

export default ClientRow
