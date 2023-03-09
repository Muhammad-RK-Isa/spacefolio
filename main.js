import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100),
  renderer = new THREE.WebGL1Renderer({
    canvas: document.getElementById('bg')
  });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// ?Geometric Objects 

const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 300, 20, 2, 3);
const meshBasicMaterial = new THREE.MeshStandardMaterial({color: 0xBFEAED});
const knotTorus = new THREE.Mesh(torusKnotGeometry, meshBasicMaterial);

scene.add(knotTorus);

const pointLight = new THREE.PointLight(0xffffff);

scene.add(pointLight);

pointLight.position.set(5, 5, 5);

const animate3DObject = () => {
  requestAnimationFrame(animate3DObject);
  renderer.render(scene, camera);

  knotTorus.rotation.x += 0.01;
  knotTorus.rotation.y += 0.005;
  knotTorus.rotation.z += 0.01;
};

animate3DObject();