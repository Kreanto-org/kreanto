import { motion, motionValue, useTransform } from "framer-motion";
import { HexagonTemplate, hexagonPoints } from "./loading-hexagons";

const Loading: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className,
}) => {
  return (
    <div className={className}>
      {" "}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
        style={{ width: size, aspectRatio: 1 }}
      >
        <div className="relative h-full w-full">
          {new Array(5).fill(0).map((_, i) => (
            <Hexagon i={i} key={i} size={size} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Hexagon: React.FC<{ i: number; size: number }> = ({ i, size }) => {
  const scale = 6;

  const val = motionValue(scale * i);
  const pos = useTransform(val, (value) => `${value}%`);

  const val2 = motionValue(-scale * i);
  const pos2 = useTransform(val2, (value) => `${value}%`);
  return (
    <motion.div
      style={{ y: i === 0 ? 0 : pos }}
      animate={{ y: i === 0 ? 0 : pos2.get() }}
      transition={{
        ease: "linear",
        duration: 0.66,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute "
    >
      <HexagonTemplate
        points={hexagonPoints[i] ?? ""}
        size={size}
        filled={i === hexagonPoints.length - 1}
      />
    </motion.div>
  );
};

export default Loading;
