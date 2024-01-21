import {
  LoadingManager,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

//ground
//reference: https://meocloud.pt/link/a4064a66-836d-4b63-bb09-67594f886cca/Snow_002_SD/
import groundbase from "../assets/images/Snow_002_SD/Snow_002_COLOR.jpg";
import groundnormal from "../assets/images/Snow_002_SD/Snow_002_NORM.jpg";
import groundheight from "../assets/images/Snow_002_SD/Snow_002_DISP.png";
import groundrough from "../assets/images/Snow_002_SD/Snow_002_ROUGH.jpg";
import groundam from "../assets/images/Snow_002_SD/Snow_002_OCC.jpg";

export default class Ground extends Mesh {
  constructor(loadingManager?: LoadingManager) {
    const geometry = new PlaneGeometry(2000, 2000, 512, 512);
    const textureLoader = new TextureLoader(loadingManager);
    const baseTexture = textureLoader.load(groundbase);
    const normalMapTexture = textureLoader.load(groundnormal);
    const heghitMapTexture = textureLoader.load(groundheight);
    const rouphMapTexture = textureLoader.load(groundrough);
    const ambientMapTexture = textureLoader.load(groundam);
    const material = new MeshStandardMaterial({
      map: baseTexture,
      normalMap: normalMapTexture,
      displacementMap: heghitMapTexture,
      displacementScale: 5,
      roughnessMap: rouphMapTexture,
      roughness: 0.5,
      aoMap: ambientMapTexture,
    });
    super(geometry, material);
    this.rotation.x = MathUtils.degToRad(-90);
    this.position.y += -90;
    this.receiveShadow = true;
  }
}
