class Object3D {
    constructor(url, action) {
        this.url = url;
        this.action = action;
        this.loader = new THREE.GLTFLoader();
        this.loop();
    }

    loop() {
        this.loadObject(this.url);
        if (!this.object)
            requestAnimationFrame(this.loop.bind(this));

    }

    loadObject(url) {
        this.loader.load(url, (gltf) => {
            this.object = gltf.scene;
            const animations = gltf.animations;
            const mixer = new THREE.AnimationMixer(gltf.scene);

            // Tạo một instance của AnimationAction cho mỗi animation
            const animationActions = animations.map((animation) => {
                return mixer.clipAction(animation);
            });

            // Chạy tất cả các animation
            // animationActions.forEach((animationAction) => {
            //     animationAction.play();
            // });
            if (animationActions[0])
                animationActions[0].play();

            // Đăng ký hàm update cho AnimationMixer
            const clock = new THREE.Clock();
            const update = () => {
                const delta = clock.getDelta();
                mixer.update(delta);
                requestAnimationFrame(update);
            };
            update();
        });
    }
}