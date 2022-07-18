const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
} = require("graphql")

const clientModel = require("../models/Client")
const projectModel = require("../models/Project")

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
})

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return clientModel.findById(parent.clientId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return clientModel.findById(args.id)
      }
    },
    clients: {
      type: GraphQLList(ClientType),
      resolve: (parent, args) => {
        return clientModel.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return projectModel.findById(args.id)
      }
    },
    projects: {
      type: GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return projectModel.find()
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const newClient = {
          name: args.name,
          email: args.email,
          phone: args.phone
        }
        const clientCreatedPromise = clientModel.create(newClient)
        return clientCreatedPromise
      }
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: (parent, args) => {
        return clientModel.findByIdAndDelete(args.id)
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { 
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              "new": { value: "Not Started" },
              "progress": { value: "In Progress" },
              "completed": { value: "Completed" }
            },
            defaultValue: "Not Started"
          })
        },
        clientId: { type: GraphQLNonNull(GraphQLID) } 
      },
      resolve: (parent, args) => {
        const newProject = {
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        }
        const projectCreatedPromise = projectModel.create(newProject)
        return projectCreatedPromise
      }
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: (parent, args) => {
        return projectModel.findByIdAndDelete(args.id)
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { 
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              "new": { value: "Not Started" },
              "progress": { value: "In Progress" },
              "completed": { value: "Completed" }
            }
          })
        }
      },
      resolve: (parent, args) => {
        const projectUpdatedPromise = projectModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status
            }
          },
          { new: true }
        )
        return projectUpdatedPromise
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
