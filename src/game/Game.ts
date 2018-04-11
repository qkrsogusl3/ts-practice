import 'reflect-metadata';
import { TYPES } from './TYPES';
import { Container, injectable } from "inversify";
import { Scene, OrthographicCamera, WebGLRenderer, Camera, CameraHelper } from 'three';
import * as $ from 'jquery';
import * as Stats from 'stats.js';

const GlobalContainer = new Container;

interface IGame {
    run(): void;
}

@injectable()
class Game implements IGame {

    private _stats:Stats;

    private _scene: Scene;
    private _camera: Camera;

    private _renderer: WebGLRenderer;

    public constructor() {
        this._stats = new Stats();
        this._scene = new Scene();
        this._camera = new OrthographicCamera(0, 100, 0, 100);

        this._renderer = new WebGLRenderer();
    }

    public run(): void {
        this._stats.showPanel(1);
        $('body').append(this._stats.dom);

        let cameraHelper = new CameraHelper(this._camera);
        this._scene.add(cameraHelper);

        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));

        this._stats.begin();
        this.render();
        this._stats.end();

    }

    private render(): void {


        this._renderer.render(this._scene, this._camera);
    }
}

GlobalContainer.bind<IGame>(TYPES.IGame).to(Game);

export { IGame, GlobalContainer };