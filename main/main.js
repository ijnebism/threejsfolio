import * as THREE from 'three'
import "./styles/styles.css"
import { Reflector } from 'three/addons/objects/Reflector.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import cameraOrientationState from './utils/camera_controls/cameraOrientationState.js'
import { handleCameraRotation, handleMouseMovement } from './utils/camera_controls/camerawithMouse.js'
import gsap from 'gsap'


//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("#222222")
let zoomed = false;

//Ground
const ground = new THREE.PlaneGeometry(100, 100)
const groundMaterial = new Reflector(ground, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x444444,

})
groundMaterial.rotation.x = -Math.PI / 2
groundMaterial.position.y = -3
scene.add(groundMaterial)

//Model
const loader = new GLTFLoader();
loader.load('/models/monitor.glb', (gltf) => {
    const model = gltf.scene;

    scene.add(model);
    model.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    })
});

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Fog ambient
const fog = new THREE.Fog(0x000000, 1, 33)
scene.fog = fog
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
scene.add(ambientLight)

//Light
const mainLight = new THREE.SpotLight(0xffffff)
mainLight.intensity = 100
mainLight.castShadow = true
mainLight.shadow.camera.near = 0.1
mainLight.shadow.camera.far = 100
mainLight.shadow.focus = 1
mainLight.angle = 0.8;
mainLight.position.set(0, 10.5, 0.5)
mainLight.shadow.mapSize.width = 1024
mainLight.shadow.mapSize.height = 1024
mainLight.shadow.bias = -0.0001
mainLight.penumbra = 0.1
mainLight.visible = false;
scene.add(mainLight)


//Books light
const bookLight = new THREE.SpotLight(0xffffff)
bookLight.intensity = 100
bookLight.castShadow = true
bookLight.shadow.camera.near = 0.1
bookLight.shadow.camera.far = 100
bookLight.shadow.focus = 1
bookLight.angle = 0.8;
bookLight.position.set(9, 5, 7)
bookLight.shadow.mapSize.width = 1024
bookLight.shadow.mapSize.height = 1024
bookLight.shadow.bias = -0.0001
bookLight.penumbra = 1
bookLight.visible = false;
scene.add(bookLight)

const bookPos = new THREE.Object3D()
bookPos.position.set(10, 5, 0)
scene.add(bookPos)
bookLight.target = bookPos;



//Board light
const boardLight = new THREE.SpotLight(0xffffff)
boardLight.intensity = 100
boardLight.castShadow = true
boardLight.shadow.camera.near = 0.1
boardLight.shadow.camera.far = 100
boardLight.shadow.focus = 1
boardLight.angle = 0.5;
boardLight.position.set(-5, 5, 0)
boardLight.shadow.mapSize.width = 1024
boardLight.shadow.mapSize.height = 1024
boardLight.shadow.bias = -0.0001
boardLight.penumbra = 1
boardLight.visible = false;
scene.add(boardLight)

const boardPos = new THREE.Object3D()
boardPos.position.set(-13.2, 6.8, 5.6)
scene.add(boardPos)
boardLight.target = boardPos;


//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 8.3, 15)
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.render(scene, camera)

//Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width, sizes.height)
})

//Camera orientation state
const cameraState = new cameraOrientationState()

//Mouse
const mouse = new THREE.Vector2()

function onMouseMove(event) {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1

    if (zoomed === false) {
        if (mouse.x > 0.3) {
            bookLight.visible = true;
            boardLight.visible = false;
            mainLight.visible = false;
        } else if (mouse.x < -0.5) {
            bookLight.visible = false;
            boardLight.visible = true;
            mainLight.visible = false;
        } else {
            mainLight.visible = true;
            bookLight.visible = false;
            boardLight.visible = false;
        }
    }

    handleMouseMovement(mouse.x, mouse.y, cameraState)
}



function zoomIn(event) {
    if (zoomed === false) {
        if (mouse.x > 0.3) {
            gsap.to(camera.position, {
                x: 10.17,
                y: 9.0,
                z: 4,
                duration: 1.5
            });
            gsap.to(camera.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5
            });
        } else if (mouse.x < -0.5) {
            gsap.to(camera.position, {
                x: -8,
                y: 6.89,
                z: 5.583,
                duration: 1.5
            });
            gsap.to(camera.rotation, {
                x: 0,
                y: 3.14 / 2,
                z: 0,
                duration: 1.5
            });
        } else {
            gsap.to(camera.position, {
                x: 0,
                y: 6.312,
                z: 3.118,
                duration: 1.5
            });
            gsap.to(camera.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5
            });
        }
        zoomed = true;
    }

}

if (zoomed === false) {
    window.addEventListener('click', zoomIn)
}


window.addEventListener('mousemove', onMouseMove)

const loop = () => {
    if (zoomed === false) {
        handleMouseMovement(mouse.x, mouse.y, cameraState)
        handleCameraRotation(camera, cameraState)
    }

    window.requestAnimationFrame(loop)
    renderer.render(scene, camera)
}
loop()