export default (componentId, components) => {
    components.forEach(component => {
        if (Component.id === componentId) {
            return component;
        }
    });

    return null;
}