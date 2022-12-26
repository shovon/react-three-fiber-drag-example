import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
// import "./styles.css";
import { OrthographicCamera } from "@react-three/drei";
import { useDrag } from "./use-drag";

export const CameraDolly = ({ isZoom }: { isZoom: boolean }) => {
	const vec = new THREE.Vector3();

	useFrame((state) => {
		const step = 0.1;
		const x = isZoom ? 0 : 5;
		const y = isZoom ? 10 : 5;
		const z = isZoom ? 10 : 5;

		state.camera.position.lerp(vec.set(x, y, z), step);
		state.camera.lookAt(0, 0, 0);
		state.camera.updateProjectionMatrix();
	});

	return null;
};

export const Scene = () => {
	const [isZoom, setZoom] = useState(false);
	const toggleZoom = () => setZoom((active) => !active);
	const meshRef = useRef<
		THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
	>(null) satisfies React.Ref<THREE.Mesh<
		THREE.BufferGeometry,
		THREE.Material | THREE.Material[]
	> | null>;
	const bind = useDrag((point) => {
		if (meshRef.current) {
			meshRef.current.position.x = point.x;
			meshRef.current.position.y = point.y;
			// meshRef.current.position.z = point.z;
		}
	});

	return (
		<Canvas>
			<OrthographicCamera makeDefault zoom={40} />
			<gridHelper args={[10, 10, `white`, `gray`]} />
			<mesh {...(bind() as any)} ref={meshRef} position={[0, 1, 0]}>
				<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
				<meshNormalMaterial attach="material" />
			</mesh>
			<CameraDolly isZoom={isZoom} />
		</Canvas>
	);
};
