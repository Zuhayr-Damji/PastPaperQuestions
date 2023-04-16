function main()
{
    const canvas = document.getElementById('my-canvas');
const gl = canvas.getContext('webgl2');
if (!gl) {
    console.log("Couldnt do it");
    return;
}
// Define compute shader source code
const computeShaderSource = `
  #version 310 es

  layout(local_size_x = 1, local_size_y = 1, local_size_z = 1) in;

  layout(std430, binding = 0) buffer InputData {
    vec4 inputData[];
  } input;

  layout(std430, binding = 1) buffer OutputData {
    vec4 outputData[];
  } output;

  void main() {
    uint index = gl_GlobalInvocationID.x;
    
    // Compute new data
    vec4 newData = vec4(0.0);
    for (int i = 0; i < 4; i++) {
      newData += input.inputData[index * 4 + i];
    }
    
    output.outputData[index] = newData;
  }
`;
    console.log(gl.COMPUTE_SHADER);
    return;
// Create shader program
const computeShader = gl.createShader(gl.COMPUTE_SHADER);
gl.shaderSource(computeShader, computeShaderSource);
gl.compileShader(computeShader);

const program = gl.createProgram();
gl.attachShader(program, computeShader);
gl.linkProgram(program);

// Define input/output buffers
const inputBuffer = gl.createBuffer();
const outputBuffer = gl.createBuffer();

const inputArray = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]);
const outputArray = new Float32Array(2);

gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, inputBuffer);
gl.bufferData(gl.SHADER_STORAGE_BUFFER, inputArray, gl.STATIC_COPY);
gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, inputBuffer);

gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, outputBuffer);
gl.bufferData(gl.SHADER_STORAGE_BUFFER, outputArray, gl.STATIC_COPY);
gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 1, outputBuffer);

// Run compute shader
gl.useProgram(program);
gl.dispatchCompute(2, 1, 1);
gl.memoryBarrier(gl.SHADER_STORAGE_BARRIER_BIT);

// Retrieve output data
gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, outputBuffer);
gl.getBufferSubData(gl.SHADER_STORAGE_BUFFER, 0, outputArray);
console.log(outputArray);
}

main();