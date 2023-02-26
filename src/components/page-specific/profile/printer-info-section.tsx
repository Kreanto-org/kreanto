import type { PrinterProfile } from "@prisma/client";
import { BiTimeFive, BiCube } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";
import { GiNestedHexagons } from "react-icons/gi";
import InfoTooltip from "~/components/ui/info-tooltip";

const printTimeWords = {
  MED: "Medium",
  LOW: "Low",
  HI: "High",
};

const colorTypeWords = {
  SINGLE: "Single",
  LAYERED: "Layered",
  FULL: "Full",
};

const PrinterInfoSection: React.FC<{ profile: PrinterProfile }> = ({
  profile,
}) => {
  return (
    <div className="flex flex-col items-start text-left text-xl text-text-200">
      <div className="flex items-center gap-2">
        <GiNestedHexagons />
        <p>{profile.points} points</p>
      </div>
      <div className="flex items-center gap-2">
        <BiTimeFive /> <p>{printTimeWords[profile.printTime]} availability</p>
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineColorLens />{" "}
        <p className="capitalize">{colorTypeWords[profile.colorType]} color</p>
      </div>
      <div className="flex items-center gap-2">
        <BiCube />{" "}
        <p>
          {profile.length}mm x {profile.width}mm x {profile.height}mm
        </p>
        <InfoTooltip message="These are the dimensions of the 3d printer this person uses, telling you how big they can print!" />
      </div>
    </div>
  );
};

export default PrinterInfoSection;
