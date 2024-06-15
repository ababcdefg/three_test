import { Scene, Mesh, Color, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, SphereGeometry, PlaneGeometry, TorusGeometry, Clock, AmbientLight, PointLight, RawShaderMaterial, BufferGeometry, DoubleSide, Vector3, TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from "lil-gui";

import vertexShaderSource from './shaders/test/vert.glsl'
import fragmentShaderSource from './shaders/test/frag.glsl'

// tex_color.colorSpace = SRGBColorSpace

const scene = new Scene()
// scene.background = new Color(0, 0, 0)

const viewSize = { width: window.innerWidth, height: window.innerHeight }

const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app')?.appendChild(renderer.domElement)

const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
camera.position.set(0, 0, 1)
scene.add(camera)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


const textureLoader = new TextureLoader()
const flagTexture = textureLoader.load('../public/static/textures/Bark.jpg')

const material = new RawShaderMaterial({
  vertexShader: vertexShaderSource,
  fragmentShader: fragmentShaderSource,
  side: DoubleSide,
  uniforms: {
    uFrequency: { value: new Vector3(0.0, 0.0, 0.0) },
    uTime: { value: 0.0 },
    uColor: { value: new Color(1.0, 1.0, 1.0) },
    uTexture: { value: flagTexture }
  }
})


const mesh = new Mesh(
  new PlaneGeometry(5, 5, 16, 16),
  material
)
mesh.scale.y = 2 / 3
scene.add(mesh)

const Gui = new GUI({
  width: 300,
  title: 'GUI',
  closeFolders: false
})
Gui.add(material.uniforms.uFrequency.value, 'x').step(0.1).min(0).max(20).name('frequencyX')
Gui.add(material.uniforms.uFrequency.value, 'y').step(0.1).min(0).max(20).name('frequencyY')
Gui.addColor(material.uniforms.uColor, 'value')


const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  // mesh1.rotation.y = elapsedTime * 0.5
  // mesh2.rotation.y = elapsedTime * 0.5
  // mesh3.rotation.y = elapsedTime * 0.5
  // mesh1.rotation.x = elapsedTime * 0.5
  // mesh2.rotation.x = elapsedTime * 0.5
  // mesh3.rotation.x = elapsedTime * 0.5
  material.uniforms.uTime.value = elapsedTime

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()