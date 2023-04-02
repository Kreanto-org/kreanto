import Image from "next/image";

const PrinterCard: React.FC<{ name: string | null; image?: string | null }> = ({
  name,
  image,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-bg-200 p-4">
      <Image src={image ?? ""} alt="pfp" />
      <div className="flex flex-col items-start justify-center">
        <h4>{name}</h4>
      </div>
    </div>
  );
};

export default PrinterCard;
