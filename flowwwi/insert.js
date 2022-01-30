function insertElement(element, domElement) {
    domElement.replaceWith(element)
    return element
}
export default insertElement