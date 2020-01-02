import React, { Component } from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Room from './room.obj';
OBJLoader(THREE);
class Three extends Component {

    componentDidMount() {
        // === THREE.JS CODE START ===
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor("#628CC1");


        var ship_material = new THREE.MeshPhongMaterial({ color: 0x253200 });
        this.THREE = THREE;
        const objLoader = new this.THREE.OBJLoader();
        // load a resource
        objLoader.load(
            // resource URL
            Room,
            // called when resource is loaded
            function (object) {
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = ship_material;
                    }
                });
                object.castShadow = true;
                scene.add(object);


                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);


                var light = new THREE.AmbientLight(0xffffff, 100);

                var spotlight = new THREE.SpotLight(0xffffff, 100);

                light.castShadow = true;

                spotlight.castShadow = true;

                spotlight.position.z = 50;
                spotlight.position.x = 100;
                spotlight.rotation.x = 45;
                camera.position.z = 100;

                var controller = new OrbitControls(camera, renderer.domElement);
                controller.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                controller.dampingFactor = 0.05;
                controller.screenSpacePanning = false;
                controller.minDistance = 100;
                controller.maxDistance = 500;
                controller.maxPolarAngle = Math.PI / 2;
                controller.mouseButtons = {
                    LEFT: THREE.MOUSE.ROTATE,
                    MIDDLE: THREE.MOUSE.DOLLY,
                }
                scene.add(light, spotlight);
                var animate = function () {
                    requestAnimationFrame(animate);
                    controller.update();
                    renderer.render(scene, camera)
                }
                animate();
            },
            // called when loading is in progresses
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('load error');
            },
        );
    }
    render() {
        return (
            null
        );
    }
}

export default Three;