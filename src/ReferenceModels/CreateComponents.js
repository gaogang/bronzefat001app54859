import getReferenceModels from './MockReferenceModels'
import {v4 as uuidv4} from 'uuid'

export default (name, type, runtime) => {
    const referenceModels = getReferenceModels();

    let matched = null;
    referenceModels.forEach(model => {
        if (type === model.target && 
            runtime === model.targetRuntime) {
                matched = model;
                return;
        }
    });

    if (!matched) 
    {
        console.log('No reference model found! Creating a standard component...');
        
        // Create standard model
        return [];
    }

    console.log('creating components...');

    let solution = {};

    matched.components.forEach(component => {
        let newComponent = component;
        newComponent.id = uuidv4();
        newComponent.name = name;
        newComponent.status = 'pending';

        // Workout component order (todo)


        solution.components.push(newComponent);
    });

    if (matched.connections) {
        matched.connections.forEach(connection => {
            let newConnection = {
                id: uuidv4()
            }
            
            solution.connections.push(newConnection);
        });
    }

    return solution;
} 