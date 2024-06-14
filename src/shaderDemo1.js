import { Scene, Mesh, Color, WebGLRenderer, PerspectiveCamera, BoxGeometry, Clock, DoubleSide, Vector3, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from "lil-gui";

import vertexShaderSource from './shaders/water/vert.glsl'
import fragmentShaderSource from './shaders/water/frag.glsl'


const scene = new Scene()

const viewSize = { width: window.innerWidth, height: window.innerHeight }

const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app')?.appendChild(renderer.domElement)

const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
camera.position.set(0, 0, 3)
scene.add(camera)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const waterGeometry = new PlaneGeometry(2, 2, 500, 500)
const waterMaterial = new ShaderMaterial({
  vertexShader: vertexShaderSource,
  fragmentShader: fragmentShaderSource,
  side: DoubleSide,
  uniforms: {
    uBigWavesFrequency: { value: new Vector2(4, 1.5) },
    uBigWavesElevation: { value: 0.2 },
    uTime: { value: 0.0 },
    uWavesSpeed: { value: 0.75 },

    uSmallWavesIterations:{ value: 4.0 },
    uSmallWavesFrequency:{ value: new Vector2(3.0,3.0) },
    uSmallWavesElevation:{ value: 0.15 },
    uSmallWavesSpeed:{ value: 0.2 },

    uWavesHighColor: { value: new Color(0x186691) },
    uWavesLowColor: { value: new Color(0x9bd8ff) },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 0.5 },
  }
})

const Gui = new GUI({
  title: 'GUI',
  closeFolders: false
})
const bigWavesGui = Gui.addFolder('大波浪')
bigWavesGui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(1).max(10).step(0.01).name('大波浪频率 X');
bigWavesGui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(1).max(10).step(0.01).name('大波浪频率 Z');
bigWavesGui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0.1).max(2).step(0.01).name('大波浪高度');
bigWavesGui.add(waterMaterial.uniforms.uWavesSpeed, 'value').min(0).max(5).step(0.01).name('大波浪速度');

const smallWavesGui = Gui.addFolder('小波浪')
smallWavesGui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(10).step(1).name('小波浪层数');
smallWavesGui.add(waterMaterial.uniforms.uSmallWavesFrequency.value, 'x').min(1).max(10).step(0.01).name('小波浪频率 X');
smallWavesGui.add(waterMaterial.uniforms.uSmallWavesFrequency.value, 'y').min(1).max(10).step(0.01).name('小波浪频率 Z');
smallWavesGui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0.1).max(2).step(0.01).name('小波浪高度');
smallWavesGui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(5).step(0.01).name('小波浪速度');

const wavesColorGui = Gui.addFolder('波浪颜色')
wavesColorGui.addColor(waterMaterial.uniforms.uWavesHighColor, 'value').name('高海拔颜色')
wavesColorGui.addColor(waterMaterial.uniforms.uWavesLowColor, 'value').name('低海拔颜色')
wavesColorGui.add(waterMaterial.uniforms.uColorOffset, 'value').min(-1).max(1).step(0.01).name('颜色偏移');
wavesColorGui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.01).name('颜色密度');


const mesh = new Mesh(
  waterGeometry,
  waterMaterial
)
mesh.rotation.x = -Math.PI / 2

scene.add(mesh)

const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  waterMaterial.uniforms.uTime.value = elapsedTime
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()