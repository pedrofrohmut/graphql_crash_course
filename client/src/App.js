import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Project from "./pages/Project"

import "./App.css"

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="project/:id" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
)

export default App
