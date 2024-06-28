import { Clock, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, PCFShadowMap, PointLight, RepeatWrapping, SRGBColorSpace, ShapeGeometry, SphereGeometry } from "three";
import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, MeshStandardMaterial, PlaneGeometry, AmbientLight, TextureLoader, DoubleSide, Group, BoxGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const textureLoader = new TextureLoader()
const tex_floor_color = textureLoader.load('../public/static/textures/grass/color.jpg')
const tex_floor_ao = textureLoader.load('../public/static/textures/grass/ambientOcclusion.jpg')
const tex_floor_normal = textureLoader.load('../public/static/textures/grass/normal.jpg')
const tex_floor_roughness = textureLoader.load('../public/static/textures/grass/roughness.jpg')

tex_floor_color.repeat.set(8, 8)
tex_floor_ao.repeat.set(8, 8)
tex_floor_normal.repeat.set(8, 8)
tex_floor_roughness.repeat.set(8, 8)

tex_floor_color.wrapS = RepeatWrapping
tex_floor_ao.wrapS = RepeatWrapping
tex_floor_normal.wrapS = RepeatWrapping
tex_floor_roughness.wrapS = RepeatWrapping

tex_floor_color.wrapT = RepeatWrapping
tex_floor_ao.wrapT = RepeatWrapping
tex_floor_normal.wrapT = RepeatWrapping
tex_floor_roughness.wrapT = RepeatWrapping


const tex_wall_color = textureLoader.load('../public/static/textures/bricks/color.jpg')
const tex_wall_ao = textureLoader.load('../public/static/textures/bricks/ambientOcclusion.jpg')
const tex_wall_normal = textureLoader.load('../public/static/textures/bricks/normal.jpg')
const tex_wall_roughness = textureLoader.load('../public/static/textures/bricks/roughness.jpg')
tex_wall_color.colorSpace = SRGBColorSpace

const tex_door_color = textureLoader.load('../public/static/textures/door/color.jpg')
const tex_door_ao = textureLoader.load('../public/static/textures/door/ambientOcclusion.jpg')
const tex_door_alpha = textureLoader.load('../public/static/textures/door/alpha.jpg')
const tex_door_normal = textureLoader.load('../public/static/textures/door/normal.jpg')
const tex_door_metalness = textureLoader.load('../public/static/textures/door/metalness.jpg')
const tex_door_roughness = textureLoader.load('../public/static/textures/door/roughness.jpg')
const tex_door_height = textureLoader.load('../public/static/textures/door/height.jpg')
tex_door_color.colorSpace = SRGBColorSpace


const scene = new Scene()
scene.fog = new Fog('#262837', 1, 15)

const viewSize = {
    width: innerWidth,
    height: innerHeight
}
const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.getElementById('app').appendChild(renderer.domElement)
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap

const camera = new PerspectiveCamera(70, viewSize.width / viewSize.height, 0.1, 100)
camera.position.set(0, 2, 7)
scene.add(camera)

const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.enableDamping = true

const ambientLight = new AmbientLight(0xb9d5ff, .12)
scene.add(ambientLight)
const moonLight = new DirectionalLight(0xb9d5ff, .12)
moonLight.position.set(3, 3, 2)
scene.add(moonLight)

