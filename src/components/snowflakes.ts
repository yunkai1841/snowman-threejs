import {
  CircleGeometry,
  Clock,
  Group,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";

class Snowflake extends Mesh {
  constructor(position: Vector3) {
    const geometry = new CircleGeometry(1, 6);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    super(geometry, material);
    this.position.copy(position);
  }

  update(clock: Clock, fallSpeed: number = -0.01, yLowerBound: number = -90) {
    // reset snowflake position if it falls below yLowerBound
    const elapsed = clock.getElapsedTime();
    const dy = elapsed * fallSpeed;
    this.position.y += dy;
    if (this.position.y < yLowerBound) {
      this.position.y = 150;
    }
  }
}

export default class Snowflakes extends Group {
  constructor(count: number) {
    super();
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 600 - 300;
      const y = Math.random() * 600 - 300;
      const z = Math.random() * 600 - 300;
      const snowflake = new Snowflake(new Vector3(x, y, z));
      this.add(snowflake);
    }
  }

  update(clock: Clock) {
    this.children.forEach((snowflake) => {
      (snowflake as Snowflake).update(clock);
    });
  }
}
