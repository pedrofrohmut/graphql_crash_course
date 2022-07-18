import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"

import { deleteProjectMutation } from "../mutations/projectMutations"

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(deleteProjectMutation, {
    variables: { id: projectId }
  })

  const onClick = e => {
    const confirmDelete = window.confirm("Do you really want to delete?")
    if (confirmDelete) {
      deleteProject()
      navigate("/")
    }
  }

  return (
    <button className="btn btn-danger" onClick={onClick}>
      <FaTrash className="icon" /> Delete Project
    </button>
  )
}

export default DeleteProjectButton
