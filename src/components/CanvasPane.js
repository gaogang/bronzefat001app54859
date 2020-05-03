
import React from 'react';
import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';

import ConnectComponents from '../utils/ConnectComponents';

export default (props) => {
    const {components, connections, selectedComponent, onClickComponent} = props;

    const handleComponentClick = (e, component) => {
        onClickComponent(component);
    }
    
    console.log('Creating connections...');
    let connectionLines = ConnectComponents(connections, components);
    console.log(`${connectionLines.length} connection(s) created`);

    return(
        <Stage width={window.innerWidth - 300 } height={window.innerHeight}>
            <Layer>
            {
                connectionLines.map((connectionLine, i) => {
                return (
                    <Arrow
                    points={[connectionLine.from.x, connectionLine.from.y, connectionLine.to.x, connectionLine.to.y]}
                    pointerWidth={7}
                    fill='gray'
                    stroke='gray'
                    strokeWidth={0.6} />
                );
                })
            }
            </Layer>
            <Layer>
            {
            components.map((component, i) => {
                return (
                    <Group 
                        name={component.id}
                        draggable={true}
                        onClick={(e) => handleComponentClick(e, component)}>
                        <Rect
                            name={component.id}
                            x={component.display.x}
                            y={component.display.y}
                            width={component.display.width}
                            height={component.display.height}
                            fill={component.isPrivate ? 'pink' : 'lightgreen'}
                            stroke={selectedComponent && selectedComponent.id === component.id ? 'black' : 'gray'}
                            strokeWidth={selectedComponent && selectedComponent.id === component.id ? 1.0 : 0.2}
                        />
                        <Text 
                            name={component.id}
                            text={component.name}
                            align='center'
                            fontSize={16}
                            fontFamily='Calibri'
                            x={component.display.x}
                            y={component.display.y + 3}
                            width={component.display.width}
                            />
                    </Group>
                );
            })
            }
            </Layer>
        </Stage>
    )
}