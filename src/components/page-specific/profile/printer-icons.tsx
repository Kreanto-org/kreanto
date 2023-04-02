import type { ColorType, PrintTime as PrintTimeType } from "@prisma/client";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";

export const PrintTimeIcon: React.FC<{ time?: PrintTimeType }> = ({ time }) => (
  <BiTimeFive
    size={"1rem"}
    fill={time === "HI" ? "green" : time === "MED" ? "yellow" : "red"}
  />
);

export const PrintColorIcon: React.FC<{ color?: ColorType }> = ({ color }) => (
  <MdOutlineColorLens
    size={"1rem"}
    fill={color === "FULL" ? "green" : color === "LAYERED" ? "yellow" : "red"}
  />
);

// prettier-ignore
export const PrintVolumeIcon: React.FC<{ l: number; w?: number; h?: number }> = ({
  l, w = 100000, h = 1000000,
}) => {
  const size = Math.min(l, w, h);
  return (
    <BiTimeFive
      size={"1rem"}
      fill={size > 250 ? "green" : size > 150 ? "yellow" : "red"}
    />
  );
};
