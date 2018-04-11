import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AxesHelper,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three';
import * as $ from 'jquery';
import { IPractice } from '../interfaces';

class ThreePractice_1 implements IPractice{

    public init(): void {
        $(window).ready(() => {
            this.renderStart();
        });
    }

    private renderStart(): void {
        let scene = new Scene;
        let camera = new PerspectiveCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        let renderer = new WebGLRenderer;
        renderer.setClearColor(0xeeeeee);
        renderer.setSize(window.innerWidth, window.innerHeight);

        //SHow Axes
        let axes = new AxesHelper(100);
        scene.add(axes);

        //let's make a plane
        let planeGeometry = new PlaneGeometry(60, 30, 1, 1);
        let planeMaterial = new MeshBasicMaterial({ color: 0xcccccc });
        let plane = new Mesh(planeGeometry, planeMaterial);
        // plane.rotation.x = -0.5 * Math.PI;
        // plane.rotation.y = Math.PI * -0.25;

        plane.add(new AxesHelper(5));

        scene.add(plane);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 30;
        // camera.lookAt(plane.position);

        $('body').append(renderer.domElement);

        renderScene(0);

        let count = 0;
        let handle = 0;
        function renderScene(time: number) {
            handle = window.requestAnimationFrame(renderScene);
            renderer.render(scene, camera);

            if (plane.rotation.z < Math.PI * 2) {
                plane.rotation.z += 0.01;
            } else {
                window.cancelAnimationFrame(handle);
            }
        }
    }
}

export { ThreePractice_1 }