let canvas = document.getElementById('canvas1');
let canvas2 = document.getElementById('canvas2');
const gl = canvas.getContext('webgl');
const gl2 = canvas2.getContext('webgl2');

const vertexSource = `
void main(){
  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 60.;
}
`;

const fragmentSource = `
  precision mediump float;
  float getNumber(float inputNum){
    return inputNum + 1.;
  }
  void main(){
    float a = 0.;
    for (float i = -1.; i < 2.; i -= 1.){
      a = getNumber(a) + a;
    }
    gl_FragColor = vec4(1, a / 2., 0, 1);
  }
`;

const vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader, vertexSource);
gl.compileShader(vShader);
if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) alert("aaaaaa");

const fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader, fragmentSource);
gl.compileShader(fShader);
if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) alert("OH NO!!!");
console.log(gl.getShaderInfoLog(fShader));

const program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) alert("BBBBBBBB!!");

gl.useProgram(program);

const vShader2 = gl2.createShader(gl2.VERTEX_SHADER);
gl2.shaderSource(vShader2, vertexSource);
gl2.compileShader(vShader2);
if (!gl2.getShaderParameter(vShader2, gl2.COMPILE_STATUS)) alert("aaaaaa");

const fShader2 = gl2.createShader(gl2.FRAGMENT_SHADER);
gl2.shaderSource(fShader2, fragmentSource);
gl2.compileShader(fShader2);
if (!gl2.getShaderParameter(fShader2, gl2.COMPILE_STATUS)) alert("OH NO!!!");
console.log(gl2.getShaderInfoLog(fShader2));

const program2 = gl2.createProgram();
gl2.attachShader(program2, vShader2);
gl2.attachShader(program2, fShader2);
gl2.linkProgram(program2);
if (!gl2.getProgramParameter(program2, gl2.LINK_STATUS)) alert("BBBBBBBB!!");

gl2.useProgram(program2);

function draw(){
  gl.drawArrays(gl.POINTS, 0, 1);
  gl2.drawArrays(gl2.POINTS, 0, 1);
}

function main(){
  setInterval(draw, 10);
}