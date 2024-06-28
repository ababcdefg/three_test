import { AdditiveBlending, BufferAttribute, BufferGeometry, Clock, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, MeshBasicMaterial, PCFShadowMap, PointLight, Points, PointsMaterial, RepeatWrapping, SRGBColorSpace, ShapeGeometry, SphereGeometry } from "three";
import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, MeshStandardMaterial, PlaneGeometry, AmbientLight, TextureLoader, DoubleSide, Group, BoxGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// const particlesGeometry = new SphereGeometry(1,32,32)
const particlesGeometry = new BufferGeometry()
const count = 50000
const pos_datas = new Float32Array(count * 3)
const color_datas = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
    pos_datas[i] = (Math.random() - 0.5) * 10
    color_datas[i] = (Math.random() - 0.5) * 10
}
particlesGeometry.setAttribute('position', new BufferAttribute(pos_datas, 3))
particlesGeometry.setAttribute('color', new BufferAttribute(color_datas, 3))

const particleMaterial = new PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    // color: '#00ffff',
    transparent: true,
    alphaMap: tex_particle,
    // alphaTest:0.001,  //透明测试   (像素的alpha值为0则不渲染)
    // depthTest: false,  // 深度测试  (不检测深度，渲染所有像素)
    depthWrite: false,      //不让当前网格被写入深度缓冲区 (当前网格全渲染)
    // blending: AdditiveBlending,  //混合(相同像素上的颜色叠加,叠加到最终为白色)
    vertexColors: true,        //使用顶点着色器buffer缓冲区中的颜色值
})
const particles = new Points(particlesGeometry, particleMaterial)
scene.add(particles)

// scene.add(new Mesh(new BoxGeometry(), new MeshBasicMaterial()))


const clock = new Clock()
const renderTick = () => {
    const elapsedTime = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera)
    requestAnimationFrame(renderTick)
}
renderTick()
