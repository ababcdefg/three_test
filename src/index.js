import { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, WebGLRenderer } from 'three';

const scene = new Scene()
const viewSize = { width: 800, height: 600 }
const camera = new PerspectiveCamera(45, viewSize.width / viewSize.height, 1, 1000)
camera.position.z = 3
scene.add(camera)

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xffff00 })
const cube = new Mesh(geometry, material)
scene.add(cube)

const renderer = new WebGLRenderer()
renderer.setSize(viewSize.width, viewSize.height)
document.querySelector('#app')?.appendChild(renderer.domElement)
renderer.render(scene, camera)
