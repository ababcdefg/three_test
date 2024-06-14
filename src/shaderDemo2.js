import { Scene, Mesh, Color, WebGLRenderer, PerspectiveCamera, BoxGeometry, Clock, DoubleSide, Vector3, PlaneGeometry, ShaderMaterial } from 'three';
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
camera.position.set(0, 0, 2)
scene.add(camera)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const waterGeometry = new PlaneGeometry(2, 2, 128, 128)
const waterMaterial = new ShaderMaterial({
  vertexShader: vertexShaderSource,
  fragmentShader: fragmentShaderSource,
  side: DoubleSide
})

const mesh = new Mesh(
  waterGeometry,
  waterMaterial
)
mesh.rotation.x = -Math.PI / 2

scene.add(mesh)



const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()