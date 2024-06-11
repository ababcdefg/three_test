import { Scene, Mesh, Color, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, SphereGeometry, PlaneGeometry, TorusGeometry, Clock, AmbientLight, PointLight, RawShaderMaterial, BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from "lil-gui";

import vertexShaderSource from './shaders/vert.glsl'
import fragmentShaderSource from './shaders/frag.glsl'

// tex_color.colorSpace = SRGBColorSpace

const scene = new Scene()
// scene.background = new Color(0, 0, 0)

const viewSize = { width: window.innerWidth, height: window.innerHeight }

const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app')?.appendChild(renderer.domElement)

const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true




const material = new RawShaderMaterial({
  vertexShader: vertexShaderSource,
  fragmentShader: fragmentShaderSource
})


const mesh = new Mesh(
  new PlaneGeometry(1, 1, 32, 32),
  material
)
scene.add(mesh)




const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  // mesh1.rotation.y = elapsedTime * 0.5
  // mesh2.rotation.y = elapsedTime * 0.5
  // mesh3.rotation.y = elapsedTime * 0.5
  // mesh1.rotation.x = elapsedTime * 0.5
  // mesh2.rotation.x = elapsedTime * 0.5
  // mesh3.rotation.x = elapsedTime * 0.5

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()