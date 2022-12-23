import { useState, useRef } from "react";
import {
	Canvas,
	extend,
	ThreeElements,
	useFrame,
	useThree,
} from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { animated } from "@react-spring/three";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

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
	const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
	const { size, viewport } = useThree();
	const aspect = size.width / viewport.width;
	const boxMesh = useRef<
		THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
	>(null) satisfies React.Ref<THREE.Mesh<
		THREE.BufferGeometry,
		THREE.Material | THREE.Material[]
	> | null>;
	const ourCamera = useRef<THREE.PerspectiveCamera>(
		null
	) satisfies React.Ref<THREE.PerspectiveCamera>;

	const bind = useDrag(({ offset: [x, y] }) => {
		const [, , z] = position;
		setPosition([x / aspect, -y / aspect, z]);
	});

	useFrame(({ clock }) => {
		if (boxMesh.current) {
			boxMesh.current.rotation.y = clock.getElapsedTime();
		}

		if (ourCamera.current) {
			console.log("Setting our camera");
			ourCamera.current.fov = Math.E ** zoomExponent;
		}
	});

	return (
		<>
			<PerspectiveCamera ref={ourCamera} position={[10, 0, 0]} />
			<mesh
				ref={boxMesh}
				{...(bind() as any)}
				position={position}
				rotation={[0, 0, 0]}
			>
				<meshNormalMaterial />
				<boxBufferGeometry />
			</mesh>
		</>
	);
};

function App() {
	const [zoomExponent, setZoomExponent] = useState(0);

	return (
		<Canvas
			onWheel={(event) => {
				const newZoomExponent = zoomExponent + event.deltaY;
				console.log(newZoomExponent);
				setZoomExponent(newZoomExponent);
			}}
		>
			<DrawingArea zoomExponent={zoomExponent} />
		</Canvas>
	);
}

export default App;
