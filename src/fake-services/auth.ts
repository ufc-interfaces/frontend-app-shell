export const getCurrentSession = (): Session => {
  const json = localStorage.getItem('user_session')

  try {
    const session = JSON.parse(json)

    if (!session) {
      return null
    }

    const { expiresAt } = session

    if (Number(expiresAt) < new Date().getTime()) {
      localStorage.removeItem('user_session')
      return null
    }

    return session
  } catch (err) {
    return null
  }
}

export const createNewSession = (user: object): Session => {
  const oneDayMs = 1000 * 60 * 60 * 24
  const session = {
    expiresAt: new Date().getTime() + oneDayMs,
    user,
  }
  localStorage.setItem('user_session', JSON.stringify(session))

  return session
}

export const login = ({ username, password }: any): Promise<void> => {
  if (username === 'admin' && password === 'admin') {
    createNewSession({ username, password })
    window.location.href = '/'

    return Promise.resolve()
  }

  return Promise.reject()
}
