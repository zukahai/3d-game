class Object3D {
    constructor(url, action) {
        this.url = url;
        this.action = action;
        this.loader = new THREE.GLTFLoader();
        this.loop();
    }

    loop() {
        console.log("Hello");
        this.loadObject(this.url);
        if (!this.object)
            requestAnimationFrame(this.loop.bind(this));

    }

    loadObject(url) {
        this.loader.load(
            url,
            (gltf) => {
                // Lấy đối tượng cần hiển thị từ trong file glb
                const object = gltf.scene;
                this.object = object;

                if (this.action) {
                    const mixer = new THREE.AnimationMixer(object);

                    // lấy animation clip
                    const clip = gltf.animations[0];

                    // tạo action để chơi animation
                    const action = mixer.clipAction(clip);

                    // chạy action
                    action.play();


                    this.mixer = mixer;
                    this.action = action;
                }
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );
    }
}