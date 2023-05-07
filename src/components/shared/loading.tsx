import { motion, motionValue, useTransform } from "framer-motion";

const Loading: React.FC<{ size?: number }> = ({ size = 200 }) => {
  return (
    <div>
      {" "}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
        style={{ width: size, aspectRatio: 1 }}
      >
        <div className="relative h-full w-full">
          {new Array(5).fill(0).map((_, i) => (
            <Hexagon i={i + 1} key={i} size={size} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Hexagon: React.FC<{ i: number; size: number }> = ({ i, size }) => {
  const val = motionValue(2.7 * (i - 1));
  const pos = useTransform(val, (value) => `${value}%`);

  const val2 = motionValue(-2.7 * (i - 1));
  const pos2 = useTransform(val2, (value) => `${value}%`);
  return (
    <motion.img
      src={`/hexagons/hex-0${i}.svg`}
      style={{ y: i === 1 ? 0 : pos }}
      animate={{ y: i === 1 ? 0 : pos2.get() }}
      transition={{
        ease: "linear",
        duration: 0.66,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      alt="hex"
      width={size}
      height={size}
      className="absolute "
    />
  );
};

export default Loading;
