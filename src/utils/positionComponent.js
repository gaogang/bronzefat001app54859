export default (component, screenWidth) => {
    const marginTop = 150;
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
        x = componentTypes[component.type] * swimmingLaneWidth + (swimmingLaneWidth - component.display.width) / 2;
        y = marginTop + component.order * (component.display.height + marginTop);
    } else {
        x = component.display.x;
        y = component.display.y;
    }

    return {
        x: x,
        y: y
    }
}