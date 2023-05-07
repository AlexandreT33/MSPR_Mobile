import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import * as THREE from 'three';
import ExpoTHREE, { three } from 'expo-three';
import Expo from 'expo';
import { runOnUI } from 'react-native-reanimated';
import { GLView } from 'expo-gl';

console.disableYellowBox = true;

export default function AR() {

    
    _onGLContextCreate = async (gl) => {

        runOnUI((contextId: number) => {
            'worklet';
            const gl = GLView.getWorkletContext(contextId);
            render(gl);
          })(gl.contextId);
        /*
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
        const renderer = new ExpoTHREE.Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        
        const cube = new THREE.Mesh(geometry, material);
        
        scene.add(cube);
        
        camera.position.z = 5;

        renderer.render(scene, camera);
        gl.endFrameEXP();*/
    }

    async function onContextCreate(gl) {
        
        //const arSession = await gl.startARSessionAsync();
        /*
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
        
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        
        const cube = new THREE.Mesh(geometry, material);
        
        scene.add(cube);
        
        camera.position.z = 5;

        animate(renderer ,gl ,scene, camera, cube);
        */
    }

    /*
    function animate(renderer ,gl ,scene, camera, cube) {
        cube.rotation.x = cube.rotation.x+ 0.57;
        cube.rotation.y = cube.rotation.y+ 0.44;
        renderer.render(scene, camera);
        gl.endFrameEXP();
    }*/

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GLView
                ref={(ref) => this._glView = ref}
                style={{  width: 600, height: 600  }}
                onContextCreate={this._onGLContextCreate}
            />
        </View>
    );

    
}