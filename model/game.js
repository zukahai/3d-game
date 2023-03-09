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
            console.log(event.keyCode);
            this.keycode[event.keyCode] = true;
            switch (event.keyCode) {
                case 37:
                    this.keycode[39] = this.keycode[68] = false;
                    break;
                case 38:
                    this.keycode[40] = this.keycode[83] = false;
                    break;
                case 39:
                    this.keycode[37] = this.keycode[65] = false;
                    break;
                case 40:
                    this.keycode[38] = this.keycode[87] = false;
                    break;
                case 65:
                    this.keycode[68] = this.keycode[39] = false;
                    break;
                case 87:
                    this.keycode[37] = this.keycode[65] = false;
                    break;
                case 83:
                    this.keycode[38] = this.keycode[87] = false;
                    break;
                case 68:
                    this.keycode[37] = this.keycode[65] = false;
                    break;


            }
        });

        document.addEventListener("keyup", (event) => {
            // console.log(event.keyCode);
            this.keycode[event.keyCode] = false;
        })

        document.addEventListener("mousemove", (event) => {
            let x = event.clientX - window.innerWidth / 2;
            let y = 3 * window.innerHeight / 4 - event.clientY;
            let angle = Math.atan2(y, x) * 180 / Math.PI;
            this.angleGun = Math.PI / 2 - (angle / 180 * Math.PI);
        });

        document.addEventListener("mousedown", (event) => {
            let x = event.clientX;
            let y = event.clientY;

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
            let position = (this.checkClick(raycaster, new GridMap().ortherMap()));

            let X = position.x - this.car.position.x;
            let Z = position.z - this.car.position.z;
            let angle = Math.atan2(Z, X);
            this.bulletManager.addBullet({ x: this.car.position.x, y: this.car.position.y, z: this.car.position.z, rotate: Math.PI / 2 - angle });
        })

        this.loadObjectCar = new Object3D('./assets/images/car.glb');
        this.loadObjectGun = new Object3D('./assets/images/small_glytchbug.glb');
        this.loadObjectCar2 = new Object3D('./assets/images/car.glb');
        this.loadObjectHac = new Object3D('./assets/images/abc.glb', true);


        this.loadObjectMonters = [];
        this.monters = [];
        for (let i = 0; i < 2; i++) {
            this.loadObjectMonters[i] = new Object3D('./assets/images/tori_fly.glb', true);
        }


        this.initMap();
        this.initSphere();
        this.loaded = false;
        this.bulletManager = new BulletManager(this.scene);


        document.addEventListener('click', this.onClick.bind(this));

    }

    move() {
        if (this.keycode[37] || this.keycode[65])
            this.car.rotation.y += 0.02;
        if (this.keycode[39] || this.keycode[68])
            this.car.rotation.y -= 0.02;
        if (this.keycode[38] || this.keycode[87]) {
            // update x, z từ this.car.rotation.y
            this.car.position.x += 0.3 * Math.sin(this.car.rotation.y);
            this.car.position.z += 0.3 * Math.cos(this.car.rotation.y);
        }
        if (this.keycode[40] || this.keycode[83]) {
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

    checkLoadMonter() {
        for (let i = 0; i < this.monters.length; i++) {
            if (!this.monters[i])
                return false;
        }
        return true;
    }

    setMonters() {
        for (let i = 0; i < this.loadObjectMonters.length; i++) {
            this.monters[i] = this.loadObjectMonters[i].object;
        }
    }

    loadData() {
        if (this.loaded)
            return true;
        if (this.car && this.car2 && this.hac && this.gun && this.checkLoadMonter()) {
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
            // this.gun.scale.set(0.01, 0.01, 0.01);

            for (let i = 0; i < this.monters.length; i++) {
                this.scene.add(this.monters[i]);
                this.monters[i].position.set((Math.random() - Math.random()) * 50, Math.random() * 3.5 + 0.25, (Math.random() - Math.random()) * 30);
                this.monters[i].scale.set(0.03, 0.03, 0.03);
                this.monters[i].rotation.y = Math.random() * Math.PI;
            }

            this.loaded = true;
            return true;
        } else {
            this.car = this.loadObjectCar.object;
            this.gun = this.loadObjectGun.object;
            this.car2 = this.loadObjectCar2.object;
            this.hac = this.loadObjectHac.object;
            this.setMonters();
        }
        return false;
    }


    update() {
        if (!this.loadData())
            return;
        this.move();
        this.cubeMesh.rotation.x += 0.01;
        this.cubeMesh.rotation.y += 0.01;
        const distance = 12;

        const x = this.car.position.x + distance * Math.sin(this.car.rotation.y + Math.PI);
        const y = this.car.position.y + distance;
        const z = this.car.position.z + distance * Math.cos(this.car.rotation.y + Math.PI);

        const x2 = this.car.position.x + distance * Math.sin(this.car.rotation.y);
        const y2 = this.car.position.y + distance / 10;
        const z2 = this.car.position.z + distance * Math.cos(this.car.rotation.y);

        let position = new THREE.Vector3(x2, y2, z2);
        this.camera.position.set(x, y, z);

        this.camera.lookAt(position);
        // this.camera.rotation.x = THREE.MathUtils.degToRad(30);
        // this.camera.rotation.y = this.car.rotation.y;


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

        for (let i = 0; i < this.monters.length; i++) {
            this.monters[i].position.x += 0.1 * Math.sin(this.monters[i].rotation.y);
            this.monters[i].position.z += 0.1 * Math.cos(this.monters[i].rotation.y);

            if (Math.sqrt(Math.pow(this.monters[i].position.x, 2) + Math.pow(this.monters[i].position.z, 2)) > 100) {
                this.monters[i].rotation.y += Math.PI * Math.random();
                let x = this.monters[i].position.x;
                let z = this.monters[i].position.z;
                do {
                    this.monters[i].rotation.y += Math.PI * Math.random();
                    x = this.monters[i].position.x + 0.1 * Math.sin(this.monters[i].rotation.y);
                    z = this.monters[i].position.z + 0.1 * Math.cos(this.monters[i].rotation.y);
                } while (Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2)) > 100);
            }
        }

        this.bulletManager.setLastBullet();

        this.hac.rotation.y = Date.now() * 0.0003 + Math.PI / 2;
        this.hac.position.x = Math.sin(Date.now() * 0.0003) * 30;
        this.hac.position.z = Math.cos(Date.now() * 0.0003) * 30;

        this.gun.position.set(this.car.position.x, this.car.position.y + 3.5, this.car.position.z);
        this.gun.rotation.y = this.car.rotation.y - this.angleGun;


        for (let i = 0; i < this.bulletManager.bullets.length; i++) {
            for (let j = 0; j < this.monters.length; j++) {

            }
        }
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
            return intersects[0].point;
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