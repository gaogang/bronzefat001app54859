export default (componentId, components) => {
    return components.find(component => component.id === componentId);
}