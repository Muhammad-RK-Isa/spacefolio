import './style.css'
import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const starrySpace = new THREE.TextureLoader().load('src/images/stars.jpg');
const daytimeEarth = new THREE.TextureLoader().load('src/images/earth_daymap.jpg');
const sunTexture = new THREE.TextureLoader().load('src/images/sun.jpg');

const scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100),
  renderer = new THREE.WebGL1Renderer({
    canvas: document.getElementById('bg')
  });

scene.background = starrySpace;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// ?Geometric Objects 

// ?Sun 
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 64, 32),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  })
);

// ?Earth Daytime
const earthDayMap = new THREE.Mesh(
  new THREE.SphereGeometry(5, 64, 32),
  new THREE.MeshStandardMaterial({
    map: daytimeEarth,
  })
);

earthDayMap.position.set(20, 0, 0);


const pointLight = new THREE.PointLight(0xffffff);
const pointLightSunny = new THREE.PointLight(0xFDB813);

pointLight.position.set(0, 0, 0);
pointLightSunny.position.set(0, 0, 0);

// const ambientLight = new THREE.AmbientLight(0xffffff);

// Helpers 
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);

// const orbitControls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight, sun, earthDayMap, pointLightSunny);


function starObjects() {
  const meshBasicMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const starGeometry = new THREE.OctahedronGeometry(0.2);
  const star = new THREE.Mesh(starGeometry, meshBasicMaterial);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(100).fill().forEach(starObjects);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;


  camera.position.x = t * -0.001;
  // camera.position.y = t * -0.0002;
  camera.position.z = t * -0.02;
};
document.body.onscroll = moveCamera;
moveCamera();

function animate3DObject() {
  requestAnimationFrame(animate3DObject);
  
  sun.rotation.y += 0.01;
  earthDayMap.rotation.y += 0.01;
  

  renderer.render(scene, camera);
};

animate3DObject();

