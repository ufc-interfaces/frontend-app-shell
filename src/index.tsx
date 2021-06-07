import React from 'react'
import ReactDOM from 'react-dom'
import { ButtonApp, LoginApp } from './apps-box'

const App: React.FC = () => (
  <div>
    <div>Login app goes here if loaded:</div>
    <LoginApp locale="en" />
    <ButtonApp />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

// if (module && module.hot) {
//   module.hot.accept('./', function () {
//     console.log('Accepting the updated module!')
//   })
// }
