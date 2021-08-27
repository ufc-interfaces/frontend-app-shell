import React, { useEffect } from 'react'
import getOrCreateAuxDomNode from './getOrCreateAuxDomNode'

type Props = { appLauncher: Function, rootNode: Element }

const FunctionBasedApp: React.FC<Props> = ({ appLauncher, rootNode }): null => {
  useEffect(() => {
    const auxNode = getOrCreateAuxDomNode(rootNode)
    appLauncher({ domNode: auxNode })

    return () => {
      auxNode.remove()
    }
  }, [])

  return null
}

export default FunctionBasedApp
