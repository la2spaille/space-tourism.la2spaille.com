function createElement(tagName, { attrs = {}, children = []} = {}) {
    return {
        tagName,
        attrs,
        children
    }
}
export default createElement