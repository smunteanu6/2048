function CreateElement (tagName, attributes = {}, childElements = []) {
  const element = document.createElement(tagName);
  for (const child of childElements) element.append(child);
  for (const [key, value] of Object.entries(attributes))
    if (typeof value == 'object') addAttributes(element[key], value);
    else if (element[key] != undefined) element[key] = value;
    else element.setAttribute(key, value);
  return element;
}

function addAttributes (previous, props) {
  for (const [key, value] of Object.entries(props)) 
    previous[key] = value;
}

export default CreateElement;