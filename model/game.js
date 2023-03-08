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

        for (let i = 0; i < 10; i++) {
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
        this.keycode = [];

        // Thêm sự kiện xoay cube khi ấn phím
        document.addEventListener("keydown", (event) => {
            // console.log(event.keyCode);
            this.keycode[event.keyCode] = true;
            this.keycode[event.keyCode - 2] = false;
            this.keycode[event.keyCode + 2] = false;
        });

        document.addEventListener("keyup", (event) => {
            // console.log(event.keyCode);
            this.keycode[event.keyCode] = false;
        })

        this.loadObjectCar = new Object3D('./assets/images/car.glb');
        this.loadObjectGun = new Object3D('./assets/images/76mm_oto-melara_gun.glb');
        this.loadObjectCar2 = new Object3D('./assets/images/car.glb');
        this.loadObjectHac = new Object3D('./assets/images/abc.glb', true);


        this.initMap();
        this.initSphere();
        this.loaded = false;


        document.addEventListener('click', this.onClick.bind(this));

    }

    move() {
        if (this.keycode[37])
            this.car.rotation.y += 0.03;
        if (this.keycode[39])
            this.car.rotation.y -= 0.03;
        if (this.keycode[38]) {
            // update x, z từ this.car.rotation.y
            this.car.position.x += 0.3 * Math.sin(this.car.rotation.y);
            this.car.position.z += 0.3 * Math.cos(this.car.rotation.y);
        }
        if (this.keycode[40]) {
            // update x, z từ this.car.rotation.y
            this.car.position.x -= 0.3 * Math.sin(this.car.rotation.y);
            this.car.position.z -= 0.3 * Math.cos(this.car.rotation.y);
        }
        // space
        if (this.keycode[32])
            this.car.position.y += 1;
        // shift
        if (this.keycode[16]) {
            this.car.position.y -= 1;
            if (this.car.position.y < 0)
                this.car.position.y = 0;
        }
    }

    loadData() {
        if (this.loaded)
            return true;
        if (this.car && this.car2 && this.hac && this.gun) {
            this.scene.add(this.car);
            this.scene.add(this.gun);
            this.scene.add(this.car2);
            this.scene.add(this.hac);
            this.car.rotation.y = Math.PI;
            this.hac.scale.set(0.05, 0.05, 0.05);
            this.hac.position.y = 6;

            this.car2.scale.set(2, 2, 2);
            this.car2.position.x = 10;

            this.gun.position.set(10, 10, 10);

            this.loaded = true;
            return true;
        } else {
            this.car = this.loadObjectCar.object;
            this.gun = this.loadObjectGun.object;
            this.car2 = this.loadObjectCar2.object;
            this.hac = this.loadObjectHac.object;
        }
        return false;
    }


    update() {
        if (!this.loadData())
            return;
        this.move();
        this.cubeMesh.rotation.x += 0.01;
        this.cubeMesh.rotation.y += 0.01;
        const distance = 15;
        const angle = 0;


        const x = this.car.position.x + distance * Math.sin(this.car.rotation.y + Math.PI);
        const y = this.car.position.y + distance;
        const z = this.car.position.z + distance * Math.cos(this.car.rotation.y + Math.PI);
        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.car.position);

        for (let i = 0; i < this.cube.length; i++) {
            this.cube[i].rotation.x += 0.01;
            this.cube[i].rotation.y += 0.01;
            this.cube[i].rotation.z += 0.01;
            if (this.checkCollide(this.cube[i], this.car)) {
                this.cube[i].material.color.set(0xff0000);
                //Random color
                this.cube[i].material.color.set(Math.random() * 0xffffff, Math.random() * 0xffffff, Math.random() * 0xffffff);
                this.cube[i].position.x += 0.3 * Math.sin(this.car.rotation.y);
                this.cube[i].position.z += 0.3 * Math.cos(this.car.rotation.y);

            }

            if (this.checkCollide(this.car, this.car2)) {
                this.car2.position.x += 0.3 * Math.sin(this.car.rotation.y);
                this.car2.position.z += 0.3 * Math.cos(this.car.rotation.y);
            }
        }
        if (this.loadObjectHac.mixer && this.loadObjectHac.action) {
            this.loadObjectHac.mixer.update(0.03);
            this.loadObjectHac.action.play();
        } else
            console.log('action is null');


        this.hac.rotation.y = Date.now() * 0.0003 + Math.PI / 2;
        this.hac.position.x = Math.sin(Date.now() * 0.0003) * 30;
        this.hac.position.z = Math.cos(Date.now() * 0.0003) * 30;

        this.gun.position.set(this.car.position.x, this.car.position.y + 2.5, this.car.position.z);
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
        this.map = new GridMap().map;
        this.scene.add(this.map);
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
        if (!object1 || !object2)
            return false;
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