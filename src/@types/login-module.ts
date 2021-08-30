/// <reference types="react" />

type LoginAppComponent = ReactAppComponent<{
  onSubmit?: (credentials: Credentials) => Promise<void>
}>

declare module 'login/Login' {
  const Login: LoginAppComponent
  export default Login
}
