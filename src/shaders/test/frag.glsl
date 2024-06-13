precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 5.0 + 0.5;       //阴影效果，z小于0则黑
  // gl_FragColor = vec4(uColor, 1.0) * textureColor;
  float strength =mod(vUv.x * 10.0,1.0) * mod(vUv.y * 10.0,1.0);
  gl_FragColor = vec4(strength,strength,strength,1.0);
}