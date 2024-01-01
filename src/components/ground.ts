import {
  CircleGeometry,
  MathUtils,
  Mesh,
  MeshLambertMaterial,
} from "three";

export default class Ground extends Mesh {
  constructor() {
    super(new CircleGeometry(2000, 50), new MeshLambertMaterial());
    this.rotation.x = MathUtils.degToRad(-90);
    this.position.y += -90;
    this.receiveShadow = true;
  }
}
