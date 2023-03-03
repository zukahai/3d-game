class Game {
    constructor() {
        // Khởi tạo renderer, camera và scene
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene = new THREE.Scene();
        // Đặt camera và renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = 10;

        // Tạo mặt phẳng
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = -Math.PI / 2;
        this.scene.add(planeMesh);

        // Tạo cube
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cubeMesh.position.set(0, 0.5, 0);
        this.scene.add(this.cubeMesh);

        this.cubeMesh.addEventListener('click', () => {
            console.log('Clicked on cube');
        });

        this.cube = [];

        for (let i = 0; i < 5; i++) {
            let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = (Math.random() - 0.5) * 5;
            cube.position.y = (Math.random() - 0.5) * 5;
            cube.position.z = (Math.random() - 0.5) * 5;
            this.cube[i] = cube;
            this.scene.add(cube);


        }

        // Tạo bóng
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        this.sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphereMesh.position.set(1, 1, 0);
        this.scene.add(this.sphereMesh);

        // Đặt ánh sáng
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        this.scene.add(directionalLight);

        // Thêm sự kiện xoay cube khi ấn phím
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.cubeMesh.position.x -= 0.1;
            } else if (event.key === "ArrowRight") {
                this.cubeMesh.position.x += 0.1;
            } else if (event.key === "ArrowUp") {
                this.cubeMesh.position.y += 0.1;
            } else if (event.key === "ArrowDown") {
                this.cubeMesh.position.y -= 0.1;
            }
        });

        document.addEventListener('click', this.onClick.bind(this));

    }

    onClick(event) {
        // Lấy vị trí chuột trong khoảng viewport
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1
        );

        // Lấy đối tượng được click
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        for (let i = 0; i < this.cube.length; i++) {
            if (this.checkClick(raycaster, this.cube[i])) {
                this.cube[i].visible = false;
            }
        }
    }

    checkClick(raycaster, object) {
        const intersects = raycaster.intersectObject(object);
        if (intersects.length > 0) {
            console.log('Clicked on the cube!');
            return true;
        }
        return false;
    }

    // Render scene
    render() {
        this.cubeMesh.rotation.x += 0.01;
        this.cubeMesh.rotation.y += 0.01;
        for (let i = 0; i < this.cube.length; i++) {
            this.cube[i].rotation.x += 0.01;
            this.cube[i].rotation.y += 0.01;
            this.cube[i].rotation.z += 0.01;
        }
        requestAnimationFrame(this.render.bind(this));
        this.sphereMesh.position.x = Math.sin(Date.now() * 0.001) * 2;
        this.sphereMesh.position.z = Math.cos(Date.now() * 0.001) * 2;
        // this.sphereMesh.position.z = Math.cos(Date.now() * 0.001) * 2;
        this.renderer.render(this.scene, this.camera);
    }
}

const game = new Game();
game.render();