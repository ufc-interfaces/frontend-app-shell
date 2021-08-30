type ReactAppComponent<OtherProps = {}> = React.ComponentType<AppProps & OtherProps>

type AppProps = {
  locale?: string,
  domNode?: Element
}

type Session = {
  user: object
  expiresAt: number
}

type Credentials = {
  username: string
  password: string
}
