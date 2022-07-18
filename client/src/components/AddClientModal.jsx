import { FaUser } from "react-icons/fa"

import AddClientForm from "./AddClientForm"

const AddClientModal = () => (
  <>
    {/* Button trigger modal */}
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#addClientModal"
    >
      <div className="d-flex align-items-center">
        <FaUser className="icon" />
        <div>Add Client</div>
      </div>
    </button>
    {/* Modal */}
    <div
      className="modal fade"
      id="addClientModal"
      tabIndex="-2"
      aria-labelledby="addClientModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addClientModalLabel">
              Add Client
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <AddClientForm />
          </div>
        </div>
      </div>
    </div>
  </>
)

export default AddClientModal
