import { useQuery } from "@apollo/client"

import ClientRow from "./ClientRow"
import Spinner from "./Spinner"

import { getClientsQuery } from "../queries/clientQueries"

const Clients = () => {
  const { loading: isLoading, error, data } = useQuery(getClientsQuery)
  if (error) console.log(error)
  // if (data) console.log(data.clients)
  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <div>
          <p>Error to get clients</p>
          <p>{error.message}</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          {data.clients.length === 0 && <p>No clients to display</p>}
          {data.clients.length > 0 && (
            <table className="table table-hover mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.clients.map(client => (
                  <ClientRow key={client.id} client={client} />
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  )
}

export default Clients
