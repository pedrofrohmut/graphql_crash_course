import { useState } from "react"
import { useMutation } from "@apollo/client"

import { updateProjectMutation } from "../mutations/projectMutations"

const getStatusValueFromString = str =>
  str === "Not Started" ? "new" : str === "In Progress" ? "progress" : "completed"

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState(getStatusValueFromString(project.status))

  const [updateProject] = useMutation(updateProjectMutation, {
    variables: { id: project.id, name, description, status }
  })

  const onSubmit = e => {
    e.preventDefault()
    if (name === "" || description === "" || status === "") {
      alert("Please fill all fields")
      return
    }
    updateProject()
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
      <button className="btn btn-secondary" data-bs-dismiss="modal" type="submit">
        Submit
      </button>
    </form>
  )
}

export default EditProjectForm
