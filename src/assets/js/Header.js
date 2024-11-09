/* 
    Imports
    import { HeaderComponent } from "./components/HeaderComponent"
*/


function renderHeader(document)  {
    const headerElement = document.getElementById("header-section")
    headerElement.innerHTML = ""
    headerElement.appendChild(HeaderComponent(document))
}