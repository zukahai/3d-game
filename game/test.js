class GLBLoader {
    constructor(url) {
        this.url = url;
        this.scene = null;
        this.model = null;
    }

    load() {
        const loader = new THREE.GLTFLoader();
        loader.load(this.url, (gltf) => {
            this.model = gltf.scene;
            this.scene.add(this.model);
        });
    }

    createScene() {
        this.scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        this.scene.add(camera);
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.load();
        const animate = () => {
            requestAnimationFrame(animate);
            this.model.rotation.y += 0.01;
            renderer.render(this.scene, camera);
        };
        animate();
    }
}

const glbLoader = new GLBLoader('bus.glb');
glbLoader.createScene();