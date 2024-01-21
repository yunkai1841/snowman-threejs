import {
  BufferGeometry,
  TextureLoader,
  Group,
  PointsMaterial,
  AdditiveBlending,
  Float32BufferAttribute,
  Points,
  LoadingManager,
} from "three";

// include star pngs
import png1 from "../assets/images/snowflake1.png";
import png2 from "../assets/images/snowflake2.png";
import png3 from "../assets/images/snowflake3.png";
import png4 from "../assets/images/snowflake4.png";
import png5 from "../assets/images/snowflake5.png";

const snowpng = [png1, png2, png3, png4, png5];

class Snowflakes extends Points {
  /**
   * Snowflakes
   */
  private fallSpeed: number;
  private yLowerBound: number;
  constructor(
    position: Float32Array,
    snowflakeMaterial: PointsMaterial,
    fallSpeed: number = 0.2,
    yLowerBound: number = -90,
  ) {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(position, 3));

    super(geometry, snowflakeMaterial);

    this.fallSpeed = fallSpeed;
    this.yLowerBound = yLowerBound;
  }

  update(deltaTime: number) {
    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= this.fallSpeed * deltaTime;

      // Reset snowflake position if it falls below yLowerBound
      if (positions[i + 1] < this.yLowerBound) {
        positions[i] = Math.random() * 600 - 300;
        positions[i + 1] = Math.random() * 600 - 300;
        positions[i + 2] = Math.random() * 600 - 300;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
  }
}

export default class Snowfalls extends Group {
  private particles: Snowflakes[] = [];
  private textureCount: number = snowpng.length;

  constructor(count: number, loadingManager?: LoadingManager) {
    super();
    // Load snowflake textures
    const textureLoader = new TextureLoader(loadingManager);
    const snowflakeMaterials: PointsMaterial[] = [];
    const snowflakeColor = [
      "white",
      "lightcyan",
      "paleturquoise",
      "lightskyblue",
      "lightblue",
    ];
    snowpng.forEach((png, i) => {
      snowflakeMaterials.push(
        new PointsMaterial({
          size: 3,
          map: textureLoader.load(png),
          blending: AdditiveBlending,
          depthTest: false,
          opacity: 0.7,
          color: snowflakeColor[i],
        })
      );
    });

    for (let i = 0; i < this.textureCount; i++) {
      const positions: number[] = [];
      for (let j = 0; j < count / this.textureCount; j++) {
        positions.push(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
      }
      var snowflake = new Snowflakes(
        new Float32Array(positions),
        snowflakeMaterials[i],
        1.0 * i,
      );
      this.add(snowflake);
      this.particles.push(snowflake);
    }
  }

  update(deltaTime: number) {
    for (let i = 0; i < this.textureCount; i++) {
      this.particles[i].update(deltaTime);
    }
  }
}
