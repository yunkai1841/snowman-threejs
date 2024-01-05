import {
  Mesh,
  CylinderGeometry,
  //MeshLambertMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  Group,
  MathUtils,
  BoxGeometry,
  MeshToonMaterial,
} from "three";

export default class SnowMan extends Group {
  constructor() {
    super();
    // mesh
    //直方体のジオメトリー(幅, 高さ, 奥行き)
    const buttonGeometry = new BoxGeometry(5, 5, 5);

    //奥行きと影があり、光沢感のないマテリアル({ color: 0xから始まる16進数カラー})
    const hatMaterial = new MeshStandardMaterial({ color: 0x333333 });
    const headMaterial = new MeshStandardMaterial({ color: 0xffffff });
    const buttonMaterial = new MeshStandardMaterial({ color: 0x228b22 });

    //3Dを2Dの手書き風にできるマテリアル({ color: 0xから始まる16進数カラー})
    const eyeMaterial = new MeshToonMaterial({ color: 0x000000 });

    const hat = new Mesh(
      //円柱のジオメトリー(上面半径,下面半径,高さ,円周分割数)
      new CylinderGeometry(25, 25, 40, 30),
      hatMaterial
    );
    hat.position.set(0, 50, 0); //(x,y,z)

    const hat_line = new Mesh(
      new CylinderGeometry(26, 25, 20, 30),
      new MeshStandardMaterial({ color: 0xe60033 })
    );
    hat_line.position.set(0, 35, 0);

    const hat_collar = new Mesh(
      new CylinderGeometry(40, 40, 5, 30),
      hatMaterial
    );
    hat_collar.position.set(0, 32, 0);

    const head = new Mesh(
      //球のジオメトリー（半径,緯度分割数,経度分割数）
      new SphereGeometry(40, 40, 20),
      headMaterial
    );
    head.position.set(0, 0, 0);

    const right_eye = new Mesh(new SphereGeometry(5, 25, 40), eyeMaterial);
    right_eye.position.set(15, 18, 30);

    const left_eye = new Mesh(new SphereGeometry(5, 10, 40), eyeMaterial);
    left_eye.position.set(-16, 18, 33);

    const nose = new Mesh(
      new SphereGeometry(5, 30, 20),
      new MeshStandardMaterial({ color: 0xed9121 })
    );
    nose.position.set(3, 10, 35);

    const body = new Mesh(new SphereGeometry(50, 50, 50), headMaterial);
    body.position.set(0, -60, 0);

    const button_first = new Mesh(buttonGeometry, buttonMaterial);
    button_first.position.set(0, -30, 37);

    const button_second = new Mesh(buttonGeometry, buttonMaterial);
    button_second.position.set(0, -40, 43);

    //腕
    const armGeometry = new CylinderGeometry(3, 3, 35, 32); //(下,上,長さ,横)
    const armMaterial = new MeshStandardMaterial({ color: 0x8b4513 }); // 茶色

    const leftArm = new Mesh(armGeometry, armMaterial);
    leftArm.position.set(-55, -30, 15);
    leftArm.rotation.set(0, 0, MathUtils.degToRad(45));

    const rightArm = new Mesh(armGeometry, armMaterial);
    rightArm.position.set(55, -30, 15);
    rightArm.rotation.set(0, 0, MathUtils.degToRad(-45)); // Z軸方向に-45度傾ける

    this.add(
      hat,
      hat_line,
      hat_collar,
      head,
      right_eye,
      left_eye,
      nose,
      body,
      button_first,
      button_second,
      leftArm,
      rightArm
    );
  }
}
