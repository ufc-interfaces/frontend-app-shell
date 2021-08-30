import React from 'react'
import { LoginApp, NavApp, PetriEditorApp } from './apps-box'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import FunctionBasedApp from './utils/FunctionBasedApp'
import { clearSession, getCurrentSession, login } from './fake-services/auth'
import { RouteProps } from 'react-router'

function PrivateRoute(props: RouteProps) {
  const { render, ...rest } = props
  const authed = !!getCurrentSession()

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
        <Route exact path='/logout' render={() => {
          clearSession()
          return <Redirect to='/login' />
        }} />
        <Route exact path='/'>
          <Redirect to='/editor' />
        </Route>
        <PrivateRoute exact path='/editor' render={() => (
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
