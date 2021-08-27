import React, { ReactNode } from 'react'

const wrapComponent = (
  Component: DefaultAppComponent,
  loadFallback: ReactNode = 'Loading',
  errorFallback: ReactNode = null
) => {
  type State = { hasError: boolean }

  return class WrappedFederatedModule extends React.Component<AppProps, State> {
    state = { hasError: false }

    static getDerivedStateFromError() {
      return { hasError: true }
    }

    render() {
      if (this.state.hasError) {
        return errorFallback
      }

      return (
        <React.Suspense fallback={loadFallback}>
          <Component {...this.props} />
        </React.Suspense>
      )
    }
  }
}

export default wrapComponent
