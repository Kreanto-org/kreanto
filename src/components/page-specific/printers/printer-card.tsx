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
  return (
    <div className="flex items-center gap-3 rounded-lg bg-bg-200 p-4">
      <Image
        src={image ?? ""}
        alt="pfp"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex flex-col items-start justify-center">
        <h4>{name}</h4>
        <div className="flex w-full items-center justify-between">
          <div className="flex w-[4.5rem] items-center">
            <Logo size="1rem" />
            <p className="ml-[2px] font-light">
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
