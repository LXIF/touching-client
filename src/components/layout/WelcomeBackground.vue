<template>
    <div id='background'>      
    </div>
</template>

<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { onMounted } from 'vue'

export default {
    name: 'TheBackground',
    setup() {
        onMounted(() => {

            ///////SETUP////////

            //setup scene stuff
            let camera = null;
            let scene = null;
            let renderer = null;
            // let mesh = null;
            let model = null;
            const loader = new GLTFLoader();

            //draco loader for compressed data
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath( 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/' );
            loader.setDRACOLoader( dracoLoader );

            //where to append it to
            let container = document.getElementById('background');

            ////////CAMERA//////////

            //camera setup
            camera = new Three.PerspectiveCamera(20, container.clientWidth/container.clientHeight, 0.01, 10);
            camera.lookAt(0,0,0);
            camera.position.z = 3;
            camera.position.y = 0;
            camera.rotation.z = 0.1;

            function scrollHeight() {
                return Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                );
            }

            

            function polarToCartesian(centerX, centerY, radius, angleInRadians) {
                // const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

                return {
                    x: centerX + (radius * Math.cos(angleInRadians)),
                    y: centerY + (radius * Math.sin(angleInRadians))
                };
            }

            let cameraZ = 3;
            const cameraZMax = 3;
            const cameraZMin = 0.5;

            let cameraY = 0;
            const cameraYMax = 0;
            const cameraYMin = -0.8;

            document.addEventListener('scroll', () => {
                const scrollableHeight = scrollHeight() - window.innerHeight;
                if(scrollableHeight > window.innerHeight) {
                    const scrollFactor = window.scrollY / scrollableHeight;

                    cameraZ = cameraZMax - scrollFactor * (cameraZMax - cameraZMin);
                    cameraY = cameraYMax - scrollFactor * (cameraYMax - cameraYMin);
                } else {
                    cameraZ = cameraZMin;
                    cameraY = cameraYMin;
                }
                // cameraZ = Math.round(cameraZ * 100)/100;
                // camera.position.z = cameraZ;
            });

            function animateMovement() {
        
                const angle = Math.sin(Date.now() / 30000) * Math.PI;
                const position = polarToCartesian(0,0, cameraZ, angle);
                camera.position.z = position.y;
                camera.position.x = position.x;
                camera.position.y = cameraY;
                camera.lookAt(0,cameraY,0);
                window.requestAnimationFrame(animateMovement);
            }


            window.requestAnimationFrame(animateMovement);
      

            

            // //orbit controls
            // const controls = new OrbitControls( camera, container );
            // controls.autoRotate = true;
            // controls.autoRotateSpeed = 1;





            //create three scene
            scene = new Three.Scene();


            ///////LIGHT///////
            // const ambientLight = new Three.AmbientLight( 0xffffff );
            // scene.add( ambientLight );

            const pointLight1 = new Three.PointLight( 0x49529D, 1, 100);
            pointLight1.position.set(2,0,1);
            scene.add(pointLight1);

            const pointLight2 = new Three.PointLight( 0xEAE2A2, 1, 100);
            pointLight2.position.set(1,0,2);
            scene.add(pointLight2);

            const pointLight3 = new Three.PointLight( 0x038CA6, 1, 100);
            pointLight3.position.set(1,0,-2);
            scene.add(pointLight3);


            ////////RENDERER/////////

            //define three renderer
            renderer = new Three.WebGLRenderer({antialias: true, alpha: true});
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setClearColor( 0xffffff, 0);

            //append renderer to DOM
            container.appendChild(renderer.domElement);

            ////////EFFECTS COMPOSER///////
            const composer = new EffectComposer( renderer );
            const renderPass = new RenderPass( scene, camera );
            composer.addPass(renderPass);

            ////BLOOM
            const bloomPass = new UnrealBloomPass();
            bloomPass.threshold = 0.2;
			bloomPass.strength = 4;
			bloomPass.radius = 1;
            composer.addPass( bloomPass );

            ////ANTIALIASING
            let fxaaPass = new ShaderPass( FXAAShader );

            let pixelRatio = renderer.getPixelRatio();
            let uniforms = fxaaPass.material.uniforms;

            uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
            uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );

            composer.addPass(fxaaPass)


            ////////////HDRI LOADER//////////

            const pmremGenerator = new Three.PMREMGenerator( renderer );
			pmremGenerator.compileEquirectangularShader();

            new RGBELoader()
					.setDataType( Three.UnsignedByteType )
					.setPath( '/3D/' )
					.load( 'sonder_stars.hdr', function ( texture ) {

						const envMap = pmremGenerator.fromEquirectangular( texture ).texture;


						scene.background = envMap;
						scene.environment = envMap;

						texture.dispose();
						pmremGenerator.dispose();

						// render();

						// model

						// use of RoughnessMipmapper is optional
						

						// const loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
						// loader.load( 'DamagedHelmet.gltf', function ( gltf ) {

						// 	gltf.scene.traverse( function ( child ) {

						// 		if ( child.isMesh ) {

						// 			// TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
						// 			// roughnessMipmapper.generateMipmaps( child.material );

						// 		}

						// 	} );

						// 	scene.add( gltf.scene );

						// 	roughnessMipmapper.dispose();

						// 	render();

						// } );

					} );


            ///////////GLTF LOADER/////////////
            
            const roughnessMipmapper = new RoughnessMipmapper( renderer );

            // Load a glTF resource
            loader.load(
                // resource URL
                '/3D/SONDER_save-the-date_smallify_2.glb',
                // '../../assets/3D/schmargle_uncompressed.glb',
                // '/3D/schmargleerr_uncompressed.glb',
                // called when the resource is loaded
                function ( gltf ) {
                    gltf.scene.traverse( function ( child ) {

								if ( child.isMesh ) {

									// TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
									// roughnessMipmapper.generateMipmaps( child.material );

								}

							} );
                    roughnessMipmapper.dispose();
                    gltf.scene.scale.set(0.2, 0.2, 0.2);
                    scene.add( gltf.scene );
                    model = gltf.scene;
                    model.position.y = -1;
                    

                    // gltf.animations; // Array<THREE.AnimationClip>
                    // gltf.scene; // THREE.Group
                    // gltf.scenes; // Array<THREE.Group>
                    // gltf.cameras; // Array<THREE.Camera>
                    // gltf.asset; // Object
                    // console.log(gltf.asset);

                    animate();

                },
                // called while loading is progressing
                function ( xhr ) {

                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

                },
                // called when loading has errors
                function ( error ) {
                    if (error) {
                        console.log( error );
                    }
                }
            );

            ////////////ANIMATE/RENDER/////////

            function animate() {
                
                requestAnimationFrame(animate);
                // controls.update();
                // model.rotation.y += 0.001;
                // animateMovement();
                render();
            }

            function render() {

				// renderer.render( scene, camera );
                composer.render();

			}

            //for resizing

            window.addEventListener( 'resize', onWindowResize );

            function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

        });
    },
}
</script>

<style scoped>
    #background {
        background-color: black;
        position: fixed;
        left: 0;
        top: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>