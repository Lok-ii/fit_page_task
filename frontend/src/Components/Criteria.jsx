import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useStock } from "../StockContext/Context";
import { ShimmerTitle } from "react-shimmer-effects";

const Criteria = () => {
  const params = useParams();
  const { setCriteria, criteria } = useStock();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fit-page-task.onrender.com/${params.id}`
        );
        setCriteria(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching criteria data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCriteriaText = (criterion) => {
    const words = criterion.text.split(" ");
    return words.map((word, index) => {
      const match = word.match(/\$(\d+)/);
      if (match) {
        const placeholderNumber = match[1];
        const detail = criterion.variable[`$${placeholderNumber}`];
        let displayValue = "";
        if (detail.type === "value") {
          displayValue = detail.values[0];
        } else if (detail.type === "indicator") {
          displayValue = detail.default_value;
        }
        return (
          <Link
            to={"/moredetails/" + params.id + "/" + placeholderNumber}
            key={index}
            className="text-blue-600"
          >
            &#40;{displayValue}&#41;{" "}
          </Link>
        );
      }
      return word + " ";
    });
  };


  return (
    <div className="w-full flex flex-col shadow-home rounded-lg">
      <div className="flex items-center h-12 px-4">
        <p className="text-2xl">Stocks Criteria</p>
      </div>
      <div>
        <div className="p-4 bg-[#61A5FB] hover:bg-[#93C5FD] transition-all duration-200 ease-in-out cursor-pointer">
          <h1>{criteria.name}</h1>
          <p style={{ color: criteria.color }}>{criteria.tag}</p>
        </div>
        <div className="flex flex-col">
          {Object.keys(criteria).length !== 0 ? (
            criteria.criteria.map((criterion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-[#F1F5F9] px-4 py-2"
              >
                {/* Render the criteria text with hyperlinks */}
                {index > 0 ? "and " : ""}
                {renderCriteriaText(criterion)}
              </div>
            ))
          ) : (
            <div>
              <ShimmerTitle line={2} gap={10} variant="primary" />
              <ShimmerTitle line={2} gap={10} variant="primary" />
              <ShimmerTitle line={2} gap={10} variant="primary" />
              <ShimmerTitle line={2} gap={10} variant="primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Criteria;
