class Car {
    constructor() {
        console.log("car");
        this.group = new THREE.Group();

        // body
        const bodyGeometry = new THREE.BoxGeometry(4, 2, 2.5);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.group.add(bodyMesh);

        // hood
        const hoodGeometry = new THREE.BoxGeometry(1, 1, 1);
        const hoodMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const hoodMesh = new THREE.Mesh(hoodGeometry, hoodMaterial);
        hoodMesh.position.set(1.5, 0.5, 0.75);
        this.group.add(hoodMesh);

        // roof
        const roofGeometry = new THREE.BoxGeometry(2, 1, 1.5);
        const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
        const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
        roofMesh.position.set(0, 1.5, 0);
        this.group.add(roofMesh);

        // wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const wheelMesh1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelMesh1.position.set(-1, -0.5, 1);
        this.group.add(wheelMesh1);

        const wheelMesh2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelMesh2.position.set(-1, -0.5, -1);
        this.group.add(wheelMesh2);

        const wheelMesh3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelMesh3.position.set(1, -0.5, 1);
        this.group.add(wheelMesh3);

        const wheelMesh4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelMesh4.position.set(1, -0.5, -1);
        this.group.add(wheelMesh4);
    }
}