//地面
const floor = new Mesh(
    new PlaneGeometry(20, 20, 64, 64),
    new MeshStandardMaterial({
        map: tex_floor_color,
        aoMap: tex_floor_ao,
        normalMap: tex_floor_normal,
        roughnessMap: tex_floor_roughness,
        side: DoubleSide
    })
)
floor.geometry.setAttribute(
    'uv2',
    new Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = -Math.PI / 2
// floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

//房子
const house = new Group()
house.position.y = 1.26
scene.add(house)

const wall = new Mesh(
    new BoxGeometry(4, 2.5, 4),
    new MeshStandardMaterial({
        map: tex_wall_color,
        aoMap: tex_wall_ao,
        normalMap: tex_wall_normal,
        roughnessMap: tex_wall_roughness,
    })
)
wall.geometry.setAttribute(
    'uv2',
    new Float32BufferAttribute(wall.geometry.attributes.uv.array, 2)
)
wall.receiveShadow = true
house.add(wall)
const roof = new Mesh(
    new ConeGeometry(3.5, 1, 4),
    new MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 1.75
roof.rotation.y = Math.PI / 4
house.add(roof)

const door = new Mesh(
    new PlaneGeometry(2, 2, 100, 100),
    new MeshStandardMaterial({
        // color: '#aa7b7b',
        map: tex_door_color,
        transparent: true,
        alphaMap: tex_door_alpha,
        aoMap: tex_door_ao,
        // aoMapIntensity:2,
        normalMap: tex_door_normal,
        metalnessMap: tex_door_metalness,
        roughnessMap: tex_door_roughness,
        displacementMap: tex_door_height,
        displacementScale: 0.1
    })
)
door.geometry.setAttribute(
    'uv2',
    new Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.set(0, -0.33, 2.01)
door.receiveShadow = true
house.add(door)
const doorLight = new PointLight('#ff7d46', 1, 7, 0)
doorLight.position.set(0, 0.85, 2.4)
doorLight.castShadow = true
doorLight.shadow.mapSize.width = 1024
doorLight.shadow.mapSize.height = 1024
doorLight.shadow.camera.near = 0.1
doorLight.shadow.camera.far = 6
house.add(doorLight)

const bushGeometry = new SphereGeometry(1, 16, 16)
const bushMaterial = new MeshStandardMaterial({ color: '#89c854' })
const bush1 = new Mesh(bushGeometry, bushMaterial)
bush1.scale.set(.5, .5, .5)
bush1.position.set(.8, 0.2, 2.4)
const bush2 = new Mesh(bushGeometry, bushMaterial)
bush2.scale.set(.25, .25, .25)
bush2.position.set(1.45, 0.1, 2.2)
const bush3 = new Mesh(bushGeometry, bushMaterial)
bush3.scale.set(.4, .4, .4)
bush3.position.set(-1, 0.2, 2.3)
const bush4 = new Mesh(bushGeometry, bushMaterial)
bush4.scale.set(.15, .15, .15)
bush4.position.set(-1.5, 0.15, 2.2)
scene.add(bush1, bush2, bush3, bush4)
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

const graves = new Group()
scene.add(graves)
const graveGeometry = new BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new MeshStandardMaterial({ color: '#b2b6b1' })
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const randomMul = Math.random() * 6 + 3
    const x = Math.sin(angle) * randomMul
    const z = Math.cos(angle) * randomMul

    const grave = new Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.4, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}


const ghost1 = new PointLight(0x00ffff, 2, 7)
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 1024
ghost1.shadow.mapSize.height = 1024
ghost1.shadow.camera.near = 0.01
ghost1.shadow.camera.far = 6
scene.add(ghost1)

const ghost2 = new PointLight(0xffff00, 2, 7)
ghost2.castShadow = true
ghost2.shadow.mapSize.width = 1024
ghost2.shadow.mapSize.height = 1024
ghost2.shadow.camera.near = 0.01
ghost2.shadow.camera.far = 6
scene.add(ghost2)




const clock = new Clock()
const renderTick = () => {
    const elapsedTime = clock.getElapsedTime()
    ghost1.position.x = Math.sin(elapsedTime * 1.2) * 5
    ghost1.position.z = Math.cos(elapsedTime * 1.2) * 5
    ghost1.position.y = Math.abs(Math.sin(elapsedTime * 4))

    ghost2.position.z = Math.sin(elapsedTime) * 4
    ghost2.position.x = Math.cos(elapsedTime) * 4
    ghost2.position.y = Math.abs(Math.sin(elapsedTime * 3))

    renderer.render(scene, camera)
    requestAnimationFrame(renderTick)
}
renderTick()
