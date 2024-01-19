import {
    Mesh,
    ConeGeometry,
    Group,
    CylinderGeometry,
    TextureLoader,
    MeshStandardMaterial,
    PlaneGeometry,
    BoxGeometry,
  } from "three";

//wall: https://3dtextures.me/2021/03/26/stylized-bricks-001/
import wallbase from '../assets/images/Stylized_Bricks_001_SD/Stylized_Bricks_001_basecolor.jpg';
import wallnormal from "../assets/images/Stylized_Bricks_001_SD/Stylized_Bricks_001_normal.jpg";
import wallheight from "../assets/images/Stylized_Bricks_001_SD/Stylized_Bricks_001_height.png";
import wallrough from "../assets/images/Stylized_Bricks_001_SD/Stylized_Bricks_001_roughness.jpg";
import wallam from "../assets/images/Stylized_Bricks_001_SD/Stylized_Bricks_001_ambientOcclusion.jpg";
//poll: https://3dtextures.me/2022/02/25/bark-pine-003/
import pollbase from '../assets/images/Bark_Pine_003_SD/Bark_Pine_003_BaseColor.jpg';
import pollnormal from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_Normal.jpg";
import pollheight from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_Height.png";
import pollrough from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_Roughness.jpg";
import pollam from "../assets/images/Bark_Pine_003_SD/Bark_Pine_003_AmbientOcclusion.jpg";
//roof: https://3dtextures.me/2019/11/06/roof-tiles-terracotta-003/
import roofbase from '../assets/images/Roof_Tiles_Terracotta_003_SD/Roof_Tiles_Terracotta_003_basecolor.jpg';
import roofnormal from "../assets/images/Roof_Tiles_Terracotta_003_SD/Roof_Tiles_Terracotta_003_normal.jpg";
import roofheight from "../assets/images/Roof_Tiles_Terracotta_003_SD/Roof_Tiles_Terracotta_003_height.png";
import roofrough from "../assets/images/Roof_Tiles_Terracotta_003_SD/Roof_Tiles_Terracotta_003_roughness.jpg";
import roofam from "../assets/images/Roof_Tiles_Terracotta_003_SD/Roof_Tiles_Terracotta_003_ambientOcclusion.jpg";
//chimney: https://3dtextures.me/2022/04/03/wall-stone-023/
import chbase from '../assets/images/Wall_Stone_023_SD/Wall_Stone_023_BaseColor.jpg';
import chnormal from "../assets/images/Wall_Stone_023_SD/Wall_Stone_023_Normal.jpg";
import chheight from "../assets/images/Wall_Stone_023_SD/Wall_Stone_023_Height.png";
import chrough from "../assets/images/Wall_Stone_023_SD/Wall_Stone_023_Roughness.jpg";
import cham from "../assets/images/Wall_Stone_023_SD/Wall_Stone_023_AmbientOcclusion.jpg";
//door: https://3dtextures.me/2020/05/29/wood-gate-fortified-003/
import doorbase from '../assets/images/Wood_Gate_Fortified_003_SD/Wood_Gate_Fortified_003_basecolor.jpg';
import doornormal from "../assets/images/Wood_Gate_Fortified_003_SD/Wood_Gate_Fortified_003_normal.jpg";
import doorheight from "../assets/images/Wood_Gate_Fortified_003_SD/Wood_Gate_Fortified_003_height.png";
import doorrough from "../assets/images/Wood_Gate_Fortified_003_SD/Wood_Gate_Fortified_003_roughness.jpg";
import dooram from "../assets/images/Wood_Gate_Fortified_003_SD/Wood_Gate_Fortified_003_ambientOcclusion.jpg";

  //Roof
  class Roof extends Mesh {
      constructor(){ 
        const geometry = new ConeGeometry(170, 200, 100);

        const textureLoader = new TextureLoader();
        const baseTexture = textureLoader.load(roofbase);
        const normalMapTexture = textureLoader.load(roofnormal);
        const heghitMapTexture = textureLoader.load(roofheight);
        const rouphMapTexture = textureLoader.load(roofrough);
        const ambientMapTexture = textureLoader.load(roofam);
        var material = new MeshStandardMaterial( {
            map: baseTexture,
            normalMap: normalMapTexture,
            displacementMap: heghitMapTexture,
            displacementScale: 5,
            roughnessMap: rouphMapTexture,
            roughness: 0.5,
            aoMap: ambientMapTexture,
        } );
          super(geometry, material);
        }
    }
    //Wall
    class Wall extends Mesh {
        constructor(){
        const geometry = new BoxGeometry(200,200,200,512,512,512);
        const textureLoader = new TextureLoader();
        const baseTexture = textureLoader.load(wallbase);
        const normalMapTexture = textureLoader.load(wallnormal);
        const heghitMapTexture = textureLoader.load(wallheight);
        const rouphMapTexture = textureLoader.load(wallrough);
        const ambientMapTexture = textureLoader.load(wallam);
        const material = new MeshStandardMaterial({
            map: baseTexture,
            normalMap: normalMapTexture,
            displacementMap: heghitMapTexture,
            displacementScale: 10,
            roughnessMap: rouphMapTexture,
            roughness: 0.5,
            aoMap: ambientMapTexture,
        } );
        super(geometry, material);
    }
}

