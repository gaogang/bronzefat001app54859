
import React from 'react';
import AzFunc from '../icons/azure/FunctionApps.svg'
import AzAppServices from '../icons/azure/AppServices.svg'
import AzCosmosDb from '../icons/azure/CosmosDB.svg'
import { Stage, Layer, Group, Rect, Text, Arrow, Image } from 'react-konva';
import useImage from 'use-image';
import ConnectComponents from '../utils/ConnectComponents';

export default (props) => {
    const {components, connections, selectedComponent, onClickComponent} = props;

    const handleComponentClick = (e, component) => {
        onClickComponent(component);
    }
    
    console.log('Creating connections...');
    let connectionLines = ConnectComponents(connections, components);
    console.log(`${connectionLines.length} connection(s) created`);

    const azIcons = {
        AppServices: useImage(AzAppServices),
        CosmosDb: useImage(AzCosmosDb),
        Function: useImage(AzFunc)
    }

    return(
        <Stage width={window.innerWidth - 300 } height={window.innerHeight}>
            <Layer>
            {
                connectionLines.map((connectionLine, i) => {
                return (
                    <Arrow
                        points={connectionLine.connectors}
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
                console.log(`component resource - ${component.resource}`);

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
                            cornerRadius={[10, 0, 0, 10]}
                            fill='white'
                            stroke={component.isPrivate ? 'red' : 'gray'}
                            strokeWidth={selectedComponent && selectedComponent.id === component.id ? 1.2 : 0.2}
                        />
                        <Image image={azIcons[component.resource][0]} x={component.display.x + 5} y={component.display.y + 5} width={40} height={40} ></Image>
                        <Text 
                            name={component.id}
                            text={component.name}
                            align='center'
                            fontSize={16}
                            fontFamily='Calibri'
                            x={component.display.x + 50}
                            y={component.display.y + 8}
                            width={component.display.width - 50}
                            />
                        <Text 
                            name={component.id}
                            text={component.resource}
                            align='center'
                            fontSize={16}
                            fontFamily='Calibri'
                            fill='lightgray'
                            x={component.display.x + 50}
                            y={component.display.y + 30}
                            width={component.display.width - 50}
                            />
                    </Group>
                );
            })
            }
            </Layer>
        </Stage>
    )
}