const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 30;

// Tạo body của máy bay
const bodyGeometry = new THREE.BoxGeometry(10, 4, 20);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(bodyMesh);

// Tạo đuôi của máy bay
const tailGeometry = new THREE.BoxGeometry(4, 4, 4);
const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
const tailMesh = new THREE.Mesh(tailGeometry, tailMaterial);
tailMesh.position.set(-8, 0, 0);
scene.add(tailMesh);

// Tạo cánh trên của máy bay
const wingTopGeometry = new THREE.BoxGeometry(20, 1, 5);
const wingTopMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
const wingTopMesh = new THREE.Mesh(wingTopGeometry, wingTopMaterial);
wingTopMesh.position.set(0, 3, 0);
scene.add(wingTopMesh);

// Tạo cánh dưới của máy bay
const wingBottomGeometry = new THREE.BoxGeometry(20, 1, 5);
const wingBottomMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
const wingBottomMesh = new THREE.Mesh(wingBottomGeometry, wingBottomMaterial);
wingBottomMesh.position.set(0, -3, 0);
scene.add(wingBottomMesh);

// Tạo cánh trên sau của máy bay
const tailWingTopGeometry = new THREE.BoxGeometry(4, 1, 10);
const tailWingTopMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
const tailWingTopMesh = new THREE.Mesh(tailWingTopGeometry, tailWingTopMaterial);
tailWingTopMesh.position.set(-10, 1, 0);
scene.add(tailWingTopMesh);

// Tạo cánh dưới sau của máy bay
const tailWingBottomGeometry = new THREE.BoxGeometry(4, 1, 10);
const tailWingBottomMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
const tailWingBottomMesh = new THREE.Mesh(tailWingBottomGeometry, tailWingBottomMaterial);
tailWingBottomMesh.position.set(-10, -1, 0);
scene.add(tailWingBottomMesh);

// Tạo động cơ
const engineGeometry = new THREE.CylinderGeometry(2, 2, 6, 32);
const engineMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const engineMesh = new THREE.Mesh(engineGeometry, engineMaterial);
engineMesh.position.set(-5, 0, 0);
scene.add(engineMesh);

// Tạo cánh máy bay
const wingGeometry = new THREE.BoxGeometry(8, 0.5, 2);
const wingMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);
wingMesh.position.set(0, 2, 0);
scene.add(wingMesh);

// Đặt ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Render scene
function render() {
    requestAnimationFrame(render);
    engineMesh.rotation.z += 0.01;
    bodyMesh.rotation.y += 0.01;
    tailMesh.rotation.y += 0.01;
    wingMesh.rotation.z += 0.01;
    renderer.render(scene, camera);
}
render();