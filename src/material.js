import { Scene, Mesh, Color, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, SphereGeometry, PlaneGeometry, TorusGeometry, Clock, TextureLoader, SRGBColorSpace, BackSide, DoubleSide, MeshNormalMaterial, MeshMatcapMaterial, MeshDepthMaterial, AmbientLight, PointLight, MeshLambertMaterial, MeshPhongMaterial, MeshToonMaterial, NearestFilter, MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from "lil-gui";

const textureLoader = new TextureLoader()
const tex_color = textureLoader.load('../public/static/textures/door/color.jpg')
const tex_alpha = textureLoader.load('../public/static/textures/door/alpha.jpg')
const tex_ambientOcclusion = textureLoader.load('../public/static/textures/door/ambientOcclusion.jpg')
const tex_height = textureLoader.load('../public/static/textures/door/height.jpg')
const tex_normal = textureLoader.load('../public/static/textures/door/normal.jpg')
const tex_metalness = textureLoader.load('../public/static/textures/door/metalness.jpg')
const tex_roughness = textureLoader.load('../public/static/textures/door/roughness.jpg')

const tex_matcap1 = textureLoader.load('../public/static/textures/matcaps/1.png')
const tex_gradients3 = textureLoader.load('../public/static/textures/gradients/3.jpg')
tex_gradients3.minFilter =  NearestFilter
tex_gradients3.magFilter =  NearestFilter

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

//基础材质
// const material = new MeshBasicMaterial()
// material.map = tex_color
// // material.color = new Color(0,1,0)
// // material.wireframe = true
// material.transparent = true //设置材质是可透明的
// // material.opacity = 0.5
// material.alphaMap = tex_alpha
// material.side = DoubleSide

//法线材质     //根据法线向量计算物体表面的颜色
// const material = new MeshNormalMaterial()
// material.flatShading = true

//光照信息材质   //自带光照信息的材质
// const material = new MeshMatcapMaterial()
// material.matcap = tex_matcap1

//深度材质    //按深度绘制几何体
// const material = new MeshDepthMaterial()
// material.map = tex_height

//lambert光照模型材质，没有镜面反射
// const material = new MeshLambertMaterial()
//phone光照模型材质，有镜面反射
// const material = new MeshPhongMaterial()
// material.side = DoubleSide
// material.shininess = 1000   //高光范围
// material.specular = new Color(0x00ff00)   //镜面反射颜色

//
// const material = new MeshToonMaterial()
// material.map = tex_gradients3

//标准材质
const material = new MeshStandardMaterial()
material.side = DoubleSide
material.metalness = 0.5
material.roughness = 0



const Gui = new GUI({
  width:300,
  title:'GUI',
  closeFolders:false
})

Gui.add(material,'side')
Gui.add(material,'metalness').step(0.01)
Gui.add(material,'roughness').step(0.01)
Gui.addColor(material,'color')


const mesh1 = new Mesh(
  new SphereGeometry(1),
  material
)
mesh1.position.x = -2

const mesh2 = new Mesh(
  new PlaneGeometry(2, 2),
  material
)

const mesh3 = new Mesh(
  new TorusGeometry(),
  material
)
mesh3.position.x = 2
scene.add(mesh1, mesh2, mesh3)

const ambientLight = new AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new PointLight(0xffffff, 1)
pointLight.position.set(0,0,1)
scene.add(pointLight)

const lightGui = Gui.addFolder('灯光')
lightGui.add(pointLight.position,'x').step(0.01)
lightGui.add(pointLight.position,'y').step(0.01)
lightGui.add(pointLight.position,'z').step(0.01)
lightGui.add(pointLight,'intensity').step(0.01)
lightGui.addColor(pointLight,'color')



const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  mesh1.rotation.y = elapsedTime * 0.5
  mesh2.rotation.y = elapsedTime * 0.5
  mesh3.rotation.y = elapsedTime * 0.5
  mesh1.rotation.x = elapsedTime * 0.5
  mesh2.rotation.x = elapsedTime * 0.5
  mesh3.rotation.x = elapsedTime * 0.5

  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()