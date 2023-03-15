import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import type { Mesh } from "three";

const Box: React.FC = () => {
  const myMesh = React.useRef<Mesh>(null);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useFrame(({ clock }) => {
    const x = clock.getElapsedTime();
    if (!myMesh.current) return;
    myMesh.current.position.y =
      (2 / x) * (x - 3) + 0.5 * Math.cos(2 * x + 6) + Math.sin(0.01 * x);
    myMesh.current.rotation.x += hover ? 0.007 : 0.02;
    myMesh.current.rotation.y += hover ? 0.004 : 0.01;
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </animated.mesh>
  );
};

export default Box;
