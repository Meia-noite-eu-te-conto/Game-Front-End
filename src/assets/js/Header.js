function renderHeader(document)  {
    const headerElement = document.getElementById("header-section")
    headerElement.innerHTML = ""
    headerElement.appendChild(headerComponent(document))
}