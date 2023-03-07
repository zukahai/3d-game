class Car {
    constructor() {
        this.loadObjectCar = new Object3D('./assets/images/abc2.glb');
    }

    getCar() {
        if (this.loadObjectCar.object) {
            this.car2 = this.loadObjectCar.object;
            this.scene.add(this.car2);
            this.car2.position.z -= 10;
        }
    }
}