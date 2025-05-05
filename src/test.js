import * as THREE from 'three'
import { WEBGL } from './webgl'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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


// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'../static/3d/container2-2.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

    const GLTFObj = gltf.scene
    
    GLTFObj.scale.set(0.2,0.2,0.2)
    GLTFObj.position.x = -0.2
    GLTFObj.position.y = -0.01
    GLTFObj.position.z = -0.2
    GLTFObj.lookAt(new THREE.Vector3(0,0,0))


		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

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



  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight);

  //텍스쳐
  // const textureLoader = new THREE.TextureLoader();
  // const textureBaseColor = textureLoader.load('../static/img/texture.png');
  // const textureGlassColor = textureLoader.load('../static/img/ds.jpg');

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
