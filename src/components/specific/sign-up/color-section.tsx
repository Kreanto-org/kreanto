import { api } from "~/utils/api";

const Swatch: React.FC<{ name: string; hex: string }> = ({ name, hex }) => {
  return (
    <div className="items-between flex h-full w-full flex-col justify-between gap-2 rounded border border-text-300 px-2 pb-2 pt-4 peer-checked:border-text-100">
      <div className="flex w-full flex-1 items-center justify-center">
        <div
          className={`h-10 w-10 rounded`}
          style={{ background: hex /* Tailwind wasn't working */ }}
        />
      </div>
      <p>{name}</p>
    </div>
  );
};

const ColorSection: React.FC = () => {
  const colorsQuery = api.colors.getAll.useQuery();
  const colors = colorsQuery.data;
  return (
    <div className="grid grid-cols-4 gap-4">
      {colors?.map((color, i) => (
        <Swatch {...color} key={i} />
      ))}
    </div>
  );
};

export default ColorSection;
