import { FaEdit } from "react-icons/fa"

import EditProjectForm from "./EditProjectForm"

const EditProjectModal = ({ project }) => {
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#editProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaEdit className="icon" />
          <div>Edit Project</div>
        </div>
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="editProjectModal"
        tabIndex="-1"
        aria-labelledby="editProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProjectModalLabel">
                Edit Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditProjectForm project={project} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProjectModal
