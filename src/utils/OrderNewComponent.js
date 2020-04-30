export default (components, newComponentType) => {
    let order = 0;

    components.forEach(element => {
        if (element.type === newComponentType) {
            order++;
        }
    });

    return order;
}