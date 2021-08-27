import React from 'react'
import { LoginApp, NavApp, PetriEditorApp } from './apps-box'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import FunctionBasedApp from './utils/FunctionBasedApp'

const Home = () => {
  return (
    <div>
      <div>Home page</div>
    </div>
  )
}

const App: React.FC<{ rootNode: Element }> = ({ rootNode }) => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/login'>
          <LoginApp />
        </Route>
        <Route exact path='/'>
          <NavApp />
          <Home />
        </Route>
        <Route exact path='/editor'>
          <NavApp />
          <FunctionBasedApp appLauncher={PetriEditorApp} rootNode={rootNode} />
        </Route>
        <Route exact path='/actions'>
          <NavApp />
          <FunctionBasedApp appLauncher={PetriEditorApp} rootNode={rootNode} />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default App
