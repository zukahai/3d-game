class Cube {
    constructor(x, y, z, color) {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
    }

    addToScene(scene) {
        scene.add(this.mesh);
    }

    update() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }
}

class Game {
    constructor() {
        // Khởi tạo canvas
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);

        // Khởi tạo scene
        this.scene = new THREE.Scene();

        // Khởi tạo camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        // Khởi tạo renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Khởi tạo cube
        this.cube = new Cube(0, 0, 0, 0x00ff00);
        this.cube.addToScene(this.scene);

        // Render scene
        this.render();
    }

    render() {
        requestAnimationFrame(() => { this.render(); });
        this.cube.update();
        this.renderer.render(this.scene, this.camera);
    }
}

const game = new Game();