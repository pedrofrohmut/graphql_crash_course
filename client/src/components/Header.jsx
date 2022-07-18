import logo from "./assets/logo.png"

const Header = () => (
  <nav className="navbar bg-light mb-4 p-0">
    <div className="container">
      <a className="navbar-brand" href="/">
        <div className="d-flex">
          <img src={logo} alt="logo" className="mr-2" />
          <span>Project Manager</span>
        </div>
      </a>
    </div>
  </nav>
)

export default Header
