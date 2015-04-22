import Three from 'three';

// Scenes allow you to set up what and where is to be
// rendered by three.js. This is where you place objects,
// lights and cameras.
const scene = new Three.Scene();

// Camera with perspective projection.
const aspectsRatio = window.innerWidth / window.innerHeight;
const camera = new Three.PerspectiveCamera(
  75,           // Field of view
  aspectsRatio, // Aspect ratio
  1,            // Near clipping plane
  10000         // Far clipping plane
);

// Distance camera from the center of the scene.
camera.position.z = 4;

// The WebGL renderer displays your beautifully crafted
// scenes using WebGL, if your device supports it.
const renderer = new Three.WebGLRenderer({
  antialias: true
});


//
const planeMaterial = new Three.MeshPhongMaterial({
  specular: 0x333333,         // Specular color of the material (light)
  color: 0x3333333,            // Geometry color in hexadecimal
  emissive: 0x111111,         // Emissive color of the material (dark)
  shininess: 10,              // How shiny the specular highlight is
  shading: Three.FlatShading  // NoShading, FlatShading or SmoothShading
});


// Create a geometry with N segments.
const segments = 50;
const planeGeometry = new Three.PlaneGeometry(20, 20, segments, segments);

// Move the vertices by random.
planeGeometry.vertices.map(function (vertex) {
  vertex.x += -.5 + Math.random() / 10;
  vertex.y += -.5 + Math.random() / 10;
  vertex.z = -.5 + Math.random() / 5;
  return vertex;
});

// Update geometry.
planeGeometry.computeFaceNormals();

// Create plane
const plane = new Three.Mesh(planeGeometry, planeMaterial);

// Create a wireframe
const wireframeMaterial = new Three.MeshBasicMaterial({
  color: 0x222222,
  wireframe: true
});
const wireframe = new Three.Mesh(planeGeometry, wireframeMaterial);
scene.add(wireframe);
scene.add(plane);


// Creates a light that shines from a specific direction
// not from a specific position. This light will behave
// as though it is infinitely far away and the rays produced
// from it are all parallel. The best analogy would be a
// light source that acts like the sun: the sun is so far
// away that all sunlight hitting objects comes from the
// same angle.
var light = new Three.DirectionalLight(0xffffff, 0.1);
light.position.set(1, 1, 1);
scene.add(light);


// Resizes the output canvas to (width, height), and also
// sets the viewport to fit that size, starting in (0, 0).
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer element to the DOM.
document.body.appendChild(renderer.domElement);

let mouseX = 0;
let mouseY = 0;

// Move the light according to the mouse position.
function animate() {
  requestAnimationFrame(animate);
  light.position.x = -1 + (mouseX / window.innerWidth) * 2;
  light.position.y = 1 - (mouseY / window.innerHeight) * 2;
  renderer.render(scene, camera);
}

animate();

function onMouseMove(event) {
  mouseX = event.x;
  mouseY = event.y;
}


// Update camera aspect and renderer size on window resize.
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);