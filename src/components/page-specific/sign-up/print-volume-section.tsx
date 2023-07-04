import type {
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { BiCube } from "react-icons/bi";
import { Input } from "~/components/ui/input";
import type { NewUserData } from "~/pages/sign-up";
import useWindowSize from "~/utils/useWindowSize";

const PrintVolumeSection: React.FC<{
  lengthData: UseFormRegisterReturn;
  widthData: UseFormRegisterReturn;
  heightData: UseFormRegisterReturn;
  watch: UseFormWatch<NewUserData>;
  setValue: UseFormSetValue<NewUserData>;
}> = ({ lengthData, widthData, heightData, watch, setValue }) => {
  const { isDesktop } = useWindowSize();
  return (
    <div>
      <div className="mb-4 flex items-end justify-between ">
        <div className="flex flex-col">
          <p className="mt-4 w-full text-left">
            Print Volume:<span style={{ color: "red" }}> *</span>
          </p>
          <p className="w-full text-left text-[1rem] text-text-200">
            What are the dimensions of your printer (in mm)?
          </p>
        </div>

        {watch("length") && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setValue("width", watch("length"));
              setValue("height", watch("length"));
            }}
            className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg bg-bg-200"
          >
            <BiCube size="1rem" />
          </button>
        )}
      </div>

      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
        <Input
          required
          placeholder="Length (mm)"
          {...lengthData}
          type="number"
          className="md:max-w-[30%]"
        />

        {isDesktop && <h6>X</h6>}
        <Input
          required
          placeholder="Width (mm)"
          {...widthData}
          type="number"
          className="md:max-w-[30%]"
        />
        {isDesktop && <h6>X</h6>}
        <Input
          required
          placeholder="Height (mm)"
          {...heightData}
          type="number"
          className="md:max-w-[30%]"
        />
      </div>
    </div>
  );
};

export default PrintVolumeSection;
