import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import Spinner from "./Spinner"

import { addProjectMutation } from "../mutations/projectMutations"
import { getProjectsQuery } from "../queries/projectQueries"
import { getClientsQuery } from "../queries/clientQueries"

const AddProjectForm = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("new")
  const [clientId, setClientId] = useState("")

  const { loading: isLoading, error, data } = useQuery(getClientsQuery)

  const [addProject] = useMutation(addProjectMutation, {
    variables: { name, description, status, clientId },
    update: (cache, { data: { addProject: newProject } }) => {
      const { projects: cacheProjects } = cache.readQuery({ query: getProjectsQuery })
      const updatedProjects = [...cacheProjects, newProject]
      cache.writeQuery({
        query: getProjectsQuery,
        data: { projects: updatedProjects }
      })
    }
  })

  const onSubmit = e => {
    e.preventDefault()
    if (name === "" || description === "" || status === "" || clientId === "") {
      alert("Please fill all fields")
      return
    }
    addProject()
    setName("")
    setDescription("")
    setStatus("new")
    setClientId("")
  }

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
            <label className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="clientId">
              Client
            </label>
            <select
              id="clientId"
              className="form-select"
              value={clientId}
              onChange={e => setClientId(e.target.value)}
            >
              <option value=""> --- Select Client --- </option>
              {data.clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} - {client.email}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  )
}

export default AddProjectForm
