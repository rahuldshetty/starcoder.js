import action from "./actions.js";
import Module from "../build/main.js";
import {loadBinaryResource} from "./utility.js"


// Module Parameters for Wasm JS script
const args = {
    'noInitialRun': true,
}

let module;

// Function to initialize worker 
// and download model file
const init_worker = async (model_path) => {
    module = await Module(args);

    const initCallback = (bytes) => {
        // create virtual fs folder for storing model bins
        module['FS_createPath']("/", "models", true, true);

        // load model
        module['FS_createDataFile']('/models', 'model.bin', bytes, true, true, true);
        
        // update callback action to worker main thread
        postMessage({
            event: action.INITIALIZED
        });
    }

    loadBinaryResource(model_path, initCallback)
}


// Worker Events
self.addEventListener('message', (e) => {
    switch(e.data.event){
        // load event
        case action.LOAD: {
            init_worker(e.data.url);
            break;
        }

    }
  }, false);
  