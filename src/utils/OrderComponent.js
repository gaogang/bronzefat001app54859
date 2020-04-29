export default (components, component) => {
    let order = 0;

    components.forEach(element => {
        if (element.type === component.type) {
            order++;
        }
    });

    component.orderId = order;

    return component;
}