import createElement from "./createElement.js";
import render from "./render.js";
import insertElement from "./insert.js";

let myVirtualElement = createElement("div", {
    attrs: {id : "container"},
    children: [
        createElement("p", {
            attrs: {id : "text"},
            children: ["hello world"]
        })
    ]
})
let element = render(myVirtualElement)
let rootElement = insertElement(element, document.querySelector('#app'))