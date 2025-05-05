import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {

  //장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color();

  //카메라
  const fov = 120;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,0.1,1.8);
  camera.lookAt(new THREE.Vector3(0,0,0));


  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);


  //빛
  // const pointLight = new THREE.PointLight(0xffffff, 1);
  // pointLight.position.set(0, 2, 12)
  // scene.add(pointLight);


  //도형추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshPhongMaterial({
    color:0xffffff,
    // map:textureGlassColor,
    // shininess:200,
    // specular : 0x004fff,
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  scene.add(cube);
  

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color:0xffffff
  });
  const plane = new THREE.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x = -7.95;
  plane.position.y = -0.2;
  scene.add(plane);

  //빛
  // const directionalLight = new THREE.DirectionalLight(0xfffffff, 0.5);
  // directionalLight.position.set(-1,1,1);
  // const dlHelper = new THREE.DirectionalLightHelper
  // (directionalLight, 0.2, 0x0000ff)
  // scene.add(dlHelper)
  // scene.add(directionalLight);
  // const pointLight = new THREE.PointLight(0xffffff,1);
  // scene.add(pointLight);
  // pointLight.position.set(-2,0.5,0.5)
  // const plHelper = new THREE.PointLightHelper(pointLight, 0.1);
  // scene.add(plHelper);

  // const pointLight2 = new THREE.PointLight(0xffffff,1);
  // scene.add(pointLight2);
  // pointLight.position.set(2,2,0.5)
  // const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.1);
  // scene.add(plHelper2);

 const rectLight = new THREE.RectAreaLight(0xffffff, 2 , 1, 0.5);
 scene.add(rectLight);
 rectLight.position.set(0.5,0.5,1);
 rectLight.lookAt(0,0,0);


  

  function render(time) {
    time *= 0.001;  // convert time to seconds
   
    
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
