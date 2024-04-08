import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const StockContext = createContext({});

export const useStock = () => useContext(StockContext);

const Context = ({ children }) => {
  const [data, setData] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [variableData, setVariableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:10000/");
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (data.length === 0) {
      fetchData();
    }
  }, []);
  const valueObj = {
    data,
    setData,
    criteria,
    setCriteria,
    variableData,
    setVariableData,
  };
  return (
    <StockContext.Provider value={valueObj}>{children}</StockContext.Provider>
  );
};

export default Context;
