import type { Color } from "@prisma/client";
import { api } from "~/utils/api";

const Swatch: React.FC<{
  color: Color;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ color, setSelected }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="peer absolute opacity-0"
        onChange={(e) => {
          if (e.target.checked) {
            setSelected((prev) => [...prev, color.name]);
          } else {
            setSelected((prev) => prev.filter((col) => col !== color.name));
          }
        }}
      />
      <div className="items-between flex h-full w-full flex-col justify-between gap-4 rounded-lg border border-text-300 px-2 pb-3 pt-5 peer-checked:border-2 peer-checked:border-text-100 peer-checked:bg-white/5">
        <div className="flex w-full flex-1 items-center justify-center">
          <div
            className={`h-10 w-10 rounded`}
            style={{ background: color.hex /* Tailwind wasn't working */ }}
          />
        </div>
        <p>{color.name}</p>
      </div>
    </label>
  );
};

const ColorSection: React.FC<{
  setColorChoices: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ setColorChoices }) => {
  const colorsQuery = api.colors.getAll.useQuery();
  const colors = colorsQuery.data;

  return (
    <div className="grid grid-cols-4 gap-4">
      {colors?.map((color, i) => (
        <Swatch color={color} setSelected={setColorChoices} key={i} />
      ))}
    </div>
  );
};

export default ColorSection;