//poll
class Poll extends Mesh {
    constructor(){
        const geometry = new CylinderGeometry(10, 10, 180, 50, 512);
        const textureLoader = new TextureLoader();
        const baseTexture = textureLoader.load(pollbase);
        const normalMapTexture = textureLoader.load(pollnormal);
        const heghitMapTexture = textureLoader.load(pollheight);
        const rouphMapTexture = textureLoader.load(pollrough);
        const ambientMapTexture = textureLoader.load(pollam);
        const material = new MeshStandardMaterial({
            map: baseTexture,
            normalMap: normalMapTexture,
            displacementMap: heghitMapTexture,
            displacementScale: 10,
            roughnessMap: rouphMapTexture,
            roughness: 0.5,
            aoMap: ambientMapTexture,
        } );
        super(geometry, material);
    }
}

//Roof
class Door extends Mesh {
    constructor(){
        const geometry = new PlaneGeometry(60, 120, 512, 512);
        const textureLoader = new TextureLoader();
        const baseTexture = textureLoader.load(doorbase);
        const normalMapTexture = textureLoader.load(doornormal);
        const heghitMapTexture = textureLoader.load(doorheight);
        const rouphMapTexture = textureLoader.load(doorrough);
        const ambientMapTexture = textureLoader.load(dooram);
        const material = new MeshStandardMaterial({
            map: baseTexture,
            normalMap: normalMapTexture,
            displacementMap: heghitMapTexture,
            displacementScale: 10,
            roughnessMap: rouphMapTexture,
            roughness: 0.5,
            aoMap: ambientMapTexture,
        });
        super(geometry, material);
    }
}

//chimney
class Chimney extends Mesh {
    constructor() {
        const geometry = new CylinderGeometry(20, 20, 200, 50, 512);
        const textureLoader = new TextureLoader();
        const baseTexture = textureLoader.load(chbase);
        const normalMapTexture = textureLoader.load(chnormal);
        const heghitMapTexture = textureLoader.load(chheight);
        const rouphMapTexture = textureLoader.load(chrough);
        const ambientMapTexture = textureLoader.load(cham);
        const material = new MeshStandardMaterial({
            map: baseTexture,
            normalMap: normalMapTexture,
            displacementMap: heghitMapTexture,
            displacementScale: 1,
            roughnessMap: rouphMapTexture,
            roughness: 0.5,
            aoMap: ambientMapTexture,
        });
        super(geometry, material);
    }
} 
export default class House extends Group {
    private x:number = 100;
    private y:number = 0;
    private z:number = -250;
    constructor() {
        super();
        //roof
        const roof = new Roof();
        roof.position.set(this.x, this.y + 180, this.z);
        //wall
        const wall = new Wall();
        wall.position.set(this.x,this.y,this.z);
        //poll
        const poll1 = new Poll();
        poll1.position.set(this.x + 100, this.y, this.z + 100);
        const poll2 = new Poll();
        poll2.position.set(this.x - 100, this.y, this.z - 100);
        const poll3 = new Poll();
        poll3.position.set(this.x + 100, this.y, this.z - 100);
        const poll4 = new Poll();
        poll4.position.set(this.x - 100, this.y, this.z + 100);
        //door
        const door = new Door();
        door.position.set(this.x + 30, this.y-30, this.z + 105);
        //chimney
        const chimney = new Chimney();
        chimney.position.set(this.x + 80, this.y + 100, this.z + 80);

        this.add(
            roof,
            wall,
            poll1,
            poll2,
            poll3,
            poll4,
            door,
            chimney,
        );
        }
    }
