// Khởi tạo canvas
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// Khởi tạo scene
var scene = new THREE.Scene();

// Khởi tạo camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Khởi tạo renderer
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Khởi tạo geometry
var geometry = new THREE.BoxGeometry(1, 1, 1);

// Khởi tạo vật liệu
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Khởi tạo mesh từ geometry và vật liệu
var cube = new THREE.Mesh(geometry, material);

// Thêm mesh vào scene
scene.add(cube);

// Render scene
function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

render();