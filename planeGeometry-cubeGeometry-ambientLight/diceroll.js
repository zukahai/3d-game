// Khởi tạo renderer, camera và scene
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();

// Đặt camera và renderer
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// Tạo cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // Mặt trên
    new THREE.MeshPhongMaterial({ color: 0xff0000 }), // Mặt dưới
    new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Mặt bên
    new THREE.MeshPhongMaterial({ color: 0xff00ff }), // Mặt bên
    new THREE.MeshPhongMaterial({ color: 0x0000ff }), // Mặt bên
    new THREE.MeshPhongMaterial({ color: 0xffff00 }), // Mặt bên
];
const cubeMesh = new THREE.Mesh(cubeGeometry, materials);
scene.add(cubeMesh);

// Đặt ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Render scene
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();