export default (component, screenWidth) => {
    const dependencyAreaHeight = 100;
    const marginTop = 50;
    const numberOfSwimlanes = 3;

    const componentTypes = {
        app: 0, 
        service: 1,
        db: 2
    }
    
    let x = 0;
    let y = 0;

    let swimmingLaneWidth = screenWidth / numberOfSwimlanes;

    if (component.display.mode === 'auto') {
        if (component.type === 'Repo') {
            x = component.order * component.display.width + (swimmingLaneWidth - component.display.width) / 2;
            y = (dependencyAreaHeight - component.display.height) / 2;
        } else {
            x = componentTypes[component.type] * swimmingLaneWidth + (swimmingLaneWidth - component.display.width) / 2;
            y = dependencyAreaHeight + marginTop + component.order * (component.display.height + marginTop);
        }
    } else {
        x = component.display.x;
        y = component.display.y;
    }

    return {
        x: x,
        y: y
    }
}