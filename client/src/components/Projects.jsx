import { useQuery } from "@apollo/client"

import Spinner from "./Spinner"
import ProjectCard from "./ProjectCard"

import { getProjectsQuery } from "../queries/projectQueries"

const Projects = () => {
  const { loading: isLoading, error, data } = useQuery(getProjectsQuery)
  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <div>
          <p>Error to get projects</p>
          <p>{error.message}</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          {data.projects.length === 0 && <p>No projects to display</p>}
          {data.projects.length > 0 && (
            <div className="row mt-4">
              {data.projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Projects
