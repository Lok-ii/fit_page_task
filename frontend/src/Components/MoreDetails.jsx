import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStock } from "../StockContext/Context";

const MoreDetails = () => {
  const params = useParams();
  const { variableData, setVariableData } = useStock();
  useEffect(() => {
    const getVariableData = async () => {
      try {
        const response = await axios.get(
          `https://fit-page-task.onrender.com/${params.id}/${params.variable}`
        );
        console.log(response.data);
        if (Array.isArray(response.data.valuesForVariable)) {
          setVariableData(
            response.data.valuesForVariable.sort((a, b) => a - b)
          );
        } else {
          setVariableData(response.data.valuesForVariable);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getVariableData();
  }, []);
  return (
    <div className="flex flex-col shadow-home min-w-[30rem] min-h-[10rem] justify-around items-center">
      {Array.isArray(variableData) ? (
        variableData.map((value, idx) => {
          return <p key={idx + "value"}>{value}</p>;
        })
      ) : (
        <div className="w-full h-full flex flex-col justify-around gap-4">
          <p className="px-4">{variableData.study_type.toUpperCase()}</p>
          <p className="px-4">Set Parameter</p>
          <div className="px-4 flex items-center justify-between">
            <p>{variableData.parameter_name}</p>
            <input
            className="w-[70%]"
              type="number"
              defaultValue={variableData.default_value}
              min={variableData.min_value}
              max={variableData.max_value}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDetails;
