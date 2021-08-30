import React, { Component, ComponentProps, ReactNode } from 'react'

const wrapComponent = (
  WrappedComponent: ReactAppComponent | LoginAppComponent,
  loadFallback: ReactNode = 'Loading',
  errorFallback: ReactNode = null
) => {
  type State = { hasError: boolean }

  return class WrappedFederatedModule extends Component<ComponentProps<typeof WrappedComponent> | any, State> {
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
          <WrappedComponent {...this.props} />
        </React.Suspense>
      )
    }
  }
}

export default wrapComponent
