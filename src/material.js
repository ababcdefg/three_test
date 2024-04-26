import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, BoxGeometry, MeshBasicMaterial, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new Scene()
scene.background = new Color(0, 0, 0)

const viewSize = {
  width: 800,
  height: 600
}
const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app').appendChild(renderer.domElement)

const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.enableDamping = true

const cube = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)


const renderTick = () => {
  renderer.render(scene,camera)
  cameraControls.update()
  requestAnimationFrame(renderTick)
}
renderTick()