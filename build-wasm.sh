set -e

make clean

make CC=emcc CXX=em++ LLAMA_NO_ACCELERATE=1 CFLAGS=" -DNDEBUG -s MEMORY64" CXXFLAGS=" -DNDEBUG -s MEMORY64" LDFLAGS="-s MEMORY64 -s TOTAL_MEMORY=2147483648 -s STACK_SIZE=524288  --preload-file models" main.html

mv main.js docs/main.js
mv main.wasm docs/main.wasm
mv main.data docs/main.data
mv main.html docs/main.html
