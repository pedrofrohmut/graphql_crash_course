// Read .env file to get enviroment
require("dotenv").config()

const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const colors = require("colors")
const cors = require("cors")

const schema = require("./schema/schema")
const connectDb = require("./config/db")

const app = express()
const port = process.env.PORT || 5000

const run = async () => {
  try {
    await connectDb()
  } catch(e) {
    console.log(e)
    process.exit()
  }
  app.use(cors())
  app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development"
  }))
  app.listen(port, () => console.log(`Server running on port ${port}`))
}

run()
