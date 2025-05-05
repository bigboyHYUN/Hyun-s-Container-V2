import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color();

  //카메라
  const fov = 85;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.2;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,0,1);
  camera.lookAt(new THREE.Vector3(0,0,0))

  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);
  // camera.position.z=2;
  // const canvas = document.querySelector('#ex-03');

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);


  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight);

  const textureLoader = new THREE.TextureLoader();
  const textureBaseColor = textureLoader.load('../static/img/texture.png');
  const textureGlassColor = textureLoader.load('../static/img/ds.jpg');

  //도형추가
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
  const material01 = new THREE.MeshStandardMaterial({
    map:textureBaseColor,
    // transparent : true,
    // opacity: 0.5,
  });

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color:0xeeeeee
  });
  const plane = new THREE.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x = -0.5* Math.PT;
  plane.position.y = -0.5;
  scene.add(plane);

  
  const material04 = new THREE.MeshPhongMaterial({
    map:textureGlassColor,
    shininess:200,
    specular : 0x004fff,
    // transparent : true,
    // opacity: 0.5,
  });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 0;
  scene.add(obj04);


  function render(time) {
    time *= 0.001;  // convert time to seconds
   
    
    obj04.rotation.y += 0.01;

    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


  //반응형 처리
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

} else {
  
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
