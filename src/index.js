import * as THREE from 'three'
import { WEBGL } from './webgl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color(0xffffff)
  // scene.add(new THREE.AxesHelper(5)) // 중심점 표현

  // 카메라 추가
  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3
  camera.lookAt(0, 0, 0)


  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding;

  const container = document.querySelector('.obj_container');
  container.appendChild(renderer.domElement);

  // 컨트롤
  // const controls = new OrbitControls(camera, renderer.domElement)
  // controls.enableDamping = true
  // controls.maxPolarAngle = Math.PI / 2 - 0.1 // 각도 제한
  // controls.minDistance = 2
  // controls.maxDistance = 10
  // controls.target.set(0, 0, -0.2)
  // controls.update()

  // RGBE Loader
  // var RGBloader = new RGBELoader()
  // RGBloader.setDataType(THREE.UnsignedByteType)
  // RGBloader.load('../static/hdr/brown_photostudio_02_4k.hdr', function (texture) {
  //   texture.mapping = THREE.EquirectangularReflectionMapping

  //   // scene.background = texture
  //   scene.environment = texture
  // })


// Instantiate a loader
const gltfLoader = new GLTFLoader();
let GLTFObjGroup = new THREE.Object3D();

// Load a glTF resource
gltfLoader.load(
  // resource URL
  '../static/3d/container2-2.gltf',
  // called when the resource is loaded
  function ( gltf ) {



    const GLTFObj = gltf.scene
    
    GLTFObj.traverse(function(obj){
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
    }
  }
  )
    GLTFObj.scale.set(0.6,0.6,0.6)
    GLTFObj.position.x = 0.2
    GLTFObj.position.y = -0.4
    
    // GLTFObj.rotation.z = -0.05
    GLTFObj.rotation.y = -0.7
    // GLTFObj.rotation.x = 0.3

    GLTFObjGroup.add(GLTFObj)
    scene.add(GLTFObjGroup)


  },
  // called while loading is progressing
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

    console.log( 'An error happened' );

  }
);


  // 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(1, 1.5, 3);
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x0000ff);
  // scene.add(dlHelper);
  scene.add(directionalLight);
  directionalLight.castShadow = true; //그림자 O
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius = 5;

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 7);
  directionalLight2.position.set(-5, 1.2, 1);
  const dlHelper2 = new THREE.DirectionalLightHelper(directionalLight2, 0.2, 0x0000ff);
  // scene.add(dlHelper2);
  scene.add(directionalLight2);
  directionalLight2.castShadow = true; //그림자 O
  directionalLight2.shadow.mapSize.width = 2048;
  directionalLight2.shadow.mapSize.height = 2048;
  directionalLight2.shadow.radius = 5;

  //마우스 인터렉션
  let mouse = new THREE.Vector2()

  function onMouseMove(event){
    event.preventDefault()
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 -1
    mouse.y = -(event.clientY / renderer.domElement.clinetHeight) * 2 + 1


    console.log(mouse)
  }

  window.addEventListener('mousemove', onMouseMove, false)


  function animate() {
    requestAnimationFrame(animate) //인자로 받은 함수 animate를 반복 실행
    
    const rotationDelta = (mouse.x -camera.rotation.y) * 0.01

    if( Math.abs(scene.rotation.y + rotationDelta) < 0.1){
      scene.rotation.y += rotationDelta
    }

    const rotationDelta2 = (mouse.x -camera.rotation.y) * 0.01

    if( Math.abs(scene.rotation.x + rotationDelta2) < 0.2){
      scene.rotation.x += rotationDelta2
    }


    // const rotationDelta3 = (mouse.x -camera.rotation.y) * 0.01

    // if( Math.abs(scene.rotation.x + rotationDelta3) < 0.1){
    //   scene.rotation.z += rotationDelta3
    // }


    // scene.rotation.y += (mouse.x - camera.rotation.y) * 0.005

    GLTFObjGroup.rotation.y += 0.003
    // GLTFObjGroup.rotation.z += 0.002
    renderer.render(scene, camera)
  }
  animate() 

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}

window.onscroll = function() {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scrollIndicator").style.width = scrolled + "%";
};

// 스크롤 이동 기능
const home = document.querySelector(".nav_hover li:nth-of-type(1) button")
const about = document.querySelector(".nav_hover li:nth-of-type(2) button")
const work = document.querySelector(".nav_hover li:nth-of-type(3) button")
const contact = document.querySelector(".nav_hover li:nth-of-type(4) button")


const aboutSection = document.querySelector(".about")
const workSection = document.querySelector(".work_cate")
const contactSection = document.querySelector(".contact_container")

home.addEventListener("click", function(){
    window.scrollTo({ top:0, behavior:"smooth" })
})
about.addEventListener("click", function(){
    // offsetTop = 위치값 측정
    // aboutSection.offsetTop
    // console.log(aboutSection.offsetTop)
    // behavior = smooth 부드럽게 이동
    window.scrollTo({ top:aboutSection.offsetTop, behavior:"smooth" })
})

work.addEventListener("click", function(){
    window.scrollTo({ top:workSection.offsetTop, behavior:"smooth" })
})
contact.addEventListener("click", function(){
    window.scrollTo({ top:contactSection.offsetTop, behavior:"smooth" })
})