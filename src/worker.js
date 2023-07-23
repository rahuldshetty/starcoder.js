import action from "./actions.js";
import Module from "./main.js";
import {loadBinaryResource} from "./utility.js"

// WASM Module
let module;


// Module Parameters for Wasm JS script
const model_fs_path = '/models/model.bin'; // virtual filesystem path

// Function to send model line result
const write_result_fn = (text) => {
    // console.log('worker:' + text);
    postMessage({
      event: action.WRITE_RESULT,
      line: text
    });
}



// Function to initialize worker 
// and download model file
const init_worker_fn = async (model_path) => {
    const args = {
        'noInitialRun': true,
        'print': write_result_fn
    }

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

const run_main = (
    prompt,
    seed,
    max_token_len,
    top_k,
    top_p,
    temp,
    repeat_last_n,
    repeat_penalty
) => {
    // starcoder.cpp Parameters: https://github.com/bigcode-project/starcoder.cpp
    // $ ./bin/starcoder -h
    // usage: ./bin/starcoder [options]

    // options:
    // -h, --help            show this help message and exit
    // -s SEED, --seed SEED  RNG seed (default: -1)
    // -t N, --threads N     number of threads to use during computation (default: 8)
    // -p PROMPT, --prompt PROMPT
    //                         prompt to start generation with (default: random)
    // -n N, --n_predict N   number of tokens to predict (default: 200)
    // --top_k N             top-k sampling (default: 40)
    // --top_p N             top-p sampling (default: 0.9)
    // --temp N              temperature (default: 1.0)
    // -b N, --batch_size N  batch size for prompt processing (default: 8)
    //   --repeat-last-n N     last n tokens to consider for penalize 
    // --repeat-penalty N    penalize repeat sequence of tokens 
    const args = [
        "-p", prompt.toString(),
        "-s", seed.toString(),
        "-n", max_token_len.toString(),
        "--top_k", top_k.toString(),
        "--top_p", top_p.toString(),
        "--temp", temp.toString(),
        "--repeat-last-n", repeat_last_n.toString(),
        "--repeat-penalty", repeat_penalty.toString()
    ];

    module['callMain'](args);

    postMessage({
        event: action.RUN_COMPLETED
    });
} 

// Worker Events
self.addEventListener('message', (e) => {
    switch(e.data.event){
        // load event
        case action.LOAD: {
            init_worker_fn(e.data.url);
            break;
        }

        // run main
        case action.RUN_MAIN:{
            run_main(
                e.data.prompt,
                e.data.seed,
                e.data.max_token_len,
                e.data.top_k,
                e.data.top_p,
                e.data.temp,
                e.data.repeat_last_n,
                e.data.repeat_penalty
            )
            break;
        }

    }
  }, false);
  