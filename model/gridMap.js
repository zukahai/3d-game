class GridMap {
    constructor() {
        const gridSize = 200;
        const gridStep = 1;

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
        const material = new THREE.LineBasicMaterial({ color: 0x576278 });

        // tạo LineSegments để vẽ lưới
        this.map = new THREE.LineSegments(gridGeometry, material);
    }

    ortherMap() {

        const gridSize = 20000;
        const gridStep = 1;

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
        const material = new THREE.LineBasicMaterial({ color: 0x576278 });

        // tạo LineSegments để vẽ lưới
        return new THREE.LineSegments(gridGeometry, material);
    }
}