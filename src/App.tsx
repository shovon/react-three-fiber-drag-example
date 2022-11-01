import { useState, useRef } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { animated } from "@react-spring/three";
import * as THREE from "three";
import "./App.css";

// This example
// https://maxrohde.com/2019/10/19/creating-a-draggable-shape-with-react-three-fiber

type SphereProps = {
	color: string;
	position:
		| number
		| THREE.Vector3
		| [x: number, y: number, z: number]
		| readonly [x: number, y: number, z: number];
};

const DrawingArea = () => {
	const object = useRef();
	const { camera, gl } = useThree();

	const bind = useDrag(({ timeStamp }) => {
		return timeStamp;
	});

	return (
		<>
			<animated.mesh {...bind} onPointerDown={(e) => {}} position={[0, 0, 0]}>
				<meshNormalMaterial />
				<boxGeometry args={[2, 2, 2]} />
			</animated.mesh>
		</>
	);
};

function App() {
	return (
		<Canvas>
			<DrawingArea />
		</Canvas>
	);
}

export default App;
