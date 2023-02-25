import ColorSection from "./color-section";
import PrinterInfoButton from "./printer-info-button";

const PrinterInfo: React.FC<{
  setColorChoices: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ setColorChoices }) => {
  return (
    <div className="flex w-full flex-col">
      <p className="mt-4 w-full text-left">
        Print Availability:<span style={{ color: "red" }}> *</span>
      </p>
      <p className="mb-4 w-full text-left text-[1rem] text-text-200">
        How available would you be to print models for people?
      </p>
      <div className="flex">
        <PrinterInfoButton
          groupName="printAvailability"
          title="Low"
          description="< 5 hours/week"
          left
        />
        <PrinterInfoButton
          groupName="printAvailability"
          title="Average"
          description="5-25 hours/week"
        />
        <PrinterInfoButton
          groupName="printAvailability"
          title="High"
          description="> 25 hours/week"
          right
        />
      </div>
      <p className="mt-4 w-full text-left">
        Color mode:<span style={{ color: "red" }}> *</span>
      </p>
      <p className="mb-4 w-full text-left text-[1rem] text-text-200">
        How many colors can one print have?
      </p>
      <div className="flex">
        <PrinterInfoButton
          groupName="colorType"
          title="Single"
          description="One print can have one color"
          left
        />
        <PrinterInfoButton
          groupName="colorType"
          title="Layered"
          description="Different layers can have different colors"
        />
        <PrinterInfoButton
          groupName="colorType"
          title="Full"
          description="One layer can have multiple colors"
          right
        />
      </div>
      <p className="mt-4 w-full text-left">
        Colors:<span style={{ color: "red" }}> *</span>
      </p>
      <p className="mb-4 w-full text-left text-[1rem] text-text-200">
        Which colors can you currently print? (You can update this at any point)
      </p>
      <ColorSection setColorChoices={setColorChoices} />
    </div>
  );
};

export default PrinterInfo;
