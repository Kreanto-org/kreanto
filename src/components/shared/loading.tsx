import { motion, motionValue, useTransform } from "framer-motion";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div>
      {" "}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
        style={{ width: "300px", aspectRatio: 1 }}
      >
        <div className="relative h-full w-full">
          {new Array(5).fill(0).map((_, i) => (
            <Hexagon i={i + 1} key={i} />
          ))}
        </div>
      </motion.div>
      <Image src="/Loading.gif" width={300} height={300} alt="loading..." />
    </div>
  );
};

// const Hexagon: React.FC = () => (
//   <div className="flex-col items-center justify-center">
//     <div className="w-0 border-x-[52px] border-b-[30px] border-y-white border-x-transparent" />
//     <div className="h-[60px] w-[104px] bg-white" />
//     <div className="w-0 border-x-[52px] border-t-[30px] border-y-white border-x-transparent" />
//   </div>
// );

const Hexagon: React.FC<{ i: number }> = ({ i }) => {
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
      width={300}
      height={300}
      className="absolute "
    />
  );
};

// const BorderHexagon: React.FC = () => (
//   <div>
//     <style jsx>{`
//       .cutout {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         width: 150px;
//         height: 173.21px;
//         transform: translate(-50%, -50%);
//         background-color: transparent;
//         clip-path: polygon(
//           50% 0%,
//           83.33% 25%,
//           83.33% 75%,
//           50% 100%,
//           16.67% 75%,
//           16.67% 25%
//         );
//         z-index: 1;
//       }
//     `}</style>
//     <div className="container mx-auto flex items-center justify-center">
//       <div className="relative">
//         <Hexagon />
//         <div className="cutout"></div>
//       </div>
//     </div>
//   </div>
// );

export default Loading;
