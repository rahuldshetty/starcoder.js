# 💫StarCoder.js *\*Experimental*\*

`THIS IS UNDER DEVELOPMENT AND IS NOT PRODUCTION READY. BROWSER REQUIRES MEM64 SUPPORT TO RUN THIS PROJECT`

This project brings [starcoder.cpp](https://github.com/bigcode-project/starcoder.cpp) to browser with power of WebAssembly.

## Demo

Web Application : [starcoder.js](https://rahuldshetty.github.io/starcoder.js/)

![App](assets/app.PNG)

![Fibonacci Example](assets/fibonacci.PNG)

### Performance


![Prime Example](assets/prime.PNG)

Following performance speed is captured on Firefox Nightly with following system configuration:
* CPU: Intel(R) Core(TM) i7-8750H CPU @ 2.20GHz
* Memory: 24GB

![Generation Performance](assets/performance.PNG)

# Build Instructions

```
git clone https://github.com/bigcode-project/starcoder.cpp
cd starcoder.cpp

Model Quantization

# make sure to have torch, transformer library
python convert-hf-to-ggml.py bigcode/tiny_starcoder_py 

# Build local
make clean
make 

# Taken from here https://huggingface.co/mike-ravkine/tiny_starcoder_py-GGML/blob/main/tiny_starcoder_py-fp16.bin
./quantize models/tiny_starcoder_py-fp16.bin models/tiny_starcoder_py-q4_1.bin 3

# Build WASM/JS

## Step 1: Build for WASM
make clean
make CC=emcc CXX=em++ LLAMA_NO_ACCELERATE=1 CFLAGS=" -DNDEBUG -s MEMORY64" CXXFLAGS=" -DNDEBUG -s MEMORY64" LDFLAGS="-s MEMORY64 -s TOTAL_MEMORY=2147483648 -s STACK_SIZE=524288  --preload-file models" main.html

or

./build-wasm.sh

## Step 2: Manually patch docs/main.js

from:
var REMOTE_PACKAGE_BASE = 'main.data';

to:
var REMOTE_PACKAGE_BASE = 'https://media.githubusercontent.com/media/rahuldshetty/starcoder.js/main/docs/main.data';

```