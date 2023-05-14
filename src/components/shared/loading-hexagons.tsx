export const HexagonTemplate: React.FC<{
  points: string;
  size: number;
  filled?: boolean;
}> = ({ points, size, filled = false }) => (
  <svg
    id="Layer_2"
    data-name="Layer 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 350 350"
    width={size}
    height={size}
    style={
      filled
        ? {
            fill: "#fff",
            stroke: "#fff",
            strokeMiterlimit: 10,
          }
        : {
            fill: "none",
            stroke: "#fff",
            strokeMiterlimit: 10,
            strokeWidth: "12.5px",
          }
    }
  >
    <polygon points={points} />
  </svg>
);

export const hexagonPoints = [
  "175 23.4 306.3 99.2 306.3 250.8 175 326.6 43.7 250.8 43.7 99.2 175 23.4",
  "175 58.1 276.2 116.6 276.2 233.4 175 291.9 73.8 233.4 73.8 116.6 175 58.1",
  "175 93.6 245.5 134.3 245.5 215.7 175 256.4 104.5 215.7 104.5 134.3 175 93.6",
  "175 128.2 215.5 151.6 215.5 198.4 175 221.8 134.5 198.4 134.5 151.6 175 128.2",
  "175 156.8 190.7 165.9 190.7 184.1 175 193.2 159.3 184.1 159.3 165.9 175 156.8",
];
