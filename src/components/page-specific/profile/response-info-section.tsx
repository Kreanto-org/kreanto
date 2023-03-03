import { secondsToDhms } from "~/utils/secondsToDHMS";

const ResponseInfoSection: React.FC<{
  numResponses?: number | undefined;
  avgRespTime?: number | undefined;
}> = ({ numResponses, avgRespTime }) => {
  return numResponses && avgRespTime && numResponses > 3 ? (
    <div>
      <p className="text-text-200">
        Average Response Time: {secondsToDhms(avgRespTime)}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default ResponseInfoSection;
