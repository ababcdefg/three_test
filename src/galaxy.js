import { AdditiveBlending, BufferAttribute, BufferGeometry, Clock, Color, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, MeshBasicMaterial, PCFShadowMap, PointLight, Points, PointsMaterial, RepeatWrapping, SRGBColorSpace, ShapeGeometry, SphereGeometry } from "three";
import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, MeshStandardMaterial, PlaneGeometry, AmbientLight, TextureLoader, DoubleSide, Group, BoxGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as datGUI from 'dat-gui'

const textureLoader = new TextureLoader()
const tex_particle = textureLoader.load('../public/static/textures/particles/2.png')



const scene = new Scene()

const viewSize = {
    width: innerWidth,
    height: innerHeight
}
const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.getElementById('app').appendChild(renderer.domElement)


const camera = new PerspectiveCamera(70, viewSize.width / viewSize.height, 0.1, 100)
camera.position.set(0, 2, 6)
scene.add(camera)

const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.enableDamping = true

// gui Params
const guiParams = {
    count: 400000,
    size: 0.001,
    radius: 8, //半径
    branches: 4, //星轨数
    spin: 0.7,//旋转程度
    offset: 0.9,  //粒子偏移距离
    focus: 3,    //粒子偏移集中度
    insideColor: '#ff6030',//内部颜色
    outsideColor: '#1b3984',//外部颜色
}
let geometry = null, material = null, pointMesh = null;
const createMesh = () => {
    if (pointMesh) {
        geometry.dispose()
        material.dispose()
        scene.remove(pointMesh)
    }

    geometry = new BufferGeometry()
    const pos_datas = new Float32Array(guiParams.count * 3)
    const color_datas = new Float32Array(guiParams.count * 3)

    const insideColor = new Color(guiParams.insideColor)
    const outsideColor = new Color(guiParams.outsideColor)

    for (let i = 0; i < guiParams.count; i++) {
        const i3 = i * 3

        const angle = (i % guiParams.branches) / guiParams.branches * Math.PI * 2
        const radius = Math.random() * guiParams.radius
        const spinAngle = radius * guiParams.spin   //半径越长，旋转角度越大

        //位置
        const x = Math.sin(angle + spinAngle) * radius
        const y = 0
        const z = Math.cos(angle + spinAngle) * radius

        //偏移
        const offsetX = Math.pow(Math.random(), guiParams.focus) * (Math.random() < 0.5 ? 1 : -1) * guiParams.offset
        const offsetY = Math.pow(Math.random(), guiParams.focus) * (Math.random() < 0.5 ? 1 : -1) * guiParams.offset
        const offsetZ = Math.pow(Math.random(), guiParams.focus) * (Math.random() < 0.5 ? 1 : -1) * guiParams.offset

        pos_datas[i3] = x + offsetX
        pos_datas[i3 + 1] = y + offsetY
        pos_datas[i3 + 2] = z + offsetZ

        const mixedColor = insideColor.clone() //混合颜色会改变原对象颜色
        mixedColor.lerp(outsideColor, radius / guiParams.radius) //根据半径混合颜色

        color_datas[i3] = mixedColor.r
        color_datas[i3 + 1] = mixedColor.g
        color_datas[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new BufferAttribute(pos_datas, 3))
    geometry.setAttribute('color', new BufferAttribute(color_datas, 3))
    material = new PointsMaterial({
        size: guiParams.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexColors: true
    })

    pointMesh = new Points(geometry, material)
    scene.add(pointMesh)
}
createMesh()

const gui = new datGUI.GUI()
gui.add(guiParams, 'count').min(100).max(1000000).step(100).onFinishChange(createMesh)
gui.add(guiParams, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(createMesh)
gui.add(guiParams, 'radius').min(0.01).max(20).step(0.001).onFinishChange(createMesh)
gui.add(guiParams, 'branches').min(2).max(20).step(1).onFinishChange(createMesh)
gui.add(guiParams, 'spin').min(-2).max(2).step(0.001).onFinishChange(createMesh)
gui.add(guiParams, 'offset').min(0).max(2).step(0.001).onFinishChange(createMesh)
gui.add(guiParams, 'focus').min(1).max(10).step(0.001).onFinishChange(createMesh)
gui.addColor(guiParams, 'insideColor').onChange(createMesh)
gui.addColor(guiParams, 'outsideColor').onChange(createMesh)

const clock = new Clock()
const renderTick = () => {
    const elapsedTime = clock.getElapsedTime()

    renderer.render(scene, camera)
    requestAnimationFrame(renderTick)
}
renderTick()
