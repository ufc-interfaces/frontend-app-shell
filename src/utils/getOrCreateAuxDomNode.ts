export default (rootDOMNode: Element) => {
  let aux = rootDOMNode.querySelector('#aux-container')

  if (!aux) {
    aux = document.createElement('div')
    aux.setAttribute('id', 'aux-container')
    rootDOMNode.appendChild(aux)
  }

  return aux
}
