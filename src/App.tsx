import React, { ComponentType } from 'react'
import { LoginApp, NavApp, PetriEditorApp } from './apps-box'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import FunctionBasedApp from './utils/FunctionBasedApp'
import { getCurrentSession, login } from './fake-services/auth'
import { RouteProps } from 'react-router'

const Home = () => {
  return (
    <div>
      <div>Home page</div>
    </div>
  )
}

function PrivateRoute(props: RouteProps) {
  const { render, ...rest } = props
  const authed = !!getCurrentSession()

  console.log('getCurrentSession()', getCurrentSession())

  return (
    <Route
      {...rest}
      render={(props) => authed ? render(props) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
    />
  )
}

const App: React.FC<{ rootNode: Element }> = ({ rootNode }) => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/login'>
          <LoginApp onSubmit={login} />
        </Route>
        <PrivateRoute exact path='/' render={() => (
          <>
            <NavApp />
            <Home />
          </>
        )} />
        <PrivateRoute exact path='/editor' render={() => (
          <>
            <NavApp />
            <FunctionBasedApp appLauncher={PetriEditorApp} rootNode={rootNode} />
          </>
        )} />
        <PrivateRoute exact path='/actions' render={() => (
          <>
            <NavApp />
            <FunctionBasedApp appLauncher={PetriEditorApp} rootNode={rootNode} />
          </>
        )} />
      </Switch>
    </div>
  </Router>
)

export default App
