export default (component, screenWidth, componentWidth, componentHeight) => {
    const marginTop = 50;
    const numberOfSwimlanes = 3;

    const componentTypes = {
        app: 0, 
        store: 1,
        db: 2
    }
    
    let x = 0;
    let y = 0;

    let swimmingLaneWidth = screenWidth / numberOfSwimlanes;

    if (component.position.mode === 'auto') {
        x = componentTypes[component.type] * swimmingLaneWidth + (swimmingLaneWidth - componentWidth) / 2;
        y = marginTop + component.orderId * (componentHeight + marginTop);
    } else {
        x = component.position.left;
        y = component.position.top;
    }

    return {
        x: x,
        y: y
    }
}