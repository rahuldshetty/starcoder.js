import action from "./actions.js";

export class StarCoder{
    // callback have to be defined before load_worker
    constructor(
        url,
        init_callback,
        print_callback,
    ){
        this.url = url;
        this.init_callback = init_callback;   // called back when model is loaded
        this.print_callback = print_callback; // Expectes text parameter and will be called when model generates result.
    }
    
    load_worker() {
        this.worker = new Worker("./worker.js", {type: 'module'});

        this.worker.onmessage = (event) => {
            switch (event.data.event) {
                // Load Model
                case action.INITIALIZED:{
                    if(this.init_callback) this.init_callback();
                    break;
                }


            }
        };

        this.worker.postMessage({
            event: action.LOAD,
            url: this.url,
        });
    }

}