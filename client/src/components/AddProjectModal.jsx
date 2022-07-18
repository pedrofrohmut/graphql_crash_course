import { FaList } from "react-icons/fa"

import AddProjectForm from "./AddProjectForm"

const AddProjectModal = () => (
  <>
    {/* Button trigger modal */}
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addProjectModal"
    >
      <div className="d-flex align-items-center">
        <FaList className="icon" />
        <div>Add Project</div>
      </div>
    </button>
    {/* Modal */}
    <div
      className="modal fade"
      id="addProjectModal"
      tabIndex="-1"
      aria-labelledby="addProjectModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProjectModalLabel">
              Add Project
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <AddProjectForm />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default AddProjectModal
