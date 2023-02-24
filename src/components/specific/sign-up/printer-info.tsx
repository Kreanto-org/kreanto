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
    </>
  );
};

export default PrinterInfo;
