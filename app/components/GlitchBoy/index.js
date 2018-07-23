/**
 *
 * GlitchBoy
 *
 */

import React from "react";
import * as THREE from "three";
import { TweenMax, Power1 } from "gsap";
import imgChico from "./_chico.png";
import noise from "noisejs-ilmiont";
import { EffectComposer, GlitchPass, RenderPass } from "postprocessing/src";

import "./style.scss";

class GlitchBoy extends React.Component {
  constructor() {
    super();
    this.state = {
      materialWireframe: false
    };
    noise.seed(Math.random());
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const geometry = new THREE.IcosahedronGeometry(190, 5);
    let i;
    let vector;
    for (i = 0; i < geometry.vertices.length; i++) {
      vector = geometry.vertices[i];
      vector._o = vector.clone();
    }
    const material = new THREE.MeshPhongMaterial({
      emissive: 0xee7a56,
      emissiveIntensity: 0.4,
      shininess: 0
    });
    const material2 = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x9d553f
    });

    const ball = new THREE.Mesh(geometry, material);
    // Lights
    const light = new THREE.DirectionalLight(0xee7a56, 0.5);
    const light2 = light.clone();
    const light3 = new THREE.HemisphereLight(0xffab5b, 0x0c056d, 0.2);
    light.position.set(200, 300, 400);
    light2.position.set(-200, 300, 400);
    light3.position.set(200, 300, 400);
    scene.add(light);
    scene.add(light2);
    scene.add(light3);
    // Boy
    const spriteMap = new THREE.TextureLoader().load(imgChico);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      color: 0xffffff
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(100, 100, 1);
    scene.add(sprite);
    sprite.position.x = 0;
    sprite.position.y = -10;
    sprite.position.z = 250;
    // Ball
    scene.add(ball);
    ball.position.x = -100;
    light.position.set(200, 300, 400);
    scene.add(light);
    light2.position.set(-200, 300, 400);
    scene.add(light2);
    camera.position.set(0, 0, 300);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    this.height = height;
    this.width = width;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.material2 = material2;
    this.ball = ball;
    this.geometry = geometry;

    this.mouse = new THREE.Vector2(0.8, 0.5);

    this.mount.appendChild(this.renderer.domElement);
    TweenMax.from(this.mount, 3, { opacity: 0, delay:1 });
    this.start();
    this.postprocessing();
    this.tanFOV = Math.tan( ( ( Math.PI / 180 ) * this.camera.fov / 2 ) );
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.updateDimensions);

   
  }

  postprocessing = () => {
    this.composer = new EffectComposer(this.renderer);
    this.glitchPass = new GlitchPass();
    this.glitchPass.renderToScreen = true;
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.glitchPass);
    this.glitchPass.GlitchMode = 1;
    this.glitchPass.goWild = false;
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  updateDimensions = () => {
    this.width = this.mount.offsetWidth;
    this.height = this.mount.offsetHeight;
    this.camera.aspect = this.width / this.height;
    // Evita escalado
    // this.camera.fov = ( 360 / Math.PI ) * Math.atan( this.tanFOV * ( window.innerHeight / this.windowHeight));
    this.camera.updateProjectionMatrix();
    this.camera.lookAt( this.scene.position );
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  startGlitch = () => {
    this.glitchPass.changeMode = 1;
    this.ball.material = this.material2;
  }

  stopGlitch = () => {
    this.glitchPass.changeMode = -1;
    this.ball.material = this.material;
    this.startGlitch;
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  updateVertices = (timestamp) => {
    let i;
    this.perlin;
    for (i = 0; i < this.geometry.vertices.length; i++) {
      var vector = this.geometry.vertices[i];
      vector.copy(vector._o);
      this.perlin = noise.simplex3(
        vector.x * 0.006 + timestamp * 0.0002,
        vector.y * 0.006 + timestamp * 0.0003,
        vector.z * 0.006
      );
      this.ratio = this.perlin * 0.4 * (this.mouse.y + 0.1) + 0.8;
      vector.multiplyScalar(this.ratio);
    }
    this.geometry.verticesNeedUpdate = true;
  }

  clickCanvas = () => {

  }

  onMouseMove = e => {
    TweenMax.to(this.mouse, 0.8, {
      y: e.screenY / this.height,
      x: e.screenX / this.width,
      ease: Power1.easeOut
    });
  };

  animate = timestamp => {
    this.ball.rotation.x += 0.01;
    this.ball.rotation.y += 0.01;
    this.updateVertices(timestamp);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene() {
    //this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }

  render() {
    return (
      <div
        className="scene scene--full"
        ref={mount => {
          this.mount = mount;
        }}
        onMouseMove={this.onMouseMove}
        onClick={this.clickCanvas}
      />
    );
  }
}

GlitchBoy.propTypes = {};

export default GlitchBoy;
