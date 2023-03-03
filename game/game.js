class Game {
    constructor() {
        // Khởi tạo các thuộc tính của trò chơi
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.objects = []; // Danh sách các đối tượng trong trò chơi
        this.pointLight = null; // Ánh sáng PointLight
        this.loader = new THREE.GLTFLoader()
    }

    // Phương thức khởi tạo trò chơi
    init() {
        // Thiết lập kích thước renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Khởi tạo các đối tượng trong trò chơi
        this.createObjects();

        // Thiết lập camera và ánh sáng
        this.camera.position.z = 5;
        this.pointLight = new THREE.PointLight(0xffffff, 1, 100);
        this.pointLight.position.set(-2, 0, 3);
        this.scene.add(this.pointLight);

        this.loader.load('../assets/images/bus/source/bus.glb', (gltf) => {

            // Lấy đối tượng cần hiển thị từ trong file glb
            const object = gltf.scene.children[0];
            console.log(object);
            // // Thêm đối tượng vào scene
            this.scene.add(object);

        }, undefined, function(error) {

            console.error(error);

        });
    }

    // Phương thức tạo đối tượng trong trò chơi
    createObjects() {
        // Tạo hình cầu đỏ
        var geometry1 = new THREE.SphereGeometry(1, 32, 32);
        var material1 = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Sử dụng MeshPhongMaterial để áp dụng đổ sáng
        var sphere1 = new THREE.Mesh(geometry1, material1);
        sphere1.position.set(-2, 0, 0);
        this.objects.push(sphere1);
        this.scene.add(sphere1);

        // Tạo hình cầu xanh
        var geometry2 = new THREE.SphereGeometry(1, 32, 32);
        var material2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        var sphere2 = new THREE.Mesh(geometry2, material2);
        sphere2.position.set(2, 0, 0);
        this.objects.push(sphere2);
        this.scene.add(sphere2);
    }

    // Phương thức cập nhật trạng thái của các đối tượng trong trò chơi
    update() {
        // Cập nhật trạng thái của các đối tượng trong trò chơi
        // ...
    }

    // Phương thức vẽ các đối tượng trong trò chơi
    render() {
        requestAnimationFrame(this.render.bind(this));
        this.objects[0].position.x = Math.sin(Date.now() * 0.001) * 2;
        this.objects[0].position.z = Math.cos(Date.now() * 0.001) * 2;
        this.renderer.render(this.scene, this.camera);
    }

    // Hàm loop để chạy trò chơi
    loop() {
        this.update();
        this.render();
    }
}

// Khởi tạo đối tượng Game
var game = new Game();
game.init();
game.loop();