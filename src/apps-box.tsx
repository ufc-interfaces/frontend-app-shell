import React from 'react'
import wrapFederatedModule from './utils/wrapFederatedModule'

const defaultErrorHandler = (module: string) => (error: any) => {
  console.error(
    `${module}: `,
    `Could not load the ${module} app. Is it up and running?`,
    `\nError detail: ${error.message}`,
  )
  return Promise.resolve({ default: () => null })
}

export const LoginApp = wrapFederatedModule(
  React.lazy(() => {
    return import('login/Login').catch(defaultErrorHandler('Login'))
  }),
)

export const ButtonApp = wrapFederatedModule(
  React.lazy(() => {
    return import('app2/Button').catch(defaultErrorHandler('Button'))
  }),
)
