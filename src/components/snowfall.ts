import {
  BufferGeometry,
  TextureLoader,
  Group,
  PointsMaterial,
  AdditiveBlending,
  Float32BufferAttribute,
  Points,
} from "three";
import starpng from "./Coldbarnstar.png";

class Snowfall extends Points {
  constructor(position: Float32Array) {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(position, 3));

    const textureLoader = new TextureLoader();
    const material = new PointsMaterial({
      size: 3,
      map: textureLoader.load(starpng),
      blending: AdditiveBlending,
      depthTest: false,
      opacity: 0.7,
    });

    super(geometry, material);
  }

  update(fallSpeed: number = 0.2, yLowerBound: number = -90) {
    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= fallSpeed;

      // Reset snowflake position if it falls below yLowerBound
      if (positions[i + 1] < yLowerBound) {
        positions[i] = Math.random() * 600 - 300;
        positions[i + 1] =  Math.random() * 600 - 300;
        positions[i + 2] = Math.random() * 600 - 300;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
  }
}

export default class Snowfalls extends Group {
  private particles: Snowfall;
  private numSnowfalls: number = 2000;

  constructor() {
    super();

    const positions: number[] = [];
    for (let i = 0; i < this.numSnowfalls; i++) {
      positions.push(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
    }

    const snowflake = new Snowfall(new Float32Array(positions));
    this.add(snowflake);
    this.particles = snowflake;
  }

  update() {
    this.particles.update();
  }
}
