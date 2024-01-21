import {
  Mesh,
  SphereGeometry,
  ConeGeometry,
  Group,
  CylinderGeometry,
  MeshLambertMaterial,
  MeshStandardMaterial,
  TextureLoader,
  LoadingManager,
} from "three";

//trunk: https://3dtextures.me/2022/02/25/bark-pine-003/
import trunkbase from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_BaseColor.jpg";
import trunknormal from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_Normal.jpg";
import trunkheight from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_Height.png";
import trunkrough from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_Roughness.jpg";
import trunkam from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_AmbientOcclusion.jpg";

//trunk
class Trunk extends Mesh {
  constructor(loadingManager?: LoadingManager) {
    const trunkGeometry = new CylinderGeometry(5, 20, 500, 50);
    const textureLoader = new TextureLoader(loadingManager);
    const baseTexture = textureLoader.load(trunkbase);
    const normalMapTexture = textureLoader.load(trunknormal);
    const heghitMapTexture = textureLoader.load(trunkheight);
    const rouphMapTexture = textureLoader.load(trunkrough);
    const ambientMapTexture = textureLoader.load(trunkam);
    const trunkMaterial = new MeshStandardMaterial({
      map: baseTexture,
      normalMap: normalMapTexture,
      displacementMap: heghitMapTexture,
      displacementScale: 10,
      roughnessMap: rouphMapTexture,
      roughness: 0.5,
      aoMap: ambientMapTexture,
    });
    super(trunkGeometry, trunkMaterial);
  }
}

//leaf
class Leaf extends Mesh {
  constructor(level: number) {
    if (level == 1) {
      const leafGeometry = new ConeGeometry(80, 350, 100);
      const leafMaterial = new MeshLambertMaterial({ color: 0x2f4f4f });
      super(leafGeometry, leafMaterial);
    } else if (level == 2) {
      const leafGeometry = new ConeGeometry(80, 300, 100);
      const leafMaterial = new MeshLambertMaterial({ color: 0x2f4f4f });
      super(leafGeometry, leafMaterial);
    } else {
      const leafGeometry = new ConeGeometry(80, 250, 100);
      const leafMaterial = new MeshLambertMaterial({ color: 0x2f4f4f });
      super(leafGeometry, leafMaterial);
    }
  }
}

//snow
class Snow extends Mesh {
  constructor() {
    const leafGeometry = new SphereGeometry(20, 20, 100);
    const leafMaterial = new MeshLambertMaterial({ color: 0xf0f8ff });
    super(leafGeometry, leafMaterial);
  }
}

export default class Trees extends Group {
  private treeNum: number = 100;
  private noTreeField: number = 0.25;

  constructor(loadingManager?: LoadingManager) {
    super();
    const positions: number[][] = new Array();
    for (let i = 0; i < this.treeNum; i++) {
      positions[i] = new Array();
    }
    var count: number = 0;
    for (let i = 0; i < this.treeNum; i++) {
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      if (x ** 2 + y ** 2 >= this.noTreeField) {
        positions[i].push(x * 600, 100, y * 600);
        count += 1;
      }
    }

    for (let i = 0; i < count; i++) {
      var x: number = positions[i][0];
      var y: number = positions[i][1];
      var z: number = positions[i][2];

      //trunk
      var trunk = new Trunk(loadingManager);
      trunk.position.set(x, y, z);

      //leaf
      var leaf1 = new Leaf(1);
      leaf1.position.set(x, y + 100, z);
      var leaf2 = new Leaf(2);
      leaf2.position.set(x, y + 150, z);
      var leaf3 = new Leaf(3);
      leaf3.position.set(x, y + 200, z);

      //snow
      var snow1 = new Snow();
      snow1.position.set(x + 20, y + 200, z + 20);
      var snow2 = new Snow();
      snow2.position.set(x - 35, y + 150, z + 35);
      var snow3 = new Snow();
      snow3.position.set(x + 40, y + 50, z - 40);

      this.add(trunk, leaf1, leaf2, leaf3, snow1, snow2, snow3);
    }
  }
}
