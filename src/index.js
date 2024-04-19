import {
  Scene, PerspectiveCamera, OrthographicCamera, BoxGeometry, MeshBasicMaterial, Mesh, WebGLRenderer, Vector3,
  AxesHelper, Group, Color, Clock, BufferAttribute, BufferGeometry
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Gsap from 'gsap';


const scene = new Scene()
scene.background = new Color(0.2, 0.2, 0.2)

const viewSize = { width: 800, height: 600 } //视口比例

const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app')?.appendChild(renderer.domElement)

//透视相机
const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
//正交相机
// const aspectRatio = viewSize.width / viewSize.height
// const camera = new OrthographicCamera(-3 * aspectRatio, 3 * aspectRatio, 3, -3, 0.1, 100)
camera.position.set(0, 0, 5)
scene.add(camera)
// controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true   //启用相机控制器阻尼  (每一帧要调用控件的update更改相机状态)
// controls.target.y = 1


//axes helper
const axesHelper = new AxesHelper(20)
scene.add(axesHelper)

const geometry = new BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true
})
const cube = new Mesh(geometry, material)
// scene.add(cube)

const cube2 = new Mesh(new BoxGeometry(1, 2, 1), material)
cube2.position.set(-2, 0, -2)

const group = new Group()
scene.add(group)
group.add(cube, cube2)

//gasp动画库
Gsap.to(cube2.position, { x: 2, duration: 1, delay: 1 })
Gsap.to(cube2.position, { x: -2, duration: 1, delay: 2 })


//bufferGeometry
const count = 50
const buffer = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  buffer[i] = (Math.random() - 0.5) * 2
}
const posAttribute = new BufferAttribute(buffer, 3)
const bfGeo = new BufferGeometry()
bfGeo.setAttribute('position', posAttribute)
const mat = new MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
const cube3 = new Mesh(bfGeo, mat)
scene.add(cube3)

const clock = new Clock()   //时钟
const tick = () => {
  controls.update()

  const elapsedTime = clock.getElapsedTime()   //时间戳(从0开始经历的秒数)
  cube.position.y = Math.sin(elapsedTime)
  cube.position.x = Math.cos(elapsedTime)
  cube2.rotation.y = elapsedTime

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()

// setTimeout(() => {
//   cube.position.set(0.7, -0.6, -1)
//   cube.scale.set(2, 0.5, 0.5)
// }, 1000);

// setTimeout(() => {
//   // cube.position.length()      //向量长度
//   // cube.position.normalize()  //向量归一化
//   // cube.rotation.reorder('YXZ')  //更改旋转先后顺序
//   cube.rotation.set(1, 1, 0)
//   // camera.lookAt(cube.position) // 相机朝向
// }, 2000);

// setTimeout(() => {
//   group.rotation.set(0, 0, 1)
// }, 3000)