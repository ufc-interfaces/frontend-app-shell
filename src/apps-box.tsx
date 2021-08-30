import React, { Component } from 'react'
import wrapReactFederatedModule from './utils/wrapReactFederatedModule'

const defaultErrorHandler = (module: string) => (error: any) => {
  console.error(
    `${module}: `,
    `Could not load the ${module} app. Is it up and running?`,
    `\nError detail: ${error.message}`,
  )
  return Promise.resolve({ default: () => null })
}

export const LoginApp: LoginAppComponent = wrapReactFederatedModule(
  React.lazy(() => {
    return import('login/Login').catch(defaultErrorHandler('Login'))
  }),
)

export const NavApp = wrapReactFederatedModule(
  // @ts-ignore
  React.lazy(() => {
    return import('nav/Nav').catch(defaultErrorHandler('Nav'))
  }),
)

// @ts-ignore
export const PetriEditorApp = (props: AppProps) => {
  import('petri_editor/PetriEditor')
    .then(({ default: LauncherFn }) => {
      LauncherFn(props)
    })
    .catch(defaultErrorHandler('Nav'))

  return null
}
