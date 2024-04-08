import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useStock } from "../StockContext/Context";

const Criteria = () => {
  const params = useParams();
  const { setCriteria, criteria } = useStock();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:10000/${params.id}`);
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
      // Return the word as is if it's not a placeholder
      return word + " ";
    });
  };

  if (!criteria) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 shadow-home rounded-lg">
      <div className="p-4 border-[1px] border-b-black">
        <h1>{criteria.name}</h1>
        <p style={{ color: criteria.color }}>{criteria.tag}</p>
      </div>
      <div className="flex flex-col gap-4">
        {Object.keys(criteria).length !== 0 &&
          criteria.criteria.map((criterion, index) => (
            <div key={index} className="cursor-pointer hover:bg-[#5552B6] px-4 py-2">
              {/* Render the criteria text with hyperlinks */}
              {index > 0 ? "and " : ""}
              {renderCriteriaText(criterion)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Criteria;
