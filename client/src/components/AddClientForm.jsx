import { useState } from "react"
import { useMutation } from "@apollo/client"
import { addClientMutation } from "../mutations/clientMutations"
import { getClientsQuery } from "../queries/clientQueries"

const AddClientForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [addClient] = useMutation(addClientMutation, {
    variables: { name, email, phone },
    update: (cache, { data: { addClient: newClient } }) => {
      const { clients: cacheClients } = cache.readQuery({ query: getClientsQuery })
      const updatedClients = [...cacheClients, newClient]
      cache.writeQuery({
        query: getClientsQuery,
        data: { clients: updatedClients }
      })
    }
  })

  const onSubmit = e => {
    e.preventDefault()
    if (name === "" || email === "" || phone === "") {
      alert("Please fill all fields")
      return
    }
    addClient({ name, email, phone })
    setName("")
    setEmail("")
    setPhone("")
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          id="name"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          id="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          id="phone"
          className="form-control"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">
        Submit
      </button>
    </form>
  )
}

export default AddClientForm
