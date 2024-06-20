import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, BoxGeometry, MeshBasicMaterial, Color, Texture, TextureLoader, LoadingManager, SRGBColorSpace, MirroredRepeatWrapping, NearestFilter, LinearFilter, MeshStandardMaterial, SphereGeometry, PlaneGeometry, DoubleSide, AmbientLight, DirectionalLight, PCFSoftShadowMap, SpotLight, CameraHelper, SpotLightHelper, PointLight, Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as datGUI from 'dat-gui'

const scene = new Scene()
scene.background = new Color(0, 0, 0)

const viewSize = {
    width: window.innerWidth,
    height: window.innerHeight
}
const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app').appendChild(renderer.domElement)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.enableDamping = true


const gui = new datGUI.GUI()

const sphere = new Mesh(
    new SphereGeometry(0.5, 32, 32),
    new MeshStandardMaterial()
)
sphere.castShadow = true
const plane = new Mesh(
    new PlaneGeometry(10, 10),
    new MeshStandardMaterial({ side: DoubleSide })
)
plane.position.y = -0.5
plane.rotation.x = -Math.PI / 2
plane.receiveShadow = true

scene.add(sphere, plane)

const ambientLight = new AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)
gui.add(ambientLight, 'intensity').step(0.01).min(-5).max(5).name('环境光强度')

const directionalLight = new DirectionalLight(0xffffff, 0.2)
scene.add(directionalLight)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
// directionalLight.shadow.radius = 10
//控制阴影渲染的范围，避免不必要的渲染   (平行光的阴影相机是正交相机)
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2

const directionalLightShadowCameraHelper = new CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightShadowCameraHelper)
directionalLightShadowCameraHelper.visible = false

gui.add(directionalLight.position, 'x').step(0.01).min(-5).max(5).name('平行光位置X')
gui.add(directionalLight.position, 'y').step(0.01).min(-5).max(5).name('平行光位置Y')
gui.add(directionalLight.position, 'z').step(0.01).min(-5).max(5).name('平行光位置Z')
gui.add(directionalLight, 'intensity').step(0.01).min(-5).max(5).name('平行光强度')
gui.add(directionalLightShadowCameraHelper, 'visible').name('聚光灯阴影相机助手')


//spotLight
const spotLight = new SpotLight(0x00ffff, 2, 10, Math.PI * 0.3)
spotLight.position.set(0, 1.5, 1.5)
spotLight.castShadow = true
scene.add(spotLight)
scene.add(spotLight.target)
//控制阴影的渲染，节省性能
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

const spotLightShadowsCameraHelper = new CameraHelper(spotLight.shadow.camera)
scene.add(spotLightShadowsCameraHelper)
spotLightShadowsCameraHelper.visible = false

gui.add(spotLight.position, 'x').step(0.01).min(-5).max(5).name('聚光灯位置X')
gui.add(spotLight.position, 'y').step(0.01).min(-5).max(5).name('聚光灯位置Y')
gui.add(spotLight.position, 'z').step(0.01).min(-5).max(5).name('聚光灯位置Z')
gui.add(spotLight, 'intensity').step(0.01).min(-5).max(5).name('聚光灯强度')
gui.add(spotLightShadowsCameraHelper, 'visible').name('聚光灯阴影相机助手')

//点光源
const pointLight = new PointLight(0xffff00, 0.8)
pointLight.position.set(-1, 1, 0)
pointLight.castShadow = true
scene.add(pointLight)
//控制阴影
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 1
pointLight.shadow.camera.far = 6

const pointLightShadowCameraHelper = new CameraHelper(pointLight.shadow.camera)
scene.add(pointLightShadowCameraHelper)
pointLightShadowCameraHelper.visible = false

gui.add(pointLight.position, 'x').step(0.01).min(-5).max(5).name('点光源位置X')
gui.add(pointLight.position, 'y').step(0.01).min(-5).max(5).name('点光源位置Y')
gui.add(pointLight.position, 'z').step(0.01).min(-5).max(5).name('点光源位置Z')
gui.add(pointLight, 'intensity').step(0.01).min(-5).max(5).name('点光源强度')
gui.add(pointLightShadowCameraHelper, 'visible').name('点光源阴影相机助手')



const clock = new Clock()
const renderTick = () => {
    const elapsedTime = clock.getElapsedTime()
    sphere.position.x = Math.cos(elapsedTime)
    sphere.position.z = Math.sin(elapsedTime)
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))
    
    cameraControls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(renderTick)
}
renderTick()

