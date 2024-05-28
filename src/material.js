import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, BoxGeometry, MeshBasicMaterial, Color, Texture, TextureLoader, LoadingManager, SRGBColorSpace, MirroredRepeatWrapping, NearestFilter, LinearFilter } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new Scene()
scene.background = new Color(0, 0, 0)

const viewSize = {
  width: window.innerWidth,
  height: window.innerHeight
}
const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app').appendChild(renderer.domElement)

const camera = new PerspectiveCamera(75, viewSize.width / viewSize.height, 0.1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.enableDamping = true

const loadingManager = new LoadingManager()
loadingManager.onStart = () => console.log('onStart');
loadingManager.onLoad = () => console.log('onLoad');
loadingManager.onProgress = () => console.log('onProgress');
loadingManager.onError = (e) => console.log('onError',e);
/*
  Texture
*/
// const img = new Image()
// const texture = new Texture(img)
// img.onload = () => { texture.needsUpdate = true }
// img.src = '/static/textures/door/color.jpg'
const texLoader = new TextureLoader(loadingManager)
const texture1 = texLoader.load('/static/textures/door/color.jpg')
const texture2 = texLoader.load('/static/textures/door/alpha.jpg')
const texture3 = texLoader.load('/static/textures/door/ambientOcclusion.jpg')
const texture4 = texLoader.load('/static/textures/door/height.jpg')
const texture5 = texLoader.load('/static/textures/door/metalness.jpg')
const texture6 = texLoader.load('/static/textures/door/normal.jpg')
const texture7 = texLoader.load('/static/textures/door/roughness.jpg')
const texture8 = texLoader.load('/static/textures/checkerboard-1024x1024.png')
const texture9 = texLoader.load('/static/textures/checkerboard-8x8.png')
const texture10 = texLoader.load('/static/textures/minecraft.png')
const texture11 = texLoader.load('/static/textures/Bark.jpg')


const cube = new Mesh(
  new BoxGeometry(2, 2, 2),
  new MeshBasicMaterial({ map: texture11 })
)
cube.material.map.colorSpace = SRGBColorSpace
scene.add(cube)

// uv重复
// cube.material.map.repeat.x = 2
// cube.material.map.repeat.y = 1
// uv镜像
// cube.material.map.wrapS = MirroredRepeatWrapping
// cube.material.map.wrapT = MirroredRepeatWrapping
// uv偏移
// cube.material.map.offset.x = 0.5
// cube.material.map.offset.y = 0.5
// uv旋转
// cube.material.map.rotation = Math.PI / 4
// cube.material.map.center.x = 0.5  //旋转中心
// cube.material.map.center.y = 0.5
// 过滤器   
// cube.material.map.generateMipmaps = false  //使用最小过滤器的时候可以取消生成纹理的mipmap，以提升性能

// cube.material.map.minFilter = NearestFilter   //当纹素覆盖的像素少于一个时，如何对纹理进行采样
// cube.material.map.minFilter = LinearFilter  
cube.material.map.magFilter = NearestFilter    //当纹素覆盖多个像素时，如何对纹理进行采样

const renderTick = () => {
  renderer.render(scene, camera)
  cameraControls.update()
  requestAnimationFrame(renderTick)
}
renderTick()

