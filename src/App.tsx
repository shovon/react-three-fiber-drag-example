import { useState, useRef } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { animated } from "@react-spring/three";
import * as THREE from "three";

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
	const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
	const { size, viewport } = useThree();
	const aspect = size.width / viewport.width;

	const bind = useDrag(({ offset: [x, y] }) => {
		const [, , z] = position;
		setPosition([x / aspect, -y / aspect, z]);
	});

	return (
		<>
			<mesh {...bind()} position={position}>
				<meshNormalMaterial />
				<boxGeometry args={[1, 1, 0.5]} />
			</mesh>
		</>
	);
};

function App() {
	return (
		<Canvas>
			<DrawingArea />
			<orthographicCamera />
		</Canvas>
	);
}

export default App;
