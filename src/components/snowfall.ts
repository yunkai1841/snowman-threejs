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

class Snowfall extends Points {
  constructor(position: Float32Array, snowpng: string, count: number, loadingManager?: LoadingManager) {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
    const snowflakeColor = [
      "white",
      "lightcyan",
      "paleturquoise",
      "lightskyblue",
      "lightblue",
    ];
    const textureLoader = new TextureLoader(loadingManager);
    const material = new PointsMaterial({
      size: 3,
      map: textureLoader.load(snowpng),
      blending: AdditiveBlending,
      depthTest: false,
      opacity: 0.7,
      color: snowflakeColor[count],
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
        positions[i + 1] = Math.random() * 600 - 300;
        positions[i + 2] = Math.random() * 600 - 300;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
  }
}

export default class Snowfalls extends Group {
  private numSnowfalls: number = 2000 / snowpng.length;
  private particles: Snowfall[] = [];
  private snowflakeNum: number = snowpng.length;

  constructor(loadingManager?: LoadingManager) {
    super();
    const positions: number[][] = new Array();
    for (let i = 0; i < this.snowflakeNum; i++) {
      positions[i] = new Array();
    }
    for (let j = 0; j < this.snowflakeNum; j++) {
      for (let i = 0; i < this.numSnowfalls; i++) {
        positions[j].push(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
      }
      var snowflake = new Snowfall(
        new Float32Array(positions[j]),
        snowpng[j],
        j,
        loadingManager
      );
      this.add(snowflake);
      this.particles.push(snowflake);
    }
  }

  update() {
    for (let i = 0; i < this.snowflakeNum; i++) {
      this.particles[i].update(i * 0.2);
    }
  }
}
