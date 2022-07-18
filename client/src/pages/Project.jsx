import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"

import Spinner from "../components/Spinner"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectModal from "../components/EditProjectModal"

import { getProjectQuery } from "../queries/projectQueries"

const Project = () => {
  const { id: projectId } = useParams()
  const {
    loading: isLoading,
    error,
    data
  } = useQuery(getProjectQuery, {
    variables: { id: projectId }
  })
  if (error) console.log(error)
  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <div>
          <p>Error to get project</p>
          <p>{error.message}</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Home
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <div className="d-flex mt-5">
            <div className="me-2">
              <EditProjectModal project={data.project} />
            </div>
            <DeleteProjectButton projectId={projectId} />
          </div>
        </div>
      )}
    </>
  )
}

export default Project
