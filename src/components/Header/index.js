import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>
      <ul className="nav-menu">
        <Link to="/" className="link">
          <li className="nav-item">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="nav-item">Jobs</li>
        </Link>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
