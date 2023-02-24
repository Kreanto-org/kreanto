import PrinterInfoButton from "./printer-info-button";

const PrinterInfo: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default PrinterInfo;
