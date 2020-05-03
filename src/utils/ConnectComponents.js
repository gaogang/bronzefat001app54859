import FindComponent from './FindComponent'

export default (connections, components) => {
    let connectionLines = [];
    let connectors = [];

    if (!connections) {
        return [];
    }

    if (!components) {
        return [];
    }

    connections.forEach(connection => {
        let to = FindComponent(connection.to, components);
        let from = FindComponent(connection.from, components);

        console.log(`From: (x - ${from.display.x} y - ${from.display.y}), To: (x - ${to.display.x} y - ${to.display.y})`);

        if (!connectors[to.id]) {
            connectors[to.id] = {
                left: [],
                right: [],
                top: [],
                bottom: []
            }
        }

        if (from.display.x < to.display.x) {
            connectors[to.id].left.push(from);
        } else if(from.display.x > to.display.x) {
            connectors[to.id].right.push(from);
        }
        else {
            if (from.display.y < to.display.y) {
                console.log(`Adding a top connector to ${to.name}`)
                connectors[to.id].top.push(from);
            } else 
            {
                console.log(`Adding a bottom connector to ${to.name}`)
                connectors[to.id].bottom.push(from);
            }
        }
    });

    components.forEach(component => {
        let connector = connectors[component.id];

        if (!connector) {
            return;
        } 

        connectionLines = connectionLines.concat(createConnectionLines(connector.left, component, 'left'));
        connectionLines = connectionLines.concat(createConnectionLines(connector.right, component, 'right'));
        connectionLines = connectionLines.concat(createConnectionLines(connector.top, component, 'top'));
        connectionLines = connectionLines.concat(createConnectionLines(connector.bottom, component, 'bottom'));
    });

    return connectionLines;
}

function createConnectionLines(sources, target, side) {
    console.log(`side - ${side}, number of connectors - ${sources.length}, target - ${target.name}`);
    const i = 50;

    let connectionLines = [];
    let counter = 1;
    
    let sortingFunc;

    if (side === 'top' || side === 'bottom') {
        sortingFunc = compareX;
    } else if(side === 'left' || side === 'right') {
        sortingFunc = compareY;
    }

    sources.sort(sortingFunc).forEach(source => {
        let x = 0;
        let y = 0;
        let ix = 0;
        let iy = 0;

        if (side === 'top') {
            x = target.display.x + counter * (target.display.width / (sources.length + 1));
            y = target.display.y;

            ix = x;
            iy = y - i;
        } else if(side === 'bottom') {
            x = target.display.x + counter * (target.display.width / (source.length + 1));
            y = target.display.y + target.display.height;

            ix = x;
            iy = y + i;
        } else if(side === 'left') {
            x = target.display.x;
            y = target.display.y + counter * (target.display.height / (sources.length + 1));

            ix = x - i;
            iy = y;
        } else if(side === 'right') {
            x = target.display.x + target.display.width;
            y = target.display.y + counter * (target.display.height / (sources.length + 1));

            ix = x + i;
            iy = y;
        }

        let connectionLine = {
            from: source,
            to: target,
            connectors: [
                source.display.x + source.display.width / 2, source.display.y + source.display.height / 2, ix, iy, x, y
            ]
        }
        counter++;
        connectionLines.push(connectionLine);
    });

    return connectionLines;
}

function compareY(a, b) {
    if (a.position.y < b.position.y) {
        return -1;
    }

    if (a.position.y > b.position.y) {
        return 1;
    }

    return 0;
}

function compareX(a, b) {
    if (a.position.x < b.position.x) {
        return -1;
    }

    if (a.position.x > b.position.x) {
        return 1;
    }

    return 0;
}