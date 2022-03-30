import { RouteProps } from 'react-router'
import { getCurrentSession } from './fake-services/auth'
import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export default function PrivateRoute(props: RouteProps) {
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
