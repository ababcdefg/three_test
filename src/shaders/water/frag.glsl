uniform vec3 uWavesHighColor;
uniform vec3 uWavesLowColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main() {
  float mixStrength = (vElevation - uColorOffset) * uColorMultiplier + 0.5;
  vec3 mixColor = mix(uWavesHighColor, uWavesLowColor, mixStrength);
  gl_FragColor = vec4(mixColor, 1.0);
}