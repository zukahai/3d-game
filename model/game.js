class Game {
    constructor() {
        // Khởi tạo renderer, camera và scene
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene = new THREE.Scene();
        // Đặt camera và renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.loader = new THREE.GLTFLoader();

        // Tạo mặt phẳng
        // const planeGeometry = new THREE.PlaneGeometry(10, 10);
        // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
        // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        // planeMesh.rotation.x = -Math.PI / 2;
        // this.scene.add(planeMesh);

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

        for (let i = 0; i < 50; i++) {
            let size = Math.random() * 5 + 0.5;
            let geometry = new THREE.BoxGeometry(size, size, size);
            let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = (Math.random() - 0.5) * 50;
            cube.position.y = (Math.random()) * 5;
            cube.position.z = (Math.random() - 0.5) * 50;
            this.cube[i] = cube;
            this.scene.add(cube);


        }

        // Tạo bóng
        const sphereGeometry = new THREE.SphereGeometry(5, 320, 320);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        this.sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphereMesh.position.set(1, 5, 0);
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
                this.car.rotation.y += 0.03;
            } else if (event.key === "ArrowRight") {
                this.car.rotation.y -= 0.03;
            } else if (event.key === "ArrowUp") {
                // update x, z từ this.car.rotation.y
                this.car.position.x += 0.3 * Math.sin(this.car.rotation.y);
                this.car.position.z += 0.3 * Math.cos(this.car.rotation.y);
            } else if (event.key === "ArrowDown") {
                // update x, z từ this.car.rotation.y
                this.car.position.x -= 0.3 * Math.sin(this.car.rotation.y);
                this.car.position.z -= 0.3 * Math.cos(this.car.rotation.y);
            }
            // space
            if (event.key === " ") {
                this.car.position.y += 1;
            }
            // shift
            if (event.key === "Shift") {
                this.car.position.y -= 1;
            }
        });

        this.loadObject('./assets/images/abc2.glb');
        this.car = this.scene.children[0];
        this.car.rotation.y = Math.PI;

        this.loadObject('./assets/images/abc2.glb');
        this.car2 = this.scene.children[0];
        this.car2.position.z -= 10;

        // this.loadObject2('./assets/images/abc3.glb');
        // this.a = this.scene.children[0];






        this.initMap();
        this.initSphere();



        document.addEventListener('click', this.onClick.bind(this));

    }

    update() {
        this.cubeMesh.rotation.x += 0.01;
        this.cubeMesh.rotation.y += 0.01;
        const distance = 15;
        const angle = 0;
        const x = this.car.position.x + distance * Math.sin(this.car.rotation.y + Math.PI);
        const y = this.car.position.y + distance;
        const z = this.car.position.z + distance * Math.cos(this.car.rotation.y + Math.PI);

        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.car.position);
        // this.camera.rotation.y = -this.car.rotation.y;
        // this.camera.rotation.x = Math.PI / 6;

        // this.car.scale.set(0.05, 0.05, 0.05);
        // this.car.rotation.x += 0.01;
        // this.car.rotation.x = Math.PI / 3;
        // this.car.rotation.y += 0.01;
        for (let i = 0; i < this.cube.length; i++) {
            this.cube[i].rotation.x += 0.01;
            this.cube[i].rotation.y += 0.01;
            this.cube[i].rotation.z += 0.01;
            // this.cube[i].position.x = Math.sin(Date.now() * 0.001) * 2;
            // this.cube[i].position.z = Math.cos(Date.now() * 0.001) * 2;
            if (this.checkCollide(this.cube[i], this.car)) {
                this.cube[i].material.color.set(0xff0000);
                this.cube[i].position.x += 0.3 * Math.sin(this.car.rotation.y);
                this.cube[i].position.z += 0.3 * Math.cos(this.car.rotation.y);

            }
        }
        // this.a.scale.set(0.005, 0.005, 0.05);
    }

    initSphere() {

        const geometry = new THREE.SphereGeometry(5, 320, 320); // bán kính 5, 32 đoạn meridian, 32 đoạn vĩ độ
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff }),
            new THREE.MeshBasicMaterial({ color: 0xffff00 }),
            new THREE.MeshBasicMaterial({ color: 0xff00ff }),
            new THREE.MeshBasicMaterial({ color: 0x00ffff }),
        ];

        const sphere = new THREE.Mesh(geometry, materials);
        sphere.position.set(10, 0, 0);

        this.scene.add(sphere);
    }

    initMap() {
        const gridSize = 100;
        const gridStep = 0.5;

        // tạo một mặt phẳng với PlaneGeometry
        const geometry = new THREE.PlaneGeometry(gridSize, gridSize);
        geometry.rotateX(-Math.PI / 2); // quay 90 độ quanh trục ox

        // tạo các điểm để vẽ lưới
        const vertices = [];
        for (let i = -gridSize / 2; i <= gridSize / 2; i += gridStep) {
            vertices.push(i, 0, -gridSize / 2);
            vertices.push(i, 0, gridSize / 2);
            vertices.push(-gridSize / 2, 0, i);
            vertices.push(gridSize / 2, 0, i);
        }

        // tạo buffer geometry và buffer attribute để lưu trữ các điểm vẽ lưới
        const gridGeometry = new THREE.BufferGeometry();
        gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // tạo vật liệu cho lưới
        const material = new THREE.LineBasicMaterial({ color: 0xaaaaaa });

        // tạo LineSegments để vẽ lưới
        this.map = new THREE.LineSegments(gridGeometry, material);
        this.scene.add(this.map);
    }

    loadObject(url) {
        this.loader.load(
            url,
            (gltf) => {
                // Lấy đối tượng cần hiển thị từ trong file glb
                const object = gltf.scene;
                // Thêm đối tượng vào scene
                this.scene.add(object);
                // Lưu lại đối tượng vào biến this.object
                this.car = object;
                this.car.rotation.y = Math.PI;
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );
    }

    loadObject2(url) {
        this.loader.load(
            url,
            (gltf) => {
                // Lấy đối tượng cần hiển thị từ trong file glb
                const object = gltf.scene;
                // Thêm đối tượng vào scene
                this.scene.add(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );
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


    checkCollide(object1, object2) {
        const box1 = new THREE.Box3().setFromObject(object1);
        const box2 = new THREE.Box3().setFromObject(object2);
        return box1.intersectsBox(box2);
    }

    // Render scene
    render() {
        this.update();
        requestAnimationFrame(this.render.bind(this));
        this.sphereMesh.position.x = Math.sin(Date.now() * 0.001) * 15;
        this.sphereMesh.position.z = Math.cos(Date.now() * 0.001) * 15;
        this.renderer.render(this.scene, this.camera);
    }
}

const game = new Game();
game.render();