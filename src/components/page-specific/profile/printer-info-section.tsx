import type { PrinterProfile } from "@prisma/client";
import InfoTooltip from "~/components/ui/info-tooltip";
import Logo from "~/components/shared/logo";
import {
  PrintColorIcon,
  PrintTimeIcon,
  PrintVolumeIcon,
} from "./printer-icons";

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
    <div className="flex flex-col items-start text-left text-xl text-text-100">
      <div className="flex items-center gap-2">
        <Logo highlight />
        <p>{profile.points} points</p>
        <InfoTooltip learnMore="/info/printer-points">
          This tells you how experienced this printer is.
        </InfoTooltip>
      </div>
      <div className="flex items-center gap-2">
        <PrintTimeIcon time={profile.printTime} />{" "}
        <p>{printTimeWords[profile.printTime]} availability</p>
        <InfoTooltip learnMore="/info/printer-availability">
          This tells you how available this person is to print something.
        </InfoTooltip>
      </div>
      <div className="flex items-center gap-2">
        <PrintColorIcon color={profile.colorType} />{" "}
        <p className="capitalize">{colorTypeWords[profile.colorType]} color</p>
        <InfoTooltip learnMore="/info/printer-colors">
          This tells you how many colors this person can use in a single print.
        </InfoTooltip>
      </div>
      <div className="flex items-center gap-2">
        <PrintVolumeIcon
          l={profile.length}
          w={profile.width}
          h={profile.height}
        />{" "}
        <p>
          {profile.length}mm x {profile.width}mm x {profile.height}mm
        </p>
        <InfoTooltip learnMore="/info/print-volume">
          These are the dimensions of the 3d printer this person uses, telling
          you how big they can print!
        </InfoTooltip>
      </div>
    </div>
  );
};

export default PrinterInfoSection;
