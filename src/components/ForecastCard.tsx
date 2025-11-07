import React from "react";

interface ForecastCardProps {
  probability: number;
  analysis: string;
  uncertainties: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  probability,
  analysis,
  uncertainties,
}) => {
  const progressColor =
    probability > 70
      ? "bg-green-500"
      : probability > 40
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="p-4 my-2 border-gray-300 border rounded-lg shadow bg-white text-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Forecast Probability:</span>
        <span className="font-bold">{probability.toFixed(0)}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full mb-4">
        <div
          className={`h-2 rounded-full ${progressColor}`}
          style={{ width: `${probability}%` }}
        ></div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Analysis:</span>
        <p>{analysis}</p>
      </div>
      <div>
        <span className="font-semibold">Uncertainties:</span>
        <p>{uncertainties}</p>
      </div>
    </div>
  );
};

export default ForecastCard;
