import type { ColorType, PrintTime } from "@prisma/client";
import Image from "next/image";
import Logo from "~/components/shared/logo";
import {
  PrintColorIcon,
  PrintTimeIcon,
  PrintVolumeIcon,
} from "../profile/printer-icons";

const PrinterCard: React.FC<{
  name: string | null;
  image: string | null;
  points?: number;
  availability?: PrintTime;
  color?: ColorType;
  size: number;
}> = ({ name, image, points, availability, color, size }) => {
  points = 2000;

  // I'm sorry for this
  const names = name?.split(" ");
  const nameStr =
    names && names[0]
      ? names[0] +
        (names.length - 1 > 0 ? " " + (names[1] ?? " ")[0] + "." : "")
      : name;

  return (
    <div className="flex w-80 items-center gap-3 rounded-lg bg-bg-200 p-4">
      <Image
        src={image ?? ""}
        alt="pfp"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex w-full max-w-[calc(100%-60px)] flex-col items-start justify-center">
        <h5 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {nameStr}
        </h5>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-[4.5rem] items-center">
            <Logo highlight />
            <p className="ml-[2px]  font-light">
              {points && points >= 1000 ? "1000+" : points}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PrintTimeIcon time={availability} />
            <PrintColorIcon color={color} />
            <PrintVolumeIcon l={size} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrinterCard;
