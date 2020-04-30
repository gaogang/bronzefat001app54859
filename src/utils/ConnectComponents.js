import FindComponent from './FindComponent'

export default (connections, components) => {
    let connectionLines = [];
    let connectors = initConnectors(components)

    if (!connections) {
        return [];
    }

    if (!components) {
        return [];
    }

    connections.forEach(connection => {
        let to = FindComponent(connection.to, components);
        let from = FindComponent(connection.from, components);

        if (from.position.x < to.position.x) {
            connectors[to.id].left.push(from);
        } else if(from.position.x > to.position.x) {
            connectors[to.id].left.push(from);
        }
        else {
            if (from.y < to.y) {
                connectors[to.id].top.push(from);
            } else 
            {
                connectors[to.id].bottom.push(from);
            }
        }
    });

    components.forEach(component => {
        let connector = connectors[component.id];

        if (!connector) {
            continue;
        } 

        let counter = 1;
        connector.left.sort(compareY).forEach(from => {
            let connectionLine = {
                from: {
                    x: from.position.x,
                    y: from.position.y
                },

                to: {
                    x: to.position.x,
                    y: to.position.y + counter * (to.height / (connector.left.length + 2))
                }
            }
            connectionLines.push(connectionLine);
        });

        counter = 1;
        connector.right.sort(compareY).forEach(from => {
            let connectionLine = {
                from: {
                    x: from.position.x,
                    y: from.position.y
                },

                to: {
                    x: to.position.x,
                    y: to.position.y + counter * (to.height / (connector.right.length + 2))
                }
            }
            connectionLines.push(connectionLine);
        });

        counter = 1;
        connector.top.sort(compareX).forEach(from => {
            let connectionLine = {
                from: {
                    x: from.position.x,
                    y: from.position.y
                },

                to: {
                    x: to.position.x + counter * (to.width / (connector.top.length + 2)),
                    y: to.position.y
                }
            }
            connectionLines.push(connectionLine);
        });

        counter = 1;
        connector.bottom.sort(compareX).forEach(from => {
            let connectionLine = {
                from: {
                    x: from.position.x,
                    y: from.position.y
                },

                to: {
                    x: to.position.x + counter * (to.width / (connector.bottom.length + 2)),
                    y: to.position.y
                }
            }
            connectionLines.push(connectionLine);
        });
    });

    return connectionLines;
}

function initConnectors(components) {
    let connectors;

    components.forEach(component => {
        connectors[component.id] = {
            left: [],
            right: [],
            top: [],
            bottom: []
        }    
    });

    return connectors; 
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