import {
    BufferGeometry,
    TextureLoader,
    Group,
    PointsMaterial,
    AdditiveBlending,
    Float32BufferAttribute,
    Points,
  } from "three";

  const starpng: string[] = new Array();
  import starpng1 from "./texture/snowflake1.png";
  import starpng2 from "./texture/snowflake2.png";
  import starpng3 from "./texture/snowflake3.png";
  import starpng4 from "./texture/snowflake4.png";
  import starpng5 from "./texture/snowflake5.png";

//snowflake kinds
  starpng.push(
    starpng1,
    starpng2,
    starpng3,
    starpng4,
    starpng5,
  );
  
  class Snowfall extends Points {
    constructor(position: Float32Array, starpng: string, count:number) {
      const geometry = new BufferGeometry();
      geometry.setAttribute("position", new Float32BufferAttribute(position, 3));
      const snowflakeColor = ["white", "lightcyan", "paleturquoise", "lightskyblue", "lightblue"];
      const textureLoader = new TextureLoader();
      const material = new PointsMaterial({
        size: 3,
        map: textureLoader.load(starpng),
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
          positions[i + 1] =  Math.random() * 600 - 300;
          positions[i + 2] = Math.random() * 600 - 300;
        }
      }
  
      this.geometry.attributes.position.needsUpdate = true;
    }
  }
  
  export default class Snowfalls extends Group {
    private numSnowfalls: number = 2000 / starpng.length;
    private particles: Snowfall[] = [];
    private snowflakeNum: number = starpng.length;
  
    constructor() {
      super();
      const positions: number[][] = new Array(); 
      for (let i = 0; i < this.snowflakeNum; i++) {
        positions[i] = new Array();
      }
      for (let j = 0; j < this.snowflakeNum; j++) {
        for (let i = 0; i < this.numSnowfalls; i++) {
            positions[j].push(
              Math.random() * 600 - 300 + j*50,
              Math.random() * 600 - 300 + j*50,
              Math.random() * 600 - 300 + j*50
            );
          }
          var snowflake = new Snowfall(new Float32Array(positions[j]), starpng[j], j)
          this.add(snowflake)    
          this.particles.push(snowflake)
      }
    }
  
    update() {
      for (let i = 0; i < this.snowflakeNum; i++) {
        this.particles[i].update(i*0.2);
      }
    }
  }