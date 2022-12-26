import { ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { Vector3 } from "three";

export function useDrag(onDrag: (point: Vector3) => void) {
	const active = useRef(false);
	const bind = useCallback(
		() => ({
			onPointerDown: (
				event: ThreeEvent<PointerEvent> & { setPointerCapture: Function }
			) => {
				event.stopPropagation();
				event.target?.setPointerCapture(event.pointerId);
				active.current = true;
				// We don't want the camera to move while we're dragging, toggle it off
			},
			onPointerUp: (event: ThreeEvent<PointerEvent>) => {
				event.stopPropagation();
				event.target?.releasePointerCapture(event.pointerId);
				active.current = false;
				// Drag has concluded, toggle the controls on again
			},
			onPointerMove: (event: ThreeEvent<PointerEvent>) => {
				if (active.current) {
					event.stopPropagation();
					event.onDrag(event.point);
				}
			},
		}),
		[]
	);
	return bind;
}
