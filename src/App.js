import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/jobs' component={Jobs} />
        <ProtectedRoute exact path='/jobs/:id' component={JobItemDetails} />
        <Route exact path='/not-found' component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    )
  }
}
export default App
