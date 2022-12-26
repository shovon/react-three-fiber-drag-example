import { useState, useRef, useCallback } from "react";
import {
	Canvas,
	extend,
	ThreeElements,
	useFrame,
	useThree,
	ThreeEvent,
} from "@react-three/fiber";
// import { useDrag } from "@use-gesture/react";
import { animated } from "@react-spring/three";
import * as THREE from "three";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import { useDrag } from "./use-drag";
import { Scene } from "./orthographic-scene";

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

type DrawingAreaProps = {
	zoomExponent: number;
};

const DrawingArea = ({ zoomExponent }: DrawingAreaProps) => {
	// const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
	const positionRef = useRef<[number, number, number]>([0, 0, 0]);
	// const { size, viewport } = useThree();
	// const aspect = size.width / viewport.width;
	const boxMesh = useRef<
		THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
	>(null) satisfies React.Ref<THREE.Mesh<
		THREE.BufferGeometry,
		THREE.Material | THREE.Material[]
	> | null>;
	const ourCamera = useRef<THREE.PerspectiveCamera>(
		null
	) satisfies React.Ref<THREE.PerspectiveCamera>;

	const bind = useDrag((point) => {
		// positionRef.current = [point.x, point.y, positionRef.current[2]];
		if (boxMesh.current) {
			boxMesh.current.position.x = point.x;
			boxMesh.current.position.y = point.y;
			boxMesh.current.position.z = point.y;
		}
	});

	useFrame(({ clock, camera }) => {
		if (boxMesh.current) {
			boxMesh.current.rotation.y = clock.getElapsedTime();
		}

		camera.zoom = Math.E ** zoomExponent;
	});

	return (
		<>
			<mesh
				ref={boxMesh}
				{...(bind() as any)}
				position={positionRef.current}
				rotation={[0, 0, 0]}
			>
				<meshNormalMaterial />
				<boxBufferGeometry />
			</mesh>
		</>
	);
};

// function App() {
// 	const [zoomExponent, setZoomExponent] = useState(0);

// 	return (
// 		<Canvas
// 			onWheel={(event) => {
// 				const newZoomExponent = zoomExponent + event.deltaY * 0.0001;
// 				setZoomExponent(newZoomExponent);
// 			}}
// 		>
// 			<DrawingArea zoomExponent={zoomExponent} />
// 			<gridHelper args={[10, 10, `black`, `gray`]} />
// 			{/* <OrthographicCamera makeDefault zoom={1} position={[0, 10, 10]} /> */}
// 		</Canvas>
// 	);
// }

function App() {
	return <Scene />;
}

export default App;
